import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download, RefreshCw, Sun, Moon, ChevronDown,
  ArrowRight, MessageSquare, Sparkles, Star,
  MapPin, Calendar, User, Shield,
} from "lucide-react";

/* ══════════════════════════════════════
   RASHI CHART — North Indian Diamond
══════════════════════════════════════ */
const RashiChart = ({ zodiac }) => {
  const SIZE = 420;
  const T = SIZE / 3; // 140

  const cells = [
    { id: 1,  points: `${T},0 ${T*2},0 ${T*2},${T} ${T},${T}`,               lx: T*1.5,   ly: T*0.38 },
    { id: 2,  points: `0,0 ${T},0 ${T},${T}`,                                  lx: T*0.42,  ly: T*0.3  },
    { id: 3,  points: `0,0 ${T},${T} 0,${T}`,                                  lx: T*0.18,  ly: T*0.65 },
    { id: 4,  points: `0,${T} ${T},${T} ${T},${T*2} 0,${T*2}`,               lx: T*0.38,  ly: T*1.5  },
    { id: 5,  points: `0,${T*2} ${T},${T*2} ${T},${T*3}`,                     lx: T*0.42,  ly: T*2.7  },
    { id: 6,  points: `0,${T*2} ${T},${T*3} 0,${T*3}`,                        lx: T*0.18,  ly: T*2.85 },
    { id: 7,  points: `${T},${T*2} ${T*2},${T*2} ${T*2},${T*3} ${T},${T*3}`, lx: T*1.5,   ly: T*2.62 },
    { id: 8,  points: `${T*2},${T*2} ${T*3},${T*3} ${T*2},${T*3}`,           lx: T*2.55,  ly: T*2.85 },
    { id: 9,  points: `${T*2},${T*2} ${T*3},${T*2} ${T*3},${T*3}`,           lx: T*2.82,  ly: T*2.7  },
    { id: 10, points: `${T*2},${T} ${T*3},${T} ${T*3},${T*2} ${T*2},${T*2}`, lx: T*2.62,  ly: T*1.5  },
    { id: 11, points: `${T*2},0 ${T*3},0 ${T*3},${T}`,                        lx: T*2.82,  ly: T*0.3  },
    { id: 12, points: `${T*2},0 ${T*3},${T} ${T*2},${T}`,                     lx: T*2.55,  ly: T*0.65 },
  ];

  const planetsByHouse = {
    Aries:       { 1:["Su","As"], 4:["Mo"],     7:["Ma"],  10:["Me"], 8:["Ju"]  },
    Taurus:      { 2:["Su","As"], 5:["Mo"],     8:["Ma"],  11:["Me"], 4:["Ju"]  },
    Gemini:      { 3:["Su","As"], 6:["Mo"],     9:["Ma"],  12:["Me"], 5:["Ju"]  },
    Cancer:      { 4:["Su","As"], 7:["Mo"],     10:["Ma"], 1:["Me"],  6:["Ju"]  },
    Leo:         { 1:["Su","As"], 8:["Mo"],     7:["Ma"],  12:["Me"], 4:["Ju"]  },
    Virgo:       { 2:["Su","As"], 9:["Mo"],     8:["Ma"],  1:["Me"],  5:["Ju"]  },
    Libra:       { 3:["Su","As"], 10:["Mo"],    9:["Ma"],  2:["Me"],  6:["Ju"]  },
    Scorpio:     { 4:["Su","As"], 11:["Mo"],    10:["Ma"], 3:["Me"],  7:["Ju"]  },
    Sagittarius: { 1:["Su","As"], 5:["Mo"],     11:["Ma"], 4:["Me"],  8:["Ju"]  },
    Capricorn:   { 2:["Su","As"], 6:["Mo"],     12:["Ma"], 5:["Me"],  9:["Ju"]  },
    Aquarius:    { 3:["Su","As"], 7:["Mo"],     1:["Ma"],  6:["Me"],  10:["Ju"] },
    Pisces:      { 4:["Su","As"], 8:["Mo"],     2:["Ma"],  7:["Me"],  11:["Ju"] },
  };

  const houseMap = planetsByHouse[zodiac] || planetsByHouse.Leo;
  const S = SIZE;

  return (
    <svg viewBox={`0 0 ${S} ${S}`} width="100%" height="100%">
      {/* background */}
      <rect width={S} height={S} fill="rgba(255,98,0,0.015)" rx="6" />
      {/* outer border */}
      <rect x="1" y="1" width={S-2} height={S-2} fill="none" stroke="rgba(165,61,0,0.2)" strokeWidth="1.5" rx="5" />
      {/* centre diamond */}
      <polygon
        points={`${T},${T} ${T*2},${T} ${T*2},${T*2} ${T},${T*2}`}
        fill="rgba(255,98,0,0.04)"
        stroke="rgba(165,61,0,0.22)"
        strokeWidth="1.5"
      />
      {/* diagonals */}
      {[
        [0,0,T,T], [S,0,T*2,T], [0,S,T,T*2], [S,S,T*2,T*2],
      ].map(([x1,y1,x2,y2],i)=>(
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(165,61,0,0.18)" strokeWidth="1.2"/>
      ))}
      {/* cross */}
      <line x1={S/2} y1="0" x2={S/2} y2={S} stroke="rgba(165,61,0,0.18)" strokeWidth="1.2"/>
      <line x1="0" y1={S/2} x2={S} y2={S/2} stroke="rgba(165,61,0,0.18)" strokeWidth="1.2"/>

      {cells.map((cell) => {
        const planets = houseMap[cell.id] || [];
        const isLagna = cell.id === 1;
        return (
          <g key={cell.id}>
            <polygon points={cell.points} fill={isLagna ? "rgba(255,98,0,0.05)" : "transparent"} />
            {/* house number */}
            <text
              x={cell.lx} y={cell.ly}
              textAnchor="middle"
              fill="rgba(107,114,128,0.55)"
              fontSize="11"
              fontFamily="Poppins,sans-serif"
              fontWeight="600"
            >{cell.id}</text>
            {/* planets */}
            {planets.map((p, pi) => (
              <text
                key={p}
                x={cell.lx}
                y={cell.ly + 16 + pi * 14}
                textAnchor="middle"
                fill={p === "As" ? "#6366f1" : "var(--primary)"}
                fontSize="12"
                fontFamily="Poppins,sans-serif"
                fontWeight="700"
              >{p}</text>
            ))}
          </g>
        );
      })}
    </svg>
  );
};

/* ══════════════════════════════════════
   DATA HELPERS
══════════════════════════════════════ */
const getPlanetaryPositions = (zodiac) => {
  const map = {
    Leo:         [{ planet:"☀ Sun", rasi:"Leo",        degree:"16° 0′",  house:"1st" }, { planet:"☽ Moon",    rasi:"Pisces",   degree:"22° 15′", house:"8th" }, { planet:"♂ Mars",    rasi:"Aquarius", degree:"01° 30′", house:"7th" }, { planet:"☿ Mercury", rasi:"Cancer",   degree:"28° 12′", house:"12th" }, { planet:"♃ Jupiter", rasi:"Scorpio",  degree:"15° 56′", house:"4th" }],
    Aries:       [{ planet:"☀ Sun", rasi:"Aries",      degree:"14° 0′",  house:"1st" }, { planet:"☽ Moon",    rasi:"Cancer",   degree:"22° 15′", house:"4th" }, { planet:"♂ Mars",    rasi:"Capricorn",degree:"01° 30′", house:"10th"}, { planet:"☿ Mercury", rasi:"Pisces",   degree:"28° 12′", house:"12th" }, { planet:"♃ Jupiter", rasi:"Scorpio",  degree:"15° 56′", house:"8th"  }],
    Scorpio:     [{ planet:"☀ Sun", rasi:"Scorpio",    degree:"08° 22′", house:"1st" }, { planet:"☽ Moon",    rasi:"Taurus",   degree:"19° 40′", house:"7th" }, { planet:"♂ Mars",    rasi:"Capricorn",degree:"03° 12′", house:"3rd" }, { planet:"☿ Mercury", rasi:"Libra",    degree:"14° 55′", house:"12th" }, { planet:"♃ Jupiter", rasi:"Cancer",   degree:"22° 08′", house:"9th"  }],
  };
  return map[zodiac] || map.Leo;
};

const getInterpretations = (zodiac) => [
  {
    title: "The Soul's North Star",
    icon: "☀",
    text: `With your Sun in ${zodiac} positioned in the 1st house, you carry a natural radiance that demands to be seen. Your life path is one of profound self-expression and leadership. You are not meant to hide in the shadows; rather, your cosmic duty is to illuminate the paths of others through your creative courage.`,
  },
  {
    title: "The Inner Tides",
    icon: "☽",
    text: "The placement of your Moon in Pisces creates a beautiful, if complex, tension with your rising vitality. While the world sees your fire, your internal world is a vast ocean of psychic sensitivity. You absorb the emotional frequencies of your environment, requiring moments of deep solitude to cleanse your spiritual aura.",
  },
  {
    title: "Karmic Crossroads",
    icon: "♂",
    text: "Mars retrograde in your 7th house suggests that your most significant growth will come through refined partnerships. There is a cosmic lesson in patience and the tempering of will. When you learn to balance your fierce independence with the needs of a beloved companion, the true power of your blueprint will unlock.",
  },
];

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
const KundliResult = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState(0);

  const handleDownload = () => {
    const element = document.getElementById("kundli-pdf");
    document.body.classList.add("pdf-mode");
    html2pdf()
      .set({
        margin: 0.5,
        filename: "kundli.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(element)
      .save()
      .then(() => document.body.classList.remove("pdf-mode"));
  };

  /* ── Empty state ── */
  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-soft)]">
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card text-center max-w-sm w-full mx-4"
        >
          <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-4xl gradient-primary shadow-[0_12px_40px_rgba(255,98,0,0.3)]">🔮</div>
          <h2 className="text-xl font-bold text-[var(--text-heading)] mb-2">No Kundli Data</h2>
          <p className="text-[var(--text-muted)] text-sm mb-6">Please fill in your birth details first.</p>
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/kundli")}
            className="btn-primary inline-flex items-center gap-2"
          >
            Go Back <ArrowRight size={15} />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const { name, gender, day, month, year, place, zodiac } = state;
  const planetaryData = getPlanetaryPositions(zodiac);
  const interpretations = getInterpretations(zodiac);
  const moonSign = planetaryData.find(p => p.planet.includes("Moon"))?.rasi || "Pisces";

  return (
    <div id="kundli-pdf" className="min-h-screen bg-[var(--bg-soft)]">

      {/* ══════════════════════════
          HERO HEADER — full width
      ══════════════════════════ */}
      <section className="bg-[var(--bg-elevated)] border-b border-[var(--border-soft)]" style={{ boxShadow: "var(--shadow-sm)" }}>
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10">
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest bg-[var(--accent-bg)] text-[var(--primary)] border border-[var(--accent-border)]">
              <Sparkles size={11} /> Your Cosmic Blueprint
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              {/* Left: name + desc */}
              <div>
                <h1
                  className="font-bold text-[var(--text-heading)] mb-3"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                  }}
                >
                  {name}
                </h1>
                <p className="text-[var(--text-muted)] text-base leading-relaxed max-w-xl mb-5">
                  The celestial alignment at your birth reveals a soul navigating between the fires of ambition and the deep waters of intuition.
                </p>

                {/* Info pills */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: <User size={12}/>,     val: gender },
                    { icon: <Calendar size={12}/>,  val: `${day}/${month}/${year}` },
                    { icon: <MapPin size={12}/>,    val: place },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 bg-[var(--bg-soft)] border border-[var(--border-soft)] rounded-full px-3.5 py-1.5">
                      <span className="text-[var(--primary)]">{item.icon}</span>
                      <span className="text-xs font-semibold text-[var(--text-muted)]">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Sun + Moon sign cards */}
              <div className="flex gap-3 flex-shrink-0">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="card flex items-center gap-3 px-5 py-4"
                  style={{ boxShadow: "var(--shadow-md)", minWidth: 140 }}
                >
                  <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center shadow-[0_4px_16px_rgba(255,98,0,0.3)]">
                    <Sun size={18} color="#fff" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[var(--text-soft)] font-semibold">Sun Sign</p>
                    <p className="text-base font-bold text-[var(--text-heading)] mt-0.5">{zodiac}</p>
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="card flex items-center gap-3 px-5 py-4"
                  style={{ boxShadow: "var(--shadow-md)", minWidth: 140 }}
                >
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-[0_4px_16px_rgba(99,102,241,0.28)]" style={{ background: "linear-gradient(135deg,#6366f1,#a5b4fc)" }}>
                    <Moon size={18} color="#fff" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-[var(--text-soft)] font-semibold">Moon Sign</p>
                    <p className="text-base font-bold text-[var(--text-heading)] mt-0.5">{moonSign}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════
          MAIN CONTENT — 2 columns
      ══════════════════════════ */}
      <section className="section">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

          <div className="grid lg:grid-cols-5 gap-8 items-start">

            {/* ── LEFT COLUMN (3/5): Chart + Interpretation ── */}
            <div className="lg:col-span-3 flex flex-col gap-7">

              {/* Rashi Chart Card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="card"
                style={{ boxShadow: "var(--shadow-md)", padding: "1.8rem" }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-[var(--text-heading)]" style={{ fontFamily:"'Poppins',sans-serif" }}>
                      Rashi Chart
                    </h2>
                    <p className="text-xs text-[var(--text-soft)] mt-0.5">(Lagna) — North Indian Style</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.96 }}
                    onClick={handleDownload}
                    className="flex items-center gap-2 text-xs font-semibold text-[var(--primary)] bg-[var(--accent-bg)] px-4 py-2 rounded-full border border-[var(--accent-border)] hover:shadow-sm transition-all"
                  >
                    <Download size={12} /> Export Chart
                  </motion.button>
                </div>

                {/* Chart SVG — large & centered */}
                <div className="flex justify-center items-center py-4">
                  <div style={{ width: "100%", maxWidth: 380, aspectRatio: "1/1" }}>
                    <RashiChart zodiac={zodiac} />
                  </div>
                </div>

                {/* Ascendant + Nakshatra */}
                <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-[var(--border-soft)]">
                  <div className="bg-[var(--bg-soft)] rounded-2xl px-5 py-4">
                    <p className="text-[9px] uppercase tracking-widest text-[var(--text-soft)] font-semibold mb-1">Ascendant</p>
                    <p className="text-base font-bold text-[var(--text-heading)]">{zodiac} 1° 4′ 27″</p>
                  </div>
                  <div className="bg-[var(--bg-soft)] rounded-2xl px-5 py-4">
                    <p className="text-[9px] uppercase tracking-widest text-[var(--text-soft)] font-semibold mb-1">Nakshatra</p>
                    <p className="text-base font-bold text-[var(--text-heading)]">Purva Phalguni</p>
                  </div>
                </div>
              </motion.div>

              {/* Interpretation Summary */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2
                  className="text-xl font-bold text-[var(--text-heading)] mb-4"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Interpretation Summary
                </h2>

                <div className="flex flex-col gap-3">
                  {interpretations.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28 + i * 0.07 }}
                      className="card"
                      style={{ boxShadow: "var(--shadow-sm)", padding: "1.2rem 1.5rem" }}
                    >
                      <button
                        className="w-full flex items-center justify-between gap-4 text-left"
                        onClick={() => setOpenSection(openSection === i ? -1 : i)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-[var(--accent-bg)] border border-[var(--accent-border)] flex items-center justify-center text-base flex-shrink-0">
                            {item.icon}
                          </div>
                          <span className="text-base font-bold text-[var(--text-heading)]">{item.title}</span>
                        </div>
                        <motion.span
                          animate={{ rotate: openSection === i ? 180 : 0 }}
                          transition={{ duration: 0.22 }}
                          style={{ display: "flex", flexShrink: 0 }}
                        >
                          <ChevronDown size={16} style={{ color: "var(--text-soft)" }} />
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {openSection === i && (
                          <motion.div
                            key="body"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                          >
                            <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-3 pt-3 border-t border-[var(--border-soft)]">
                              {item.text}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN (2/5): Planetary Table + CTA ── */}
            <div className="lg:col-span-2 flex flex-col gap-7">

              {/* Planetary Positions */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="card"
                style={{ boxShadow: "var(--shadow-md)", padding: "1.8rem" }}
              >
                <h2 className="text-lg font-bold text-[var(--text-heading)] mb-5" style={{ fontFamily: "'Poppins',sans-serif" }}>
                  Planetary Positions
                </h2>

                {/* Table header */}
                <div className="grid grid-cols-4 gap-2 pb-3 border-b-2 border-[var(--border-soft)] mb-1">
                  {["Planet","Rāśi","Degree","House"].map(h => (
                    <p key={h} className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-soft)]">{h}</p>
                  ))}
                </div>

                {/* Rows */}
                {planetaryData.map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.22 + i * 0.06 }}
                    whileHover={{ backgroundColor: "rgba(255,98,0,0.03)", borderRadius: "0.75rem" }}
                    className="grid grid-cols-4 gap-2 py-3 border-b border-[var(--border-soft)] last:border-0 transition-colors duration-150"
                  >
                    <p className="text-sm font-semibold text-[var(--text-heading)] truncate">{row.planet}</p>
                    <p className="text-sm text-[var(--text-muted)]">{row.rasi}</p>
                    <p className="text-sm text-[var(--text-muted)] font-mono">{row.degree}</p>
                    <p className="text-sm font-bold text-[var(--primary)]">{row.house}</p>
                  </motion.div>
                ))}

                {/* View full button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}
                  className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold text-[var(--text-muted)] border border-[var(--border-soft)] bg-[var(--bg-soft)] hover:border-[var(--accent-border)] hover:text-[var(--primary)] transition-all duration-200"
                >
                  View Full Ashtakvarga Chart <ArrowRight size={13} />
                </motion.button>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { label: "Ascendant",  value: `${zodiac} 1°4′`, icon: <Star size={15}/> },
                  { label: "Nakshatra",  value: "Purva Phalguni", icon: <Sparkles size={15}/> },
                  { label: "Dasha",      value: "Sun Mahadasha",  icon: <Sun size={15}/> },
                  { label: "Yoga",       value: "Raj Yoga",        icon: <Shield size={15}/> },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.32 + i * 0.06 }}
                    whileHover={{ y: -4 }}
                    className="card-soft"
                    style={{ padding: "1.1rem" }}
                  >
                    <div className="w-8 h-8 rounded-xl bg-[var(--accent-bg)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--primary)] mb-3">
                      {stat.icon}
                    </div>
                    <p className="text-[9px] uppercase tracking-widest text-[var(--text-soft)] font-semibold">{stat.label}</p>
                    <p className="text-sm font-bold text-[var(--text-heading)] mt-1 leading-tight">{stat.value}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="relative rounded-[1.5rem] overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 55%, var(--primary-light) 100%)",
                  boxShadow: "0 16px 48px rgba(165,61,0,0.32)",
                  padding: "2rem 1.8rem",
                }}
              >
                {/* glow orb */}
                <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full pointer-events-none"
                  style={{ background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 65%)" }} />

                <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-orange-200 mb-2">Expert Guidance</p>
                  <h3 className="text-xl font-bold text-white mb-3 leading-snug" style={{ fontFamily: "'Poppins',sans-serif" }}>
                    Ready to unlock the deeper mysteries?
                  </h3>
                  <p className="text-sm text-orange-100 leading-relaxed mb-6">
                    Join an expert Vedic astrologer for a 60-minute session to explore your career, finance, and relationship transits for the upcoming year.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm"
                    style={{ background: "#fff", color: "var(--primary-dark)", boxShadow: "0 6px 24px rgba(0,0,0,0.18)" }}
                  >
                    <MessageSquare size={14} /> Deep Dive Consultation
                  </motion.button>
                </div>
              </motion.div>

            </div>{/* end right col */}
          </div>{/* end grid */}

          {/* ══════════════════════════
              BOTTOM ACTION BUTTONS
          ══════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-14 pt-10 border-t border-[var(--border-soft)]"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/kundli")}
              className="btn-primary flex items-center gap-2.5"
            >
              <RefreshCw size={15} /> Generate Another Kundli
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
              onClick={handleDownload}
              className="flex items-center gap-2.5 px-7 py-3 rounded-full font-semibold border border-[var(--accent-border)] text-[var(--primary)] bg-transparent hover:bg-[var(--accent-bg)] transition-all duration-200"
            >
              <Download size={15} /> Download PDF
            </motion.button>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default KundliResult;