const mongoose = require('mongoose');

const walletTransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['credit', 'debit'], required: true },
  description: { type: String, required: true }, // e.g., 'Added to wallet', 'Consultation deduction'
  referenceId: { type: String }, // e.g., Razorpay payment ID or Consultation ID
  status: { type: String, enum: ['pending', 'success', 'failed'], default: 'success' }
}, { timestamps: true });

module.exports = mongoose.model('WalletTransaction', walletTransactionSchema);
