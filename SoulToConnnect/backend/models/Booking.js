// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: [true, 'User is required'],
    },

    puja: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'Puja',
      required: [true, 'Puja is required'],
    },

    // Snapshot of the booked slot (denormalised for fast reads)
    slot: {
      slotId:    { type: mongoose.Schema.Types.ObjectId, required: true },
      date:      { type: Date,   required: true },
      startTime: { type: String, required: true },
    },

    // Snapshot of the puja location at booking time
    location: {
      city:    String,
      state:   String,
      address: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },

    // Booker's details
    name:           { type: String, required: [true, 'Name is required'], trim: true },
    phone:          { type: String, required: [true, 'Phone is required'], trim: true },
    specialRequest: { type: String, default: '', trim: true },

    status: {
      type:    String,
      enum:    ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'],
      default: 'CONFIRMED',
    },

    // Payment placeholder — extend when integrating real gateway
    payment: {
      status:        { type: String, enum: ['PENDING', 'PAID', 'FAILED'], default: 'PENDING' },
      transactionId: { type: String, default: '' },
      amount:        { type: Number, default: 0 },
      method:        { type: String, default: 'OFFLINE' },
    },

    notificationSent: {
      type:    Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.index({ user:        1, 'slot.date': -1 });
bookingSchema.index({ puja:        1 });
bookingSchema.index({ 'slot.date': 1 });

module.exports = mongoose.model('Booking', bookingSchema);