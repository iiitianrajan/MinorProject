import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Sparkles, BookOpen, Clock, User,Star } from "lucide-react";

const pageVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const blogs = [
  {
    id: 1,
    title: "7 Signs of True Love",
    desc: "Understand the deep emotional connection beyond attraction.",
    author: "Astro Expert",
    date: "Mar 2026",
    emoji: "💞",
    tag: "LOVE",
  },
  {
    id: 2,
    title: "How to Fix Communication",
    desc: "Improve understanding and reduce conflicts in your relationship.",
    author: "Relationship Coach",
    date: "Feb 2026",
    emoji: "💬",
    tag: "RELATIONSHIP",
  },
  {
    id: 3,
    title: "Top 5 Relationship Red Flags",
    desc: "Identify toxic patterns early and protect yourself.",
    author: "Astrologer",
    date: "Jan 2026",
    emoji: "🚩",
    tag: "ADVICE",
  },
  {
    id: 4,
    title: "Compatibility by Zodiac",
    desc: "Check how your zodiac affects your love life.",
    author: "Astro Guru",
    date: "Jan 2026",
    emoji: "♈",
    tag: "ASTROLOGY",
  },
];

const tagGradients = {
  LOVE:         "linear-gradient(90deg,#ec4899,#f43f5e)",
  RELATIONSHIP: "linear-gradient(90deg,#a855f7,#ec4899)",
  ADVICE:       "linear-gradient(90deg,#f97316,#f59e0b)",
  ASTROLOGY:    "linear-gradient(90deg,#3b82f6,#a855f7)",
};

export default function LoveBlogs() {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={pageVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="min-h-screen font-sans relative overflow-hidden"
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
            "radial-gradient(circle,rgba(236,72,153,0.14) 0%,transparent 70%)",
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
            "radial-gradient(circle,rgba(168,85,247,0.09) 0%,transparent 70%)",
          filter: "blur(70px)",
          transform: "translate(-50%,-50%)",
        }}
      />

      {/* HERO */}
      <div
        className="relative py-20 text-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg,rgba(236,72,153,0.12) 0%,rgba(168,85,247,0.1) 40%,rgba(251,146,60,0.08) 100%)",
          borderBottom: "1px solid rgba(236,72,153,0.15)",
        }}
      >
        {/* Hero accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(236,72,153,0.5),rgba(168,85,247,0.5),transparent)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-4"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl"
            style={{
              background: "linear-gradient(135deg,#ec4899,#f43f5e)",
              boxShadow: "0 0 28px rgba(236,72,153,0.45)",
            }}
          >
            ❤️
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
            Expert Insights
          </span>
          <Sparkles size={14} style={{ color: "#f59e0b" }} />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black mb-4 px-4"
          style={{
            background:
              "linear-gradient(90deg,#1f2937 0%,#ec4899 45%,#a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Love &amp; Relationship Blogs
        </motion.h1>

        <p className="text-gray-500 max-w-xl mx-auto text-sm px-4">
          Explore deep insights about love, compatibility, and emotional
          connection from our verified astrology experts.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto px-4 py-12">

        {/* FEATURED BLOG */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          whileHover={{
            y: -6,
            boxShadow: "0 24px 48px rgba(236,72,153,0.2)",
          }}
          onClick={function () { navigate("/blog/1"); }}
          className="cursor-pointer rounded-3xl p-8 mb-12 relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.78)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(236,72,153,0.2)",
            boxShadow: "0 8px 32px rgba(236,72,153,0.1)",
            transition: "box-shadow 0.3s",
          }}
        >
          {/* Gradient top line */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{
              background:
                "linear-gradient(90deg,#ec4899,#a855f7,#f59e0b)",
            }}
          />

          {/* Background watermark */}
          <div
            className="absolute right-6 top-1/2 text-[100px] pointer-events-none select-none"
            style={{
              transform: "translateY(-50%)",
              opacity: 0.06,
            }}
          >
            ❤️
          </div>

          <div
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full mb-3"
            style={{
              background:
                "linear-gradient(90deg,rgba(236,72,153,0.12),rgba(244,63,94,0.12))",
              color: "#be185d",
              border: "1px solid rgba(236,72,153,0.25)",
            }}
          >
            <Star size={11} style={{ fill: "#ec4899", color: "#ec4899" }} />
            Featured Article
          </div>

          <h2
            className="text-2xl font-black mb-2"
            style={{
              background: "linear-gradient(90deg,#1f2937,#ec4899)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            7 Signs of True Love
          </h2>

          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            Discover what real love feels like and how to build a strong
            emotional bond that lasts a lifetime.
          </p>

          <div className="flex items-center gap-4">
            <span
              className="flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: "linear-gradient(90deg,#a855f7,#ec4899)",
                color: "#fff",
              }}
            >
              <BookOpen size={11} /> Read Article
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <User size={11} /> Astro Expert
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Clock size={11} /> Mar 2026
            </span>
          </div>
        </motion.div>

        {/* BLOG LIST */}
        <div className="space-y-5">
          {blogs.map(function (blog, index) {
            const gradient = tagGradients[blog.tag] || tagGradients["LOVE"];
            return (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -4,
                  boxShadow: "0 16px 40px rgba(168,85,247,0.15)",
                }}
                onClick={function () { navigate("/blog/" + blog.id); }}
                className="cursor-pointer rounded-2xl p-5 flex items-start gap-4 relative overflow-hidden"
                style={{
                  background: "rgba(255,255,255,0.78)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(168,85,247,0.12)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                  transition: "box-shadow 0.3s",
                }}
              >
                {/* Left accent line */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-2xl"
                  style={{ background: gradient }}
                />

                {/* Emoji badge */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg,rgba(168,85,247,0.08),rgba(236,72,153,0.08))",
                    border: "1px solid rgba(168,85,247,0.12)",
                  }}
                >
                  {blog.emoji}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Tag */}
                  <span
                    className="inline-block text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-1.5"
                    style={{
                      background: gradient,
                      color: "#fff",
                    }}
                  >
                    {blog.tag}
                  </span>

                  <h2
                    className="text-base font-black mb-1 leading-tight"
                    style={{ color: "#1f2937" }}
                    onMouseEnter={function (e) {
                      e.currentTarget.style.background = gradient;
                      e.currentTarget.style.WebkitBackgroundClip = "text";
                      e.currentTarget.style.WebkitTextFillColor = "transparent";
                    }}
                    onMouseLeave={function (e) {
                      e.currentTarget.style.background = "none";
                      e.currentTarget.style.WebkitBackgroundClip = "unset";
                      e.currentTarget.style.WebkitTextFillColor = "unset";
                      e.currentTarget.style.color = "#1f2937";
                    }}
                  >
                    {blog.title}
                  </h2>

                  <p className="text-gray-500 text-sm leading-relaxed">
                    {blog.desc}
                  </p>

                  <div className="flex gap-4 mt-2">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <User size={10} /> {blog.author}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Clock size={10} /> {blog.date}
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 self-center text-white text-sm font-bold"
                  style={{ background: gradient }}
                >
                  →
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}