const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // console.log("KEY:", process.env.OPENROUTER_API_KEY); // debug

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an Indian astrologer. Reply in short Hinglish with mystical tone."
          },
          {
            role: "user",
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "${import.meta.env.VITE_API_URL}",
          "X-Title": "Astro App"
        }
      }
    );

    // console.log("🧠 AI RESPONSE:", response.data);

    const reply =
      response.data?.choices?.[0]?.message?.content ||
      "⚠️ No AI response";

    res.json({ reply });

  } catch (error) {
    console.error("❌ AXIOS ERROR:", error.response?.data || error.message);

    res.json({
      reply: "🔮 Energy unclear... try again"
    });
  }
});

module.exports = router;