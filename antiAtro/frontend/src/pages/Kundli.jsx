import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, MapPin, Clock, User, Calendar, Zap, Star } from "lucide-react";

const pageVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const Kundli = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    gender: "Male",
    day: "",
    month: "",
    year: "",
    hour: "",
    minute: "",
    ampm: "AM",
    place: "",
  });

  const handleChange = function (e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getZodiac = function (day, month) {
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
  };

  const handleSubmit = function () {
    if (!form.name || !form.day || !form.month) {
      alert("Please fill required fields");
      return;
    }
    const zodiac = getZodiac(form.day, form.month);
    navigate("/kundli-result", { state: { ...form, zodiac } });
  };

  function focusInput(e) {
    e.target.style.border = "1.5px solid rgba(168,85,247,0.6)";
    e.target.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.1)";
    e.target.style.background = "rgba(255,255,255,0.95)";
  }

  function blurInput(e) {
    e.target.style.border = "1.5px solid rgba(168,85,247,0.2)";
    e.target.style.boxShadow = "none";
    e.target.style.background = "rgba(255,255,255,0.7)";
  }

  const baseInput =
    "w-full px-4 py-3 rounded-xl outline-none text-sm text-gray-800 transition-all";
  const baseInputStyle = {
    border: "1.5px solid rgba(168,85,247,0.2)",
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(8px)",
  };

  const smallInput =
    "px-3 py-3 rounded-xl outline-none text-sm text-gray-800 text-center transition-all";

  return (
    <motion.div
      variants={pageVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="min-h-screen py-10 font-sans relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg,#fdf4ff 0%,#fff7ed 30%,#fdf2f8 60%,#fffbeb 100%)",
      }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(168,85,247,0.13) 0%,transparent 70%)",
          filter: "blur(60px)",
          transform: "translate(-30%,-30%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(251,146,60,0.13) 0%,transparent 70%)",
          filter: "blur(60px)",
          transform: "translate(30%,30%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(236,72,153,0.08) 0%,transparent 70%)",
          filter: "blur(70px)",
          transform: "translate(-50%,-50%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-4"
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
              style={{
                background: "linear-gradient(135deg,#a855f7,#ec4899,#f59e0b)",
                boxShadow: "0 0 28px rgba(168,85,247,0.45)",
              }}
            >
              🔮
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles size={14} style={{ color: "#f59e0b" }} />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{
                background: "linear-gradient(90deg,#f59e0b,#ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              100% Free
            </span>
            <Sparkles size={14} style={{ color: "#f59e0b" }} />
          </div>

          <h1
            className="text-4xl md:text-5xl font-black mb-3"
            style={{
              background:
                "linear-gradient(90deg,#1f2937 0%,#7c3aed 45%,#ec4899 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Free Kundli Online
          </h1>
          <p className="text-gray-500 text-base">
            Generate your exhaustive Janam Kundli completely free.
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-3xl p-8 relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(168,85,247,0.15)",
            boxShadow: "0 8px 40px rgba(168,85,247,0.1)",
          }}
        >
          {/* Top gradient line */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{
              background: "linear-gradient(90deg,#a855f7,#ec4899,#f59e0b)",
            }}
          />

          {/* Section heading */}
          <div className="flex items-center gap-3 mb-8 pb-5"
            style={{ borderBottom: "1px solid rgba(168,85,247,0.12)" }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
              style={{
                background: "linear-gradient(135deg,#a855f7,#ec4899)",
                boxShadow: "0 4px 12px rgba(168,85,247,0.3)",
              }}
            >
              ✨
            </div>
            <h2
              className="text-xl font-black"
              style={{
                background: "linear-gradient(90deg,#7c3aed,#ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              New Kundli
            </h2>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* NAME */}
              <div>
                <label
                  className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider mb-2"
                  style={{
                    background: "linear-gradient(90deg,#7c3aed,#ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  <User size={12} style={{ color: "#7c3aed" }} />
                  Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter full name"
                  className={baseInput}
                  style={{ ...baseInputStyle }}
                  onFocus={focusInput}
                  onBlur={blurInput}
                />
              </div>

              {/* GENDER */}
              <div>
                <label
                  className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider mb-2"
                  style={{
                    background: "linear-gradient(90deg,#7c3aed,#ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  <Star size={12} style={{ color: "#ec4899" }} />
                  Gender
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className={baseInput}
                  style={{ ...baseInputStyle, cursor: "pointer" }}
                  onFocus={focusInput}
                  onBlur={blurInput}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* BIRTH DATE */}
              <div>
                <label
                  className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider mb-2"
                  style={{
                    background: "linear-gradient(90deg,#f59e0b,#f97316)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  <Calendar size={12} style={{ color: "#f59e0b" }} />
                  Birth Date
                </label>
                <div className="flex gap-2">
                  {[
                    { name: "day", placeholder: "DD" },
                    { name: "month", placeholder: "MM" },
                    { name: "year", placeholder: "YYYY" },
                  ].map(function (field) {
                    return (
                      <input
                        key={field.name}
                        name={field.name}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className={smallInput}
                        style={{ ...baseInputStyle, flex: 1 }}
                        onFocus={focusInput}
                        onBlur={blurInput}
                      />
                    );
                  })}
                </div>
              </div>

              {/* BIRTH TIME */}
              <div>
                <label
                  className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider mb-2"
                  style={{
                    background: "linear-gradient(90deg,#3b82f6,#a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  <Clock size={12} style={{ color: "#3b82f6" }} />
                  Birth Time
                </label>
                <div className="flex gap-2">
                  <input
                    name="hour"
                    onChange={handleChange}
                    placeholder="HH"
                    className={smallInput}
                    style={{ ...baseInputStyle, flex: 1 }}
                    onFocus={focusInput}
                    onBlur={blurInput}
                  />
                  <input
                    name="minute"
                    onChange={handleChange}
                    placeholder="MM"
                    className={smallInput}
                    style={{ ...baseInputStyle, flex: 1 }}
                    onFocus={focusInput}
                    onBlur={blurInput}
                  />
                  <select
                    name="ampm"
                    onChange={handleChange}
                    className={smallInput}
                    style={{ ...baseInputStyle, flex: 1, cursor: "pointer" }}
                    onFocus={focusInput}
                    onBlur={blurInput}
                  >
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
              </div>
            </div>

            {/* BIRTH PLACE */}
            <div>
              <label
                className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider mb-2"
                style={{
                  background: "linear-gradient(90deg,#ec4899,#f97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <MapPin size={12} style={{ color: "#ec4899" }} />
                Birth Place
              </label>
              <input
                name="place"
                onChange={handleChange}
                placeholder="Enter birth city"
                className={baseInput}
                style={{ ...baseInputStyle }}
                onFocus={focusInput}
                onBlur={blurInput}
              />
            </div>

            {/* Info pills */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: "🔮", text: "Vedic Calculation" },
                { icon: "⚡", text: "Instant Result" },
                { icon: "🔒", text: "100% Private" },
                { icon: "✨", text: "Free Forever" },
              ].map(function (pill, i) {
                return (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg,rgba(168,85,247,0.08),rgba(236,72,153,0.08))",
                      border: "1px solid rgba(168,85,247,0.15)",
                      color: "#7c3aed",
                    }}
                  >
                    {pill.icon} {pill.text}
                  </span>
                );
              })}
            </div>

            {/* SUBMIT BUTTON */}
            <motion.button
              type="button"
              onClick={handleSubmit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 rounded-2xl font-black text-lg text-white border-0 flex items-center justify-center gap-3"
              style={{
                background:
                  "linear-gradient(90deg,#7c3aed,#a855f7,#ec4899)",
                boxShadow: "0 6px 24px rgba(124,58,237,0.4)",
              }}
              onMouseEnter={function (e) {
                e.currentTarget.style.boxShadow =
                  "0 8px 32px rgba(124,58,237,0.55)";
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.boxShadow =
                  "0 6px 24px rgba(124,58,237,0.4)";
              }}
            >
              <Zap size={20} />
              Generate Janam Kundli
              <span className="text-2xl">🔮</span>
            </motion.button>
          </form>
        </motion.div>

        {/* Bottom trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center flex-wrap gap-6 mt-8"
        >
          {[
            { emoji: "👥", label: "5 Crore+ Users" },
            { emoji: "⭐", label: "4.8 Rating" },
            { emoji: "🛡️", label: "100% Secure" },
          ].map(function (badge, i) {
            return (
              <div
                key={i}
                className="flex items-center gap-2 text-sm font-semibold"
                style={{ color: "#6b7280" }}
              >
                <span className="text-lg">{badge.emoji}</span>
                {badge.label}
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Kundli;