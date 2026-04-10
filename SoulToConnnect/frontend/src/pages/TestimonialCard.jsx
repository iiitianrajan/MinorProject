import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "Karan Patel",
    location: "Ahmedabad, India",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    rating: 5,
    text: "Accurate and insightful readings. Highly recommended. The astrologer understood my situation perfectly.",
  },
  {
    name: "Riya Sharma",
    location: "Delhi, India",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    text: "This platform completely changed my life! The astrologer gave me clarity about my career and relationship.",
  },
  {
    name: "Aman Verma",
    location: "Mumbai, India",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    text: "Very accurate predictions. I was surprised how detailed my kundli analysis was. Truly eye-opening!",
  },
  {
    name: "Sneha Kapoor",
    location: "Bangalore, India",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
    text: "The love compatibility feature helped me understand my relationship better. Absolutely worth it.",
  },
  {
    name: "Rahul Mehta",
    location: "Pune, India",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
    text: "Career guidance was spot on. Helped me take the right decision at the right time!",
  },
  {
    name: "Priya Singh",
    location: "Jaipur, India",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 4,
    text: "Very smooth UI and quick response from experts. Loved every bit of the experience.",
  },
  {
    name: "Deepak Nair",
    location: "Chennai, India",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    rating: 5,
    text: "The pandit was incredibly knowledgeable. My family has never felt more spiritually aligned.",
  },
  {
    name: "Anjali Gupta",
    location: "Kolkata, India",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    rating: 5,
    text: "I was skeptical at first but the reading blew me away. Every detail was accurate!",
  },
];

const VISIBLE = 3;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const maxIndex = testimonials.length - VISIBLE;
  const intervalRef = useRef(null);

  const go = (dir) => {
    setDirection(dir);
    setIndex((prev) => Math.min(Math.max(prev + dir, 0), maxIndex));
  };

  const goTo = (i) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [maxIndex]);

  const stopAuto = () => clearInterval(intervalRef.current);

  return (
    <section className="section" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "var(--accent-bg)",
              border: "1px solid var(--accent-border)",
              color: "var(--primary-light)",
            }}
          >
            <Sparkles size={12} /> Trusted by Thousands
          </div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight leading-tight"
            style={{
              color: "var(--text-heading)",
              fontFamily: "Poppins, sans-serif",
              letterSpacing: "-0.03em",
            }}
          >
            What Our Customers{" "}
            <span
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Say
            </span>
          </h2>

          <p className="text-base max-w-xl mx-auto leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Real stories from real people who found clarity and guidance.
          </p>
        </motion.div>

        {/* ── Slider ── */}
        <div
          className="relative"
          onMouseEnter={stopAuto}
          onMouseLeave={() => {
            intervalRef.current = setInterval(() => {
              setDirection(1);
              setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
            }, 4000);
          }}
        >
          {/* Cards viewport */}
          <div className="overflow-hidden px-1 py-4">
            <motion.div
              animate={{ x: `-${index * (100 / VISIBLE)}%` }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex"
              style={{ gap: "1.25rem" }}
            >
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  style={{
                    minWidth: `calc(${100 / VISIBLE}% - ${(1.25 * (VISIBLE - 1)) / VISIBLE}rem)`,
                    flexShrink: 0,
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  {/* ── Card ── */}
                  <div
                    className="relative overflow-hidden group h-full"
                    style={{
                      background: "var(--bg-elevated)",
                      borderRadius: "1.5rem",
                      padding: "1.75rem",
                      border: "1px solid var(--border-soft)",
                      boxShadow: "var(--shadow-md)",
                      minHeight: "220px",
                      transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "var(--accent-border)";
                      e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "var(--border-soft)";
                      e.currentTarget.style.boxShadow = "var(--shadow-md)";
                    }}
                  >
                    {/* Glow overlay */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 0%, rgba(255,98,0,0.06) 0%, transparent 65%)",
                        borderRadius: "1.5rem",
                      }}
                    />

                    {/* Bottom accent bar */}
                    <div
                      className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                      style={{
                        background: "var(--gradient-primary)",
                        borderRadius: "0 0 1.5rem 1.5rem",
                      }}
                    />

                    {/* Quote icon */}
                    <Quote
                      size={40}
                      className="absolute top-5 right-5 pointer-events-none transition-colors duration-300"
                      style={{ color: "var(--accent-border)" }}
                    />

                    {/* Avatar + name */}
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <div className="relative flex-shrink-0">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-12 h-12 rounded-full object-cover"
                          style={{ border: "2px solid var(--accent-border)" }}
                        />
                        <span
                          className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full"
                          style={{
                            background: "#22c55e",
                            border: "2px solid var(--bg-elevated)",
                          }}
                        />
                      </div>
                      <div>
                        <h4
                          className="font-semibold text-sm leading-tight"
                          style={{
                            color: "var(--text-heading)",
                            fontFamily: "Poppins, sans-serif",
                          }}
                        >
                          {t.name}
                        </h4>
                        <p className="text-xs mt-0.5" style={{ color: "var(--text-soft)" }}>
                          {t.location}
                        </p>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-0.5 mb-3 relative z-10">
                      {[...Array(5)].map((_, si) => (
                        <Star
                          key={si}
                          size={14}
                          style={{
                            color: si < t.rating ? "#facc15" : "var(--border-soft)",
                            fill: si < t.rating ? "#facc15" : "var(--border-soft)",
                          }}
                        />
                      ))}
                      <span className="ml-1.5 text-xs font-semibold" style={{ color: "var(--text-soft)" }}>
                        {t.rating}.0
                      </span>
                    </div>

                    {/* Text */}
                    <p
                      className="text-sm leading-relaxed italic relative z-10"
                      style={{ color: "var(--text-muted)" }}
                    >
                      "{t.text}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Nav Arrows ── */}
          {[
            { side: "-left-5", dir: -1, disabled: index === 0, Icon: ChevronLeft },
            { side: "-right-5", dir: 1, disabled: index >= maxIndex, Icon: ChevronRight },
          ].map(({ side, dir, disabled, Icon }) => (
            <motion.button
              key={side}
              onClick={() => go(dir)}
              disabled={disabled}
              whileHover={!disabled ? { scale: 1.12 } : {}}
              whileTap={!disabled ? { scale: 0.94 } : {}}
              className="absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                [side.includes("left") ? "left" : "right"]: "-1.25rem",
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-md)",
                color: "var(--text-heading)",
              }}
              onMouseEnter={e => {
                if (!disabled) {
                  e.currentTarget.style.background = "var(--gradient-primary)";
                  e.currentTarget.style.borderColor = "transparent";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(255,98,0,0.3)";
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "var(--bg-elevated)";
                e.currentTarget.style.borderColor = "var(--border-soft)";
                e.currentTarget.style.color = "var(--text-heading)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
            >
              <Icon size={18} />
            </motion.button>
          ))}
        </div>

        {/* ── Dot indicators ── */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === index ? "2rem" : "0.5rem",
                background:
                  i === index ? "var(--primary-light)" : "var(--accent-border)",
              }}
            />
          ))}
        </div>

        {/* ── Trust summary strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center gap-4"
        >
          {[
            { emoji: "⭐", value: "4.9 / 5", label: "Average Rating" },
            { emoji: "💬", value: "50,000+", label: "Reviews" },
            { emoji: "🛡️", value: "100%", label: "Verified Experts" },
          ].map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-5 py-3 rounded-2xl"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <span className="text-xl">{s.emoji}</span>
              <div>
                <div
                  className="text-sm font-bold leading-tight"
                  style={{ color: "var(--text-heading)", fontFamily: "Poppins, sans-serif" }}
                >
                  {s.value}
                </div>
                <div className="text-xs" style={{ color: "var(--text-soft)" }}>
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}