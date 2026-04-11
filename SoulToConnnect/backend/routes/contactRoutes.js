const express = require("express`);
const router = express.Router();
const Contact = require("../models/contact`);
const nodemailer = require("nodemailer`);

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ✅ Save to DB
    const newMsg = await Contact.create({ name, email, message });

    // // ✅ Send email
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "iiitianrajan@gmail.com",
    //     pass: "your_app_password"
    //   }
    // });

    // await transporter.sendMail({
    //   from: email,
    //   to: "your_email@gmail.com",
    //   subject: "New Contact Message",
    //   text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    // });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed" });
  }
});

module.exports = router;