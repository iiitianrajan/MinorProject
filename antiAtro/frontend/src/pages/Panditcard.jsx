import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// ─── Floating Particle ───────────────────────────────────────────────────────
function Particle({ style }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={style}
      animate={{ y: [0, -30, 0], opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
      transition={{
        duration: style.duration,
        repeat: Infinity,
        delay: style.delay,
        ease: "easeInOut",
      }}
    />
  );
}

// ─── Sacred Om Glow Ring ─────────────────────────────────────────────────────
function GlowRing({ hovered }) {
  return (
    <motion.div
      animate={{
        boxShadow: hovered
          ? "0 0 60px 20px rgba(251,191,36,0.45), 0 0 120px 40px rgba(251,146,60,0.25)"
          : "0 0 30px 8px rgba(251,191,36,0.2), 0 0 60px 20px rgba(251,146,60,0.1)",
        scale: hovered ? 1.06 : 1,
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="absolute inset-0 rounded-full"
    />
  );
}

// ─── Main Pandit Avatar ──────────────────────────────────────────────────────
function PanditAvatar({ rotateX, rotateY, hovered }) {
  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-52 h-52 flex items-center justify-center select-none"
    >
      {/* Halo */}
      <motion.div
        animate={{
          opacity: hovered ? 1 : 0.6,
          scale: hovered ? 1.15 : 1,
          rotate: [0, 360],
        }}
        transition={{
          rotate: { duration: 12, repeat: Infinity, ease: "linear" },
          opacity: { duration: 0.4 },
          scale: { duration: 0.4 },
        }}
        className="absolute w-44 h-44 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, #fbbf24, #f97316, #ec4899, #fbbf24)",
          padding: "3px",
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-50 to-orange-100" />
      </motion.div>

      {/* Avatar image with fallback */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10 w-36 h-36 rounded-full overflow-hidden shadow-2xl border-4 border-amber-300/60"
        style={{
          background: "linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fde68a 100%)",
        }}
      >
        {/* SVG Pandit Illustration */}
        <svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Background gradient */}
          <defs>
            <radialGradient id="bgGrad" cx="50%" cy="60%" r="60%">
              <stop offset="0%" stopColor="#fef9ee" />
              <stop offset="100%" stopColor="#fde68a" />
            </radialGradient>
            <radialGradient id="skinGrad" cx="45%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#fcd9a0" />
              <stop offset="100%" stopColor="#e8a96a" />
            </radialGradient>
            <radialGradient id="robeGrad" cx="50%" cy="30%" r="80%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#c2410c" />
            </radialGradient>
          </defs>
          <rect width="200" height="220" fill="url(#bgGrad)" />

          {/* Body / Dhoti */}
          <ellipse cx="100" cy="195" rx="55" ry="35" fill="url(#robeGrad)" opacity="0.9" />
          <rect x="55" y="145" width="90" height="60" rx="10" fill="url(#robeGrad)" />

          {/* Uttariya (shawl) */}
          <path d="M60 140 Q80 120 100 125 Q120 120 140 140 L145 160 Q120 150 100 155 Q80 150 55 160Z"
            fill="#fdba74" opacity="0.85" />

          {/* Neck */}
          <rect x="88" y="118" width="24" height="22" rx="8" fill="url(#skinGrad)" />

          {/* Head */}
          <ellipse cx="100" cy="100" rx="36" ry="40" fill="url(#skinGrad)" />

          {/* Tilak (forehead mark) */}
          <ellipse cx="100" cy="80" rx="4" ry="7" fill="#dc2626" opacity="0.85" />
          <ellipse cx="100" cy="80" rx="1.5" ry="3" fill="#fbbf24" opacity="0.9" />

          {/* Eyes */}
          <ellipse cx="88" cy="97" rx="5" ry="4" fill="white" />
          <ellipse cx="112" cy="97" rx="5" ry="4" fill="white" />
          <ellipse cx="89" cy="98" rx="3" ry="3" fill="#3b1a08" />
          <ellipse cx="113" cy="98" rx="3" ry="3" fill="#3b1a08" />
          <circle cx="90" cy="97" r="1" fill="white" />
          <circle cx="114" cy="97" r="1" fill="white" />

          {/* Eyebrows */}
          <path d="M83 91 Q88 88 93 91" stroke="#5c3317" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M107 91 Q112 88 117 91" stroke="#5c3317" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Nose */}
          <ellipse cx="100" cy="107" rx="4" ry="3" fill="#e8a96a" />

          {/* Smile */}
          <path d="M93 115 Q100 121 107 115" stroke="#c47a3a" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Ears */}
          <ellipse cx="64" cy="100" rx="7" ry="9" fill="url(#skinGrad)" />
          <ellipse cx="136" cy="100" rx="7" ry="9" fill="url(#skinGrad)" />
          {/* Ear rings */}
          <circle cx="64" cy="105" r="3" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />
          <circle cx="136" cy="105" r="3" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1" />

          {/* Hair / Shikha (sacred tuft) */}
          <ellipse cx="100" cy="66" rx="34" ry="16" fill="#2d1a0a" />
          {/* Shikha knot */}
          <ellipse cx="100" cy="56" rx="7" ry="10" fill="#2d1a0a" />
          <ellipse cx="100" cy="50" rx="4" ry="5" fill="#3d2410" />

          {/* Janeu (sacred thread) */}
          <path d="M68 142 Q80 135 90 145" stroke="#fbbf24" strokeWidth="1.5" fill="none" strokeDasharray="3,2" />

          {/* Hands in Namaste */}
          <ellipse cx="78" cy="160" rx="12" ry="8" fill="url(#skinGrad)" transform="rotate(-20,78,160)" />
          <ellipse cx="122" cy="160" rx="12" ry="8" fill="url(#skinGrad)" transform="rotate(20,122,160)" />
          {/* Fingers hint */}
          <path d="M70 156 Q78 148 86 156" stroke="#e8a96a" strokeWidth="1" fill="none" />
          <path d="M114 156 Q122 148 130 156" stroke="#e8a96a" strokeWidth="1" fill="none" />
        </svg>
      </motion.div>

      {/* Inner glow pulse */}
      <motion.div
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-28 h-28 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(251,191,36,0.35) 0%, transparent 70%)",
        }}
      />

      <GlowRing hovered={hovered} />
    </motion.div>
  );
}

// ─── Badge Components ─────────────────────────────────────────────────────────
function RatingBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.08, y: -2 }}
      className="absolute top-5 left-5 z-30 flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-xl cursor-default"
      style={{
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
      }}
    >
      <span className="text-yellow-400 text-base">★</span>
      <span className="font-bold text-gray-800 text-sm">4.9</span>
      <span className="w-px h-4 bg-gray-200" />
      <span className="text-gray-500 text-xs font-medium">10k+ Reviews</span>
    </motion.div>
  );
}

function OnlineBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.08, y: -2 }}
      className="absolute bottom-6 right-5 z-30 flex items-center gap-2 px-4 py-2.5 rounded-2xl shadow-xl cursor-default"
      style={{
        background: "linear-gradient(135deg, #10b981, #059669)",
        boxShadow: "0 8px 24px rgba(16,185,129,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-2.5 h-2.5 rounded-full bg-white"
      />
      <span className="text-white text-xs font-bold">5,243 Experts Online</span>
    </motion.div>
  );
}

function LiveBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.9, type: "spring", stiffness: 180 }}
      whileHover={{ scale: 1.08, x: -3 }}
      className="absolute top-1/3 -right-2 z-30 px-3 py-2.5 rounded-2xl shadow-xl cursor-default"
      style={{
        background: "linear-gradient(135deg, #7c3aed, #db2777)",
        boxShadow: "0 8px 24px rgba(124,58,237,0.4), inset 0 1px 0 rgba(255,255,255,0.2)",
      }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-yellow-300 text-xs"
        >⚡</motion.span>
        <span className="text-white text-xs font-bold">Live Now</span>
      </div>
      <div className="text-white/80 text-xs">Top Rated</div>
    </motion.div>
  );
}

// ─── Main Card ────────────────────────────────────────────────────────────────
export default function PanditCard() {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["30%", "70%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["30%", "70%"]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  // Particles config
  const particles = [
    { width: 6, height: 6, background: "#fbbf24", top: "15%", left: "10%", duration: 4, delay: 0 },
    { width: 4, height: 4, background: "#f97316", top: "70%", left: "15%", duration: 5, delay: 0.5 },
    { width: 8, height: 8, background: "#ec4899", top: "25%", right: "12%", duration: 3.5, delay: 1 },
    { width: 5, height: 5, background: "#a78bfa", top: "60%", right: "18%", duration: 4.5, delay: 0.3 },
    { width: 3, height: 3, background: "#34d399", top: "45%", left: "8%", duration: 3, delay: 0.8 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-8">
      {/* Outer glow */}
      <motion.div
        animate={{
          boxShadow: hovered
            ? "0 0 80px 30px rgba(251,191,36,0.2), 0 0 160px 60px rgba(249,115,22,0.1)"
            : "0 0 40px 10px rgba(251,191,36,0.08)",
        }}
        transition={{ duration: 0.5 }}
        className="rounded-[2.5rem]"
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: hovered ? rotateX : 0,
            rotateY: hovered ? rotateY : 0,
            transformStyle: "preserve-3d",
            transformPerspective: 1000,
          }}
          animate={{ scale: hovered ? 1.03 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-80 h-[480px] rounded-[2.5rem] overflow-hidden cursor-pointer"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)",
            backdropFilter: "blur(24px)",
            border: "1.5px solid rgba(255,255,255,0.25)",
            boxShadow:
              "0 32px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)",
          }}
        >
          {/* Dynamic gradient spotlight that follows cursor */}
          <motion.div
            style={{ left: glowX, top: glowY }}
            className="absolute w-64 h-64 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"
            animate={{
              opacity: hovered ? 0.18 : 0.06,
            }}
            transition={{ duration: 0.3 }}
            style={{
              background: "radial-gradient(circle, rgba(251,191,36,0.8) 0%, transparent 70%)",
              left: glowX,
              top: glowY,
            }}
          />

          {/* Mesh gradient background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at 20% 20%, rgba(251,191,36,0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(249,115,22,0.25) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.2) 0%, transparent 50%)",
            }}
          />

          {/* Sacred pattern overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(45deg, rgba(251,191,36,0.5) 0px, transparent 1px, transparent 20px, rgba(251,191,36,0.5) 21px)`,
              backgroundSize: "30px 30px",
            }}
          />

          {/* Particles */}
          {particles.map((p, i) => (
            <Particle key={i} style={p} />
          ))}

          {/* Badges */}
          <RatingBadge />
          <OnlineBadge />
          <LiveBadge />

          {/* Center avatar */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10">
            <PanditAvatar rotateX={rotateX} rotateY={rotateY} hovered={hovered} />

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.07, y: -2 }}
              whileTap={{ scale: 0.96 }}
              animate={{
                boxShadow: hovered
                  ? "0 12px 40px rgba(251,191,36,0.5), 0 0 0 1px rgba(251,191,36,0.3)"
                  : "0 8px 24px rgba(0,0,0,0.3)",
              }}
              className="flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-white text-sm"
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ec4899 100%)",
              }}
            >
              <motion.span
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ▶
              </motion.span>
              <span>Consult a Pandit</span>
            </motion.button>

            {/* Subtext */}
            <motion.p
              animate={{ opacity: hovered ? 1 : 0.6 }}
              className="text-white/70 text-xs text-center font-medium tracking-wide px-6"
            >
              Vedic Astrology · Puja Services · Kundali
            </motion.p>
          </div>

          {/* Bottom shimmer line */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            className="absolute bottom-0 left-0 w-1/2 h-px pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(251,191,36,0.8), transparent)",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}