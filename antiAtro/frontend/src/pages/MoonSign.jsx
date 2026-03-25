import React, { useState } from "react";

const zodiacInfo = {
  Aries: "Bold, energetic and confident 🔥",
  Taurus: "Stable, loyal and grounded 🌿",
  Gemini: "Curious and expressive 🌬️",
  Cancer: "Emotional and caring 🌊",
  Leo: "Confident and charismatic 🔥",
  Virgo: "Practical and detail-oriented 🌿",
  Libra: "Balanced and charming 🌬️",
  Scorpio: "Intense and passionate 🌊",
  Sagittarius: "Adventurous and optimistic 🔥",
  Capricorn: "Disciplined and responsible 🌿",
  Aquarius: "Innovative and independent 🌬️",
  Pisces: "Creative and emotional 🌊",
};

function getMoonSign(day, month) {
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

export default function MoonSign() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [sign, setSign] = useState("");

  const handleCalculate = () => {
    const result = getMoonSign(day, month);
    setSign(result);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center text-white p-6">

      <h1 className="text-4xl font-black mb-6">🌙 Moon Sign Calculator</h1>

      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-xl text-center">

        <div className="flex gap-3 mb-4 justify-center">
          <input placeholder="DD" onChange={(e)=>setDay(e.target.value)} className="p-3 w-20 text-black rounded"/>
          <input placeholder="MM" onChange={(e)=>setMonth(e.target.value)} className="p-3 w-20 text-black rounded"/>
        </div>

        <button
          onClick={handleCalculate}
          className="bg-white text-black px-6 py-3 rounded-xl font-bold"
        >
          Find Moon Sign
        </button>

        {sign && (
          <div className="mt-6">

            <h2 className="text-2xl font-bold">
              🌙 {sign}
            </h2>

            <p className="mt-2 text-gray-300">
              {zodiacInfo[sign]}
            </p>

          </div>
        )}

      </div>
    </div>
  );
}