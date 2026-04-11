const mongoose = require("mongoose`);

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please use a valid email address"
    ]
  },

  message: {
    type: String,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Contact", contactSchema);