const express = require('express');
const router = express.Router();

// Placeholder for Wallet Info
router.get('/balance', async (req, res) => {
  res.json({ success: true, balance: 100 });
});

// Placeholder for Add Money
router.post('/add', async (req, res) => {
  res.json({ success: true, message: 'Initiate Razorpay order' });
});

// Placeholder for Verify Payment
router.post('/verify', async (req, res) => {
  res.json({ success: true, message: 'Payment verified, wallet updated' });
});

module.exports = router;
