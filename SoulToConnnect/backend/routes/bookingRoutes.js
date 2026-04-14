// routes/bookingRoutes.js
const express = require('express');
const router  = express.Router();

const {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
  getPanditBookings,
} = require('../controllers/Bookingcontroller');

// const { protect, panditOrAdmin } = require('../middleware/authMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

/* ─── All routes require auth ─── */
router.use(authMiddleware);

router.post('/',              createBooking);     // user books a puja
router.get( '/my',            getUserBookings);   // user's own bookings
router.get( '/pandit',         getPanditBookings); // pandit dashboard
router.get( '/:id',           getBookingById);
router.patch('/:id/cancel',   cancelBooking);

module.exports = router;