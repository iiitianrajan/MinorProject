import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const KundliMatch = () => {
  const navigate = useNavigate();

  const [boy, setBoy] = useState({ name: "", day: "", month: "" });
  const [girl, setGirl] = useState({ name: "", day: "", month: "" });

  const handleMatch = () => {
    if (!boy.day || !girl.day) {
      alert("Fill all details");
      return;
    }

    navigate("/match-result", {
      state: { boy, girl },
    });
  };

  return (
    <div className="bg-gradient-to-br from-[#f8f9fa] to-[#eef2f7] min-h-screen py-10 font-sans">
      <div className="max-w-5xl mx-auto px-4">

        {/* 🔥 HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-800 mb-2">
            💑 Kundli Matching
          </h1>
          <p className="text-gray-500">
            Discover compatibility and relationship insights instantly
          </p>
        </div>

        {/* 🧩 CARDS */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* 👦 BOY */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition">

            <h2 className="font-bold text-lg mb-4 text-blue-600 flex items-center gap-2">
              👦 Boy Details
            </h2>

            <input
              placeholder="Enter Name"
              className="w-full mb-4 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#ffdb42]/40 transition"
              onChange={(e) => setBoy({ ...boy, name: e.target.value })}
            />

            <div className="flex gap-3">
              <input
                placeholder="DD"
                className="w-1/2 px-4 py-3 border border-gray-200 rounded-xl text-center focus:ring-2 focus:ring-[#ffdb42]/40"
                onChange={(e) =>
                  setBoy({ ...boy, day: e.target.value })
                }
              />
              <input
                placeholder="MM"
                className="w-1/2 px-4 py-3 border border-gray-200 rounded-xl text-center focus:ring-2 focus:ring-[#ffdb42]/40"
                onChange={(e) =>
                  setBoy({ ...boy, month: e.target.value })
                }
              />
            </div>
          </div>

          {/* 👧 GIRL */}
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition">

            <h2 className="font-bold text-lg mb-4 text-pink-600 flex items-center gap-2">
              👧 Girl Details
            </h2>

            <input
              placeholder="Enter Name"
              className="w-full mb-4 px-4 py-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#ffdb42]/40 transition"
              onChange={(e) => setGirl({ ...girl, name: e.target.value })}
            />

            <div className="flex gap-3">
              <input
                placeholder="DD"
                className="w-1/2 px-4 py-3 border border-gray-200 rounded-xl text-center focus:ring-2 focus:ring-[#ffdb42]/40"
                onChange={(e) =>
                  setGirl({ ...girl, day: e.target.value })
                }
              />
              <input
                placeholder="MM"
                className="w-1/2 px-4 py-3 border border-gray-200 rounded-xl text-center focus:ring-2 focus:ring-[#ffdb42]/40"
                onChange={(e) =>
                  setGirl({ ...girl, month: e.target.value })
                }
              />
            </div>
          </div>

        </div>

        {/* 🔥 BUTTON */}
        <div className="mt-10 text-center">
          <button
            onClick={handleMatch}
            className="px-10 py-4 bg-[#ffdb42] text-black rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            🔮 Match Kundli
          </button>
        </div>

      </div>
    </div>
  );
};

export default KundliMatch;