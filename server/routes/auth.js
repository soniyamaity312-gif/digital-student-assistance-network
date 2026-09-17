import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  sameSite: 'lax',
  secure: false
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, role, department } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'All fields are required'
    });
  }

  try {
    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already registered'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: role || 'student',
      department: department || null
    });

    return res.status(201).json({
      status: 'success',
      message: 'Registration Successful',
      user: {
        id: user._id.toString(),
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Database Error: ' + error.message
    });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Email and Password required'
    });
  }

  try {
    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Check if role matches if provided
      if (role && user.role !== role) {
        return res.status(403).json({
          status: 'error',
          message: 'Access Denied for this role'
        });
      }

      const token = jwt.sign(
        {
          id: user._id.toString(),
          name: user.name,
          role: user.role,
          department: user.department || ""
        },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '30d' }
      );

      res.cookie('token', token, COOKIE_OPTIONS);

      return res.json({
        status: 'success',
        message: 'Login Successful',
        user: {
          id: user._id.toString(),
          name: user.name,
          role: user.role
        }
      });
    } else {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid Credentials'
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Database Error: ' + error.message
    });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'lax',
    secure: false
  });

  return res.json({
    status: 'success',
    message: 'Logged out successfully'
  });
});

// GET /api/auth/check-session
router.get('/check-session', requireAuth, (req, res) => {
  return res.json({
    status: 'success',
    logged_in: true,
    user: {
      id: req.user.id,
      name: req.user.name,
      role: req.user.role
    }
  });
});

export default router;
