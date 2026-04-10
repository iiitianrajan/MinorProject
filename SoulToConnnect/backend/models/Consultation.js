const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  astrologerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Astrologer', required: true },
  type: { type: String, enum: ['chat', 'call', 'video'], required: true },
  status: { type: String, enum: ['pending', 'ongoing', 'completed', 'cancelled'], default: 'pending' },
  startTime: { type: Date },
  endTime: { type: Date },
  durationMinutes: { type: Number, default: 0 },
  costPerMinute: { type: Number, required: true },
  totalCost: { type: Number, default: 0 },
  rating: { type: Number, min: 1, max: 5 },
  review: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Consultation', consultationSchema);
