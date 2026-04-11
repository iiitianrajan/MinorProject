import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, Star, Sparkles, Zap, MessageSquare, X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import ChatBox from './ChatBox';
import AuthModal from '../components/auth/AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

/* ─── Magnetic Button ─── */
function MagneticBtn({ children, className, style, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.28);
    y.set((e.clientY - r.top - r.height / 2) * 0.28);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.button
      ref={ref}
      style={{ ...style, x: sx, y: sy }}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

/* ─── Tilt Hook ─── */
function useTilt() {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 280, damping: 28 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 280, damping: 28 });
  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rotateY.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rotateX.set(-((e.clientY - r.top) / r.height - 0.5) * 10);
  };
  const onLeave = () => { rotateX.set(0); rotateY.set(0); };
  return { ref, rotateX, rotateY, onMove, onLeave };
}

/* ─── Astrologer Card ─── */
function AstroCard({ astro, onCardClick, onChatClick }) {
  const { ref, rotateX, rotateY, onMove, onLeave } = useTilt();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 160, damping: 18 } },
      }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      animate={hovered ? { y: -10 } : { y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      whileTap={{ scale: 0.97 }}
      onMouseMove={onMove}
      onMouseLeave={() => { onLeave(); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      onClick={(e) => onCardClick(e, astro._id)}
      className="card relative cursor-pointer overflow-hidden"
    >
      {/* Top accent bar on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] gradient-primary rounded-t-[1.5rem]"
        initial={{ scaleX: 0, originX: 0 }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Hover glow overlay */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 pointer-events-none rounded-[1.5rem]"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,98,0,0.07) 0%, transparent 65%)' }}
          />
        )}
      </AnimatePresence>

      <div className="flex items-start gap-4 relative z-10">

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-full p-[2px] gradient-primary"
            style={{
              boxShadow: hovered ? '0 0 18px rgba(255,98,0,0.32)' : '0 0 8px rgba(255,98,0,0.12)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            <div className="rounded-full p-[2px] bg-[var(--bg-elevated)]">
              <img
                src={astro.profileImage || `https://i.pravatar.cc/80?img=${(astro._id?.charCodeAt(0) % 10) + 1}`}
                alt={astro.userId?.name}
                className="w-14 h-14 rounded-full object-cover block"
              />
            </div>
          </motion.div>

          {astro.isOnline && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
              className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[var(--bg-elevated)] bg-green-500"
              style={{ boxShadow: '0 0 8px rgba(34,197,94,0.5)' }}
            />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-sm leading-tight truncate text-[var(--text-heading)]">
              {astro.userId?.name || 'Astrologer'}
            </h3>
            <motion.div
              whileHover={{ scale: 1.08 }}
              className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0 bg-[var(--accent-bg)] border border-[var(--accent-border)] text-[var(--primary)]"
            >
              <Star size={10} className="fill-yellow-400 text-yellow-400" />
              {astro.rating?.toFixed(1) || '5.0'}
            </motion.div>
          </div>

          <p className="text-xs font-semibold truncate mb-0.5 text-[var(--primary)]">
            {astro.specialties?.join(' · ')}
          </p>
          <p className="text-xs truncate text-[var(--text-soft)]">
            {astro.languages?.join(', ')}
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            {astro.experienceYears} yrs exp
          </p>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div>
              <span className="text-base font-black text-[var(--primary)]">₹{astro.pricePerMinute}</span>
              <span className="text-[11px] font-medium ml-0.5 text-[var(--text-soft)]">/min</span>
            </div>
            <MagneticBtn
              onClick={(e) => onChatClick(e, astro.userId?.name)}
              className="btn-primary flex items-center gap-1.5 px-4 py-1.5 text-xs cursor-pointer"
            >
              <Zap size={11} className="flex-shrink-0" />
              Chat Now
            </MagneticBtn>
          </div>
        </div>
      </div>

      {/* Bottom shimmer */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(to right, transparent, rgba(255,98,0,0.2), transparent)',
          originX: '50%',
        }}
      />
    </motion.div>
  );
}

/* ─── Skeleton Card ─── */
function SkeletonCard() {
  return (
    <motion.div
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      className="card"
      style={{ height: 148 }}
    >
      <div className="flex gap-4">
        <div className="w-14 h-14 rounded-full flex-shrink-0 bg-[var(--accent-bg)]" />
        <div className="flex-1 flex flex-col gap-2.5 pt-1">
          <div className="h-3 rounded-full w-2/3 bg-[var(--accent-bg)]" />
          <div className="h-2.5 rounded-full w-1/2 bg-[var(--bg-soft)]" />
          <div className="h-2.5 rounded-full w-3/4 bg-[var(--bg-soft)]" />
          <div className="h-2 rounded-full w-1/3 mt-1 bg-[var(--bg-soft)]" />
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Filter Tag ─── */
function FilterTag({ label, active, index, onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ scale: 1.06, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer border ${
        active
          ? 'btn-primary border-transparent'
          : 'bg-[var(--accent-bg)] text-[var(--primary)] border-[var(--accent-border)] hover:bg-[var(--bg-soft)]'
      }`}
    >
      {label}
    </motion.button>
  );
}

/* ─── Main Component ─── */
const Chat = () => {
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAstrologer, setSelectedAstrologer] = useState(null);
  const [astrologers, setAstrologers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAstrologers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/astrologer`);
        const data = await res.json();
        setAstrologers(data);
      } catch (err) {
        console.error('❌ Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAstrologers();
  }, []);

  const filtered = astrologers.filter(a =>
    !search ||
    a.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
    a.specialties?.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  function handleCardClick(e, astroId) {
    e.stopPropagation();
    if (currentUser) navigate('/astrologer/' + astroId);
    else setIsModalOpen(true);
  }

  function handleChatClick(e, astroName) {
    e.stopPropagation();
    if (currentUser) setSelectedAstrologer(astroName || 'Astrologer');
    else setIsModalOpen(true);
  }

  const filterTags = ['All', 'Online Now', 'Top Rated', 'Vedic', 'Tarot', 'Numerology', 'Vastu', 'Most Experienced'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen relative overflow-hidden bg-[var(--bg-soft)]"
    >
      {/* Ambient blobs */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute pointer-events-none -top-32 -left-32 w-[560px] h-[560px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,98,0,0.07) 0%, transparent 65%)', filter: 'blur(60px)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        className="absolute pointer-events-none -bottom-20 -right-20 w-[480px] h-[480px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,140,58,0.08) 0%, transparent 65%)', filter: 'blur(60px)' }}
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          {/* Title block */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-widest bg-[var(--accent-bg)] text-[var(--primary)] border border-[var(--accent-border)]"
            >
              <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Sparkles size={12} />
              </motion.div>
              Live Experts Available
            </motion.div>

            <h1
              className="font-bold tracking-tight leading-none text-[var(--text-heading)]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)' }}
            >
              Chat with{' '}
              <motion.span
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background: 'linear-gradient(90deg, var(--primary-dark), var(--primary), var(--primary-light), var(--primary))',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block',
                }}
              >
                Astrologers
              </motion.span>
            </h1>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Connect instantly with verified Vedic experts — real guidance, real time.
            </p>
          </div>

          {/* Search + Filter */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search bar */}
            <div
              className="relative flex items-center"
              style={{
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid var(--border-soft)',
                borderRadius: 9999,
                boxShadow: 'var(--shadow-sm)',
                padding: '0 16px 0 40px',
                height: 44,
              }}
            >
              <Search size={14} className="absolute left-3.5 text-[var(--primary)]" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                type="text"
                placeholder="Search name or skill…"
                className="text-sm outline-none bg-transparent w-48 text-[var(--text)]"
                style={{ fontFamily: 'inherit' }}
              />
              <AnimatePresence>
                {search && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    onClick={() => setSearch('')}
                    className="ml-2 flex-shrink-0 text-[var(--text-soft)] hover:text-[var(--primary)] transition-colors"
                  >
                    <X size={13} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Filter button */}
            <MagneticBtn
              onClick={() => setFilterOpen(p => !p)}
              className="btn-primary flex items-center gap-2 text-sm px-5 cursor-pointer"
              style={{ height: 44, opacity: filterOpen ? 0.85 : 1 }}
            >
              <SlidersHorizontal size={14} />
              Filter
            </MagneticBtn>
          </div>
        </motion.div>

        {/* ── Filter panel ── */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mb-8"
            >
              <div className="card-soft flex flex-wrap gap-2.5 p-5">
                {filterTags.map((tag, i) => (
                  <FilterTag
                    key={tag}
                    label={tag}
                    active={activeFilter === tag}
                    index={i}
                    onClick={() => setActiveFilter(tag)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-6 mb-8 flex-wrap"
        >
          {[
            { dot: '#22c55e', label: `${filtered.filter(a => a.isOnline).length} Online Now` },
            { dot: 'var(--primary)', label: `${filtered.length} Experts` },
            { dot: '#f59e0b', label: 'Avg 4.8★' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.8 + i * 0.4, repeat: Infinity }}
                className="w-2 h-2 rounded-full flex-shrink-0 block"
                style={{ background: s.dot }}
              />
              <span className="text-xs font-semibold text-[var(--text-muted)]">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* ── Loading skeletons ── */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[0, 1, 2, 3, 4, 5].map(i => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* ── Astrologer Grid ── */}
        {!loading && filtered.length > 0 && (
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {filtered.map(astro => (
              <AstroCard
                key={astro._id}
                astro={astro}
                onCardClick={handleCardClick}
                onChatClick={handleChatClick}
              />
            ))}
          </motion.div>
        )}

        {/* ── Empty state ── */}
        {!loading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-24"
          >
            <div className="text-6xl mb-5">🔭</div>
            <h3 className="text-xl font-bold mb-2 text-[var(--text-heading)]">No experts found</h3>
            <p className="text-sm text-[var(--text-muted)] mb-6">Try a different search term</p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSearch('')}
              className="btn-primary text-sm px-6 py-2.5 cursor-pointer"
            >
              Clear Search
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* ── Modals ── */}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {selectedAstrologer && (
        <ChatBox astrologer={selectedAstrologer} onClose={() => setSelectedAstrologer(null)} />
      )}
    </motion.div>
  );
};

export default Chat;