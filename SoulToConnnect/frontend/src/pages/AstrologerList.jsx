import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Phone, MessageCircle, Clock, Globe, ChevronRight, ArrowRight, Sparkles, Award, Users, SlidersHorizontal, Search, X } from "lucide-react";

/* ─── Design tokens mapped to CSS vars ────────────────────────────────────── */
// All color references use var(--*) only — no raw hex

/* ─── Status config ─────────────────────────────────────────────────────── */
const getStatus = (a) => {
  if (a.isOnline && !a.isBusy) return "Live";
  if (a.isOnline && a.isBusy)  return "Busy";
  return "Away";
};

const STATUS_CFG = {
  Live: { label: "ONLINE",   dotClass: "bg-green-500",  textColor: "#16a34a", bgColor: "rgba(34,197,94,0.10)",  borderColor: "rgba(34,197,94,0.25)"  },
  Busy: { label: "BUSY",     dotClass: "bg-amber-400",  textColor: "#d97706", bgColor: "rgba(251,191,36,0.10)", borderColor: "rgba(251,191,36,0.25)" },
  Away: { label: "OFFLINE",  dotClass: "bg-gray-400",   textColor: "#9ca3af", bgColor: "rgba(156,163,175,0.10)",borderColor: "rgba(156,163,175,0.2)" },
};

/* ─── Section Label (matches Home.jsx) ──────────────────────────────────── */
const SLabel = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
    style={{
      background: "var(--accent-bg)",
      color: "var(--primary-light)",
      border: "1px solid var(--accent-border)",
    }}
  >
    {children}
  </motion.div>
);

/* ─── Skeleton Card ──────────────────────────────────────────────────────── */
const SkeletonCard = ({ i }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.06 }}
    className="card overflow-hidden"
    style={{ animationName: "pulse" }}
  >
    <div className="flex gap-4 mb-4">
      <div className="w-20 h-20 rounded-2xl flex-shrink-0"
        style={{ background: "var(--bg-high)", animation: "skpulse 1.6s ease-in-out infinite" }} />
      <div className="flex-1 space-y-2 pt-1">
        <div className="h-4 rounded-full w-3/4" style={{ background: "var(--bg-high)", animation: "skpulse 1.6s ease-in-out infinite" }} />
        <div className="h-3 rounded-full w-1/2" style={{ background: "var(--bg-high)", animation: "skpulse 1.6s ease-in-out infinite" }} />
        <div className="h-3 rounded-full w-2/3" style={{ background: "var(--bg-high)", animation: "skpulse 1.6s ease-in-out infinite" }} />
      </div>
    </div>
    <div className="flex gap-2">
      <div className="h-11 rounded-xl flex-1" style={{ background: "var(--bg-high)", animation: "skpulse 1.6s ease-in-out infinite" }} />
      <div className="h-11 rounded-xl flex-1" style={{ background: "var(--accent-bg)", animation: "skpulse 1.6s ease-in-out infinite" }} />
    </div>
  </motion.div>
);

/* ─── Status Pill ────────────────────────────────────────────────────────── */
const StatusPill = ({ status }) => {
  const cfg = STATUS_CFG[status] || STATUS_CFG.Away;
  return (
    <div
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-widest"
      style={{ background: cfg.bgColor, color: cfg.textColor, border: `1px solid ${cfg.borderColor}` }}
    >
      <motion.span
        animate={status === "Live" ? { opacity: [1, 0.25, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`w-1.5 h-1.5 rounded-full inline-block ${cfg.dotClass}`}
      />
      {cfg.label}
    </div>
  );
};

/* ─── Expert Card ────────────────────────────────────────────────────────── */
const ExpertCard = ({ expert, index, onCall, onChat }) => {
  const [imgErr, setImgErr] = useState(false);
  const [hovered, setHovered] = useState(false);

  const name      = expert.userId?.name || expert.name || "Expert";
  const bio       = expert.bio || "";
  const rating    = Number(expert.averageRating ?? expert.rating ?? 0).toFixed(1);
  const reviews   = expert.totalReviews ?? expert.reviewCount ?? 0;
  const expYrs    = expert.experienceYears ?? 0;
  const langs     = expert.languages ?? [];
  const specs     = expert.specialties ?? [];
  const priceCall = expert.pricePerMinute ?? 0;
  const priceChat = expert.chatPricePerMinute ?? Math.round(priceCall * 0.75);
  const imgSrc    = expert.profileImage ?? "";
  const status    = getStatus(expert);
  const isLive    = status === "Live";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 220, damping: 24 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="card flex flex-col relative overflow-hidden group"
      style={{
        boxShadow: hovered
          ? "0 24px 64px rgba(255,98,0,0.12), 0 4px 16px rgba(0,0,0,0.06)"
          : "var(--shadow-sm)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {/* Hover overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[1.5rem] transition-opacity duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(255,98,0,0.03) 0%, transparent 60%)",
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* ── Top: Avatar + Info ── */}
      <div className="flex gap-4 mb-5">

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.06 }}
            className="w-[78px] h-[78px] rounded-2xl overflow-hidden"
            style={{
              boxShadow: "0 0 0 2px var(--accent-border), 0 6px 20px rgba(255,98,0,0.14)",
            }}
          >
            {imgSrc && !imgErr ? (
              <img
                src={imgSrc}
                alt={name}
                className="w-full h-full object-cover"
                onError={() => setImgErr(true)}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-3xl"
                style={{ background: "var(--accent-bg)" }}
              >
                🧘
              </div>
            )}
          </motion.div>
          {/* Status pinned bottom of avatar */}
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-10 whitespace-nowrap">
            <StatusPill status={status} />
          </div>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 pt-0.5">
          {/* Name + star rating */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              className="font-bold text-sm leading-snug truncate"
              style={{ color: "var(--text-heading)", fontFamily: "Poppins, sans-serif" }}
            >
              {name}
            </h3>
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ background: "var(--accent-bg)", border: "1px solid rgba(255,98,0,0.18)" }}
            >
              <Star size={10} style={{ color: "#facc15", fill: "#facc15" }} />
              <span className="text-[11px] font-bold" style={{ color: "var(--primary)" }}>{rating}</span>
              {reviews > 0 && (
                <span className="text-[9px]" style={{ color: "var(--text-soft)" }}>({reviews})</span>
              )}
            </div>
          </div>

          {/* Specialty pills */}
          <div className="flex flex-wrap gap-1 mb-2">
            {specs.slice(0, 2).map((sp) => (
              <span
                key={sp}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "var(--accent-bg)", color: "var(--primary-light)", border: "1px solid var(--accent-border)" }}
              >
                {sp}
              </span>
            ))}
            {specs.length > 2 && (
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "var(--accent-bg)", color: "var(--primary-light)" }}
              >
                +{specs.length - 2}
              </span>
            )}
          </div>

          {/* Exp + Languages */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium" style={{ color: "var(--text-soft)" }}>
            {expYrs > 0 && (
              <span className="flex items-center gap-1">
                <Clock size={11} style={{ color: "var(--primary-light)" }} />
                {expYrs} yrs exp
              </span>
            )}
            {langs.length > 0 && (
              <span className="flex items-center gap-1">
                <Globe size={11} style={{ color: "var(--primary-light)" }} />
                {langs.slice(0, 2).map(l => l.charAt(0).toUpperCase() + l.slice(1)).join(", ")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      {bio && (
        <p
          className="text-xs leading-relaxed mb-4 line-clamp-2"
          style={{ color: "var(--text-muted)", fontStyle: "italic", lineHeight: "1.7" }}
        >
          "{bio}"
        </p>
      )}

      {/* Divider */}
      <div
        className="mb-4"
        style={{ height: "1px", background: "linear-gradient(90deg, transparent, var(--accent-border), transparent)" }}
      />

      {/* ── CTA Buttons ── */}
      <div className="flex gap-2.5 mt-auto">

        {/* Call */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={isLive ? { scale: 1.03, y: -2 } : {}}
          onClick={() => isLive && onCall?.(expert)}
          disabled={!isLive}
          className="flex-1 flex flex-col items-center justify-center py-3 rounded-2xl transition-all duration-200"
          style={{
            background: isLive ? "var(--accent-bg)" : "var(--bg-soft)",
            border: `1.5px solid ${isLive ? "rgba(255,98,0,0.25)" : "var(--border-soft)"}`,
            cursor: isLive ? "pointer" : "not-allowed",
          }}
        >
          <Phone size={14} style={{ color: isLive ? "var(--primary-light)" : "var(--text-soft)", marginBottom: "3px" }} />
          <span className="text-[11px] font-extrabold" style={{ color: isLive ? "var(--primary-light)" : "var(--text-soft)" }}>
            ₹{priceCall}/min
          </span>
          <span
            className="text-[9px] font-bold uppercase tracking-wider mt-0.5"
            style={{ color: isLive ? "var(--primary)" : "var(--text-soft)", opacity: 0.75 }}
          >
            {isLive ? "Call Expert" : "Unavailable"}
          </span>
        </motion.button>

        {/* Chat / Consult Now */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: isLive ? 1.03 : 1, y: isLive ? -2 : 0 }}
          onClick={() => isLive && onChat?.(expert)}
          className="flex-1 flex flex-col items-center justify-center py-3 rounded-2xl relative overflow-hidden transition-all duration-200"
          style={
            isLive
              ? { background: "var(--gradient-primary)", cursor: "pointer", boxShadow: "0 6px 20px rgba(255,98,0,0.3)" }
              : { background: "var(--bg-soft)", border: "1.5px solid var(--border-soft)", cursor: "default" }
          }
        >
          {/* Shimmer */}
          {isLive && (
            <motion.span
              animate={{ x: ["-130%", "220%"] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.3) 50%, transparent 80%)" }}
            />
          )}
          <MessageCircle
            size={14}
            style={{ color: isLive ? "#fff" : "var(--text-soft)", marginBottom: "3px" }}
            className="relative z-10"
          />
          <span
            className="text-[11px] font-extrabold relative z-10"
            style={{ color: isLive ? "#fff" : "var(--text-soft)" }}
          >
            {isLive ? `₹${priceChat}/min` : "Notify Me"}
          </span>
          <span
            className="text-[9px] font-bold uppercase tracking-wider mt-0.5 relative z-10"
            style={{ color: isLive ? "rgba(255,255,255,0.85)" : "var(--text-soft)", opacity: 0.85 }}
          >
            {isLive ? "Consult Now" : "When Online"}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

/* ─── Main Page ──────────────────────────────────────────────────────────── */
const AstrologerList = () => {
  const [astrologers, setAstrologers]   = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [search, setSearch]             = useState("");
  const [activeFilter, setActiveFilter] = useState("All Experts");
  const [sortBy, setSortBy]             = useState("rating");
  const [showSort, setShowSort]         = useState(false);
  const [page, setPage]                 = useState(1);
  const PER_PAGE = 6;

  const ALL_SPECIALTIES = ["All Experts", "Vedic", "Tarot", "Numerology", "Vastu", "Palmistry"];

  const sortOptions = [
    { value: "rating",     label: "Top Rated"          },
    { value: "experience", label: "Most Experienced"    },
    { value: "price_asc",  label: "Price: Low → High"  },
    { value: "price_desc", label: "Price: High → Low"  },
  ];

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/astrologer`, {
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

  const filtered = astrologers
    .filter((a) => {
      const q = search.toLowerCase();
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
      if (sortBy === "price_asc")  return (a.pricePerMinute || 0) - (b.pricePerMinute || 0);
      if (sortBy === "price_desc") return (b.pricePerMinute || 0) - (a.pricePerMinute || 0);
      if (sortBy === "experience") return (b.experienceYears || 0) - (a.experienceYears || 0);
      return (b.averageRating ?? b.rating ?? 0) - (a.averageRating ?? a.rating ?? 0);
    });

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore   = paginated.length < filtered.length;
  const liveCount = astrologers.filter((a) => a.isOnline && !a.isBusy).length;

  const handleCall = (expert) => alert(`📞 Calling ${expert.userId?.name || expert.name}`);
  const handleChat = (expert) => alert(`💬 Chatting with ${expert.userId?.name || expert.name}`);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-soft)" }}>
      <style>{`
        @keyframes skpulse { 0%,100%{opacity:1} 50%{opacity:0.45} }
      `}</style>

      {/* ═══════════════════════════════════
          HERO HEADER
      ═══════════════════════════════════ */}
      <section className="relative overflow-hidden pt-20 pb-12"
        style={{ background: "var(--bg)" }}>

        {/* Ambient blobs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,98,0,0.09) 0%, transparent 65%)", filter: "blur(60px)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(255,140,58,0.07) 0%, transparent 65%)", filter: "blur(55px)" }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SLabel><Sparkles size={12} /> Divine Guidance</SLabel>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="font-bold tracking-tight mb-4"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                letterSpacing: "-0.04em",
                color: "var(--text-heading)",
                lineHeight: 1.1,
              }}
            >
              Find Your{" "}
              <motion.span
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  background: "linear-gradient(90deg, var(--primary-dark), var(--primary-light), var(--primary), var(--primary-light))",
                  backgroundSize: "220% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Celestial Guide
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-base mx-auto mb-8 max-w-lg"
              style={{ color: "var(--text-muted)", lineHeight: "1.75" }}
            >
              Connect with world-renowned astrologers and spiritual masters chosen
              for their profound wisdom and ethical practice.
            </motion.p>

            {/* Search bar */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-3 mx-auto mb-4 rounded-2xl px-5 py-3.5"
              style={{
                background: "var(--bg-elevated)",
                border: "1.5px solid var(--border-soft)",
                boxShadow: "var(--shadow-md)",
                maxWidth: "520px",
              }}
            >
              <Search size={16} style={{ color: "var(--text-soft)", flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Search by name, specialty, or star sign…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: "var(--text)", fontFamily: "inherit" }}
              />
              {search && (
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSearch("")}
                  style={{ color: "var(--text-soft)" }}
                >
                  <X size={14} />
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="btn-primary text-sm px-5 py-2 flex-shrink-0"
                style={{ borderRadius: "9999px", border: "none", cursor: "pointer" }}
              >
                Explore
              </motion.button>
            </motion.div>

            {/* Live count */}
            {!loading && liveCount > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-2 text-xs font-semibold"
                style={{ color: "#16a34a" }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.25, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 rounded-full inline-block bg-green-500"
                />
                {liveCount} expert{liveCount !== 1 ? "s" : ""} available now
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FILTERS + SORT STRIP
      ═══════════════════════════════════ */}
      <div
        className="sticky top-0 z-40 py-4"
        style={{
          background: "rgba(244,243,241,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border-soft)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {/* Filter pills */}
            {ALL_SPECIALTIES.map((sp) => {
              const active = activeFilter === sp;
              return (
                <motion.button
                  key={sp}
                  whileTap={{ scale: 0.92 }}
                  whileHover={{ scale: 1.04 }}
                  onClick={() => setActiveFilter(sp)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer"
                  style={
                    active
                      ? {
                          background: "var(--gradient-primary)",
                          color: "#fff",
                          boxShadow: "0 4px 14px rgba(255,98,0,0.28)",
                          border: "none",
                        }
                      : {
                          background: "var(--bg-elevated)",
                          color: "var(--text-muted)",
                          border: "1.5px solid var(--border-soft)",
                        }
                  }
                >
                  {sp}
                </motion.button>
              );
            })}

            {/* Spacer */}
            <div className="flex-1" />

            {/* Sort dropdown */}
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => setShowSort((v) => !v)}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold cursor-pointer"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1.5px solid var(--border-soft)",
                  color: "var(--text-muted)",
                }}
              >
                <SlidersHorizontal size={13} />
                {sortOptions.find((o) => o.value === sortBy)?.label}
                <motion.span animate={{ rotate: showSort ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  ▾
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {showSort && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-11 z-50 rounded-2xl overflow-hidden min-w-[200px]"
                    style={{
                      background: "var(--bg-elevated)",
                      boxShadow: "var(--shadow-lg)",
                      border: "1px solid var(--border-soft)",
                    }}
                  >
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setShowSort(false); }}
                        className="w-full text-left px-4 py-3 text-sm font-medium transition-colors"
                        style={{
                          color: sortBy === opt.value ? "var(--primary-light)" : "var(--text-muted)",
                          background: sortBy === opt.value ? "var(--accent-bg)" : "transparent",
                          fontWeight: sortBy === opt.value ? "700" : "500",
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = "var(--bg-soft)"}
                        onMouseLeave={e => e.currentTarget.style.background = sortBy === opt.value ? "var(--accent-bg)" : "transparent"}
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
            <p className="text-xs font-medium mt-2.5" style={{ color: "var(--text-soft)" }}>
              Showing {Math.min(paginated.length, filtered.length)} of {filtered.length} expert{filtered.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════
          GRID CONTENT
      ═══════════════════════════════════ */}
      <section className="section" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="text-6xl mb-5">⚠️</div>
              <p className="font-semibold mb-5 text-red-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary px-7 py-3 text-sm border-0 cursor-pointer"
              >
                Retry
              </button>
            </motion.div>
          )}

          {/* Skeletons */}
          {loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} i={i} />)}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-28"
            >
              <div className="text-6xl mb-5">🔍</div>
              <p className="font-bold text-xl mb-2" style={{ color: "var(--text-heading)", fontFamily: "Poppins, sans-serif" }}>
                No experts found
              </p>
              <p className="text-sm mb-7" style={{ color: "var(--text-muted)" }}>
                Try adjusting your search or filters
              </p>
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { setSearch(""); setActiveFilter("All Experts"); }}
                className="btn-primary px-7 py-3 text-sm border-0 cursor-pointer"
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}

          {/* Cards */}
          {!loading && !error && filtered.length > 0 && (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

              {/* Pagination / Load more */}
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center mt-12"
                >
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    onClick={() => setPage((p) => p + 1)}
                    className="btn-primary flex items-center gap-2.5 px-8 py-3.5 text-sm border-0 cursor-pointer"
                    style={{ boxShadow: "0 8px 28px rgba(255,98,0,0.28)" }}
                  >
                    View All Astrologers
                    <ArrowRight size={16} />
                  </motion.button>
                </motion.div>
              )}
            </>
          )}

        </div>
      </section>
    </div>
  );
};

export default AstrologerList;