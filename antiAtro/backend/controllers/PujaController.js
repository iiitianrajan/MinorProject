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
───────────────────────────────────── */
const createPuja = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      duration,
      image,
      pandit,
      includes,
      availableSlots,
    } = req.body;

    const puja = await Puja.create({
      name,
      description,
      category,
      price,
      duration,
      image,
      pandit,
      includes,
      availableSlots,
    });

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
   Admin only — update a puja
───────────────────────────────────── */
const updatePuja = async (req, res) => {
  try {
    const puja = await Puja.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );

    if (!puja) {
      return res.status(404).json({ message: 'Puja not found' });
    }

    res.status(200).json({ message: 'Puja updated successfully', puja });
  } catch (error) {
    console.error('updatePuja error:', error);
    res.status(500).json({ message: 'Server error updating puja' });
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
  updatePuja,
  deletePuja,
};