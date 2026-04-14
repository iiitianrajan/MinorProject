import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Heart, Calendar, Clock, MapPin, Star,
  Sparkles, ArrowRight, Shield, Lock, ChevronRight,
  Link2, Globe, Zap, Activity, Users, Flame
} from "lucide-react";

/* ─── Reusable Section Label (matches Home.jsx SLabel) ─── */
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

/* ─── Input Field Component ─── */
const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-soft)]">
      {label}
    </label>
    {children}
  </div>
);

const inputClass =
  "w-full px-4 py-3 rounded-2xl text-sm font-medium text-[var(--text-heading)] bg-[var(--bg-soft)] border border-[var(--border-soft)] outline-none transition-all duration-200 focus:border-[var(--accent-border)] focus:bg-[var(--bg-elevated)] focus:shadow-[0_0_0_3px_rgba(255,98,0,0.08)] placeholder:text-[var(--text-soft)]";

const selectClass =
  "w-full px-4 py-3 rounded-2xl text-sm font-medium text-[var(--text-heading)] bg-[var(--bg-soft)] border border-[var(--border-soft)] outline-none transition-all duration-200 focus:border-[var(--accent-border)] focus:bg-[var(--bg-elevated)] focus:shadow-[0_0_0_3px_rgba(255,98,0,0.08)] appearance-none cursor-pointer";

/* ─── Ashtakoota Kootas data ─── */
const kootas = [
  {
    icon: <Users size={20} />,
    name: "Varna",
    points: "1 Point",
    desc: "Measures ego compatibility and spiritual level based on natural tendencies.",
  },
  {
    icon: <Link2 size={20} />,
    name: "Vashya",
    points: "2 Points",
    desc: "Calculates the degree of mutual attraction and dominance between partners.",
  },
  {
    icon: <Star size={20} />,
    name: "Tara",
    points: "3 Points",
    desc: "Assesses the health, longevity, and overall destiny of the couple.",
  },
  {
    icon: <Flame size={20} />,
    name: "Yoni",
    points: "4 Points",
    desc: "Determines biological and sexual compatibility through animal signs.",
  },
  {
    icon: <Globe size={20} />,
    name: "Graha Maitri",
    points: "5 Points",
    desc: "Refers to the friendship between the ruling planets of Moon signs.",
  },
  {
    icon: <Users size={20} />,
    name: "Gana",
    points: "6 Points",
    desc: "Classifies temperament into Deva, Manushya, and Rakshasa categories.",
  },
  {
    icon: <Activity size={20} />,
    name: "Bhakoot",
    points: "7 Points",
    desc: "Focuses on emotional stability and financial prosperity in union.",
  },
  {
    icon: <Zap size={20} />,
    name: "Nadi",
    points: "8 Points",
    desc: "The most critical factor, measuring genetic health and progeny.",
  },
];

/* ─── Partner Form Card ─── */
const PartnerCard = ({ label, icon, accentColor, data, onChange }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="card"
    style={{ boxShadow: "var(--shadow-md)", padding: "2rem" }}
  >
    {/* Card header */}
    <div className="flex items-center gap-3 mb-7">
      <div
        className="w-10 h-10 rounded-2xl flex items-center justify-center"
        style={{ background: accentColor, boxShadow: `0 4px 16px ${accentColor}55` }}
      >
        {icon}
      </div>
      <h2 className="text-lg font-bold text-[var(--text-heading)]" style={{ fontFamily: "'Poppins', sans-serif" }}>
        {label}
      </h2>
    </div>

    <div className="flex flex-col gap-5">
      {/* Full Name */}
      <Field label="Full Name">
        <input
          className={inputClass}
          placeholder="Enter full name"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
        />
      </Field>

      {/* Gender + DOB row */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Gender">
          <div className="relative">
            <select
              className={selectClass}
              value={data.gender}
              onChange={(e) => onChange({ ...data, gender: e.target.value })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-[var(--text-soft)] pointer-events-none" />
          </div>
        </Field>
        <Field label="Date of Birth">
          <div className="relative">
            <input
              type="date"
              className={inputClass}
              value={data.dob}
              onChange={(e) => onChange({ ...data, dob: e.target.value, day: e.target.value.split("-")[2], month: e.target.value.split("-")[1] })}
            />
          </div>
        </Field>
      </div>

      {/* Time + Location row */}
      <div className="grid grid-cols-2 gap-4">
        <Field label="Time of Birth">
          <div className="relative">
            <input
              type="time"
              className={inputClass}
              value={data.time}
              onChange={(e) => onChange({ ...data, time: e.target.value })}
            />
          </div>
        </Field>
        <Field label="Birth Location">
          <div className="relative">
            <input
              className={inputClass}
              placeholder="City, Country"
              value={data.place}
              onChange={(e) => onChange({ ...data, place: e.target.value })}
            />
          </div>
        </Field>
      </div>
    </div>
  </motion.div>
);

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
const KundliMatch = () => {
  const navigate = useNavigate();

  const [boy, setBoy] = useState({
    name: "", gender: "Male", dob: "", day: "", month: "", time: "", place: "",
  });
  const [girl, setGirl] = useState({
    name: "", gender: "Female", dob: "", day: "", month: "", time: "", place: "",
  });

  const handleMatch = () => {
    if (!boy.day || !girl.day) {
      alert("Fill all details");
      return;
    }
    navigate("/match-result", { state: { boy, girl } });
  };

  return (
    <div className="min-h-screen bg-[var(--bg-soft)] overflow-x-hidden">

      {/* ══════════════════════════
          HERO — full-width centered
      ══════════════════════════ */}
      <section className="relative overflow-hidden bg-[var(--bg-elevated)] border-b border-[var(--border-soft)]">
        {/* Background glow blobs */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,98,0,0.08) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.22, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(255,98,0,0.06) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-18 pb-14 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest bg-[var(--accent-bg)] text-[var(--primary)] border border-[var(--accent-border)]"
          >
            <Heart size={11} /> Sacred Compatibility Analysis
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold text-[var(--text-heading)] mb-5"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
            }}
          >
            Celestial Union:{" "}
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
              Kundali Matching
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base text-[var(--text-muted)] leading-relaxed max-w-xl mx-auto mb-0"
          >
            Unlock the cosmic blueprint of your relationship. Using the sacred wisdom of Ashtakoota Milan, we reveal the spiritual compatibility between two souls.
          </motion.p>
        </div>
      </section>

      {/* ══════════════════════════
          PARTNER FORMS
      ══════════════════════════ */}
      <section className="section">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* 2-col partner cards */}
          <div className="grid md:grid-cols-2 gap-7 mb-10">
            <PartnerCard
              label="Partner 1"
              icon={<User size={18} color="#fff" />}
              accentColor="var(--primary)"
              data={boy}
              onChange={setBoy}
            />
            <PartnerCard
              label="Partner 2"
              icon={<Heart size={18} color="#fff" />}
              accentColor="linear-gradient(135deg,#ec4899,#f43f5e)"
              data={girl}
              onChange={setGirl}
            />
          </div>

          {/* CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -3, boxShadow: "0 16px 48px rgba(165,61,0,0.35)" }}
              whileTap={{ scale: 0.96 }}
              onClick={handleMatch}
              className="btn-primary flex items-center gap-3 px-10 py-4 text-base relative overflow-hidden"
            >
              {/* shimmer */}
              <motion.span
                animate={{ x: ["-100%", "200%"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 1.2 }}
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.7) 50%, transparent 80%)",
                }}
              />
              <Star size={17} />
              Calculate Ashtakoota Milan
              <ArrowRight size={16} />
            </motion.button>

            <div className="flex items-center gap-1.5 text-xs text-[var(--text-soft)]">
              <Lock size={11} />
              100% Private & Secure Birth Data
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════
          HOW KUNDALI MATCHING WORKS
      ══════════════════════════ */}
      <section className="section bg-[var(--bg)]">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <SLabel><Sparkles size={11} /> Ancient Wisdom</SLabel>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-heading)] leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              How Kundali Matching Works
            </h2>
          </motion.div>

          {/* 4-col grid × 2 rows = 8 kootas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {kootas.map((koota, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="card-soft group cursor-default relative overflow-hidden"
              >
                {/* hover glow overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[1.5rem]"
                  style={{
                    background: "radial-gradient(circle at 30% 0%, rgba(255,98,0,0.07) 0%, transparent 65%)",
                  }}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.18 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4 bg-[var(--accent-bg)] border border-[var(--accent-border)] text-[var(--primary)]"
                >
                  {koota.icon}
                </motion.div>

                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="text-sm font-bold text-[var(--text-heading)]">{koota.name}</h3>
                  <span className="text-[10px] font-bold text-[var(--primary)] bg-[var(--accent-bg)] px-2 py-0.5 rounded-full border border-[var(--accent-border)]">
                    {koota.points}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{koota.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Total score note */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex justify-center"
          >
            <div className="card inline-flex items-center gap-4 px-7 py-4" style={{ boxShadow: "var(--shadow-md)" }}>
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center shadow-[0_4px_18px_rgba(255,98,0,0.28)] flex-shrink-0">
                <Star size={20} color="#fff" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[var(--text-soft)] font-semibold">Total Score</p>
                <p className="text-base font-bold text-[var(--text-heading)]">36 Points Maximum — 18+ Recommended for Marriage</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════
          CTA DARK BANNER
      ══════════════════════════ */}
      <section className="section">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="relative rounded-[2rem] overflow-hidden text-center px-8 py-16 sm:px-12 lg:px-20 lg:py-20"
              style={{ background: "linear-gradient(135deg, #0f0f0f 0%, #1c1c1c 50%, #111 100%)" }}
            >
              {/* animated glow */}
              <motion.div
                animate={{ scale: [1, 1.22, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute pointer-events-none inset-0"
                style={{
                  background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,98,0,0.15) 0%, transparent 65%)",
                }}
              />

              {/* floating tarot-card shapes */}
              <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-4">
                {[
                  { r: -9, w: 80, h: 116, delay: 0 },
                  { r: 0, w: 98, h: 140, c: true, delay: 0.5 },
                  { r: 9, w: 80, h: 116, delay: 1 },
                ].map((c, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -9, 0] }}
                    transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
                    className="flex items-center justify-center"
                    style={{
                      width: c.w, height: c.h,
                      transform: `rotate(${c.r}deg)${c.c ? " translateY(-10px)" : ""}`,
                      borderRadius: 14,
                      background: "rgba(255,255,255,0.06)",
                      backdropFilter: "blur(14px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
                    }}
                  >
                    {c.c && (
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles size={24} style={{ color: "var(--primary-light)" }} />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="relative z-10 max-w-lg mx-auto">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-[var(--primary-light)]">
                  Searching for More than Points?
                </p>
                <h2
                  className="text-3xl lg:text-5xl font-bold leading-tight mb-5 tracking-tight"
                  style={{ color: "rgba(245,245,245,0.95)", fontFamily: "'Poppins', sans-serif" }}
                >
                  Searching for More than Points?
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(245,245,245,0.5)" }}>
                  Our Vedic experts provide detailed manual readings that go beyond the numbers, analyzing Manglik Dosha and specific planetary placements.
                </p>
                <motion.button
                  whileHover={{ scale: 1.06, y: -3, boxShadow: "0 18px 44px rgba(0,0,0,0.38)" }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2.5 font-semibold text-sm px-8 py-3.5 rounded-full transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1.5px solid rgba(255,98,0,0.5)",
                    color: "var(--primary-light)",
                  }}
                >
                  Book a Consultation <ArrowRight size={15} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default KundliMatch;