import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// 🔮 Zodiac Logic (same)
function getZodiac(day, month) {
  day = Number(day);
  month = Number(month);

  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
  if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn";
  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
  return "Pisces";
}

// 🔥 Dynamic Score
function getScore(z1, z2) {
  if (z1 === z2) return 30 + Math.floor(Math.random() * 6);
  return 15 + Math.floor(Math.random() * 15);
}

// 🤖 AI-like breakdown
function generateBreakdown(score) {
  return {
    love: score > 25 ? "Strong emotional bonding ❤️" : "Needs understanding 🙂",
    career: score > 20 ? "Supportive growth 💼" : "Different career paths ⚠️",
    health: score > 18 ? "Balanced energy 🧘" : "Requires attention ⚠️",
  };
}

export default function MatchResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <button onClick={()=>navigate("/match")}>Go Back</button>;

  const boyZodiac = getZodiac(state.boy.day, state.boy.month);
  const girlZodiac = getZodiac(state.girl.day, state.girl.month);

  const score = getScore(boyZodiac, girlZodiac);
  const breakdown = generateBreakdown(score);

  const percent = (score / 36) * 100;

  const resultText =
    score > 28
      ? "Excellent Match ❤️"
      : score > 18
      ? "Good Match 🙂"
      : "Average Match ⚠️";

  return (
    <div className="bg-gradient-to-br from-[#f8f9fa] to-[#eef2f7] min-h-screen p-8">

      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl">

        {/* 🔥 HEADER */}
        <h1 className="text-3xl font-black text-center mb-6">
          💑 Compatibility Result
        </h1>

        {/* 👤 USERS */}
        <div className="text-center mb-6">
          <p className="text-lg">👦 {state.boy.name} ({boyZodiac})</p>
          <p className="text-lg">👧 {state.girl.name} ({girlZodiac})</p>
        </div>

        {/* 🔥 CIRCLE CHART */}
        <div className="flex justify-center mb-6">
          <div className="relative w-36 h-36">

            <svg className="w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r="60"
                stroke="#eee"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="50%"
                cy="50%"
                r="60"
                stroke="#22c55e"
                strokeWidth="10"
                fill="none"
                strokeDasharray={377}
                strokeDashoffset={377 - (377 * percent) / 100}
                strokeLinecap="round"
                transform="rotate(-90 72 72)"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
              {score}/36
            </div>
          </div>
        </div>

        {/* RESULT TEXT */}
        <p className="text-center text-lg font-semibold mb-6">
          {resultText}
        </p>

        {/* 🔮 BREAKDOWN */}
        <div className="grid grid-cols-3 gap-4 text-center">

          <div className="bg-pink-50 p-4 rounded-xl">
            <h3 className="font-bold text-pink-600">❤️ Love</h3>
            <p className="text-sm mt-1">{breakdown.love}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl">
            <h3 className="font-bold text-blue-600">💼 Career</h3>
            <p className="text-sm mt-1">{breakdown.career}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl">
            <h3 className="font-bold text-green-600">🏥 Health</h3>
            <p className="text-sm mt-1">{breakdown.health}</p>
          </div>

        </div>

        {/* 🤖 AI EXPLANATION */}
        <div className="mt-6 bg-yellow-50 p-4 rounded-xl text-center">
          <p className="text-gray-700">
            This match shows {resultText.toLowerCase()}. With mutual understanding and communication,
            this relationship can grow stronger over time.
          </p>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/match")}
          className="mt-8 w-full bg-[#ffdb42] py-3 rounded-xl font-bold hover:shadow-lg transition"
        >
          Try Again
        </button>

      </div>
    </div>
  );
}