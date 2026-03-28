import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Color palette (warm cream + purple + orange, no blue) ────────────────────
const P = {
  bg:         "#faf8f2",
  card:       "#ffffff",
  accent:     "#7c3aed",
  accentSoft: "rgba(124,58,237,0.08)",
  gold:       "#f59e0b",
  orange:     "#ea580c",
  text:       "#1c1917",
  textMid:    "#78716c",
  textLight:  "#a8a29e",
  border:     "rgba(0,0,0,0.07)",
  live:       "#16a34a",
  liveBg:     "#dcfce7",
  awayBg:     "#f5f5f4",
};

// ── Specialty colors (warm tones) ────────────────────────────────────────────
const SPEC = {
  Tarot:      { color: "#b45309", bg: "rgba(180,83,9,0.10)"   },
  Numerology: { color: "#9333ea", bg: "rgba(147,51,234,0.10)" },
  Palmistry:  { color: "#c2410c", bg: "rgba(194,65,12,0.10)"  },
  Vedic:      { color: "#7c3aed", bg: "rgba(124,58,237,0.10)" },
  Vastu:      { color: "#a16207", bg: "rgba(161,98,7,0.10)"   },
  Psychic:    { color: "#86198f", bg: "rgba(134,25,143,0.10)" },
  KP:         { color: "#92400e", bg: "rgba(146,64,14,0.10)"  },
};

const ALL_SPECIALTIES = ["All Experts", "Vedic", "Tarot", "Numerology", "Vastu", "Palmistry"];

// ── Derive status from real DB booleans ──────────────────────────────────────
const getStatus = (a) => {
  if (a.isOnline && !a.isBusy) return "Live";
  if (a.isOnline && a.isBusy)  return "Busy";
  return "Away";
};

// ── Skeleton ─────────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden bg-white shadow-sm" style={{ border: `1px solid ${P.border}` }}>
    <div className="p-4 flex gap-3">
      <div className="w-[72px] h-[72px] rounded-2xl flex-shrink-0" style={{ background: "#f5f5f4", animation: "skpulse 1.5s ease-in-out infinite" }} />
      <div className="flex-1 space-y-2 pt-1">
        {[["3/4"], ["1/2"], ["2/3"]].map(([w], i) => (
          <div key={i} className={`h-3 rounded-full w-${w}`} style={{ background: "#f5f5f4", animation: "skpulse 1.5s ease-in-out infinite" }} />
        ))}
      </div>
    </div>
    <div className="px-4 pb-4 flex gap-2">
      <div className="h-12 rounded-xl flex-1" style={{ background: "#f5f5f4", animation: "skpulse 1.5s ease-in-out infinite" }} />
      <div className="h-12 rounded-xl flex-1" style={{ background: "#fef3c7", animation: "skpulse 1.5s ease-in-out infinite" }} />
    </div>
  </div>
);

// ── Status Pill ───────────────────────────────────────────────────────────────
const StatusPill = ({ status }) => {
  const cfg = {
    Live: { bg: P.liveBg,  color: P.live,    dot: "#22c55e", label: "LIVE" },
    Busy: { bg: "#fef3c7", color: "#d97706",  dot: "#f59e0b", label: "BUSY" },
    Away: { bg: P.awayBg,  color: P.textMid, dot: "#a8a29e", label: "AWAY" },
  }[status] || { bg: P.awayBg, color: P.textMid, dot: "#a8a29e", label: "AWAY" };

  return (
    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider"
      style={{ background: cfg.bg, color: cfg.color }}>
      <motion.span
        animate={status === "Live" ? { opacity: [1, 0.2, 1] } : {}}
        transition={{ duration: 1.4, repeat: Infinity }}
        className="w-1.5 h-1.5 rounded-full inline-block"
        style={{ background: cfg.dot }}
      />
      {cfg.label}
    </div>
  );
};

// ── Expert Card ───────────────────────────────────────────────────────────────
const ExpertCard = ({ expert, index, onCall, onChat }) => {
  const [imgErr, setImgErr] = useState(false);

  // ── Real DB field mapping ─────────────────────────────────────────
  const name       = expert.userId?.name || expert.name || "Expert";
  const bio        = expert.bio          || "";
  const rating     = Number(expert.averageRating ?? expert.rating ?? 0).toFixed(1);
  const reviews    = expert.totalReviews ?? expert.reviewCount ?? 0;
  const expYrs     = expert.experienceYears ?? 0;
  const langs      = expert.languages    ?? [];
  const specs      = expert.specialties  ?? [];
  const priceCall  = expert.pricePerMinute ?? 0;
  const priceChat  = expert.chatPricePerMinute ?? Math.round(priceCall * 0.75);
  const imgSrc     = expert.profileImage ?? "";
  const status     = getStatus(expert);
  const isLive     = status === "Live";

  const fmt = (n) => `₹${n}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ delay: index * 0.045, type: "spring", stiffness: 220, damping: 24 }}
      whileHover={{ y: -5, boxShadow: "0 20px 48px rgba(124,58,237,0.14)" }}
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: P.card,
        border: `1px solid ${P.border}`,
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
      }}
    >
      {/* ── Info section ── */}
      <div className="p-4 flex gap-3 flex-1">

        {/* Avatar column */}
        <div className="relative flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-[72px] h-[72px] rounded-2xl overflow-hidden"
            style={{ boxShadow: `0 0 0 2.5px rgba(124,58,237,0.15), 0 4px 16px rgba(124,58,237,0.18)` }}
          >
            {imgSrc && !imgErr ? (
              <img src={imgSrc} alt={name} className="w-full h-full object-cover" onError={() => setImgErr(true)} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl"
                style={{ background: "linear-gradient(135deg,#fef3c7,#ede9fe)" }}>🧘</div>
            )}
          </motion.div>
          {/* Status pinned below avatar */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
            <StatusPill status={status} />
          </div>
        </div>

        {/* Text column */}
        <div className="flex-1 min-w-0">
          {/* Name + rating */}
          <div className="flex items-start justify-between gap-1">
            <h3 className="font-bold text-sm leading-snug truncate"
              style={{ color: P.text, fontFamily: "'Georgia',serif" }}>
              {name}
            </h3>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ background: "#fffbeb", border: "1px solid #fde68a" }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-[11px] font-bold" style={{ color: "#92400e" }}>{rating}</span>
              {reviews > 0 && (
                <span className="text-[9px]" style={{ color: P.textLight }}>({reviews})</span>
              )}
            </div>
          </div>

          {/* Specialty pills */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {specs.slice(0, 2).map((sp) => {
              const m = SPEC[sp] || { color: P.accent, bg: P.accentSoft };
              return (
                <span key={sp} className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: m.bg, color: m.color }}>
                  {sp}
                </span>
              );
            })}
            {specs.length > 2 && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: P.accentSoft, color: P.accent }}>
                +{specs.length - 2}
              </span>
            )}
          </div>

          {/* Experience + languages */}
          <div className="flex flex-wrap items-center gap-3 mt-2 text-[11px] font-medium"
            style={{ color: P.textLight }}>
            {expYrs > 0 && (
              <span className="flex items-center gap-1">
                <svg width="11" height="11" fill="none" stroke={P.accent} strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {expYrs} yrs
              </span>
            )}
            {langs.length > 0 && (
              <span className="flex items-center gap-1">
                <svg width="11" height="11" fill="none" stroke={P.accent} strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                {langs.slice(0, 2).map((l) => l.charAt(0).toUpperCase() + l.slice(1)).join(", ")}
              </span>
            )}
          </div>

          {/* Bio snippet */}
          {bio && (
            <p className="text-[10px] mt-1.5 leading-relaxed line-clamp-2"
              style={{ color: P.textMid }}>{bio}</p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px mx-4"
        style={{ background: "linear-gradient(90deg,transparent,rgba(124,58,237,0.1),transparent)" }} />

      {/* ── CTA buttons ── */}
      <div className="p-3 flex gap-2">
        {/* Call Expert */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: isLive ? 1.03 : 1 }}
          onClick={() => isLive && onCall?.(expert)}
          disabled={!isLive}
          className="flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl"
          style={{
            background: isLive ? P.accentSoft : "#f5f5f4",
            border: `1.5px solid ${isLive ? "rgba(124,58,237,0.22)" : "#e7e5e4"}`,
            cursor: isLive ? "pointer" : "not-allowed",
          }}
        >
          <span className="text-xs font-extrabold"
            style={{ color: isLive ? P.accent : P.textLight }}>
            {fmt(priceCall)}/min
          </span>
          <span className="text-[9px] font-bold tracking-wider uppercase mt-0.5"
            style={{ color: isLive ? P.accent : P.textLight, opacity: 0.7 }}>
            {isLive ? "Call Expert" : "Unavailable"}
          </span>
        </motion.button>

        {/* Chat Now / Notify Me */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          onClick={() => isLive && onChat?.(expert)}
          className="flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl relative overflow-hidden"
          style={
            isLive
              ? { background: "linear-gradient(135deg,#f59e0b,#ea580c)", cursor: "pointer" }
              : { background: P.accentSoft, border: `1.5px solid rgba(124,58,237,0.15)`, cursor: "default" }
          }
        >
          {isLive && (
            <motion.span
              animate={{ x: ["-130%", "220%"] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(90deg,transparent 20%,rgba(255,255,255,0.35) 50%,transparent 80%)" }}
            />
          )}
          <span className="text-xs font-extrabold relative z-10"
            style={{ color: isLive ? "#fff" : P.accent }}>
            {isLive ? `${fmt(priceChat)}/min` : "Notify Me"}
          </span>
          <span className="text-[9px] font-bold tracking-wider uppercase mt-0.5 relative z-10"
            style={{ color: isLive ? "rgba(255,255,255,0.85)" : P.accent, opacity: 0.8 }}>
            {isLive ? "Chat Now" : "When Online"}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const AstrologerList = () => {
  const [astrologers, setAstrologers]     = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [search, setSearch]               = useState("");
  const [activeFilter, setActiveFilter]   = useState("All Experts");
  const [sortBy, setSortBy]               = useState("rating");
  const [showSort, setShowSort]           = useState(false);
  const [page, setPage]                   = useState(1);
  const PER_PAGE = 6;

  // ── Fetch ──────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5001/api/astrologer", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error("Failed to fetch astrologers");
        const data = await res.json();
        setAstrologers(Array.isArray(data) ? data : data.astrologers ?? []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => { setPage(1); }, [search, activeFilter, sortBy]);

  // ── Filter + sort ──────────────────────────────────────────────────
  const filtered = astrologers
    .filter((a) => {
      const q    = search.toLowerCase();
      const name = (a.userId?.name || a.name || "").toLowerCase();
      const matchSearch =
        !q ||
        name.includes(q) ||
        a.bio?.toLowerCase().includes(q) ||
        a.specialties?.some((s) => s.toLowerCase().includes(q)) ||
        a.languages?.some((l) => l.toLowerCase().includes(q));
      const matchFilter =
        activeFilter === "All Experts" || a.specialties?.includes(activeFilter);
      return matchSearch && matchFilter;
    })
    .sort((a, b) => {
      if (sortBy === "price_asc")   return (a.pricePerMinute || 0) - (b.pricePerMinute || 0);
      if (sortBy === "price_desc")  return (b.pricePerMinute || 0) - (a.pricePerMinute || 0);
      if (sortBy === "experience")  return (b.experienceYears || 0) - (a.experienceYears || 0);
      return (b.averageRating ?? b.rating ?? 0) - (a.averageRating ?? a.rating ?? 0);
    });

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore   = paginated.length < filtered.length;
  const liveCount = astrologers.filter((a) => a.isOnline && !a.isBusy).length;

  const sortOptions = [
    { value: "rating",     label: "Top Rated"         },
    { value: "experience", label: "Most Experienced"   },
    { value: "price_asc",  label: "Price: Low → High" },
    { value: "price_desc", label: "Price: High → Low" },
  ];

  // Replace with your router / modal
  const handleCall = (expert) => alert(`📞 Calling ${expert.userId?.name || expert.name}`);
  const handleChat = (expert) => alert(`💬 Chatting with ${expert.userId?.name || expert.name}`);

  return (
    <div className="min-h-screen" style={{ background: P.bg, fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes skpulse { 0%,100%{opacity:1} 50%{opacity:0.45} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: rgba(124,58,237,0.25); border-radius: 9px; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 py-10">

        {/* ── Header ────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">

          {/* Eyebrow pill */}
          <div className="flex justify-start mb-4">
            <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest"
              style={{ background: "#fef3c7", color: P.orange, border: "1px solid #fed7aa" }}>
              ✦ CONNECT WITH EXPERTS
            </div>
          </div>

          {/* Title + search row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div>
              <h1 className="text-3xl font-extrabold leading-tight"
                style={{ color: P.text, fontFamily: "'Georgia',serif" }}>
                Consult with the{" "}
                <span style={{ color: P.accent }}>Stars</span>
              </h1>
              <p className="text-sm mt-1 max-w-sm" style={{ color: P.textMid }}>
                Connect with renowned astrologers and cosmic guides for personalized readings.
              </p>
              {!loading && liveCount > 0 && (
                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold" style={{ color: P.live }}>
                  <motion.span
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ background: P.live }}
                  />
                  {liveCount} expert{liveCount !== 1 ? "s" : ""} available now
                </div>
              )}
            </div>

            {/* Search bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl sm:w-64"
              style={{ background: "white", border: `1.5px solid ${P.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
              <svg width="14" height="14" fill="none" stroke={P.textLight} strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, specialty…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: P.text }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ color: P.textLight }}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filter pills + sort */}
          <div className="flex flex-wrap items-center gap-2 mt-5">
            {ALL_SPECIALTIES.map((sp) => {
              const active = activeFilter === sp;
              const m = SPEC[sp];
              return (
                <motion.button
                  key={sp}
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.04 }}
                  onClick={() => setActiveFilter(sp)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200"
                  style={
                    active
                      ? {
                          background: sp === "All Experts" ? P.accent : (m?.color ?? P.accent),
                          color: "#fff",
                          boxShadow: `0 4px 14px ${(m?.color ?? P.accent)}44`,
                        }
                      : { background: "white", color: P.textMid, border: `1.5px solid ${P.border}` }
                  }
                >
                  {sp}
                </motion.button>
              );
            })}

            {/* Sort dropdown */}
            <div className="relative ml-auto">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowSort((v) => !v)}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold"
                style={{ background: "white", border: `1.5px solid ${P.border}`, color: P.textMid }}
              >
                <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
                {sortOptions.find((o) => o.value === sortBy)?.label}
                <motion.svg
                  animate={{ rotate: showSort ? 180 : 0 }} transition={{ duration: 0.2 }}
                  width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </motion.button>

              <AnimatePresence>
                {showSort && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-10 z-50 rounded-2xl overflow-hidden min-w-[190px]"
                    style={{ background: "white", boxShadow: "0 12px 32px rgba(0,0,0,0.12)", border: `1px solid ${P.border}` }}
                  >
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm font-medium transition-colors"
                        style={{
                          color:      sortBy === opt.value ? P.accent : "#4b5563",
                          background: sortBy === opt.value ? P.accentSoft : "transparent",
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Count */}
          {!loading && !error && (
            <p className="text-xs font-medium mt-3" style={{ color: P.textLight }}>
              Showing {Math.min(paginated.length, filtered.length)} of {filtered.length} expert{filtered.length !== 1 ? "s" : ""}
            </p>
          )}
        </motion.div>

        {/* ── Error ──────────────────────────────────────────────────── */}
        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="font-semibold mb-4" style={{ color: "#ef4444" }}>{error}</p>
            <button onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-full text-sm font-bold text-white"
              style={{ background: P.accent }}>
              Retry
            </button>
          </motion.div>
        )}

        {/* ── Skeletons ──────────────────────────────────────────────── */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* ── Empty ──────────────────────────────────────────────────── */}
        {!loading && !error && filtered.length === 0 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <p className="font-bold text-lg" style={{ color: P.text }}>No experts found</p>
            <p className="text-sm mt-1" style={{ color: P.textMid }}>Try adjusting your search or filters</p>
            <button
              onClick={() => { setSearch(""); setActiveFilter("All Experts"); }}
              className="mt-5 px-6 py-2.5 rounded-full text-sm font-bold text-white"
              style={{ background: `linear-gradient(135deg,${P.accent},#a855f7)` }}>
              Clear Filters
            </button>
          </motion.div>
        )}

        {/* ── Cards grid ─────────────────────────────────────────────── */}
        {!loading && !error && filtered.length > 0 && (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {paginated.map((expert, i) => (
                  <ExpertCard
                    key={expert._id}
                    expert={expert}
                    index={i}
                    onCall={handleCall}
                    onChat={handleChat}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Load more */}
            {hasMore && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center mt-10">
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setPage((p) => p + 1)}
                  className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg,${P.accent} 0%,#a855f7 100%)`,
                    boxShadow: "0 8px 24px rgba(124,58,237,0.3)",
                  }}
                >
                  View All Astrologers
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AstrologerList;