// controllers/pujaController.js
const Puja = require('../models/Puja');

/* ─────────────────────────────────────
   GET /api/pujas
   Public — list all active pujas
   Optional query: ?category=PROSPERITY&search=lak
───────────────────────────────────── */
const getAllPujas = async (req, res) => {
  try {
    const { category, search } = req.query;

    const filter = { isActive: true };

    if (category && category !== 'ALL') {
      filter.category = category.toUpperCase();
    }

    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }

    const pujas = await Puja.find(filter).sort({ createdAt: -1 });

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
    const puja = await Puja.findById(req.params.id).populate('pandit', 'name avatar rating');

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
   Admin only — create a new puja
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
      isActive,       // arrives as the string "true" or "false" from FormData
      includes,       // arrives as a JSON string  e.g.  '["FLOWERS","GHEE"]'
      availableSlots, // arrives as a JSON string  e.g.  '[{date:..., startTime:..., isBooked:false}]'
    } = req.body;

    // ✅ FIX 1: Parse the boolean that FormData sends as a string
    const isActiveBool = isActive === 'true';

    // ✅ FIX 2: Parse JSON strings that FormData cannot send as native arrays
    let parsedIncludes = [];
    if (includes) {
      try {
        parsedIncludes = JSON.parse(includes);
      } catch {
        return res.status(400).json({ message: 'Invalid includes format' });
      }
    }

    let parsedSlots = [];
    if (availableSlots) {
      try {
        parsedSlots = JSON.parse(availableSlots);
      } catch {
        return res.status(400).json({ message: 'Invalid availableSlots format' });
      }
    }

    // ✅ FIX 3: Get Cloudinary URL from multer — req.file.path is the Cloudinary secure URL
    const image = req.file ? req.file.path : '';

    // ✅ FIX 4: Only set pandit field when a real ID was sent
    // An empty string would cause a Mongoose ObjectId cast error
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
    };

    if (pandit) {
      pujaData.pandit = pandit;
    }

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
   DELETE /api/pujas/:id
   Admin only — soft delete (set isActive = false)
───────────────────────────────────── */
const deletePuja = async (req, res) => {
  try {
    const puja = await Puja.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!puja) {
      return res.status(404).json({ message: 'Puja not found' });
    }

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
  deletePuja,
};