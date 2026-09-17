import express from 'express';
import Complaint from '../models/Complaint.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

function detectPriority(subject, description) {
  const text = (subject + ' ' + description).toLowerCase();

  const highKeywords = [
    'water', 'leak', 'leakage', 'flood', 'flooding',
    'fire', 'smoke', 'emergency', 'urgent', 'critical',
    'electricity', 'power', 'outage', 'blackout',
    'security', 'theft', 'stolen', 'break-in', 'unsafe',
    'accident', 'injury', 'medical', 'health', 'hazard',
    'broken', 'damage', 'dangerous', 'immediate',
    'hostel', 'dormitory', 'residence'
  ];

  const mediumKeywords = [
    'fees', 'fee', 'payment', 'deducted', 'refund', 'account', 'accounts',
    'admission', 'certificate', 'document', 'exam', 'result', 'marks',
    'attendance', 'transport', 'bus', 'canteen', 'food'
  ];

  const lowKeywords = [
    'library', 'book', 'books', 'magazine', 'journal',
    'notes', 'syllabus', 'timetable', 'schedule',
    'suggestion', 'feedback', 'improvement', 'request',
    'question', 'inquiry', 'information', 'clarification',
    'outdated', 'old', 'condition'
  ];

  for (const keyword of highKeywords) {
    if (text.includes(keyword)) return 'high';
  }
  for (const keyword of mediumKeywords) {
    if (text.includes(keyword)) return 'medium';
  }
  for (const keyword of lowKeywords) {
    if (text.includes(keyword)) return 'low';
  }
  return 'medium';
}

// GET /api/complaints (list complaints)
// GET /api/complaints (list complaints)
router.get('/', requireAuth, async (req, res) => {
  try {
    const { role, id: userId } = req.user;

    let query = {};

    if (role === 'student') {
      // Student sees only their own complaints
      query = { user_id: userId };

    } else if (role === 'staff') {
      // Staff sees complaints from their department
      query = {
        department_name: req.user.department
      };

    } else if (role === 'admin') {
      // Admin sees all complaints
      query = {};
    }

    const complaints = await Complaint.find(query)
      .sort({ created_at: -1 });

    return res.json({
      status: 'success',
      data: complaints
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to fetch complaints: ' + error.message
    });
  }
});


// GET /api/complaints/:id (complaint details)
router.get('/:id', requireAuth, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({
        status: 'error',
        message: 'Complaint not found'
      });
    }

    return res.json({
      status: 'success',
      data: {
        complaint,
        replies: complaint.replies || []
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error fetching complaint: ' + error.message
    });
  }
});

// POST /api/complaints (create complaint)
router.post('/', requireAuth, async (req, res) => {
  const { subject, description, department_name, department_id, priority } = req.body;

  if (!subject || !description) {
    return res.status(400).json({
      status: 'error',
      message: 'Subject and Description are required'
    });
  }

  try {
    const detectedPriority = (!priority || priority === 'auto')
      ? detectPriority(subject, description)
      : priority;

    const newComplaint = await Complaint.create({
      user_id: req.user.id,
      student_name: req.user.name,
      department_name: department_name || 'General Administration',
      department_id: department_id || '',
      subject: subject.trim(),
      description: description.trim(),
      priority: detectedPriority,
      status: 'pending'
    });

    return res.status(201).json({
      status: 'success',
      message: 'Complaint lodged successfully',
      data: newComplaint
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to lodge complaint: ' + error.message
    });
  }
});

router.put("/:id/status", requireAuth, async (req, res) => {
  const { status } = req.body;

  const allowedStatuses = [
    "pending",
    "in_progress",
    "resolved"
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid status"
    });
  }

  try {
    const complaint =
      await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        status: "error",
        message: "Complaint not found"
      });
    }

    if (
      req.user.role === "staff" &&
      req.user.department &&
      complaint.department_name !==
        req.user.department
    ) {
      return res.status(403).json({
        status: "error",
        message:
          "Access denied for this department"
      });
    }

    complaint.status = status;

    await complaint.save();

    return res.json({
      status: "success",
      message:
        "Status updated successfully",
      data: complaint
    });

  } catch (error) {

    return res.status(500).json({
      status: "error",
      message:
        "Failed to update status: " +
        error.message
    });

  }
});

// POST /api/complaints/:id/reply
router.post('/:id/reply', requireAuth, async (req, res) => {
  const { message } = req.body;
  if (!message || !message.trim()) {
    return res.status(400).json({
      status: 'error',
      message: 'Message cannot be empty'
    });
  }

  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ status: 'error', message: 'Complaint not found' });
    }

    complaint.replies.push({
      user_id: req.user.id,
      user_name: req.user.name,
      user_role: req.user.role,
      message: message.trim()
    });

    await complaint.save();

    return res.json({
      status: 'success',
      message: 'Reply added successfully',
      data: complaint.replies
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to add reply: ' + error.message
    });
  }
});

// PUT /api/complaints/:id/status
router.put('/:id/status', requireAuth, async (req, res) => {
  const { status } = req.body;

  const allowedStatuses = [
    'pending',
    'in_progress',
    'resolved'
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid status'
    });
  }

  try {
    const complaint = await Complaint.findById(
      req.params.id
    );

    if (!complaint) {
      return res.status(404).json({
        status: 'error',
        message: 'Complaint not found'
      });
    }

    // Staff can update complaints belonging
    // to their department.
    if (
      req.user.role === 'staff' &&
      req.user.department &&
      complaint.department_name !== req.user.department
    ) {
      return res.status(403).json({
        status: 'error',
        message: 'Access denied for this department'
      });
    }

    complaint.status = status;

    await complaint.save();

    return res.json({
      status: 'success',
      message: 'Status updated successfully',
      data: complaint
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message:
        'Failed to update status: ' +
        error.message
    });
  }
});

export default router;
