import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, MapPin, Clock, User, Calendar, Zap, Star,
  Shield, CheckCircle, ArrowRight, Users, Award
} from "lucide-react";

/* ─── Shared helpers from Home.jsx ─── */
const SLabel = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest bg-[var(--accent-bg)] text-[var(--primary)] border border-[var(--accent-border)]"
  >
    {children}
  </motion.div>
);

const pageVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const Kundli = () => {
  const navigate = useNavigate();
  const [focusedField, setFocusedField] = useState(null);

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getZodiac = (day, month) => {
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

  const handleSubmit = () => {
    if (!form.name || !form.day || !form.month) {
      alert("Please fill required fields");
      return;
    }
    const zodiac = getZodiac(form.day, form.month);
    navigate("/kundli-result", { state: { ...form, zodiac } });
  };

  /* Shared input style — uses design tokens */
  const inputBase = {
    background: "var(--bg-elevated)",
    border: "1px solid var(--border-soft)",
    borderRadius: "0.875rem",
    color: "var(--text)",
    outline: "none",
    transition: "all 0.25s ease",
    width: "100%",
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    fontWeight: 500,
  };

  const inputFocused = {
    border: "1px solid var(--accent-border)",
    boxShadow: "0 0 0 3px var(--accent-bg)",
    background: "var(--bg-elevated)",
  };

  const getLabelStyle = () => ({
    display: "flex",
    alignItems: "center",
    gap: "0.375rem",
    fontSize: "0.7rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--primary)",
    marginBottom: "0.5rem",
  });

  const features = [
    { icon: "🪐", title: "Planetary Placements", desc: "Discover which constellations held your planets at birth and how they shape your personality traits." },
    { icon: "🏛️", title: "The 12 Houses", desc: "Understand the specific life arenas—from career to romance—where your cosmic energy is most focused." },
    { icon: "✦", title: "Aspects & Transits", desc: "Analyze the angular relationships between planets that define your unique challenges and natural gifts." },
  ];

  const infoPills = [
    { icon: <Zap size={11} />, text: "Vedic Calculation" },
    { icon: <CheckCircle size={11} />, text: "Instant Result" },
    { icon: <Shield size={11} />, text: "100% Private" },
    { icon: <Sparkles size={11} />, text: "Free Forever" },
  ];

  return (
    <motion.div
      variants={pageVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="overflow-x-hidden"
      style={{ background: "var(--bg-soft)" }}
    >
      {/* ═══════════════════════════════════
          HERO — two-column
      ═══════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-18 pb-20 overflow-hidden">

        {/* Ambient glow blobs */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-28 -right-28 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,98,0,0.1) 0%, transparent 65%)", filter: "blur(60px)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.22, 1], opacity: [0.45, 0.85, 0.45] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,140,58,0.08) 0%, transparent 65%)", filter: "blur(55px)" }}
        />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-14 lg:gap-20">

            {/* ── LEFT: Copy ── */}
            <motion.div
              initial={{ opacity: 0, x: -52 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-1/2 flex flex-col items-start"
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-xs font-semibold uppercase tracking-widest bg-[var(--accent-bg)] border border-[var(--accent-border)] text-[var(--primary)]">
                  <Award size={11} />
                  Divine Alignment · 100% Free
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="font-bold leading-[1.05] mb-5 tracking-tight text-[var(--text-heading)]"
                style={{ fontSize: "clamp(2.4rem, 6vw, 4.8rem)", fontFamily: "Poppins, sans-serif" }}
              >
                Decode the<br />
                <motion.span
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    background: "linear-gradient(90deg, var(--primary-dark), var(--primary), var(--primary-light), var(--primary))",
                    backgroundSize: "220% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "inline-block",
                  }}
                >
                  Cosmic Language
                </motion.span>
                <br />of Your Birth
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                className="text-base mb-8 leading-relaxed max-w-[460px] text-[var(--text-muted)]"
              >
                Your birth chart is a snapshot of the heavens at the moment you took your first breath. Enter your details to reveal your celestial blueprint and unlock the secrets of your soul's journey.
              </motion.p>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.56 }}
                className="flex items-center gap-3 mb-10"
              >
                <div className="flex -space-x-2">
                  {["img=1", "img=5", "img=12"].map((s, i) => (
                    <img
                      key={i}
                      src={`https://i.pravatar.cc/40?${s}`}
                      alt=""
                      className="w-8 h-8 rounded-full border-2 border-[var(--bg-elevated)]"
                    />
                  ))}
                </div>
                <p className="text-xs font-semibold text-[var(--text-soft)]">
                  Joined by <span className="text-[var(--text-heading)]">15,000+</span> seekers this moon cycle
                </p>
              </motion.div>

              {/* Trust stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.68 }}
                className="flex items-center gap-8 sm:gap-10 pt-8 border-t border-[var(--border-soft)] w-full"
              >
                {[
                  { v: "5 Cr+", l: "Users" },
                  { v: "4.8 ★", l: "Rating" },
                  { v: "100%", l: "Secure" },
                ].map((s, i) => (
                  <motion.div key={i} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 320 }}>
                    <div className="text-2xl font-bold tracking-tight text-[var(--text-heading)]" style={{ fontFamily: "Poppins, sans-serif" }}>{s.v}</div>
                    <div className="text-xs font-medium mt-0.5 text-[var(--text-soft)]">{s.l}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Form Card ── */}
            <motion.div
              initial={{ opacity: 0, x: 52 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.95, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-1/2 max-w-[520px]"
            >
              <div
                className="card relative overflow-hidden"
                style={{ boxShadow: "var(--shadow-lg)", border: "1px solid var(--border-soft)" }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-[1.5rem]"
                  style={{ background: "var(--gradient-primary)" }}
                />

                {/* Card header */}
                <div className="flex items-center gap-3 mb-7 pb-5" style={{ borderBottom: "1px solid var(--border-soft)" }}>
                  <motion.div
                    whileHover={{ rotate: 13, scale: 1.18 }}
                    transition={{ type: "spring", stiffness: 320 }}
                    className="w-10 h-10 rounded-2xl flex items-center justify-center gradient-primary"
                    style={{ boxShadow: "0 6px 20px rgba(255,98,0,0.28)" }}
                  >
                    <Sparkles size={18} color="white" />
                  </motion.div>
                  <div>
                    <h2 className="font-bold text-lg text-[var(--text-heading)]" style={{ fontFamily: "Poppins, sans-serif" }}>
                      Kundli Creation
                    </h2>
                    <p className="text-xs text-[var(--text-soft)]">Precise astronomical calculations for your birth chart.</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* NAME */}
                    <div>
                      <label style={getLabelStyle()}>
                        <User size={11} /> Full Name
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Enter your full name"
                        style={{
                          ...inputBase,
                          ...(focusedField === "name" ? inputFocused : {}),
                        }}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>

                    {/* GENDER */}
                    <div>
                      <label style={getLabelStyle()}>
                        <Star size={11} /> Gender
                      </label>
                      <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        style={{
                          ...inputBase,
                          cursor: "pointer",
                          ...(focusedField === "gender" ? inputFocused : {}),
                        }}
                        onFocus={() => setFocusedField("gender")}
                        onBlur={() => setFocusedField(null)}
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>

                    {/* BIRTH DATE */}
                    <div>
                      <label style={getLabelStyle()}>
                        <Calendar size={11} /> Date of Birth
                      </label>
                      <div className="flex gap-2">
                        {[
                          { name: "day", placeholder: "DD" },
                          { name: "month", placeholder: "MM" },
                          { name: "year", placeholder: "YYYY" },
                        ].map((field) => (
                          <input
                            key={field.name}
                            name={field.name}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            style={{
                              ...inputBase,
                              textAlign: "center",
                              flex: 1,
                              padding: "0.75rem 0.4rem",
                              ...(focusedField === field.name ? inputFocused : {}),
                            }}
                            onFocus={() => setFocusedField(field.name)}
                            onBlur={() => setFocusedField(null)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* BIRTH TIME */}
                    <div>
                      <label style={getLabelStyle()}>
                        <Clock size={11} /> Time of Birth
                      </label>
                      <div className="flex gap-2">
                        {["hour", "minute"].map((f) => (
                          <input
                            key={f}
                            name={f}
                            onChange={handleChange}
                            placeholder={f === "hour" ? "HH" : "MM"}
                            style={{
                              ...inputBase,
                              textAlign: "center",
                              flex: 1,
                              padding: "0.75rem 0.4rem",
                              ...(focusedField === f ? inputFocused : {}),
                            }}
                            onFocus={() => setFocusedField(f)}
                            onBlur={() => setFocusedField(null)}
                          />
                        ))}
                        <select
                          name="ampm"
                          onChange={handleChange}
                          style={{
                            ...inputBase,
                            flex: 1,
                            cursor: "pointer",
                            padding: "0.75rem 0.4rem",
                            textAlign: "center",
                            ...(focusedField === "ampm" ? inputFocused : {}),
                          }}
                          onFocus={() => setFocusedField("ampm")}
                          onBlur={() => setFocusedField(null)}
                        >
                          <option>AM</option>
                          <option>PM</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* BIRTH PLACE */}
                  <div>
                    <label style={getLabelStyle()}>
                      <MapPin size={11} /> Birth Location
                    </label>
                    <input
                      name="place"
                      onChange={handleChange}
                      placeholder="Search city..."
                      style={{
                        ...inputBase,
                        ...(focusedField === "place" ? inputFocused : {}),
                      }}
                      onFocus={() => setFocusedField("place")}
                      onBlur={() => setFocusedField(null)}
                    />
                  </div>

                  {/* Info pills */}
                  <div className="flex flex-wrap gap-2">
                    {infoPills.map((pill, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ y: -2, scale: 1.04 }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full cursor-default"
                        style={{
                          background: "var(--accent-bg)",
                          border: "1px solid var(--accent-border)",
                          color: "var(--primary)",
                        }}
                      >
                        {pill.icon} {pill.text}
                      </motion.span>
                    ))}
                  </div>

                  {/* SUBMIT */}
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.02, y: -2, boxShadow: "0 0 30px rgba(255,98,0,0.3)" }}
                    whileTap={{ scale: 0.97 }}
                    className="btn-primary w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3"
                  >
                    <Zap size={18} />
                    Cast My Celestial Blueprint
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles size={16} />
                    </motion.span>
                  </motion.button>

                  <p className="text-center text-xs text-[var(--text-soft)]">
                    By casting your blueprint, you agree to our 100% data privacy guarantee. Your celestial coordinates are used only for chart calculation.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          WHAT YOUR CHART REVEALS
      ═══════════════════════════════════ */}
      <section className="section bg-[var(--bg)]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <SLabel><Sparkles size={12} /> Your Blueprint</SLabel>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight text-[var(--text-heading)] leading-tight"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              What your chart reveals
            </h2>
            <div className="w-12 h-1 rounded-full mx-auto" style={{ background: "var(--gradient-primary)" }} />
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="card group cursor-pointer relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[1.5rem]"
                  style={{ background: "radial-gradient(circle at 50% 0%, rgba(255,98,0,0.07) 0%, transparent 68%)" }}
                />
                <motion.div
                  whileHover={{ rotate: 13, scale: 1.22 }}
                  transition={{ type: "spring", stiffness: 320 }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 text-xl"
                  style={{
                    background: "var(--accent-bg)",
                    border: "1px solid var(--accent-border)",
                  }}
                >
                  {f.icon}
                </motion.div>
                <h3 className="font-bold text-base mb-2 text-[var(--text-heading)]" style={{ fontFamily: "Poppins, sans-serif" }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Kundli;