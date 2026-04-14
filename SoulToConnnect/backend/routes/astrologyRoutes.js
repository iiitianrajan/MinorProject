const express = require('express');
const router = express.Router();
const Astrologer = require('../models/Astrologer');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require("multer");
const { storage } = require("../config/cloudConfig");

const upload = multer({ storage });

// ✅ CREATE ASTROLOGER (Protected)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const {
      fullName,
      headline,
      bio,
      experienceYears,
      pricePerMinute,
      availability,
      specialties,
      languages,
    } = req.body;
    

    const userId = req.user.id;
    // console.log('userId:', userId);

    

    if (!pricePerMinute) {
      return res.status(400).json({ error: 'pricePerMinute is required' });
    }

    // ← use cloudinary URL from uploaded file, fallback to default avatar
    const profileImage = req.file?.path || 'https://i.pravatar.cc/150';

    // ← FormData sends arrays as comma-separated strings, so parse them back
    const parsedSpecialties = typeof specialties === 'string'
      ? specialties.split(',').map(s => s.trim()).filter(Boolean)
      : Array.isArray(specialties) ? specialties : [];

    const parsedLanguages = typeof languages === 'string'
      ? languages.split(',').map(l => l.trim()).filter(Boolean)
      : Array.isArray(languages) ? languages : [];

    const astrologer = new Astrologer({
      fullName,
      userId,
      bio,
      profileImage,
      experienceYears,
      pricePerMinute,
      specialties: parsedSpecialties,
      languages:   parsedLanguages,
     
    });

    await astrologer.save();

    res.status(201).json({
      message: 'Astrologer created successfully',
      astrologer,
    });

  } catch (error) {
    console.error('❌ CREATE ERROR:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// ✅ GET ALL ASTROLOGERS (Public)
router.get('/', async (req, res) => {
  try {
    const astrologers = await Astrologer.find()
      .populate('userId', 'name email')
      .sort({ isOnline: -1, rating: -1 });

    res.json(astrologers);

  } catch (error) {
    console.error('❌ FETCH ERROR:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// ✅ GET SINGLE ASTROLOGER (Public)
router.get('/:id', async (req, res) => {
  try {
    const astrologer = await Astrologer.findById(req.params.id)
      .populate('userId', 'name email');

    if (!astrologer) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(astrologer);

  } catch (error) {
    console.error('❌ GET ONE ERROR:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// ✅ UPDATE ASTROLOGER (Protected) — supports image re-upload too
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const astrologer = await Astrologer.findById(req.params.id);

    if (!astrologer) {
      return res.status(404).json({ error: 'Not found' });
    }

    // 🔒 only owner can update
    if (astrologer.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // if a new image was uploaded, use its cloudinary URL
    if (req.file?.path) {
      req.body.profileImage = req.file.path;
    }

    // parse arrays if they come as comma-separated strings
    if (typeof req.body.specialties === 'string') {
      req.body.specialties = req.body.specialties.split(',').map(s => s.trim()).filter(Boolean);
    }
    if (typeof req.body.languages === 'string') {
      req.body.languages = req.body.languages.split(',').map(l => l.trim()).filter(Boolean);
    }

    const updated = await Astrologer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (error) {
    console.error('❌ UPDATE ERROR:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


// ✅ DELETE ASTROLOGER (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const astrologer = await Astrologer.findById(req.params.id);

    if (!astrologer) {
      return res.status(404).json({ error: 'Not found' });
    }

    // 🔒 only owner can delete
    if (astrologer.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Astrologer.findByIdAndDelete(req.params.id);

    res.json({ message: 'Deleted successfully' });

  } catch (error) {
    console.error('❌ DELETE ERROR:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;