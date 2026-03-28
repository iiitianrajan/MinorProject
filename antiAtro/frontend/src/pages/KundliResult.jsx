import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { motion } from "framer-motion";
import { Sparkles, Heart, Briefcase, Activity, Download, RefreshCw, User, MapPin, Calendar, Star } from "lucide-react";

const KundliResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleDownload = () => {
    const element = document.getElementById("kundli-pdf");
    document.body.classList.add("pdf-mode");
    const opt = {
      margin: 0.5,
      filename: "kundli.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    };
    html2pdf().set(opt).from(element).save().then(() => {
      document.body.classList.remove("pdf-mode");
    });
  };

  if (!state) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background: "radial-gradient(ellipse at 40% 30%, rgba(251,191,36,0.14) 0%, rgba(168,85,247,0.11) 55%, rgba(236,72,153,0.10) 100%), #f9f7ff",
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div
            className="text-6xl mb-4 w-24 h-24 mx-auto rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg,rgba(251,191,36,0.18),rgba(168,85,247,0.18))",
              boxShadow: "0 0 40px rgba(168,85,247,0.2)",
            }}
          >
            🔮
          </div>
          <p className="text-gray-400 mb-6 text-sm">No kundli data found</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/kundli")}
            className="px-8 py-3 rounded-2xl font-bold text-white text-sm"
            style={{
              background: "linear-gradient(135deg,#fbbf24,#a855f7)",
              boxShadow: "0 8px 24px rgba(168,85,247,0.35)",
            }}
          >
            Go Back to Kundli
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const { name, gender, day, month, year, place, zodiac } = state;

  const predictions = {
    Aries: { love: "You are passionate and energetic in relationships.", career: "Leadership skills will bring success.", health: "Stay active and maintain routine." },
    Taurus: { love: "You value loyalty and stability in love.", career: "Hard work will pay off soon.", health: "Focus on balanced diet." },
    Gemini: { love: "Communication is your strength in relationships.", career: "Creative ideas will shine.", health: "Avoid overthinking." },
    Cancer: { love: "You are emotional and deeply caring.", career: "Consistency will help growth.", health: "Take care of mental health." },
    Leo: { love: "You are confident and romantic.", career: "Great opportunities are coming.", health: "Maintain discipline." },
    Virgo: { love: "You are practical and supportive.", career: "Attention to detail brings success.", health: "Avoid stress." },
    Libra: { love: "You seek balance and harmony.", career: "Teamwork will help growth.", health: "Stay calm." },
    Scorpio: { love: "Deep and intense emotions define you.", career: "Focus and determination are key.", health: "Manage emotional stress." },
    Sagittarius: { love: "You love freedom and adventure.", career: "Explore new opportunities.", health: "Stay active." },
    Capricorn: { love: "You are loyal and responsible.", career: "Discipline will lead to success.", health: "Avoid overwork." },
    Aquarius: { love: "You value independence.", career: "Innovative thinking helps growth.", health: "Take breaks." },
    Pisces: { love: "You are emotional and dreamy.", career: "Creativity will guide you.", health: "Stay grounded." },
  };

  const result = predictions[zodiac];

  const predictionCards = [
    {
      icon: <Heart size={18} />,
      label: "Love",
      emoji: "❤️",
      text: result?.love,
      gradient: "linear-gradient(135deg,#ec4899,#f43f5e)",
      glow: "rgba(236,72,153,0.3)",
      bg: "rgba(236,72,153,0.06)",
    },
    {
      icon: <Briefcase size={18} />,
      label: "Career",
      emoji: "💼",
      text: result?.career,
      gradient: "linear-gradient(135deg,#6366f1,#a855f7)",
      glow: "rgba(99,102,241,0.3)",
      bg: "rgba(99,102,241,0.06)",
    },
    {
      icon: <Activity size={18} />,
      label: "Health",
      emoji: "🏥",
      text: result?.health,
      gradient: "linear-gradient(135deg,#10b981,#34d399)",
      glow: "rgba(16,185,129,0.3)",
      bg: "rgba(16,185,129,0.06)",
    },
  ];

  const infoRows = [
    { icon: <User size={13} />, label: "Name", value: name },
    { icon: <Star size={13} />, label: "Gender", value: gender },
    { icon: <Calendar size={13} />, label: "DOB", value: `${day}/${month}/${year}` },
    { icon: <MapPin size={13} />, label: "Place", value: place },
    { icon: <Sparkles size={13} />, label: "Zodiac", value: `♈ ${zodiac}` },
  ];

  return (
    <div id="kundli-pdf">
      <div
        className="min-h-screen py-10"
        style={{
          background: "radial-gradient(ellipse at 25% 15%, rgba(251,191,36,0.14) 0%, rgba(168,85,247,0.11) 50%, rgba(236,72,153,0.09) 100%), #f9f7ff",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div className="max-w-4xl mx-auto px-4">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            {/* Glow orb */}
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-4xl"
              style={{
                background: "linear-gradient(135deg,rgba(251,191,36,0.25),rgba(168,85,247,0.25))",
                boxShadow: "0 0 40px rgba(168,85,247,0.28), 0 0 80px rgba(251,191,36,0.16)",
              }}
            >
              🔮
            </motion.div>

            <h1
              className="text-4xl font-extrabold mb-2"
              style={{
                background: "linear-gradient(90deg,#f59e0b,#a855f7,#ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "'Playfair Display', Georgia, serif",
              }}
            >
              Your Kundli Result
            </h1>
            <p className="text-gray-400 text-sm tracking-wide">Personalized cosmic insights based on your birth details</p>

            {/* Decorative line */}
            <div
              className="w-32 h-0.5 mx-auto mt-4 rounded-full"
              style={{ background: "linear-gradient(90deg,transparent,rgba(168,85,247,0.5),transparent)" }}
            />
          </motion.div>

          {/* ── Basic Info Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-[1.5px] mb-7"
            style={{
              background: "linear-gradient(135deg,#fbbf24,#a855f7,#ec4899,#f97316)",
              boxShadow: "0 8px 40px rgba(168,85,247,0.18), 0 0 60px rgba(251,191,36,0.12)",
            }}
          >
            <div
              className="rounded-[14px] p-6"
              style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg,#fbbf24,#f97316)" }}
                >
                  <User size={13} color="#fff" />
                </div>
                <h2
                  className="font-extrabold text-base"
                  style={{
                    background: "linear-gradient(90deg,#f59e0b,#a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  Basic Details
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {infoRows.map(({ icon, label, value }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + i * 0.06 }}
                    className="flex items-start gap-2 px-3 py-2.5 rounded-xl"
                    style={{ background: "rgba(168,85,247,0.05)" }}
                  >
                    <span style={{ color: "#a855f7", marginTop: 2 }}>{icon}</span>
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{label}</p>
                      <p className="text-sm font-bold text-gray-700 mt-0.5">{value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Prediction Cards ── */}
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {predictionCards.map(({ icon, label, emoji, text, gradient, glow, bg }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -4, boxShadow: `0 16px 40px ${glow}` }}
                className="rounded-2xl p-[1.5px] cursor-default"
                style={{
                  background: gradient,
                  boxShadow: `0 6px 24px ${glow}`,
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                }}
              >
                <div
                  className="rounded-[14px] p-5 h-full"
                  style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(16px)" }}
                >
                  {/* Icon badge */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white mb-3"
                    style={{ background: gradient, boxShadow: `0 4px 14px ${glow}` }}
                  >
                    {icon}
                  </div>
                  <h3
                    className="font-extrabold text-sm mb-2"
                    style={{
                      background: gradient,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {emoji} {label}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Action Buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {/* Generate Another */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/kundli")}
              className="flex items-center gap-2 px-7 py-3 rounded-2xl font-bold text-sm text-white relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg,#fbbf24 0%,#f97316 45%,#ec4899 100%)",
                boxShadow: "0 8px 24px rgba(251,191,36,0.4), 0 4px 12px rgba(236,72,153,0.25)",
              }}
            >
              <motion.span
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "linear", repeatDelay: 1 }}
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{ background: "linear-gradient(90deg,transparent 20%,rgba(255,255,255,0.7) 50%,transparent 80%)" }}
              />
              <RefreshCw size={15} />
              Generate Another Kundli
            </motion.button>

            {/* Download PDF */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleDownload}
              className="flex items-center gap-2 px-7 py-3 rounded-2xl font-bold text-sm relative overflow-hidden"
              style={{
                background: "rgba(168,85,247,0.08)",
                border: "1.5px solid rgba(168,85,247,0.3)",
                color: "#a855f7",
              }}
            >
              <Download size={15} />
              Download PDF
            </motion.button>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default KundliResult;