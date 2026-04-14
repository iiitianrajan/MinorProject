// models/Puja.js
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema(
  {
    date:      { type: Date,    required: true },
    startTime: { type: String,  required: true }, // e.g. "10:00 AM"
    isBooked:  { type: Boolean, default: false },
  },
  { _id: true }
);

const locationSchema = new mongoose.Schema(
  {
    city:    { type: String, trim: true },
    state:   { type: String, trim: true },
    address: { type: String, trim: true },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  { _id: false }
);

const pujaSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: [true, 'Puja name is required'],
      trim:     true,
    },

    description: {
      type:     String,
      required: [true, 'Description is required'],
      trim:     true,
    },

    category: {
      type:      String,
      required:  [true, 'Category is required'],
      enum:      ['PROSPERITY', 'PROTECTION', 'ALIGNMENT', 'HEALING', 'LOVE', 'OTHER'],
      uppercase: true,
    },

    price: {
      type:     Number,
      required: [true, 'Price is required'],
      min:      [0, 'Price cannot be negative'],
    },

    duration: {
      type:     Number, // in minutes
      required: [true, 'Duration is required'],
      min:      [1, 'Duration must be at least 1 minute'],
    },

    rating: {
      type:    Number,
      default: 5.0,
      min:     1,
      max:     5,
    },

    totalReviews: {
      type:    Number,
      default: 0,
    },

    image: {
      type:    String,
      default: '',
    },

    pandit: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'User',
    },

    isActive: {
      type:    Boolean,
      default: true,
    },

    includes: {
      type:    [String],
      default: [],
    },

    availableSlots: {
      type:    [slotSchema],
      default: [],
    },

    // ✅ NEW: Location field
    location: {
      type:    locationSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster filtering
pujaSchema.index({ category:        1 });
pujaSchema.index({ isActive:        1 });
pujaSchema.index({ 'location.city': 1 });
pujaSchema.index({ pandit:          1 });

module.exports = mongoose.model('Puja', pujaSchema);