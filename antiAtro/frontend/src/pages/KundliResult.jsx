import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";

const KundliResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleDownload = () => {
    const element = document.getElementById("kundli-pdf");

    // 👉 Enable safe mode
    document.body.classList.add("pdf-mode");

    const opt = {
      margin: 0.5,
      filename: "kundli.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true
      },
      jsPDF: {
        unit: "in",
        format: "a4",
        orientation: "portrait"
      }
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        // 👉 Disable after download
        document.body.classList.remove("pdf-mode");
      });
  };

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => navigate("/kundli")}
          className="bg-yellow-400 px-6 py-3 rounded-lg font-bold"
        >
          Go Back to Kundli
        </button>
      </div>
    );
  }

  const { name, gender, day, month, year, place, zodiac } = state;

  // 🔮 Dynamic Predictions
  const predictions = {
    Aries: {
      love: "You are passionate and energetic in relationships.",
      career: "Leadership skills will bring success.",
      health: "Stay active and maintain routine.",
    },
    Taurus: {
      love: "You value loyalty and stability in love.",
      career: "Hard work will pay off soon.",
      health: "Focus on balanced diet.",
    },
    Gemini: {
      love: "Communication is your strength in relationships.",
      career: "Creative ideas will shine.",
      health: "Avoid overthinking.",
    },
    Cancer: {
      love: "You are emotional and deeply caring.",
      career: "Consistency will help growth.",
      health: "Take care of mental health.",
    },
    Leo: {
      love: "You are confident and romantic.",
      career: "Great opportunities are coming.",
      health: "Maintain discipline.",
    },
    Virgo: {
      love: "You are practical and supportive.",
      career: "Attention to detail brings success.",
      health: "Avoid stress.",
    },
    Libra: {
      love: "You seek balance and harmony.",
      career: "Teamwork will help growth.",
      health: "Stay calm.",
    },
    Scorpio: {
      love: "Deep and intense emotions define you.",
      career: "Focus and determination are key.",
      health: "Manage emotional stress.",
    },
    Sagittarius: {
      love: "You love freedom and adventure.",
      career: "Explore new opportunities.",
      health: "Stay active.",
    },
    Capricorn: {
      love: "You are loyal and responsible.",
      career: "Discipline will lead to success.",
      health: "Avoid overwork.",
    },
    Aquarius: {
      love: "You value independence.",
      career: "Innovative thinking helps growth.",
      health: "Take breaks.",
    },
    Pisces: {
      love: "You are emotional and dreamy.",
      career: "Creativity will guide you.",
      health: "Stay grounded.",
    },
  };

  const result = predictions[zodiac];

  return (
    <div id="kundli-pdf">
      <div className="bg-[#f8f9fa] min-h-screen py-8 font-sans">
        <div className="max-w-4xl mx-auto px-4">

          {/* 🔥 HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-gray-800 mb-2">
              🔮 Your Kundli Result
            </h1>
            <p className="text-gray-500">
              Personalized insights based on your birth details
            </p>
          </div>

          {/* 🧾 BASIC INFO */}
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Basic Details</h2>

            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <p><strong>Name:</strong> {name}</p>
              <p><strong>Gender:</strong> {gender}</p>
              <p><strong>DOB:</strong> {day}/{month}/{year}</p>
              <p><strong>Place:</strong> {place}</p>
              <p><strong>Zodiac:</strong> ♈ {zodiac}</p>
            </div>
          </div>

          {/* 🔮 PREDICTIONS */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* LOVE */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="font-bold text-pink-500 mb-2">❤️ Love</h3>
              <p className="text-gray-600">{result?.love}</p>
            </div>

            {/* CAREER */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="font-bold text-blue-500 mb-2">💼 Career</h3>
              <p className="text-gray-600">{result?.career}</p>
            </div>

            {/* HEALTH */}
            <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="font-bold text-green-500 mb-2">🏥 Health</h3>
              <p className="text-gray-600">{result?.health}</p>
            </div>

          </div>

          {/* 🔁 BACK BUTTON */}
          <div className="flex justify-center items-center gap-2">
            <div className="text-center mt-10">
              <button
                onClick={() => navigate("/kundli")}
                className="bg-[#ffdb42] px-6 py-3 rounded-lg font-bold shadow hover:shadow-lg"
              >
                Generate Another Kundli
              </button>
            </div>

            <div className="text-center mt-10">
              <button
                onClick={handleDownload}
                className="bg-[#ffdb42] px-6 py-3 rounded-lg font-bold shadow hover:shadow-lg"
              >
                📄 Download PDF
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default KundliResult;