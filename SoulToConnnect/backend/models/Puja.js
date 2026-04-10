// models/Puja.js
const mongoose = require('mongoose');

const pujaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Puja name is required'],
      trim: true,
    },

    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },

    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['PROSPERITY', 'PROTECTION', 'ALIGNMENT', 'HEALING', 'LOVE', 'OTHER'],
      uppercase: true,
    },

    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },

    duration: {
      type: Number, // in minutes
      required: [true, 'Duration is required'],
      min: [1, 'Duration must be at least 1 minute'],
    },

    rating: {
      type: Number,
      default: 5.0,
      min: 1,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    image: {
      type: String,  // URL to image (Cloudinary, S3, etc.)
      default: '',
    },

    pandit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // reference to the pandit/expert user
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    // Optional: list of what's included
    includes: {
      type: [String],
      default: [],
    },

    // Optional: slot-based booking support
    availableSlots: [
      {
        date: { type: Date },
        startTime: { type: String },  // e.g. "10:00 AM"
        isBooked: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
);

// Index for faster category filtering
pujaSchema.index({ category: 1 });
pujaSchema.index({ isActive: 1 });

module.exports = mongoose.model('Puja', pujaSchema);