// routes/pujaRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudConfig');

const upload = multer({ storage });

const {
   getAllPujas,
   getPujaById,
   createPuja,
   updatePuja,
   deletePuja,
} = require('../controllers/PujaController');
console.log(createPuja)

const authMiddleware  = require('../middleware/authMiddleware');
console.log(authMiddleware)

/* ─── PUBLIC ─── */
router.get('/', getAllPujas);
router.get('/:id', getPujaById);

/* ─── PANDIT / ADMIN PROTECTED ─── */
router.post('/', authMiddleware, upload.single('image'), createPuja);
router.put('/:id', authMiddleware, upload.single('image'), updatePuja);
router.delete('/:id', authMiddleware, deletePuja);

module.exports = router;