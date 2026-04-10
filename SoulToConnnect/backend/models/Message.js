const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  consultationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultation', required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // can be user or astrologer
  text: { type: String, required: true },
  read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);
