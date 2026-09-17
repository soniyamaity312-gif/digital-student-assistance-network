import express from "express";
import User from "../models/User.js";
import Complaint from "../models/Complaint.js";
import Notice from "../models/NoticeTemp.js";
import Category from "../models/Category.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();


// =====================================================
// GET /api/admin/stats
// =====================================================

router.get(
  "/stats",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    try {

      // =========================
      // USER COUNTS
      // =========================

      const studentCount = await User.countDocuments({
        role: "student"
      });

      const staffCount = await User.countDocuments({
        role: "staff"
      });


      // =========================
      // STAFF BY DEPARTMENT
      // =========================

      const departmentData = await User.aggregate([
        {
          $match: {
            role: "staff",
            department: {
              $ne: ""
            }
          }
        },
        {
          $group: {
            _id: "$department",
            staffCount: {
              $sum: 1
            }
          }
        },
        {
          $sort: {
            _id: 1
          }
        }
      ]);


      // =========================
      // COMPLAINT COUNTS
      // =========================

      const complaintCount =
        await Complaint.countDocuments();

      const pendingComplaints =
        await Complaint.countDocuments({
          status: "pending"
        });

      const inProgressComplaints =
        await Complaint.countDocuments({
          status: "in_progress"
        });

      const resolvedComplaints =
        await Complaint.countDocuments({
          status: "resolved"
        });


      // =========================
      // RESPONSE
      // =========================

      return res.json({
        status: "success",

        data: {
          students: studentCount,

          staff: staffCount,

          departmentCount: departmentData.length,

          complaints: complaintCount,

          complaintStatus: {
            pending: pendingComplaints,
            in_progress: inProgressComplaints,
            resolved: resolvedComplaints
          },

          departments: departmentData.map(
            (department) => ({
              name: department._id,
              staffCount: department.staffCount
            })
          )
        }
      });

    } catch (error) {

      return res.status(500).json({
        status: "error",
        message:
          "Failed to load admin statistics: " +
          error.message
      });

    }
  }
);


// =====================================================
// GET /api/admin/students
// =====================================================

router.get(
  "/students",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    try {

      const students = await User.find(
        {
          role: "student"
        },
        {
          password: 0
        }
      ).sort({
        createdAt: -1
      });


      return res.json({
        status: "success",

        data: students.map(
          (student) => ({
            id: student._id.toString(),

            name: student.name,

            email: student.email,

            studentId: student.studentId || "",

            department: student.department || "",

            year: student.year || "",

            phone: student.phone || "",

            createdAt: student.createdAt
          })
        )
      });

    } catch (error) {

      return res.status(500).json({
        status: "error",
        message:
          "Failed to load students: " +
          error.message
      });

    }
  }
);

// =====================================================
// GET /api/admin/staff
// =====================================================

router.get(
  "/staff",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    try {
      const staff = await User.find(
        { role: "staff" },
        { password: 0 }
      ).sort({ createdAt: -1 });

      return res.json({
        status: "success",
        data: staff.map((member) => ({
          id: member._id.toString(),
          name: member.name,
          email: member.email,
          department: member.department || "",
          phone: member.phone || "",
          createdAt: member.createdAt
        }))
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Failed to load staff: " + error.message
      });
    }
  }
);


// =====================================================
// POST /api/admin/staff
// =====================================================

router.post(
  "/staff",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        department,
        phone
      } = req.body;

      if (!name || !email || !password || !department) {
        return res.status(400).json({
          status: "error",
          message:
            "Name, email, password and department are required"
        });
      }

      const existingUser = await User.findOne({
        email: email.trim().toLowerCase()
      });

      if (existingUser) {
        return res.status(400).json({
          status: "error",
          message: "Email already registered"
        });
      }

      const bcrypt = await import("bcryptjs");

      const hashedPassword =
        await bcrypt.default.hash(password, 10);

      const staff = await User.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        role: "staff",
        department: department.trim(),
        phone: phone || ""
      });

      return res.status(201).json({
        status: "success",
        message: "Staff added successfully",
        data: {
          id: staff._id.toString(),
          name: staff.name,
          email: staff.email,
          department: staff.department
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Failed to add staff: " + error.message
      });
    }
  }
);


// =====================================================
// DELETE /api/admin/staff/:id
// =====================================================

router.delete(
  "/staff/:id",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    try {
      const staff = await User.findOneAndDelete({
        _id: req.params.id,
        role: "staff"
      });

      if (!staff) {
        return res.status(404).json({
          status: "error",
          message: "Staff member not found"
        });
      }

      return res.json({
        status: "success",
        message: "Staff deleted successfully"
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Failed to delete staff: " + error.message
      });
    }
  }
);

// =====================================================
// GET /api/admin/requests
// =====================================================

router.get(
  "/requests",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    try {
      const complaints = await Complaint.find()
        .sort({ created_at: -1 });

      return res.json({
        status: "success",
        data: complaints
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message:
          "Failed to load complaints: " +
          error.message
      });
    }
  }
);


// =====================================================
// PUT /api/admin/requests/:id/assign
// =====================================================

router.put(
  "/requests/:id/assign",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    try {
      const { staffId } = req.body;

      const complaint = await Complaint.findById(
        req.params.id
      );

      if (!complaint) {
        return res.status(404).json({
          status: "error",
          message: "Complaint not found"
        });
      }

      const staff = await User.findOne({
        _id: staffId,
        role: "staff"
      });

      if (!staff) {
        return res.status(404).json({
          status: "error",
          message: "Staff member not found"
        });
      }

      complaint.assigned_staff_id = staff._id;
      complaint.assigned_staff_name = staff.name;

      await complaint.save();

      return res.json({
        status: "success",
        message: "Complaint assigned successfully",
        data: complaint
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message:
          "Failed to assign complaint: " +
          error.message
      });
    }
  }
);


// =====================================================
// PUT /api/admin/requests/:id/status
// =====================================================

router.put(
  "/requests/:id/status",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    try {
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

      const complaint = await Complaint.findById(
        req.params.id
      );

      if (!complaint) {
        return res.status(404).json({
          status: "error",
          message: "Complaint not found"
        });
      }

      complaint.status = status;

      await complaint.save();

      return res.json({
        status: "success",
        message: "Complaint status updated",
        data: complaint
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message:
          "Failed to update complaint: " +
          error.message
      });
    }
  }
);

// =====================================================
// GET /api/admin/notices
// =====================================================

router.get(
  "/notices",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    try {
      const notices = await Notice.find()
        .sort({ created_at: -1 });

      return res.json({
        status: "success",
        data: notices
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message:
          "Failed to load notices: " +
          error.message
      });
    }
  }
);


// =====================================================
// POST /api/admin/notices
// =====================================================

router.post(
  "/notices",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    try {
      const {
        title,
        message,
        category
      } = req.body;

      if (!title || !message) {
        return res.status(400).json({
          status: "error",
          message: "Title and message are required"
        });
      }

      const notice = await Notice.create({
        title: title.trim(),
        message: message.trim(),
        category: category || "General",
        created_by: req.user.id
      });

      return res.status(201).json({
        status: "success",
        message: "Notice created successfully",
        data: notice
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message:
          "Failed to create notice: " +
          error.message
      });
    }
  }
);


// =====================================================
// DELETE /api/admin/notices/:id
// =====================================================

router.delete(
  "/notices/:id",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    try {
      const notice = await Notice.findByIdAndDelete(
        req.params.id
      );

      if (!notice) {
        return res.status(404).json({
          status: "error",
          message: "Notice not found"
        });
      }

      return res.json({
        status: "success",
        message: "Notice deleted successfully"
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message:
          "Failed to delete notice: " +
          error.message
      });
    }
  }
);

// =====================================================
// GET /api/admin/categories
// =====================================================

router.get(
  "/categories",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    try {
      const categories = await Category.find()
        .sort({ name: 1 });

      return res.json({
        status: "success",
        data: categories
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message:
          "Failed to load categories: " +
          error.message
      });
    }
  }
);


// =====================================================
// POST /api/admin/categories
// =====================================================

router.post(
  "/categories",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    try {
      const {
        name,
        description
      } = req.body;

      if (!name) {
        return res.status(400).json({
          status: "error",
          message: "Category name is required"
        });
      }

      const existing = await Category.findOne({
        name: name.trim()
      });

      if (existing) {
        return res.status(400).json({
          status: "error",
          message: "Category already exists"
        });
      }

      const category = await Category.create({
        name: name.trim(),
        description: description || ""
      });

      return res.status(201).json({
        status: "success",
        message: "Category created successfully",
        data: category
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message:
          "Failed to create category: " +
          error.message
      });
    }
  }
);


// =====================================================
// DELETE /api/admin/categories/:id
// =====================================================

router.delete(
  "/categories/:id",
  requireAuth,
  requireRole("admin"),
  async (req, res) => {
    try {
      const category =
        await Category.findByIdAndDelete(
          req.params.id
        );

      if (!category) {
        return res.status(404).json({
          status: "error",
          message: "Category not found"
        });
      }

      return res.json({
        status: "success",
        message: "Category deleted successfully"
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message:
          "Failed to delete category: " +
          error.message
      });
    }
  }
);

export default router;