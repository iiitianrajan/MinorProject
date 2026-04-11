const express = require("express`);
const router = express.Router();

const { createOrder } = require("../controllers/paymentController`);
const verifySignature = require("../utils/verifySignature`);
const authMiddleware = require("../middleware/authMiddleware`);

router.post("/create-order", authMiddleware,createOrder);

router.post("/verify-payment",authMiddleware, (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const isValid = verifySignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  );

  if (isValid) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;