import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Star, Phone, MessageCircle, Sparkles, Zap,
  ArrowLeft, Clock, TrendingUp, Heart, Video,
  CheckCircle, Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "../components/auth/AuthModal";
import ChatBox from "./ChatBox";

/* ─── Shared section label ─── */
const SLabel = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-widest"
    style={{
      background: "var(--accent-bg)",
      border: "1px solid var(--accent-border)",
      color: "var(--primary-light)",
    }}
  >
    {children}
  </motion.div>
);

/* ─── Expertise cards data ─── */
const expertiseAreas = [
  {
    icon: Sparkles,
    title: "Vedic Astrology",
    desc: "Deep-rooted Vedic analysis using traditional science to provide accurate life path guidance.",
  },
  {
    icon: Heart,
    title: "Relationship Synastry",
    desc: "Unraveling the soul contracts between you and your partner to navigate love with cosmic clarity.",
  },
  {
    icon: TrendingUp,
    title: "Career Path Readings",
    desc: "Finding your dharma and optimal planetary timing for professional success and enterprise.",
  },
];

const pageVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const AstrologerDetails = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { id } = useParams();

  const [astro, setAstro] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAstrologer, setSelectedAstrologer] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [ratingStats, setRatingStats] = useState({
    avg: 0,
    total: 0,
    breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_URL}/api/astrologer/` + id)
      .then((r) => r.json())
      .then((d) => setAstro(d));
    fetch(`${import.meta.env.VITE_API_URL}/api/review/` + id, {
      headers: { Authorization: "Bearer " + token },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Unauthorized");
        return r.json();
      })
      .then((data) => {
        setReviews(data);
        const total = data.length;
        let sum = 0;
        const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        data.forEach((r) => {
          sum += r.rating;
          breakdown[r.rating]++;
        });
        setRatingStats({
          avg: total ? (sum / total).toFixed(1) : 0,
          total,
          breakdown,
        });
      })
      .catch((err) => console.error("Review fetch error:", err.message));
  }, [id]);

  const handleReviewSubmit = async () => {
    if (!currentUser) return setIsModalOpen(true);
    if (rating === 0) return alert("Please select rating");
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ productId: id, rating, reviewText }),
    });
    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
      return;
    }
    const updated = [data.review, ...reviews];
    setReviews(updated);
    let sum = 0;
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    updated.forEach((r) => {
      sum += r.rating;
      breakdown[r.rating]++;
    });
    setRatingStats({
      avg: (sum / updated.length).toFixed(1),
      total: updated.length,
      breakdown,
    });
    setRating(0);
    setReviewText("");
  };

  /* ─── Loading state ─── */
  if (!astro) {
    return (
      <div
        className="flex flex-col justify-center items-center h-[60vh] gap-4"
        style={{ background: "var(--bg-soft)" }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.1, ease: "linear" }}
          className="w-10 h-10 rounded-full border-4 border-transparent"
          style={{
            borderTopColor: "var(--primary-light)",
            borderRightColor: "var(--primary)",
          }}
        />
        <p
          className="text-sm font-semibold"
          style={{ color: "var(--primary-light)", fontFamily: "Poppins, sans-serif" }}
        >
          Loading expert details...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.45 }}
      className="min-h-screen overflow-x-hidden"
      style={{ background: "var(--bg-soft)" }}
    >
      {/* ══════════════════════════════════════════
          AMBIENT BACKGROUND BLOBS
      ══════════════════════════════════════════ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,98,0,0.08) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.75, 0.4] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-24 -left-24 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,140,58,0.06) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>

        {/* ══════════════════════════════════════════
            HERO — Back + Portrait + Info card
        ══════════════════════════════════════════ */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0">

          {/* Back Button */}
          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-sm font-semibold mb-8 transition-colors duration-200"
            style={{
              color: "var(--text-muted)",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary-light)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            <ArrowLeft size={15} /> Back to Experts
          </motion.button>

          {/* Hero Grid */}
          <div className="flex flex-col lg:flex-row gap-6 items-stretch">

            {/* ── Portrait Card ── */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex-shrink-0 overflow-hidden"
              style={{
                width: "100%",
                maxWidth: 400,
                minHeight: 540,
                borderRadius: "2rem",
                boxShadow: "0 20px 60px rgba(26,28,26,0.14)",
                background: "var(--text-heading)",
              }}
            >
              <img
                src={astro.profileImage || "https://i.pravatar.cc/800?u=" + id}
                alt={astro.userId?.name}
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: 540,
                  objectFit: "cover",
                  objectPosition: "top center",
                  display: "block",
                }}
              />
              {/* bottom vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,5,0,0.45) 0%, transparent 55%)",
                }}
              />
              {/* Online badge */}
              {astro.isOnline && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute top-5 left-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: "rgba(34,197,94,0.18)",
                    border: "1px solid rgba(34,197,94,0.4)",
                    color: "#22c55e",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <motion.span
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-green-400 block"
                  />
                  Online Now
                </motion.div>
              )}
            </motion.div>

            {/* ── Info + Pricing Card ── */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="flex-1 flex flex-col justify-between card"
              style={{ minHeight: 540, padding: "2.5rem" }}
            >
              <div>
                {/* Stars + Reviews */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star
                        key={i}
                        size={14}
                        style={{
                          color: "#facc15",
                          fill:
                            i < Math.round(ratingStats.avg) ? "#facc15" : "none",
                        }}
                      />
                    ))}
                  </div>
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--text-heading)" }}
                  >
                    {ratingStats.avg}/5
                  </span>
                  <span className="text-sm" style={{ color: "var(--text-soft)" }}>
                    ({ratingStats.total} reviews)
                  </span>
                </div>

                {/* Name */}
                <h1
                  className="font-black tracking-tight mb-1"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1.1,
                    color: "var(--text-heading)",
                  }}
                >
                  {astro.userId?.name}
                </h1>

                {/* Specialization */}
                <p
                  className="text-base font-semibold mb-5"
                  style={{ color: "var(--primary-light)" }}
                >
                  {astro.specialization}
                </p>

                {/* Bio — italic with left border */}
                <p
                  className="text-sm leading-relaxed mb-6 italic"
                  style={{
                    color: "var(--text-muted)",
                    lineHeight: "1.85",
                    borderLeft: "3px solid var(--primary-light)",
                    paddingLeft: "1rem",
                    maxWidth: 500,
                  }}
                >
                  "{astro.bio}"
                </p>

                {/* Languages */}
                <div className="flex flex-wrap gap-2 mb-7">
                  {astro.languages.map((lang, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="text-xs px-3 py-1.5 rounded-full font-semibold cursor-default"
                      style={{
                        background: "var(--accent-bg)",
                        border: "1px solid var(--accent-border)",
                        color: "var(--primary)",
                      }}
                    >
                      {lang}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* ── Orange Pricing Card ── */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.55 }}
                className="relative overflow-hidden rounded-2xl p-6"
                style={{
                  background: "var(--gradient-primary)",
                  boxShadow: "0 16px 48px rgba(165,61,0,0.32)",
                }}
              >
                {/* Subtle inner glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 60%)",
                  }}
                />

                {/* Active badge */}
                {astro.isOnline && (
                  <div
                    className="absolute top-5 right-5 px-3 py-1 rounded-full text-xs font-bold"
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.35)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    ACTIVE NOW
                  </div>
                )}

                {/* Investment label */}
                <p
                  className="text-xs font-bold uppercase tracking-widest mb-1 relative z-10"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  Investment
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 mb-5 relative z-10">
                  <span
                    className="font-black text-white"
                    style={{
                      fontSize: "3rem",
                      fontFamily: "Poppins, sans-serif",
                      lineHeight: 1,
                    }}
                  >
                    ₹{astro.pricePerMinute}
                  </span>
                  <span
                    className="text-base font-semibold"
                    style={{ color: "rgba(255,255,255,0.7)" }}
                  >
                    /min
                  </span>
                </div>

                {/* Call options */}
                <div className="space-y-3 mb-5 relative z-10">
                  {/* Voice Call — selected */}
                  <motion.button
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                      currentUser ? navigate("/callscreen") : setIsModalOpen(true)
                    }
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left cursor-pointer border-0"
                    style={{
                      background: "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.25)" }}
                      >
                        <Phone size={16} color="#fff" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white leading-none mb-0.5">
                          Voice Call
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "rgba(255,255,255,0.6)" }}
                        >
                          Secure & Private Connection
                        </p>
                      </div>
                    </div>
                    <div
                      className="w-5 h-5 rounded-full border-2 border-white/70 flex items-center justify-center flex-shrink-0"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    </div>
                  </motion.button>

                  {/* Video Chat — unselected */}
                  <motion.button
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>
                      currentUser
                        ? setSelectedAstrologer(astro.userId?.name || "Astrologer")
                        : setIsModalOpen(true)
                    }
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left cursor-pointer border-0"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: "rgba(255,255,255,0.12)" }}
                      >
                        <Video size={16} color="rgba(255,255,255,0.65)" />
                      </div>
                      <div>
                        <p
                          className="text-sm font-bold leading-none mb-0.5"
                          style={{ color: "rgba(255,255,255,0.75)" }}
                        >
                          Video Chat
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: "rgba(255,255,255,0.45)" }}
                        >
                          Face-to-Face Spiritual Link
                        </p>
                      </div>
                    </div>
                    <div
                      className="w-5 h-5 rounded-full border-2 flex-shrink-0"
                      style={{ borderColor: "rgba(255,255,255,0.3)" }}
                    />
                  </motion.button>
                </div>

                {/* Book CTA */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() =>
                    currentUser
                      ? setSelectedAstrologer(astro.userId?.name || "Astrologer")
                      : setIsModalOpen(true)
                  }
                  className="w-full py-4 rounded-xl text-sm font-bold border-0 cursor-pointer relative z-10"
                  style={{
                    background: "#ffffff",
                    color: "var(--primary-light)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
                    letterSpacing: "0.01em",
                  }}
                >
                  Book a Private Session
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            STATS STRIP
        ══════════════════════════════════════════ */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-5"
          >
            {[
              { value: "${ratingStats.total}+", label: "Total Reviews", icon: "⭐" },
              { value: "${astro.experienceYears} Yrs", label: "Of Experience", icon: "🕐" },
              { value: "98%", label: "Accuracy Rate", icon: "🎯" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, type: "spring", stiffness: 160 }}
                whileHover={{ y: -8, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="card text-center cursor-default"
                style={{ padding: "1.75rem 1rem" }}
              >
                <div className="text-2xl mb-2">{s.icon}</div>
                <div
                  className="font-black mb-1"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
                    background: "var(--gradient-primary)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-soft)" }}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════
            AREAS OF EXPERTISE
        ══════════════════════════════════════════ */}
        <section className="section" style={{ paddingTop: "1rem" }}>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <SLabel>✦ Specialisations</SLabel>
              <h2
                className="text-2xl md:text-3xl font-bold tracking-tight"
                style={{ color: "var(--text-heading)", fontFamily: "Poppins, sans-serif", letterSpacing: "-0.03em" }}
              >
                Areas of Expertise
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-5">
              {expertiseAreas.map((area, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="card group relative overflow-hidden cursor-default"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[1.5rem]"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 0%, rgba(255,98,0,0.06) 0%, transparent 65%)",
                    }}
                  />
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.18 }}
                    transition={{ type: "spring", stiffness: 320 }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      background: "var(--accent-bg)",
                      border: "1px solid var(--accent-border)",
                    }}
                  >
                    <area.icon size={22} style={{ color: "var(--primary-light)" }} />
                  </motion.div>
                  <h3
                    className="font-bold text-base mb-2 relative z-10"
                    style={{ color: "var(--text-heading)", fontFamily: "Poppins, sans-serif" }}
                  >
                    {area.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed relative z-10"
                    style={{ color: "var(--text-muted)", lineHeight: "1.8" }}
                  >
                    {area.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            THE SPIRITUAL JOURNEY
        ══════════════════════════════════════════ */}
        <section style={{ padding: "0 0 5rem" }}>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-soft relative overflow-hidden"
              style={{ padding: "2.5rem" }}
            >
              <div
                className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,98,0,0.05) 0%, transparent 70%)",
                  transform: "translate(30%, -30%)",
                }}
              />
              <SLabel>✦ About</SLabel>
              <h2
                className="text-2xl md:text-3xl font-bold mb-5 tracking-tight"
                style={{ color: "var(--text-heading)", fontFamily: "Poppins, sans-serif", letterSpacing: "-0.03em" }}
              >
                The Spiritual Journey
              </h2>
              <p
                className="text-sm leading-relaxed mb-7 relative z-10"
                style={{ color: "var(--text-muted)", lineHeight: "1.95", maxWidth: 720 }}
              >
                {astro.bio}
              </p>
              <div className="flex gap-2.5 flex-wrap">
                {(astro.specialties || []).map((s, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className="px-4 py-1.5 rounded-full text-xs font-semibold cursor-default"
                    style={{
                      background: "var(--accent-bg)",
                      border: "1px solid var(--accent-border)",
                      color: "var(--primary)",
                    }}
                  >
                    {s}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            RATING DASHBOARD
        ══════════════════════════════════════════ */}
        <section style={{ padding: "0 0 5rem" }}>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card"
              style={{ padding: "2.5rem" }}
            >
              <div className="flex items-center gap-2 mb-7">
                <Star size={18} style={{ color: "#facc15", fill: "#facc15" }} />
                <h2
                  className="text-xl font-bold"
                  style={{ color: "var(--text-heading)", fontFamily: "Poppins, sans-serif" }}
                >
                  Rating &amp; Reviews
                </h2>
              </div>
              <div className="flex flex-col md:flex-row gap-10 items-center">
                {/* Avg score */}
                <div className="text-center md:w-44 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.7 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 180 }}
                    className="font-black mb-2"
                    style={{
                      fontSize: "5.5rem",
                      background: "var(--gradient-primary)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      fontFamily: "Poppins, sans-serif",
                      lineHeight: 1,
                    }}
                  >
                    {ratingStats.avg}
                  </motion.div>
                  <div className="flex gap-0.5 mb-2">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star
                        key={i}
                        size={16}
                        style={{
                          color: "#facc15",
                          fill: i < Math.round(ratingStats.avg) ? "#facc15" : "none",
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: "var(--text-soft)" }}>
                    {ratingStats.total} reviews
                  </p>
                </div>

                {/* Breakdown */}
                <div className="flex-1 w-full space-y-3">
                  {[5, 4, 3, 2, 1].map((star, idx) => {
                    const percent = ratingStats.total
                      ? (ratingStats.breakdown[star] / ratingStats.total) * 100
                      : 0;
                    return (
                      <div key={star} className="flex items-center gap-4">
                        <span
                          className="w-6 text-xs font-bold"
                          style={{ color: "var(--text-soft)" }}
                        >
                          {star}★
                        </span>
                        <div
                          className="flex-1 h-2.5 rounded-full overflow-hidden"
                          style={{ background: "var(--bg-soft)" }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: percent + "%" }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.85,
                              delay: idx * 0.08,
                              ease: "easeOut",
                            }}
                            className="h-2.5 rounded-full"
                            style={{ background: "var(--gradient-primary)" }}
                          />
                        </div>
                        <span
                          className="text-xs w-9 text-right font-semibold"
                          style={{ color: "var(--text-soft)" }}
                        >
                          {percent.toFixed(0)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            WRITE A REVIEW
        ══════════════════════════════════════════ */}
        <section style={{ padding: "0 0 5rem" }}>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card"
              style={{ padding: "2.5rem" }}
            >
              <SLabel>✦ Your Feedback</SLabel>
              <h2
                className="text-2xl font-bold mb-6 tracking-tight"
                style={{ color: "var(--text-heading)", fontFamily: "Poppins, sans-serif", letterSpacing: "-0.03em" }}
              >
                Give a Review
              </h2>

              {/* Star selector */}
              <div className="flex gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <motion.div key={s} whileHover={{ scale: 1.3 }} whileTap={{ scale: 0.85 }}>
                    <Star
                      size={30}
                      onClick={() => setRating(s)}
                      style={{
                        cursor: "pointer",
                        color: s <= rating ? "#facc15" : "var(--bg-high)",
                        fill: s <= rating ? "#facc15" : "var(--bg-high)",
                        filter:
                          s <= rating
                            ? "drop-shadow(0 0 6px rgba(250,204,21,0.55))"
                            : "none",
                        transition: "all 0.18s",
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with this astrologer..."
                rows={4}
                className="w-full p-4 rounded-2xl mb-6 resize-none text-sm outline-none transition-all"
                style={{
                  background: "var(--bg-soft)",
                  border: "1.5px solid var(--border-soft)",
                  color: "var(--text)",
                  fontFamily: "inherit",
                  lineHeight: "1.75",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "var(--primary-light)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(255,98,0,0.08)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "var(--border-soft)";
                  e.target.style.boxShadow = "none";
                }}
              />

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleReviewSubmit}
                className="btn-primary flex items-center gap-2 border-0 cursor-pointer"
              >
                <Zap size={14} /> Submit Review
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CLIENT LOVE — Reviews Grid
        ══════════════════════════════════════════ */}
        {reviews.length > 0 && (
          <section style={{ padding: "0 0 6rem" }}>
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-end justify-between mb-8">
                  <div>
                    <SLabel>❤️ Testimonials</SLabel>
                    <h2
                      className="text-2xl md:text-3xl font-bold tracking-tight"
                      style={{
                        color: "var(--text-heading)",
                        fontFamily: "Poppins, sans-serif",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      Client Love
                    </h2>
                  </div>
                  <motion.span
                    whileHover={{ x: 3 }}
                    className="text-xs font-bold cursor-pointer pb-0.5 hidden sm:block"
                    style={{
                      color: "var(--primary-light)",
                      borderBottom: "1px solid var(--primary-light)",
                    }}
                  >
                    View All {ratingStats.total} Reviews →
                  </motion.span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {reviews.map((r, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="card group relative overflow-hidden cursor-default bg-white"
                    >
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[1.5rem]"
                        style={{
                          background:
                            "radial-gradient(circle at 20% 0%, rgba(255,98,0,0.05) 0%, transparent 65%)",
                        }}
                      />

                      {/* Stars */}
                      <div className="flex gap-0.5 mb-3">
                        {Array.from({ length: r.rating }).map((_, idx) => (
                          <Star
                            key={idx}
                            size={12}
                            style={{ color: "#facc15", fill: "#facc15" }}
                          />
                        ))}
                      </div>

                      {/* Review text */}
                      <p
                        className="text-sm leading-relaxed mb-5 italic relative z-10"
                        style={{ color: "var(--text-muted)", lineHeight: "1.85" }}
                      >
                        "{r.reviewText}"
                      </p>

                      {/* Reviewer */}
                      <div
                        className="flex items-center gap-3 pt-4 relative z-10"
                        style={{ borderTop: "1px solid var(--border-soft)" }}
                      >
                        <img
                          src={
                            r.userId.profilePicture ||
                            "https://i.pravatar.cc/40?u=" + i
                          }
                          alt="user"
                          className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                          style={{
                            border: "2px solid var(--accent-border)",
                          }}
                        />
                        <div>
                          <p
                            className="text-xs font-bold"
                            style={{
                              color: "var(--text-heading)",
                              fontFamily: "Poppins, sans-serif",
                            }}
                          >
                            {r.userId.name || "Anonymous"}
                          </p>
                          <p
                            className="text-[10px]"
                            style={{ color: "var(--text-soft)" }}
                          >
                            {new Date(r.createdAt || Date.now()).toLocaleDateString(
                              "en-IN",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </div>

      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {selectedAstrologer && (
        <ChatBox
          astrologer={selectedAstrologer}
          onClose={() => setSelectedAstrologer(null)}
        />
      )}
    </motion.div>
  );
};

export default AstrologerDetails;