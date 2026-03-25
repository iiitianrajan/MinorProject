import React, { useState } from "react";

export default function LoveCalculator() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState(null);

  const calculateLove = () => {
    const combined = (name1 + name2).toLowerCase();

    let score = 0;
    for (let i = 0; i < combined.length; i++) {
      score += combined.charCodeAt(i);
    }

    score = score % 101;
    setResult(score);
  };

  const percent = result;

  const getMessage = () => {
    if (result > 80) return "Soulmates ❤️";
    if (result > 60) return "Strong Connection 💖";
    if (result > 40) return "Good Match 🙂";
    return "Needs Effort ⚠️";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 flex flex-col items-center justify-center p-6">

      <h1 className="text-4xl font-black mb-6">❤️ Love Calculator</h1>

      <div className="bg-white p-6 rounded-3xl shadow-xl w-80 text-center">

        <input
          placeholder="Your Name"
          onChange={(e) => setName1(e.target.value)}
          className="w-full mb-3 p-3 border rounded-xl"
        />

        <input
          placeholder="Partner Name"
          onChange={(e) => setName2(e.target.value)}
          className="w-full mb-4 p-3 border rounded-xl"
        />

        <button
          onClick={calculateLove}
          className="bg-pink-500 text-white px-6 py-3 rounded-xl font-bold"
        >
          Calculate 💕
        </button>

        {/* RESULT */}
        {result !== null && (
          <div className="mt-6">

            {/* Circle */}
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg className="w-full h-full">
                <circle cx="50%" cy="50%" r="50" stroke="#eee" strokeWidth="10" fill="none"/>
                <circle
                  cx="50%"
                  cy="50%"
                  r="50"
                  stroke="#ec4899"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={314}
                  strokeDashoffset={314 - (314 * percent) / 100}
                  strokeLinecap="round"
                  transform="rotate(-90 64 64)"
                />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center font-bold text-xl">
                {result}%
              </div>
            </div>

            <p className="font-semibold">{getMessage()}</p>
          </div>
        )}

      </div>
    </div>
  );
}