// routes/pujaRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllPujas,
  getPujaById,
  createPuja,
  updatePuja,
  deletePuja,
} = require('../controllers/PujaController');

// Bring in your existing auth + admin middleware
// const { protect, adminOnly } = require('../middleware/authMiddleware');
const  authMiddleware  = require('../middleware/authMiddleware');


/* ─────────────────────────────────────
   PUBLIC ROUTES
───────────────────────────────────── */

router.get('/', getAllPujas);
router.get('/:id', getPujaById);

/* ─────────────────────────────────────
   ADMIN PROTECTED ROUTES
───────────────────────────────────── */

router.post('/',  createPuja);
router.put('/:id', authMiddleware, updatePuja);
router.delete('/:id', authMiddleware, deletePuja);

module.exports = router;

