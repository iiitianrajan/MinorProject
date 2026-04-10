const express = require('express');
const router = express.Router();
const Astrologer = require('../models/Astrologer');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ CREATE ASTROLOGER (Protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const {
      specialties,
      languages,
      experienceYears,
      pricePerMinute,
      bio,
      profileImage
    } = req.body;

    // ✅ userId from token (VERY IMPORTANT)
    const userId = req.user.id;
    console.log(userId)

    if (!pricePerMinute) {
      return res.status(400).json({ error: 'pricePerMinute is required' });
    }

    const astrologer = new Astrologer({
      userId,
      specialties,
      languages,
      experienceYears,
      pricePerMinute,
      bio,
      profileImage
    });

    await astrologer.save();

    res.status(201).json({
      message: 'Astrologer created successfully',
      astrologer
    });

  } catch (error) {
    console.error("❌ CREATE ERROR:", error);
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
    console.error("❌ FETCH ERROR:", error);
    res.status(500).json({ error: 'Server error' });
  }
});


// ✅ GET SINGLE ASTROLOGER
router.get('/:id', async (req, res) => {
  try {
    const astrologer = await Astrologer.findById(req.params.id)
      .populate('userId', 'name email');

    if (!astrologer) {
      return res.status(404).json({ error: 'Not found' });
    }

    res.json(astrologer);

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


// ✅ UPDATE ASTROLOGER (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const astrologer = await Astrologer.findById(req.params.id);

    if (!astrologer) {
      return res.status(404).json({ error: 'Not found' });
    }

    // 🔒 Only owner can update
    if (astrologer.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updated = await Astrologer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (error) {
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

    // 🔒 Only owner can delete
    if (astrologer.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Astrologer.findByIdAndDelete(req.params.id);

    res.json({ message: 'Deleted successfully' });

  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;