const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware.js')

const multer = require("multer");
const { storage } = require("../config/cloudConfig");

const upload = multer({ storage });



// GET all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADD product (for testing)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    // ✅ Get Cloudinary image URL
    const imageUrl = req.file ? req.file.path : "";

    // ✅ Create product with image URL
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      originalPrice: req.body.originalPrice,
      category: req.body.category,
      rating: req.body.rating,
      image: imageUrl, // ✅ IMPORTANT FIX
    });

    await product.save();

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding product" });
  }
});

module.exports = router;