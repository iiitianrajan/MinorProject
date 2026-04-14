import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Calendar,
  Heart,
  Briefcase,
  Sparkles,
  ChevronRight,
  Clock,
  ArrowRight,

  // 🔮 Zodiac Icons
  Flame,
  Mountain,
  Users,
  Droplet,
  Sun,
  Leaf,
  Scale,
  Bug,
  ArrowUpRight,
  Landmark,
  Waves,
  Fish
} from 'lucide-react';
import { Link } from 'react-router-dom';


/* ─── Design System Tokens ─── */
// All colors from var(--*) only — no hardcoded hex values

/* ─── Data ─── */
const ZODIAC_SIGNS = [
  { name: 'Aries',       icon: <Flame size={20} className="text-[var(--primary)]"/>, dates: 'Mar 21 – Apr 19' },
  { name: 'Taurus',      icon: <Mountain size={20} className="text-[var(--primary)]"/>, dates: 'Apr 20 – May 20' },
  { name: 'Gemini',      icon: <Users size={20} className="text-[var(--primary)]"/>, dates: 'May 21 – Jun 20' },
  { name: 'Cancer',      icon: <Droplet size={20} className="text-[var(--primary)]"/>, dates: 'Jun 21 – Jul 22' },
  { name: 'Leo',         icon: <Sun size={20} className="text-[var(--primary)]"/>, dates: 'Jul 23 – Aug 22' },
  { name: 'Virgo',       icon: <Leaf size={20} className="text-[var(--primary)]"/>, dates: 'Aug 23 – Sep 22' },
  { name: 'Libra',       icon: <Scale size={20} className="text-[var(--primary)]"/>, dates: 'Sep 23 – Oct 22' },
  { name: 'Scorpio',     icon: <Bug size={20} className="text-[var(--primary)]"/>, dates: 'Oct 23 – Nov 21' },
  { name: 'Sagittarius', icon: <ArrowUpRight size={20} className="text-[var(--primary)]"/>, dates: 'Nov 22 – Dec 21' },
  { name: 'Capricorn',   icon: <Landmark size={20} className="text-[var(--primary)]"/>, dates: 'Dec 22 – Jan 19' },
  { name: 'Aquarius',    icon: <Waves size={20} className="text-[var(--primary)]"/>, dates: 'Jan 20 – Feb 18' },
  { name: 'Pisces',      icon: <Fish size={20} className="text-[var(--primary)]"/>, dates: 'Feb 19 – Mar 20' },
];

const PERIODS = ['Daily', 'Weekly', 'Monthly'];

const READINGS = {
  Scorpio: {
    tagline: 'The Deep Seeker',
    dates: 'October 23 – November 21',
    traits: ['WATER SIGN', 'FIXED', 'RULING PLANET: PLUTO'],
    sections: [
      {
        icon: Heart,
        title: 'Love & Relationships',
        color: '#ef4444',
        bg: 'rgba(239,68,68,0.08)',
        text: 'The alignment of Venus suggests a moment of profound emotional honesty. You may find yourself diving beneath the surface of casual conversation to find the pearls of truth hidden within your closest bonds. Vulnerability is not a weakness today; it is your ultimate conduit for connection.',
        tip: 'Speak the unspoken thought. The universe favors those who bridge the silence with heart-led clarity.',
      },
      {
        icon: Briefcase,
        title: 'Career & Finance',
        color: 'var(--primary)',
        bg: 'var(--accent-bg)',
        text: 'Mars fuels your ambition, making this an ideal time to tackle that lingering project. Financial stability is on the horizon, but it requires a strategic pivot. Look for the "invisible" opportunities—the ones that others overlook because they require more patience than immediate reward.',
        tip: 'Precision over speed. Re-read the contract; the fine print holds the secret to your next leap.',
      },
      {
        icon: Sparkles,
        title: 'Soul Alignment',
        color: '#8b5cf6',
        bg: 'rgba(139,92,246,0.08)',
        text: 'Your intuition is at a high-water mark. The cosmic weather invites you to shed old skins that no longer serve your evolution. Spend time in quiet reflection—water is your element, and near it, you will find the answers that have been dancing just out of reach.',
        tip: 'Cleanse your space. Burn cedar or frankincense to invite fresh energy into your sanctuary.',
      },
    ],
  },
};

const RITUALS = [
  { title: 'Shadow Work Meditation', duration: '15 mins', category: 'Deep Reflection', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop' },
  { title: 'Tea Ceremony for Clarity', duration: '10 mins', category: 'Grounding', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=80&h=80&fit=crop' },
  { title: 'Intuitive Scripting', duration: '20 mins', category: 'Manifestation', img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=80&h=80&fit=crop' },
];

/* ─── Sub-components ─── */

const SLabel = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
    style={{
      background: 'var(--accent-bg)',
      color: 'var(--primary)',
      border: '1px solid var(--accent-border)',
    }}
  >
    {children}
  </motion.div>
);

/* ─── Zodiac Strip ─── */
function ZodiacStrip({ active, onSelect }) {
  return (
    <div
      className="w-full overflow-x-auto py-1 px-6 mt-10"
      style={{ background: '#f4f3f1', borderBottom: '1px solid var(--border-soft)' }}
    >
      <div className="flex items-center gap-2 min-w-max mx-auto" style={{ maxWidth: 900 }}>
        {ZODIAC_SIGNS.map((sign) => {
          const isActive = sign.name === active;
          return (
            <motion.button
              key={sign.name}
              onClick={() => onSelect(sign.name)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.94 }}
              className="flex flex-col items-center gap-1.5 px-3 py-2 rounded-2xl transition-all duration-300 cursor-pointer relative"
              style={{
                minWidth: 64,
                background: isActive ? 'var(--gradient-primary)' : 'transparent',
                boxShadow: isActive ? '0 6px 22px rgba(255,98,0,0.28)' : 'none',
              }}
            >
              <span
                className="text-2xl"
                style={{ filter: isActive ? 'brightness(0) invert(1)' : 'none' }}
              >
                {sign.icon}
              </span>
              <span
                className="text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: isActive ? 'white' : 'var(--text-soft)' }}
              >
                {sign.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: 'var(--primary)' }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Period Tabs ─── */
function PeriodTabs({ active, onSelect }) {
  return (
    <div className="flex items-center justify-center gap-1 mt-8 mb-10">
      <div
        className="flex items-center gap-1 p-1 rounded-full"
        style={{ background: 'var(--bg-soft)', border: '1px solid var(--border-soft)' }}
      >
        {PERIODS.map((p) => {
          const isActive = p === active;
          return (
            <motion.button
              key={p}
              onClick={() => onSelect(p)}
              whileTap={{ scale: 0.96 }}
              className="relative px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer"
              style={{
                color: isActive ? 'white' : 'var(--text-muted)',
                background: isActive ? 'var(--gradient-primary)' : 'transparent',
                boxShadow: isActive ? '0 4px 16px rgba(255,98,0,0.25)' : 'none',
              }}
            >
              {p}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Hero Banner ─── */
function HeroBanner({ sign, period }) {
  const reading = READINGS[sign] || READINGS.Scorpio;
  return (
    <motion.div
      key={sign}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="card relative overflow-hidden mb-8"
      style={{ minHeight: 200, padding: 0 }}
    >
      {/* Background image placeholder */}
      <div
        className="absolute inset-0 rounded-[1.5rem]"
        style={{
          background: 'linear-gradient(135deg, var(--bg-soft) 0%, rgba(255,98,0,0.06) 100%)',
        }}
      />
      {/* Animated glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute pointer-events-none"
        style={{
          right: -60,
          top: -60,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,98,0,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative z-10 p-8 md:p-10">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--primary)' }}
        >
          Current Forecast
        </p>

        <motion.h1
          className="font-bold leading-tight mb-2 tracking-tight"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', color: 'var(--text-heading)' }}
        >
          {sign}:{' '}
          <motion.span
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              background: 'linear-gradient(90deg, var(--primary-dark), var(--primary), var(--primary-light), var(--primary))',
              backgroundSize: '220% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'inline',
            }}
          >
            {reading.tagline}
          </motion.span>
        </motion.h1>

        <p className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
          {reading.dates}
        </p>

        <div className="flex flex-wrap gap-2">
          {reading.traits.map((t) => (
            <span
              key={t}
              className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{
                background: 'var(--accent-bg)',
                color: 'var(--primary)',
                border: '1px solid var(--accent-border)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Reading Section ─── */
function ReadingSection({ section, index }) {
  const Icon = section.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="card-soft mb-6 relative overflow-hidden"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at 0% 50%, ${section.bg} 0%, transparent 60%)` }}
      />

      <div className="flex items-start gap-4">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 8, scale: 1.15 }}
          transition={{ type: 'spring', stiffness: 320 }}
          className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: section.bg }}
        >
          <Icon size={22} style={{ color: section.color }} />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3
            className="font-bold text-lg mb-2 tracking-tight"
            style={{ color: 'var(--text-heading)' }}
          >
            {section.title}
          </h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
            {section.text}
          </p>

          {/* Tip block */}
          <div
            className="rounded-2xl px-5 py-4 relative"
            style={{
              background: 'var(--bg-elevated)',
              borderLeft: `3px solid var(--primary-light)`,
            }}
          >
            <p
              className="text-[10px] font-bold uppercase tracking-widest mb-1.5"
              style={{ color: 'var(--primary)' }}
            >
              Celestial Tip
            </p>
            <p
              className="text-sm italic leading-relaxed"
              style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}
            >
              {section.tip}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Recommended Rituals ─── */
function RitualsSidebar() {
  return (
    <div className="card mb-6">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles size={15} style={{ color: 'var(--primary)' }} />
        <h3 className="font-bold text-base" style={{ color: 'var(--text-heading)' }}>
          Recommended Rituals
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {RITUALS.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ x: 4 }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src={r.img}
                alt={r.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4
                className="font-semibold text-sm mb-0.5 truncate group-hover:text-[var(--primary)] transition-colors duration-200"
                style={{ color: 'var(--text-heading)' }}
              >
                {r.title}
              </h4>
              <p className="text-xs" style={{ color: 'var(--text-soft)' }}>
                {r.duration} · {r.category}
              </p>
            </div>
            <motion.div whileHover={{ x: 3 }}>
              <ChevronRight size={14} style={{ color: 'var(--text-soft)' }} />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Book CTA Card ─── */
function BookCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative rounded-[1.5rem] overflow-hidden px-6 py-8 text-center"
      style={{ background: 'var(--gradient-primary)' }}
    >
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute pointer-events-none inset-0"
        style={{
          background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)',
        }}
      />
      <div className="relative z-10">
        <h3 className="font-bold text-xl mb-2 text-white tracking-tight">
          Book a Deep Dive
        </h3>
        <p className="text-sm mb-5 leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>
          Get a personalized reading from our master astrologers to unlock the specific secrets of your birth chart.
        </p>
        <Link to="/chat">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="w-full font-semibold text-sm px-6 py-3 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              background: 'var(--bg-elevated)',
              color: 'var(--primary)',
            }}
          >
            Schedule Reading
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function HoroscopePage() {
  const [activeSign, setActiveSign] = useState('Scorpio');
  const [activePeriod, setActivePeriod] = useState('Daily');

  const reading = READINGS[activeSign] || READINGS.Scorpio;

  return (
    <div className="overflow-x-hidden" style={{ minHeight: '100vh', background: 'var(--bg-soft)' }}>

      

      {/* ── Zodiac Strip ── */}
      <ZodiacStrip active={activeSign} onSelect={setActiveSign}  />

      {/* ── Main Content ── */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Period Tabs */}
        <PeriodTabs active={activePeriod} onSelect={setActivePeriod} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

          {/* LEFT: Main Reading */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeSign}-${activePeriod}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <HeroBanner sign={activeSign} period={activePeriod} />

                {reading.sections.map((section, i) => (
                  <ReadingSection key={section.title} section={section} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT: Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <RitualsSidebar />
              <BookCTA />

              {/* Lucky numbers card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card mt-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Star size={14} style={{ color: 'var(--primary)' }} />
                  <h4 className="font-bold text-sm" style={{ color: 'var(--text-heading)' }}>
                    Today's Energies
                  </h4>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Lucky No.', value: '7' },
                    { label: 'Color', value: '🔴' },
                    { label: 'Element', value: '💧' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl p-3 text-center"
                      style={{ background: 'var(--bg-soft)' }}
                    >
                      <div className="text-lg mb-1">{item.value}</div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-soft)' }}>
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}