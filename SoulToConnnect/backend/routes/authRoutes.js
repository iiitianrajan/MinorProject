const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const rateLimit  = require('express-rate-limit')
const authMiddleware = require('../middleware/authMiddleware');

const JWT_SECRET = process.env.JWT_SECRET;
// console.log(JWT_SECRET)

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many login attempts. Try again after 10 minutes."
    });
  }
});



// =======================
// 🔐 SIGNUP
// =======================
router.post('/signup', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      gender,           // ✅ ADDED
      dateOfBirth,      // ✅ ADDED
      timeOfBirth,      // ✅ ADDED
      placeOfBirth      // ✅ ADDED
    } = req.body;

    // ✅ UPDATED VALIDATION
    if (!name || (!email && !phone) || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, password and email/phone required"
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 🔥 UPDATED USER CREATE
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,

      gender: gender || "",                 // ✅ ADDED
      dateOfBirth: dateOfBirth || null,     // ✅ ADDED
      timeOfBirth: timeOfBirth || "",       // ✅ ADDED
      placeOfBirth: placeOfBirth || "",     // ✅ ADDED

      walletBalance: 0,                     // ✅ ADDED (default)
      role: "user",                         // ✅ ADDED
      isVerified: false                     // ✅ ADDED
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "Signup successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// =======================
// 🔐 LOGIN
// =======================
router.post('/login',loginLimiter,  async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    const user = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password || "`);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
    // console.log(JWT_SECRET)

    res.json({
      success: true,
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// =======================
// 👤 GET PROFILE (Protected)
// =======================

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


// ✅ GET ALL ASTROLOGERS (Public)
router.get('/',authMiddleware, async (req, res) => {
  try {
    const users = await User.find()
      

    res.json(users);

  } catch (error) {
    console.error("❌ FETCH ERROR:", error);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
