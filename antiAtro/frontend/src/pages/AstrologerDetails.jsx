import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star, Phone, MessageCircle, Sparkles, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthModal from "../components/auth/AuthModal";
import ChatBox from "./ChatBox";


const pageVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
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

  useEffect(function () {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5001/api/astrologer/" + id)
      .then(function (res) { return res.json(); })
      .then(function (data) { setAstro(data); });

    fetch("http://localhost:5001/api/review/" + id, {
      headers: { Authorization: "Bearer " + token },
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(function (data) {
        setReviews(data);
        const total = data.length;
        let sum = 0;
        const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        data.forEach(function (r) {
          sum += r.rating;
          breakdown[r.rating]++;
        });
        setRatingStats({
          avg: total ? (sum / total).toFixed(2) : 0,
          total,
          breakdown,
        });
      })
      .catch(function (err) { console.error("Review fetch error:", err.message); });
  }, [id]);

  const handleReviewSubmit = async function () {
    if (!currentUser) return setIsModalOpen(true);
    if (rating === 0) return alert("Please select rating");

    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5001/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ productId: id, rating, reviewText }),
    });

    const data = await res.json();
    if (!res.ok) { alert(data.message); return; }

    const updated = [data.review, ...reviews];
    setReviews(updated);

    let sum = 0;
    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    updated.forEach(function (r) { sum += r.rating; breakdown[r.rating]++; });
    setRatingStats({
      avg: (sum / updated.length).toFixed(2),
      total: updated.length,
      breakdown,
    });

    setRating(0);
    setReviewText("");
  };

  if (!astro) {
    return (
      <div
        className="flex flex-col justify-center items-center h-[60vh] gap-3"
        style={{
          background: "linear-gradient(135deg,#fdf4ff 0%,#fff7ed 50%,#fdf2f8 100%)",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-10 h-10 rounded-full border-4 border-transparent"
          style={{ borderTopColor: "#a855f7", borderRightColor: "#ec4899" }}
        />
        <p
          className="text-sm font-semibold"
          style={{
            background: "linear-gradient(90deg,#a855f7,#ec4899)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
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
          background: "radial-gradient(circle,rgba(168,85,247,0.13) 0%,transparent 70%)",
          filter: "blur(60px)",
          transform: "translate(-30%,-30%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle,rgba(251,146,60,0.13) 0%,transparent 70%)",
          filter: "blur(60px)",
          transform: "translate(30%,30%)",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle,rgba(236,72,153,0.08) 0%,transparent 70%)",
          filter: "blur(70px)",
          transform: "translate(-50%,-50%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Card */}
        <div
          className="rounded-3xl p-6 md:p-10 mb-6"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(168,85,247,0.15)",
            boxShadow: "0 8px 40px rgba(168,85,247,0.1)",
          }}
        >
          {/* Top gradient line */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
            style={{
              background: "linear-gradient(90deg,#a855f7,#ec4899,#f59e0b)",
            }}
          />

          {/* Top Section */}
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">

            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="rounded-full p-1"
                style={{
                  background: "linear-gradient(135deg,#a855f7,#ec4899,#f59e0b)",
                  boxShadow: "0 0 28px rgba(168,85,247,0.45)",
                }}
              >
                <motion.img
                  layoutId={"astro-" + id}
                  whileHover={{ scale: 1.05 }}
                  src={astro.profileImage || "https://i.pravatar.cc/150?u=" + id}
                  alt="astro"
                  className="w-32 h-32 rounded-full object-cover block"
                  style={{ border: "3px solid white" }}
                />
              </div>

              {astro.isOnline && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-white"
                  style={{
                    background: "#22c55e",
                    boxShadow: "0 0 10px rgba(34,197,94,0.7)",
                  }}
                />
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                <Sparkles size={15} style={{ color: "#f59e0b" }} />
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{
                    background: "linear-gradient(90deg,#f59e0b,#ec4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Verified Expert
                </span>
              </div>

              <h1
                className="text-3xl font-black"
                style={{
                  background: "linear-gradient(90deg,#1f2937,#7c3aed,#ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {astro.userId?.name}
              </h1>

              <p
                className="mt-1 font-semibold text-sm"
                style={{
                  background: "linear-gradient(90deg,#7c3aed,#ec4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {astro.specialization}
              </p>

              <p className="text-sm text-gray-400 mt-1">
                {astro.experienceYears} Years Experience
              </p>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
                {astro.languages.map(function (lang, index) {
                  return (
                    <span
                      key={index}
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: "linear-gradient(90deg,rgba(168,85,247,0.1),rgba(236,72,153,0.1))",
                        color: "#7c3aed",
                        border: "1px solid rgba(168,85,247,0.2)",
                      }}
                    >
                      {lang}
                    </span>
                  );
                })}
              </div>

              <p
                className="text-sm font-black mt-2"
                style={{
                  background: "linear-gradient(90deg,#ef4444,#f97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ₹{astro.pricePerMinute}/min
              </p>

              {/* Dynamic Rating */}
              <div className="flex justify-center md:justify-start items-center gap-1 mt-2">
                {[0, 1, 2, 3, 4].map(function (i) {
                  return (
                    <Star
                      key={i}
                      size={16}
                      style={{ color: "#f59e0b" }}
                      fill={i < Math.round(ratingStats.avg) ? "#f59e0b" : "none"}
                    />
                  );
                })}
                <span className="text-gray-500 text-sm ml-1">
                  ({ratingStats.avg})
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center md:text-right flex-shrink-0">
              <p
                className="text-xl font-black mb-3"
                style={{
                  background: "linear-gradient(90deg,#22c55e,#16a34a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                ₹20/min
              </p>

              <div className="flex gap-3 justify-center md:justify-end">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={function () {
                    if (currentUser) navigate("/callscreen");
                    else setIsModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 text-white px-5 py-2.5 rounded-full text-sm font-bold border-0"
                  style={{
                    background: "linear-gradient(90deg,#22c55e,#16a34a)",
                    boxShadow: "0 4px 14px rgba(34,197,94,0.4)",
                  }}
                >
                  <Phone size={14} /> Call
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={function () {
                    if (currentUser) {
                      setSelectedAstrologer(astro.userId?.name || "Astrologer");
                    } else setIsModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 text-white px-5 py-2.5 rounded-full text-sm font-bold border-0"
                  style={{
                    background: "linear-gradient(90deg,#a855f7,#ec4899)",
                    boxShadow: "0 4px 14px rgba(168,85,247,0.4)",
                  }}
                >
                  <MessageCircle size={14} /> Chat
                </motion.button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div
            className="my-8 h-px"
            style={{
              background: "linear-gradient(90deg,transparent,rgba(168,85,247,0.3),rgba(236,72,153,0.3),transparent)",
            }}
          />

          {/* About */}
          <div className="mb-6">
            <h2
              className="text-lg font-bold mb-3 flex items-center gap-2"
              style={{
                background: "linear-gradient(90deg,#7c3aed,#ec4899)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              About Astrologer
            </h2>
            <p className="text-gray-600 leading-relaxed">{astro.bio}</p>
          </div>

          {/* Skills */}
          <div>
            <h2
              className="text-lg font-bold mb-3"
              style={{
                background: "linear-gradient(90deg,#f59e0b,#f97316)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Skills &amp; Specialties
            </h2>
            <div className="flex gap-2 flex-wrap">
              {(astro.specialties || []).map(function (s, i) {
                return (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 rounded-full text-sm font-semibold"
                    style={{
                      background: "linear-gradient(90deg,rgba(251,191,36,0.15),rgba(249,115,22,0.15))",
                      color: "#b45309",
                      border: "1px solid rgba(245,158,11,0.3)",
                    }}
                  >
                    {s}
                  </motion.span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Rating Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl p-6 md:p-8 mb-6 relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(168,85,247,0.15)",
            boxShadow: "0 8px 40px rgba(168,85,247,0.08)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{
              background: "linear-gradient(90deg,#a855f7,#ec4899,#f59e0b)",
            }}
          />

          <h2
            className="text-xl font-bold mb-6 flex items-center gap-2"
            style={{
              background: "linear-gradient(90deg,#1f2937,#7c3aed)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <Star size={18} style={{ color: "#f59e0b" }} />
            Rating &amp; Reviews
          </h2>

          <div className="flex flex-col md:flex-row gap-8">

            {/* Avg score */}
            <div className="text-center md:w-1/3 flex flex-col justify-center items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-6xl font-black"
                style={{
                  background: "linear-gradient(135deg,#f59e0b,#f97316)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {ratingStats.avg}
              </motion.div>

              <div className="flex justify-center mt-3 gap-0.5">
                {[0, 1, 2, 3, 4].map(function (i) {
                  return (
                    <Star
                      key={i}
                      size={20}
                      style={{ color: "#f59e0b" }}
                      fill={i < Math.round(ratingStats.avg) ? "#f59e0b" : "none"}
                    />
                  );
                })}
              </div>

              <p className="text-sm text-gray-400 mt-2">
                {ratingStats.total} reviews
              </p>
            </div>

            {/* Bars */}
            <div className="flex-1 space-y-3">
              {[5, 4, 3, 2, 1].map(function (star, index) {
                const percent = ratingStats.total
                  ? (ratingStats.breakdown[star] / ratingStats.total) * 100
                  : 0;

                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="w-6 text-sm font-bold text-gray-500">
                      {star}★
                    </span>
                    <div
                      className="flex-1 h-3 rounded-full overflow-hidden"
                      style={{ background: "rgba(168,85,247,0.1)" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: percent + "%" }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="h-3 rounded-full"
                        style={{
                          background: "linear-gradient(90deg,#a855f7,#ec4899,#f59e0b)",
                        }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-10 text-right">
                      {percent.toFixed(0)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Give Review */}
        <div
          className="rounded-3xl p-6 mb-6 relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.72)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(168,85,247,0.15)",
            boxShadow: "0 8px 40px rgba(168,85,247,0.08)",
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{
              background: "linear-gradient(90deg,#f59e0b,#ec4899,#a855f7)",
            }}
          />

          <h2
            className="text-lg font-bold mb-4 flex items-center gap-2"
            style={{
              background: "linear-gradient(90deg,#f59e0b,#f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            <Sparkles size={16} style={{ color: "#f59e0b" }} />
            Give Review
          </h2>

          {/* Star selector */}
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map(function (s) {
              return (
                <motion.div
                  key={s}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Star
                    size={28}
                    onClick={function () { setRating(s); }}
                    style={{
                      cursor: "pointer",
                      color: s <= rating ? "#f59e0b" : "#d1d5db",
                      fill: s <= rating ? "#f59e0b" : "none",
                      filter: s <= rating ? "drop-shadow(0 0 6px rgba(245,158,11,0.6))" : "none",
                      transition: "all 0.2s",
                    }}
                  />
                </motion.div>
              );
            })}
          </div>

          <textarea
            value={reviewText}
            onChange={function (e) { setReviewText(e.target.value); }}
            placeholder="Share your experience..."
            rows={4}
            className="w-full p-4 rounded-2xl mb-4 resize-none text-sm text-gray-700 outline-none transition-all"
            style={{
              background: "rgba(255,255,255,0.8)",
              border: "1px solid rgba(168,85,247,0.2)",
              backdropFilter: "blur(8px)",
            }}
            onFocus={function (e) {
              e.target.style.border = "1px solid rgba(168,85,247,0.5)";
              e.target.style.boxShadow = "0 0 0 3px rgba(168,85,247,0.1)";
            }}
            onBlur={function (e) {
              e.target.style.border = "1px solid rgba(168,85,247,0.2)";
              e.target.style.boxShadow = "none";
            }}
          />

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleReviewSubmit}
            className="flex items-center gap-2 text-white px-7 py-3 rounded-full font-bold text-sm border-0"
            style={{
              background: "linear-gradient(90deg,#f59e0b,#f97316)",
              boxShadow: "0 4px 16px rgba(245,158,11,0.4)",
            }}
          >
            <Zap size={15} />
            Submit Review
          </motion.button>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">
          {reviews.map(function (r, i) {
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(168,85,247,0.15)" }}
                className="rounded-2xl p-5 relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(168,85,247,0.12)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  transition: "box-shadow 0.3s",
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{
                    background: "linear-gradient(90deg,#a855f7,#ec4899,#f59e0b)",
                    opacity: 0.6,
                  }}
                />

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-full p-0.5 flex-shrink-0"
                      style={{
                        background: "linear-gradient(135deg,#a855f7,#ec4899)",
                      }}
                    >
                      <img
                        src={r.userId.profilePicture || "https://i.pravatar.cc/40?u=" + i}
                        alt="user"
                        className="w-10 h-10 rounded-full object-cover block"
                        style={{ border: "2px solid white" }}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        {r.userId.name || "Anonymous"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(r.createdAt || Date.now()).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-0.5">
                    {Array.from({ length: r.rating }).map(function (_, idx) {
                      return (
                        <Star
                          key={idx}
                          size={13}
                          style={{ color: "#f59e0b", fill: "#f59e0b" }}
                        />
                      );
                    })}
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {r.reviewText}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>

      <AuthModal
        isOpen={isModalOpen}
        onClose={function () { setIsModalOpen(false); }}
      />

      {selectedAstrologer && (
        <ChatBox
          astrologer={selectedAstrologer}
          onClose={function () { setSelectedAstrologer(null); }}
        />
      )}
    </motion.div>
  );
};

export default AstrologerDetails;