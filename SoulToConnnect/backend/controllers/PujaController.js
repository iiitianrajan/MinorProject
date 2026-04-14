// controllers/pujaController.js
const Puja    = require('../models/Puja');
const Booking = require('../models/Booking');

/* ─────────────────────────────────────
   GET /api/pujas
   Public — list all active pujas
   Optional query:
     ?category=PROSPERITY
     &search=lak
     &city=Mumbai
     &availableOnly=true
───────────────────────────────────── */
const getAllPujas = async (req, res) => {
  try {
    const { category, search, city, availableOnly } = req.query;

    const filter = { isActive: true };

    if (category && category !== 'ALL') {
      filter.category = category.toUpperCase();
    }

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    if (city) {
      filter['location.city'] = { $regex: city, $options: 'i' };
    }

    // Only show pujas that have at least one unbooked future slot
    if (availableOnly === 'true') {
      filter['availableSlots'] = {
        $elemMatch: {
          isBooked: false,
          date:     { $gte: new Date() },
        },
      };
    }

    const pujas = await Puja.find(filter)
      .populate('pandit', 'name avatar rating')
      .sort({ createdAt: -1 });

    res.status(200).json(pujas);
  } catch (error) {
    console.error('getAllPujas error:', error);
    res.status(500).json({ message: 'Server error fetching pujas' });
  }
};

/* ─────────────────────────────────────
   GET /api/pujas/:id
   Public — single puja detail
───────────────────────────────────── */
const getPujaById = async (req, res) => {
  try {
    const puja = await Puja.findById(req.params.id)
      .populate('pandit', 'name avatar rating');

    if (!puja) {
      return res.status(404).json({ message: 'Puja not found' });
    }

    res.status(200).json(puja);
  } catch (error) {
    console.error('getPujaById error:', error);
    res.status(500).json({ message: 'Server error fetching puja' });
  }
};

/* ─────────────────────────────────────
   POST /api/pujas
   Pandit or Admin only — create a puja
   Accepts multipart/form-data (multer + Cloudinary)
───────────────────────────────────── */
const createPuja = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      duration,
      pandit,
      isActive,
      includes,
      availableSlots,
      // location fields from FormData
      locationCity,
      locationState,
      locationAddress,
      locationLat,
      locationLng,
    } = req.body;

    const isActiveBool = isActive === 'true' || isActive === true;

    let parsedIncludes = [];
    if (includes) {
      try { parsedIncludes = JSON.parse(includes); }
      catch { return res.status(400).json({ message: 'Invalid includes format' }); }
    }

    let parsedSlots = [];
    if (availableSlots) {
      try { parsedSlots = JSON.parse(availableSlots); }
      catch { return res.status(400).json({ message: 'Invalid availableSlots format' }); }
    }

    const image = req.file ? req.file.path : '';

    // Build location object (only if any field was supplied)
    const location = {};
    if (locationCity)    location.city    = locationCity.trim();
    if (locationState)   location.state   = locationState.trim();
    if (locationAddress) location.address = locationAddress.trim();
    if (locationLat && locationLng) {
      location.coordinates = {
        lat: parseFloat(locationLat),
        lng: parseFloat(locationLng),
      };
    }

    const pujaData = {
      name:           name?.trim(),
      description:    description?.trim(),
      category,
      price:          Number(price),
      duration:       Number(duration),
      image,
      isActive:       isActiveBool,
      includes:       parsedIncludes,
      availableSlots: parsedSlots,
      location,
    };

    // Assign pandit — default to the logged-in pandit if none supplied
    const panditId = pandit || (req.user?.role === 'pandit' ? req.user._id : null);
    if (panditId) pujaData.pandit = panditId;

    const puja = await Puja.create(pujaData);

    res.status(201).json({ message: 'Puja created successfully', puja });
  } catch (error) {
    console.error('createPuja error:', error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error creating puja' });
  }
};

/* ─────────────────────────────────────
   PUT /api/pujas/:id
   Pandit (owner) or Admin — update puja
───────────────────────────────────── */
const updatePuja = async (req, res) => {
  try {
    const puja = await Puja.findById(req.params.id);
    if (!puja) return res.status(404).json({ message: 'Puja not found' });

    // Pandit can only update their own puja
    if (
      req.user.role === 'pandit' &&
      puja.pandit?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorised to update this puja' });
    }

    const allowedFields = [
      'name', 'description', 'category', 'price', 'duration',
      'isActive', 'includes', 'availableSlots', 'location',
    ];

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) puja[field] = req.body[field];
    });

    if (req.file) puja.image = req.file.path;

    await puja.save();
    res.status(200).json({ message: 'Puja updated successfully', puja });
  } catch (error) {
    console.error('updatePuja error:', error);
    res.status(500).json({ message: 'Server error updating puja' });
  }
};

/* ─────────────────────────────────────
   DELETE /api/pujas/:id
   Soft delete — only if NO active bookings
   Admin can delete any; Pandit only own
───────────────────────────────────── */
const deletePuja = async (req, res) => {
  try {
    const puja = await Puja.findById(req.params.id);
    if (!puja) return res.status(404).json({ message: 'Puja not found' });

    // Pandit authorisation check
    if (
      req.user.role === 'pandit' &&
      puja.pandit?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: 'Not authorised to delete this puja' });
    }

    // ✅ Block deletion if active bookings exist
    const activeBookings = await Booking.countDocuments({
      puja:   puja._id,
      status: { $in: ['PENDING', 'CONFIRMED'] },
    });

    if (activeBookings > 0) {
      return res.status(400).json({
        message: `Cannot delete — ${activeBookings} active booking(s) exist for this puja`,
      });
    }

    await Puja.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });

    res.status(200).json({ message: 'Puja removed successfully' });
  } catch (error) {
    console.error('deletePuja error:', error);
    res.status(500).json({ message: 'Server error deleting puja' });
  }
};

module.exports = {
  getAllPujas,
  getPujaById,
  createPuja,
  updatePuja,
  deletePuja,
};