// import mongoose from 'mongoose';
const mongoose = require('mongoose')

const astrologerSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  specialties: [{ 
    type: String,
    enum: ['Vedic', 'Tarot', 'Numerology', 'Palmistry']
  }],

  languages: [{ type: String, lowercase: true }],

  experienceYears: { type: Number, default: 0, min: 0 },

  rating: { type: Number, default: 0, min: 0, max: 5 },

  reviewCount: { type: Number, default: 0 },

  pricePerMinute: { type: Number, required: true, default: 15, min: 1 },

  isOnline: { type: Boolean, default: false },

  isBusy: { type: Boolean, default: false },

  kycStatus: { 
    type: String, 
    enum: ['pending', 'verified', 'rejected'], 
    default: 'pending' 
  },

  bio: { type: String, default: '' },

  profileImage: { type: String, default: 'https://i.pravatar.cc/150' }

}, { timestamps: true });

astrologerSchema.index({ isOnline: 1, rating: -1 });

const astrologer=  mongoose.model('Astrologer', astrologerSchema);

module.exports =astrologer;