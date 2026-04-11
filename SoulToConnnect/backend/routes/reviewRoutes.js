const express = require("express`);
const router = express.Router();
const mongoose = require("mongoose`);

const Review = require("../models/Review`);
const Astrologer = require("../models/Astrologer`);
const authMiddleware = require("../middleware/authMiddleware`);


// =======================
// ⭐ CREATE REVIEW
// =======================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { productId, rating, reviewText } = req.body;
    const userId = req.user.id;

    console.log("BODY:", req.body);

    // validation
    if (!productId || !rating) {
      return res.status(400).json({
        success: false,
        message: "ProductId and rating required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid productId"
      });
    }

    // prevent duplicate
    const existing = await Review.findOne({ userId, productId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this astrologer"
      });
    }

    // create
    const review = await Review.create({
      userId,
      productId,
      rating,
      reviewText
    });

    // update avg rating
    await updateAstrologerRating(productId);

    res.status(201).json({
      success: true,
      review
    });

  } catch (error) {

    // duplicate key fallback
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "You already reviewed this astrologer"
      });
    }

    console.error("❌ REVIEW ERROR:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


// =======================
// 📜 GET REVIEWS
// =======================
router.get("/:id", async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.id })
      .populate("userId", "name profilePicture`)
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (error) {
    console.error("❌ FETCH ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});


// =======================
// 🔥 UPDATE RATING
// =======================
const updateAstrologerRating = async (productId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(productId)) return;

    const stats = await Review.aggregate([
      { $match: { productId: new mongoose.Types.ObjectId(productId) } },
      {
        $group: {
          _id: "$productId",
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 }
        }
      }
    ]);

    if (stats.length > 0) {
      await Astrologer.findByIdAndUpdate(productId, {
        averageRating: stats[0].avgRating,
        totalReviews: stats[0].totalReviews
      });
    } else {
      await Astrologer.findByIdAndUpdate(productId, {
        averageRating: 0,
        totalReviews: 0
      });
    }

  } catch (err) {
    console.error("❌ Rating Update Error:", err);
  }
};

module.exports = router;