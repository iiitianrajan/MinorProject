const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { 
    type: String, 
    unique: true, 
    sparse: true,
    lowercase: true,
    trim: true
  },

  phone: { 
    type: String, 
    unique: true, 
    sparse: true,
    trim: true
  },

  password: { 
    type: String 
  },

  // ✅ FIXED FIELD
  firebaseUid: { 
    type: String, 
    unique: true, 
    sparse: true 
  },

  role: { 
    type: String, 
    enum: ['user', 'astrologer', 'admin'], 
    default: 'user' 
  },

  walletBalance: { 
    type: Number, 
    default: 0 
  },

  profilePicture: { 
    type: String, 
    default: '' 
  },

  dateOfBirth: { 
    type: Date 
  },

  timeOfBirth: { 
    type: String 
  },

  placeOfBirth: { 
    type: String 
  },

  gender: { 
    type: String 
  },

  isVerified: { 
    type: Boolean, 
    default: false 
  }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);