import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, Star, ShoppingBag, Sparkles, CheckCircle,
  ArrowRight, Filter, Search, Flame,
  Shield, Gift, Users, Calendar, MapPin, X,
} from 'lucide-react';
import ShineWrapper from '../Animation/ShineWrapper';

/* ─── Section Label ─── */
const SLabel = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest bg-[var(--accent-bg)] text-[var(--primary)] border border-[var(--accent-border)]"
  >
    {children}
  </motion.div>
);

/* ─── Section Heading ─── */
const SHeading = ({ children, sub }) => (
  <>
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight text-[var(--text-heading)] leading-tight">
      {children}
    </h2>
    {sub && (
      <p className="text-base max-w-xl mx-auto leading-relaxed text-[var(--text-muted)]">
        {sub}
      </p>
    )}
  </>
);

/* ─── Page Container ─── */
const PageContainer = ({ children, className = '' }) => (
  <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

/* ─── Category Pill ─── */
const CategoryPill = ({ label, active, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.06, y: -2 }}
    whileTap={{ scale: 0.96 }}
    onClick={onClick}
    className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest border transition-all duration-300 cursor-pointer whitespace-nowrap ${
      active
        ? 'text-white border-transparent shadow-[0_4px_18px_rgba(255,98,0,0.28)]'
        : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border-soft)] hover:border-[var(--accent-border)] hover:text-[var(--primary)]'
    }`}
    style={active ? { background: 'var(--gradient-primary)' } : {}}
  >
    {label}
  </motion.button>
);

/* ─── Search Input ─── */
const SearchInput = ({ icon: Icon, placeholder, value, onChange, onClear }) => (
  <div className="relative flex-1 w-full">
    <Icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" />
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full pl-10 pr-9 py-3 rounded-full text-sm border border-[var(--border-soft)] bg-[var(--bg-elevated)] text-[var(--text)] placeholder:text-[var(--text-soft)] outline-none focus:border-[var(--accent-border)] transition-all duration-200"
    />
    {value && (
      <button
        onClick={onClear}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-soft)] hover:text-[var(--primary)] transition-colors"
      >
        <X size={13} />
      </button>
    )}
  </div>
);

/* ─── Puja Card ─── */
const PujaCard = ({ puja, index }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="card group cursor-pointer relative overflow-hidden flex flex-col !p-0"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-[1.5rem] aspect-[4/3]">
        <motion.img
          src={puja.image || 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80'}
          alt={puja.name}
          className="w-full h-full object-cover"
          animate={hovered ? { scale: 1.07 } : { scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(26,28,26,0.45) 100%)' }}
        />
        {/* Category badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
          style={{ background: 'var(--gradient-primary)', color: '#fff' }}
        >
          {puja.category || 'Prosperity'}
        </div>
        {/* Rating */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-md rounded-full px-2.5 py-1">
          <Star size={11} className="text-yellow-400 fill-yellow-400" />
          <span className="text-white text-[11px] font-bold">{puja.rating || '4.9'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-base mb-1.5 text-[var(--text-heading)] leading-snug">
          {puja.name}
        </h3>

        {/* Location tag — shown only when present */}
        {(puja.location?.city || puja.location?.state) && (
          <div className="flex items-center gap-1 mb-2">
            <MapPin size={11} className="text-[var(--primary)] flex-shrink-0" />
            <span className="text-[11px] text-[var(--text-soft)] font-medium">
              {[puja.location.city, puja.location.state].filter(Boolean).join(', ')}
            </span>
          </div>
        )}

        <p className="text-xs leading-relaxed mb-4 text-[var(--text-muted)] flex-1 line-clamp-2">
          {puja.description}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-soft)]">
            <Clock size={12} className="text-[var(--primary)]" />
            {puja.duration || '45'} mins
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-heading)]">
            <ShoppingBag size={12} className="text-[var(--primary)]" />
            ₹{puja.price || '199'}
          </div>
        </div>

        {/* CTA */}
        <ShineWrapper>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate(`/book/${puja._id}`)}
          className="w-full btn-primary flex items-center justify-center gap-2 py-3 text-sm cursor-pointer"
        >
          Book Ritual <ArrowRight size={14} />
        </motion.button>
        </ShineWrapper>
      </div>

      {/* Hover glow */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none rounded-[1.5rem]"
            style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,98,0,0.05) 0%, transparent 65%)' }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Process Step ─── */
const ProcessStep = ({ num, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -24 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay, ease: [0.16, 1, 0.3, 1] }}
    className="flex items-start gap-5 group"
  >
    <div className="flex-shrink-0 relative">
      <motion.div
        whileHover={{ scale: 1.15, rotate: 6 }}
        transition={{ type: 'spring', stiffness: 320 }}
        className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-base shadow-[0_6px_22px_rgba(255,98,0,0.28)]"
        style={{ background: 'var(--gradient-primary)' }}
      >
        {String(num).padStart(2, '0')}
      </motion.div>
      {num < 3 && (
        <div className="absolute left-1/2 top-full -translate-x-1/2 w-px h-10 mt-1"
          style={{ background: 'linear-gradient(180deg, rgba(255,98,0,0.3), transparent)' }} />
      )}
    </div>
    <div className="pt-1.5 pb-8">
      <h4 className="font-semibold text-base mb-1.5 text-[var(--text-heading)]">{title}</h4>
      <p className="text-sm leading-relaxed text-[var(--text-muted)]">{desc}</p>
    </div>
  </motion.div>
);

/* ════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════ */
export default function Puja() {
  const [pujas, setPujas]               = useState([]);
  const [loading, setLoading]           = useState(true);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [search, setSearch]             = useState('');       // puja name search
  const [locationSearch, setLocationSearch] = useState('');  // city / state search
  const [categories, setCategories]     = useState(['ALL']);

  /* ── Fetch pujas — passes search + city to backend when available,
        falls back to client-side filtering for demo data             ── */
  useEffect(() => {
    const fetchPujas = async () => {
      try {
        const token = localStorage.getItem('token');

        // Build query string — backend controller supports ?search= and ?city=
        const params = new URLSearchParams();
        if (activeCategory !== 'ALL') params.set('category', activeCategory);
        if (search.trim())            params.set('search',   search.trim());
        if (locationSearch.trim())    params.set('city',     locationSearch.trim());

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/puja?${params.toString()}`,
          {
            method:  'GET',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          }
        );

        const contentType = res.headers.get('content-type') || '';
        if (!res.ok || !contentType.includes('application/json')) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const data = await res.json();
        // Handle both shapes: plain array OR { data: [...] }
        const list = Array.isArray(data) ? data : (data.data ?? []);
        setPujas(list);

        // Rebuild category pills from fresh data
        const cats = ['ALL', ...new Set(list.map(p => p.category?.toUpperCase()).filter(Boolean))];
        setCategories(cats);
      } catch (err) {
        console.error('Puja fetch error:', err);
        // ── Fallback demo data ──
        const demo = [
          { _id: '1', name: 'Mahalakshmi Abundance Puja',  category: 'PROSPERITY', description: 'Invoke the goddess of wealth to invite spiritual and material prosperity into your life.', duration: 45,  price: 169, rating: 4.9, location: { city: 'Mumbai',    state: 'Maharashtra' }, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&q=80' },
          { _id: '2', name: 'Navagraha Shanti Ritual',     category: 'ALIGNMENT',  description: 'Harmonize planetary energies to remove cosmic friction from your destiny path.',            duration: 60,  price: 149, rating: 4.8, location: { city: 'Delhi',     state: 'Delhi' },       image: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=600&q=80' },
          { _id: '3', name: 'Ganesha Vighnaharta Puja',    category: 'PROTECTION', description: 'The ultimate ritual for removing obstacles and ensuring success in new ventures.',          duration: 30,  price: 75,  rating: 5.0, location: { city: 'Pune',      state: 'Maharashtra' }, image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80' },
          { _id: '4', name: 'Satyanarayan Katha',          category: 'PROSPERITY', description: 'A sacred offering to Lord Vishnu for truth, peace and prosperity in family life.',          duration: 90,  price: 249, rating: 4.7, location: { city: 'Bangalore', state: 'Karnataka' },   image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80' },
          { _id: '5', name: 'Rudra Abhishek',              category: 'ALIGNMENT',  description: 'A powerful Shiva ritual to dispel negative karma and invite divine blessings.',            duration: 60,  price: 199, rating: 4.9, location: { city: 'Varanasi',  state: 'UP' },          image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80' },
          { _id: '6', name: 'Durga Saptashati Path',       category: 'PROTECTION', description: 'Invoke the divine mother for courage, protection and victory over adversity.',              duration: 120, price: 299, rating: 5.0, location: { city: 'Chennai',   state: 'Tamil Nadu' },  image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&q=80' },
        ];
        setPujas(demo);
        setCategories(['ALL', 'PROSPERITY', 'ALIGNMENT', 'PROTECTION']);
      } finally {
        setLoading(false);
      }
    };

    fetchPujas();
  // Re-fetch when category changes (passes it as query param)
  // Name + location are filtered client-side after fetch for snappier UX
  }, [activeCategory]);

  /* ── Client-side filtering (name + location) ──
     When backend supports ?search and ?city these become secondary guards.
     When running on demo data they are the only filter.               ── */
  const filtered = pujas.filter(p => {
    const nameMatch = !search.trim() ||
      p.name?.toLowerCase().includes(search.toLowerCase());

    const locationMatch = !locationSearch.trim() || (() => {
      const q = locationSearch.toLowerCase();
      return (
        p.location?.city?.toLowerCase().includes(q) ||
        p.location?.state?.toLowerCase().includes(q) ||
        p.location?.address?.toLowerCase().includes(q)
      );
    })();

    return nameMatch && locationMatch;
  });

  /* ── Derive unique cities for quick-select chips ── */
  const uniqueCities = [...new Set(
    pujas.map(p => p.location?.city).filter(Boolean)
  )].slice(0, 6); // show at most 6 city chips

  const activeFiltersCount = (search ? 1 : 0) + (locationSearch ? 1 : 0) + (activeCategory !== 'ALL' ? 1 : 0);

  const clearAllFilters = () => {
    setSearch('');
    setLocationSearch('');
    setActiveCategory('ALL');
  };

  const features = [
    { icon: Shield,   title: '100% Authentic',      desc: 'Vedic-certified pandits only' },
    { icon: Users,    title: 'Expert Pandits',       desc: 'Trained in traditional scriptures' },
    { icon: Calendar, title: 'Flexible Scheduling',  desc: 'Book any day, any time' },
    { icon: Gift,     title: 'Digital Prasad',       desc: 'Blessings delivered to you' },
  ];

  const processSteps = [
    { title: 'Set Intention',      desc: "Our priests connect with you to understand your specific karmic needs and heart's desire." },
    { title: 'Divine Offering',    desc: 'The ritual is performed at our sacred shrine with authentic mantras and Vedic precision.' },
    { title: 'Prasad & Blessings', desc: 'Energized offerings and a digital certificate of the blessing are shared with you.' },
  ];

  return (
    <div className="overflow-x-hidden">

      {/* ═══════════════════════════════
          HERO BANNER
      ═══════════════════════════════ */}
      <section className="relative min-h-[60vh] flex items-center pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&q=80"
            alt="Sacred ceremonies"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(26,28,26,0.82) 0%, rgba(68,17,17,0.65) 50%, rgba(26,28,26,0.5) 100%)' }} />
        </div>

        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none z-10"
          style={{ background: 'radial-gradient(circle, rgba(255,98,0,0.15) 0%, transparent 65%)', filter: 'blur(60px)' }}
        />

        <PageContainer className="relative z-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-xs font-semibold uppercase tracking-widest border"
              style={{ background: 'rgba(255,98,0,0.15)', border: '1px solid rgba(255,98,0,0.3)', color: '#ff6200' }}
            >
              <Flame size={11} /> Sacred Offerings
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold leading-[1.05] mb-5 tracking-tight"
              style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', color: '#f5f5f5' }}
            >
              Invoke the<br />
              <motion.span
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: 'linear-gradient(90deg, #ff8c3a, #ff6200, #ffad75, #ff6200)', backgroundSize: '220% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}
              >
                Divine
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}
              className="text-base mb-8 leading-relaxed max-w-md"
              style={{ color: 'rgba(245,245,245,0.65)' }}
            >
              Connect with certified Vedic pandits for sacred rituals performed with authenticity, precision, and devotion.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.54 }} className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.96 }}
                className="btn-primary flex items-center gap-2.5 px-7 py-4 text-base cursor-pointer"
                onClick={() => document.getElementById('puja-list')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Sparkles size={16} /> Explore Ceremonies <ArrowRight size={15} />
              </motion.button>
            </motion.div>
          </div>
        </PageContainer>
      </section>

      {/* ═══════════════════════════════
          FEATURES STRIP
      ═══════════════════════════════ */}
      <section className="relative z-10 -mt-10">
        <PageContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.2, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="card text-center group cursor-default"
              >
                <motion.div whileHover={{ rotate: 10, scale: 1.18 }} transition={{ type: 'spring', stiffness: 320 }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3 bg-[var(--accent-bg)] border border-[var(--accent-border)]">
                  <f.icon size={19} className="text-[var(--primary)]" />
                </motion.div>
                <h4 className="font-semibold text-sm mb-1 text-[var(--text-heading)]">{f.title}</h4>
                <p className="text-xs text-[var(--text-soft)]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ═══════════════════════════════
          PUJA LIST
      ═══════════════════════════════ */}
      <section id="puja-list" className="section">
        <PageContainer>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <SLabel><Sparkles size={12} /> Sacred Rituals</SLabel>
            <SHeading sub="Choose from our curated collection of Vedic rituals performed by certified pandits">
              Featured Rituals
            </SHeading>
          </motion.div>

          {/* ── Search + Filter Bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-4 mb-6"
          >
            {/* Row 1: name search + location search */}
            <div className="flex flex-col sm:flex-row gap-3">
              <SearchInput
                icon={Search}
                placeholder="Search rituals by name…"
                value={search}
                onChange={setSearch}
                onClear={() => setSearch('')}
              />
              <SearchInput
                icon={MapPin}
                placeholder="Filter by city or state…"
                value={locationSearch}
                onChange={setLocationSearch}
                onClear={() => setLocationSearch('')}
              />
            </div>

            {/* Row 2: category pills + active filter count */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Filter size={14} className="text-[var(--text-soft)] flex-shrink-0" />
                {categories.map(cat => (
                  <CategoryPill key={cat} label={cat} active={activeCategory === cat} onClick={() => setActiveCategory(cat)} />
                ))}
              </div>

              {/* Clear all — only shown when something is active */}
              {activeFiltersCount > 0 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                  onClick={clearAllFilters}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-[var(--border-soft)] text-[var(--text-muted)] hover:border-[var(--accent-border)] hover:text-[var(--primary)] transition-all"
                >
                  <X size={11} /> Clear all ({activeFiltersCount})
                </motion.button>
              )}
            </div>

            {/* Row 3: quick-select city chips (derived from data) */}
            {uniqueCities.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--text-soft)] flex-shrink-0">
                  Popular cities:
                </span>
                {uniqueCities.map(city => (
                  <motion.button
                    key={city}
                    whileHover={{ scale: 1.06, y: -1 }} whileTap={{ scale: 0.95 }}
                    onClick={() => setLocationSearch(locationSearch === city ? '' : city)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold border transition-all duration-200 ${
                      locationSearch === city
                        ? 'text-white border-transparent shadow-[0_2px_10px_rgba(255,98,0,0.22)]'
                        : 'bg-[var(--bg-elevated)] text-[var(--text-muted)] border-[var(--border-soft)] hover:border-[var(--accent-border)] hover:text-[var(--primary)]'
                    }`}
                    style={locationSearch === city ? { background: 'var(--gradient-primary)' } : {}}
                  >
                    <MapPin size={9} /> {city}
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Results count */}
          {!loading && (
            <motion.p
              key={filtered.length}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-xs text-[var(--text-soft)] mb-6 font-medium"
            >
              {filtered.length === 0
                ? 'No rituals match your filters'
                : `${filtered.length} ritual${filtered.length !== 1 ? 's' : ''} found`}
              {locationSearch && ` in "${locationSearch}"`}
              {search && ` matching "${search}"`}
            </motion.p>
          )}

          {/* ── Grid ── */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card !p-0 animate-pulse">
                  <div className="aspect-[4/3] rounded-t-[1.5rem] bg-[var(--bg-high)]" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 rounded-full bg-[var(--bg-high)] w-3/4" />
                    <div className="h-3 rounded-full bg-[var(--bg-high)] w-full" />
                    <div className="h-3 rounded-full bg-[var(--bg-high)] w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 card-soft">
              <div className="text-5xl mb-4">🪔</div>
              <h3 className="font-semibold text-lg mb-2 text-[var(--text-heading)]">No rituals found</h3>
              <p className="text-sm text-[var(--text-muted)] mb-4">Try a different city, name, or category</p>
              <motion.button
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold border border-[var(--accent-border)] text-[var(--primary)] bg-[var(--accent-bg)] transition-all"
              >
                <X size={13} /> Clear filters
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filtered.map((puja, i) => (
                  <PujaCard key={puja._id} puja={puja} index={i} />
                ))}
              </AnimatePresence>
            </div>
          )}

        </PageContainer>
      </section>

      {/* ═══════════════════════════════
          SACRED PROCESS — DARK BANNER
      ═══════════════════════════════ */}
      <section className="section">
        <PageContainer>
          <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div
              className="relative rounded-[2rem] overflow-hidden px-8 py-14 sm:px-12 lg:px-20 lg:py-20"
              style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1c1c1c 50%, #111 100%)' }}
            >
              <motion.div
                animate={{ scale: [1, 1.22, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute pointer-events-none inset-0"
                style={{ background: 'radial-gradient(ellipse 60% 80% at 72% 50%, rgba(255,98,0,0.18) 0%, transparent 65%)' }}
              />
              <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-4">
                {[{ r: -9, w: 80, h: 116, delay: 0 }, { r: 0, w: 98, h: 140, c: true, delay: 0.5 }, { r: 9, w: 80, h: 116, delay: 1 }].map((c, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -9, 0] }}
                    transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
                    whileHover={{ scale: 1.12 }}
                    style={{ width: c.w, height: c.h, transform: `rotate(${c.r}deg)${c.c ? ' translateY(-10px)' : ''}`, borderRadius: 14, background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.13)', boxShadow: '0 8px 32px rgba(0,0,0,0.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {c.c && (
                      <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
                        <Sparkles size={24} style={{ color: '#ff8c3a' }} />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="relative z-10 max-w-md">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#ff8c3a' }}>How It Works</p>
                <h2 className="text-3xl lg:text-4xl font-bold leading-tight mb-10 tracking-tight" style={{ color: '#f5f5f5' }}>The Sacred Process</h2>
                <div className="space-y-0">
                  {processSteps.map((step, i) => (
                    <ProcessStep key={i} num={i + 1} title={step.title} desc={step.desc} delay={i * 0.12} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </PageContainer>
      </section>

      {/* ═══════════════════════════════
          CTA BANNER
      ═══════════════════════════════ */}
      <section className="section bg-[var(--bg)] border-t border-[var(--border-soft)]">
        <PageContainer>
          <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <SLabel><Flame size={12} /> Book Now</SLabel>
            <SHeading sub="Join thousands who have experienced divine transformation through sacred rituals">
              Begin Your Sacred Journey
            </SHeading>
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex flex-wrap justify-center gap-4 mt-10">
              <motion.button
                whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.96 }}
                className="btn-primary flex items-center gap-2.5 px-8 py-4 text-base cursor-pointer"
                onClick={() => document.getElementById('puja-list')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Sparkles size={16} /> Browse All Rituals
              </motion.button>
              <Link to="/chat">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-base border border-[var(--border-soft)] text-[var(--text-heading)] bg-transparent transition-all duration-300 hover:bg-[var(--accent-bg)] hover:border-[var(--accent-border)]"
                >
                  Talk to a Pandit
                </motion.button>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.35 }} className="flex flex-wrap justify-center gap-3 mt-8">
              {['First ritual blessing free', 'Certified Vedic pandits', '100% authentic rituals'].map((txt, i) => (
                <motion.div key={i} whileHover={{ scale: 1.06, y: -2 }} className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs cursor-default bg-[var(--accent-bg)] border border-[var(--accent-border)] text-[var(--text-muted)]">
                  <CheckCircle size={11} className="text-green-500" /> {txt}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </PageContainer>
      </section>

    </div>
  );
}