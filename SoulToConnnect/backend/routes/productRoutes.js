const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware.js')

// GET all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADD product (for testing)
router.post('/',authMiddleware, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

module.exports = router;