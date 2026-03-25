const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  originalPrice: Number,
  image: String,
  category: String,
  rating: {
    type: String,
    default: 0,
  },
});

module.exports = mongoose.model('Product', productSchema);