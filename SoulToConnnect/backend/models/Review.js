const mongoose  = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Astrologer", // or Product / Post (your case: Astrologer)
      required: true
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },

    reviewText: {
      type: String,
      trim: true,
      maxlength: 1000
    },

    // 👍 optional (for future)
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    // 🚩 optional (report abuse)
    isReported: {
      type: Boolean,
      default: false
    }

  },
  {
    timestamps: true // adds createdAt & updatedAt
  }
);

// 🔒 Prevent duplicate reviews (1 user → 1 astrologer)
reviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports =   mongoose.model("Review", reviewSchema);
 