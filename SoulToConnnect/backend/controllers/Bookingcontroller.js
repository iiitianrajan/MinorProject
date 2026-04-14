// controllers/bookingController.js
const Booking = require('../models/Booking');
const Puja    = require('../models/Puja');
const { sendBookingNotification } = require('../utils/notificationService');

const getStartOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const createBooking = async (req, res) => {
  try {
    
    const { pujaId, slotId, name, phone, specialRequest } = req.body;

    if (!pujaId || !slotId || !name || !phone) {
      return res.status(400).json({ message: 'pujaId, slotId, name and phone are required' });
    }

    // $elemMatch ensures ALL conditions apply to the SAME slot element
    const puja = await Puja.findOneAndUpdate(
      {
        _id:      pujaId,
        isActive: true,
        availableSlots: {
          $elemMatch: {
            _id:      slotId,
            isBooked: false,
            date:     { $gte: getStartOfToday() },
          },
        },
      },
      { $set: { 'availableSlots.$.isBooked': true } },
      { new: true }
    );
   

    if (!puja) {
      return res.status(409).json({
        message: 'Slot is no longer available or puja not found',
      });
    }

    const bookedSlot = puja.availableSlots.id(slotId);

    if (!bookedSlot) {
      return res.status(409).json({ message: 'Slot not found after update' });
    }

    const booking = await Booking.create({
      user:           req.user.id,
      puja:           puja._id,
      slot: {
        slotId:    bookedSlot._id,
        date:      bookedSlot.date,
        startTime: bookedSlot.startTime,
      },
      location:       puja.location || {},
      name:           name.trim(),
      phone:          phone.trim(),
      specialRequest: specialRequest?.trim() || '',
      status:         'CONFIRMED',
      payment: {
        status: 'PENDING',
        amount: puja.price,
        method: 'OFFLINE',
      },
    });

    const populated = await Booking.findById(booking._id)
      .populate('puja', 'name image price duration category location pandit')
      .populate('user', 'name email');

    sendBookingNotification({
      phone,
      name,
      pujaName:  puja.name,
      date:      bookedSlot.date,
      startTime: bookedSlot.startTime,
      bookingId: booking._id,
    }).catch(err => console.error('Notification error (non-fatal):', err));

    res.status(201).json({ message: 'Booking confirmed!', booking: populated });

  } catch (error) {
    console.error('createBooking error:', error.message);
    res.status(500).json({ message: 'Server error creating booking' });
  }
};

const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('puja', 'name image price duration category location pandit')
      .sort({ 'slot.date': -1 });

    const startOfToday = getStartOfToday();

    const upcoming = bookings.filter(
      b => new Date(b.slot.date) >= startOfToday && b.status !== 'CANCELLED'
    );
    const past = bookings.filter(
      b => new Date(b.slot.date) < startOfToday || b.status === 'CANCELLED'
    );

    res.status(200).json({ upcoming, past });
  } catch (error) {
    console.error('getUserBookings error:', error);
    res.status(500).json({ message: 'Server error fetching bookings' });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('puja', 'name image price duration category location pandit')
      .populate('user', 'name email');

    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    if (booking.user.id.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Not authorised' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error('getBookingById error:', error);
    res.status(500).json({ message: 'Server error fetching booking' });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: 'Booking not found' });

    if (booking.user.toString() !== req.user.id.toString())
      return res.status(403).json({ message: 'Not authorised' });

    if (booking.status === 'CANCELLED')
      return res.status(400).json({ message: 'Booking already cancelled' });

    await Puja.updateOne(
      { _id: booking.puja, 'availableSlots._id': booking.slot.slotId },
      { $set: { 'availableSlots.$.isBooked': false } }
    );

    booking.status = 'CANCELLED';
    await booking.save();

    res.status(200).json({ message: 'Booking cancelled', booking });

  } catch (error) {
    console.error('cancelBooking error:', error.message);
    res.status(500).json({ message: 'Server error cancelling booking' });
  }
};

const getPanditBookings = async (req, res) => {
  try {
    const panditPujas = await Puja.find({ pandit: req.user.id }).select('_id');
    const pujaIds = panditPujas.map(p => p._id);

    const bookings = await Booking.find({ puja: { $in: pujaIds } })
      .populate('puja', 'name image price category')
      .populate('user', 'name email')
      .sort({ 'slot.date': -1 });

    const startOfToday = getStartOfToday();

    const upcoming = bookings.filter(
      b => new Date(b.slot.date) >= startOfToday && b.status !== 'CANCELLED'
    );
    const past = bookings.filter(
      b => new Date(b.slot.date) < startOfToday || b.status === 'CANCELLED'
    );

    res.status(200).json({ upcoming, past });
  } catch (error) {
    console.error('getPanditBookings error:', error);
    res.status(500).json({ message: 'Server error fetching pandit bookings' });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getBookingById,
  cancelBooking,
  getPanditBookings,
};