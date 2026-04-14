import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Star, Clock, CheckCircle,
  PhoneCall, MessageSquare, BookOpen, TrendingUp,
  Grid, List, Filter, ChevronRight, Sparkles, Users,
  Shield, Zap, Award,
} from 'lucide-react';
// import { CATEGORY_DATA } from './categoryData';
import { ALL_ARTICLES, TagBadge, NewsletterSection } from './BlogPage';

import img1 from '../assets/images/face-reading.jpg';
import img2 from '../assets/images/numerology.jpg';
import img3 from '../assets/images/palmistry.jpg';
import img4 from '../assets/images/tarot-reading.jpg';
import img5 from '../assets/images/vastu-shastra.jpg';
import img6 from '../assets/images/vedic-astrology.jpg';
 
export const CATEGORY_DATA = [
  {
    slug: 'vedic-astrology',
    name: 'Vedic Astrology',
    experts: '2.5K+',
    image: img2,                    // same as Home.jsx
    accentColor: '#FF6200',
    heroImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&h=700&fit=crop',
    tagline: 'Read the stars, shape your destiny',
    description:
      'Rooted in 5,000 years of Vedic tradition, Jyotish astrology maps the cosmic blueprint of your soul. From birth charts (Kundli) to planetary dashas, our verified experts decode the celestial code written at the moment of your birth.',
    whatYouGet: [
      'Birth Chart (Kundli) Analysis',
      'Planetary Dasha & Transit Forecast',
      'Career, Marriage & Finance Guidance',
      'Gem & Mantra Remedies',
    ],
    articleTags: ['Zodiac', 'Retrogrades', 'Astro-Psychology'],
    experts_data: [
      { name: 'Priya Sharma',  specialty: 'Birth Chart Analysis',  exp: '12 yrs', rating: 4.9, reviews: 2340, price: 25, online: true,  avatar: 'https://i.pravatar.cc/300?img=47' },
      { name: 'Arjun Mehta',   specialty: 'Transit Forecasting',   exp: '8 yrs',  rating: 4.8, reviews: 1820, price: 18, online: true,  avatar: 'https://i.pravatar.cc/300?img=33' },
      { name: 'Kavya Nair',    specialty: 'Relationship Synastry', exp: '10 yrs', rating: 4.9, reviews: 3100, price: 30, online: false, avatar: 'https://i.pravatar.cc/300?img=25' },
      { name: 'Rohit Verma',   specialty: 'Dasha Prediction',      exp: '15 yrs', rating: 4.7, reviews: 980,  price: 15, online: true,  avatar: 'https://i.pravatar.cc/300?img=12' },
    ],
  },
  {
    slug: 'tarot-reading',
    name: 'Tarot Reading',
    experts: '1.8K+',
    image: img3,
    accentColor: '#8B5CF6',
    heroImage: 'https://images.unsplash.com/photo-1551269901-5c5e00aaefbc?w=1600&h=700&fit=crop',
    tagline: 'Every card, a doorway to truth',
    description:
      'The 78 cards of the Tarot are a mirror of the human psyche. Whether you seek clarity in love, career crossroads, or inner healing, our gifted readers hold space for your most important questions — gently, honestly, and without judgment.',
    whatYouGet: [
      'Celtic Cross & Custom Spreads',
      'Love & Relationship Readings',
      'Career & Financial Guidance',
      'Shadow Work & Inner Healing',
    ],
    articleTags: ['Rituals', 'Astro-Psychology', 'Philosophy'],
    experts_data: [
      { name: 'Maya Rivers',  specialty: 'Celtic Cross Spreads', exp: '9 yrs',  rating: 4.9, reviews: 1540, price: 22, online: true,  avatar: 'https://i.pravatar.cc/300?img=44' },
      { name: 'Dev Anand',    specialty: 'Shadow Work Tarot',   exp: '6 yrs',  rating: 4.7, reviews: 890,  price: 14, online: false, avatar: 'https://i.pravatar.cc/300?img=11' },
      { name: 'Lila Okonkwo', specialty: 'Love & Relationships',exp: '11 yrs', rating: 4.8, reviews: 2210, price: 28, online: true,  avatar: 'https://i.pravatar.cc/300?img=36' },
      { name: 'Sam Torres',   specialty: 'Career Guidance',     exp: '7 yrs',  rating: 4.6, reviews: 670,  price: 12, online: true,  avatar: 'https://i.pravatar.cc/300?img=18' },
    ],
  },
  {
    slug: 'numerology',
    name: 'Numerology',
    experts: '1.2K+',
    image: img4,
    accentColor: '#0EA5E9',
    heroImage: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1600&h=700&fit=crop',
    tagline: 'Your name holds the universe\'s secret code',
    description:
      'Numbers are the language of the cosmos. Numerology reveals the vibrational essence of your name and birth date — unlocking your Life Path, Expression, and Soul Urge numbers to illuminate who you truly are and where you\'re headed.',
    whatYouGet: [
      'Life Path & Destiny Number Report',
      'Name Correction for Success',
      'Business & Property Numerology',
      'Compatibility Matching',
    ],
    articleTags: ['Philosophy', 'Rituals'],
    experts_data: [
      { name: 'Neha Gupta',  specialty: 'Life Path Numbers',   exp: '10 yrs', rating: 4.8, reviews: 1320, price: 20, online: true,  avatar: 'https://i.pravatar.cc/300?img=29' },
      { name: 'Vikram Das',  specialty: 'Name Correction',     exp: '14 yrs', rating: 4.9, reviews: 2800, price: 35, online: false, avatar: 'https://i.pravatar.cc/300?img=7'  },
      { name: 'Asha Pillai', specialty: 'Business Numerology', exp: '8 yrs',  rating: 4.7, reviews: 760,  price: 18, online: true,  avatar: 'https://i.pravatar.cc/300?img=41' },
      { name: 'Rajan Iyer',  specialty: 'Destiny & Soul Urge', exp: '12 yrs', rating: 4.8, reviews: 1100, price: 22, online: true,  avatar: 'https://i.pravatar.cc/300?img=3'  },
    ],
  },
  {
    slug: 'vastu-shastra',
    name: 'Vastu Shastra',
    experts: '980+',
    image: img5,
    accentColor: '#EC4899',
    heroImage: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=1600&h=700&fit=crop',
    tagline: 'Align your space, transform your life',
    description:
      'Vastu Shastra is the ancient science of sacred architecture. It harmonises your living and working environment with the five elements and directional energies — bringing prosperity, peace, and positive flow into every corner of your life.',
    whatYouGet: [
      'Home & Office Vastu Audit',
      'Plot & Land Energy Assessment',
      'Room-by-Room Correction Plan',
      'Yantra & Remedy Guidance',
    ],
    articleTags: ['Rituals', 'Philosophy'],
    experts_data: [
      { name: 'Ravi Shankar', specialty: 'Home Vastu',          exp: '18 yrs', rating: 4.9, reviews: 2700, price: 40, online: true,  avatar: 'https://i.pravatar.cc/300?img=19' },
      { name: 'Meera Joshi',  specialty: 'Office & Commercial', exp: '10 yrs', rating: 4.8, reviews: 1430, price: 35, online: false, avatar: 'https://i.pravatar.cc/300?img=43' },
      { name: 'Deepak Nanda', specialty: 'Plot & Land Energy',  exp: '14 yrs', rating: 4.7, reviews: 890,  price: 28, online: true,  avatar: 'https://i.pravatar.cc/300?img=2'  },
      { name: 'Ananya Bose',  specialty: 'Remedies & Yantras', exp: '9 yrs',  rating: 4.8, reviews: 1100, price: 22, online: true,  avatar: 'https://i.pravatar.cc/300?img=26' },
    ],
  },
  {
    slug: 'palmistry',
    name: 'Palmistry',
    experts: '1.5K+',
    image: img6,
    accentColor: '#F59E0B',
    heroImage: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1600&h=700&fit=crop',
    tagline: 'Your destiny is written in your hands',
    description:
      'Palmistry — or Hasta Samudrika Shastra — is the oldest living oracle on earth. Every line, mount, and fingerprint pattern tells the story of who you were born to be. Our expert palm readers help you understand your health, love, career, and karmic journey.',
    whatYouGet: [
      'Life, Head & Heart Line Analysis',
      'Mount & Finger Shape Reading',
      'Children, Marriage & Travel Lines',
      'Past Life Indicators',
    ],
    articleTags: ['Astro-Psychology', 'Philosophy'],
    experts_data: [
      { name: 'Sunita Rao',  specialty: 'Life & Fate Lines',   exp: '16 yrs', rating: 4.9, reviews: 3200, price: 30, online: true,  avatar: 'https://i.pravatar.cc/300?img=38' },
      { name: 'Mohan Lal',   specialty: 'Mount Analysis',      exp: '20 yrs', rating: 5.0, reviews: 4100, price: 45, online: false, avatar: 'https://i.pravatar.cc/300?img=5'  },
      { name: 'Pooja Sharma',specialty: 'Hand Shape Reading',  exp: '8 yrs',  rating: 4.7, reviews: 920,  price: 20, online: true,  avatar: 'https://i.pravatar.cc/300?img=32' },
      { name: 'Anil Kumar',  specialty: 'Children & Marriage', exp: '12 yrs', rating: 4.8, reviews: 1560, price: 25, online: true,  avatar: 'https://i.pravatar.cc/300?img=15' },
    ],
  },
  {
    slug: 'face-reading',
    name: 'Face Reading',
    experts: '890+',
    image: img1,
    accentColor: '#10B981',
    heroImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&h=700&fit=crop',
    tagline: 'The face never lies',
    description:
      'Face Reading (Physiognomy) is the art of decoding personality, health, and fortune from the features of the face. Used by physicians, sages, and kings for millennia, this ancient practice reveals character traits, emotional tendencies, and life patterns hidden in plain sight.',
    whatYouGet: [
      'Facial Feature & Expression Analysis',
      'Personality & Character Profile',
      'Health Indicators from Face',
      'Relationship Compatibility via Face',
    ],
    articleTags: ['Astro-Psychology'],
    experts_data: [
      { name: 'Divya Menon',  specialty: 'Facial Feature Analysis', exp: '11 yrs', rating: 4.8, reviews: 1240, price: 20, online: true,  avatar: 'https://i.pravatar.cc/300?img=21' },
      { name: 'Karan Sethi',  specialty: 'Personality Profiling',   exp: '7 yrs',  rating: 4.7, reviews: 870,  price: 16, online: true,  avatar: 'https://i.pravatar.cc/300?img=6'  },
      { name: 'Tara Moon',    specialty: 'Health from Face',        exp: '9 yrs',  rating: 4.6, reviews: 540,  price: 14, online: false, avatar: 'https://i.pravatar.cc/300?img=48' },
      { name: 'Amit Chauhan', specialty: 'Relationship Compat.',    exp: '13 yrs', rating: 4.9, reviews: 1890, price: 25, online: true,  avatar: 'https://i.pravatar.cc/300?img=3'  },
    ],
  },
];
 

/* ─── Page container ─── */
const PC = ({ children, className = '' }) => (
  <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

/* ─── Tilt hook ─── */
function useTilt() {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-6, 6]);
  const sx = useSpring(rotateX, { stiffness: 260, damping: 26 });
  const sy = useSpring(rotateY, { stiffness: 260, damping: 26 });
  const onMove = e => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };
  return { ref, rotateX: sx, rotateY: sy, onMove, onLeave };
}

/* ─── Stat pill ─── */
const StatPill = ({ label, value }) => (
  <div className="flex flex-col items-center px-5 py-3 rounded-2xl"
    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(14px)' }}>
    <span className="text-xl font-black text-white">{value}</span>
    <span className="text-[10px] uppercase tracking-widest mt-0.5" style={{ color: 'rgba(255,255,255,0.48)' }}>{label}</span>
  </div>
);

/* ─── Expert Card ─── */
const ExpertCard = ({ expert, accent, index }) => {
  const { ref, rotateX, rotateY, onMove, onLeave } = useTilt();
  const [done, setDone] = useState(false);
  return (
    <motion.div
      ref={ref} style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={onMove} onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay: index * 0.1, type: 'spring', stiffness: 160 }}
      className="group overflow-hidden rounded-2xl cursor-default"
      style={{ background: 'var(--card-bg)', border: '1px solid var(--border-soft)', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
      <div className="relative overflow-hidden" style={{ height: 176 }}>
        <img src={expert.avatar} alt={expert.name} className="w-full h-full object-cover"
          style={{ transition: 'transform 0.55s ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(6,4,2,0.82) 0%, transparent 52%)' }} />
        <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
          style={{ background: expert.online ? 'rgba(16,185,129,0.9)' : 'rgba(70,70,70,0.8)', backdropFilter: 'blur(8px)' }}>
          <motion.span animate={expert.online ? { scale: [1, 1.5, 1] } : {}}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: expert.online ? '#fff' : 'rgba(255,255,255,0.4)' }} />
          {expert.online ? 'Online' : 'Away'}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <Star size={12} fill={accent} color={accent} />
          <span className="text-sm font-black text-white">{expert.rating}</span>
          <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.55)' }}>({expert.reviews.toLocaleString()})</span>
        </div>
      </div>
      <div className="p-4">
        <h4 className="font-bold text-sm mb-0.5" style={{ color: 'var(--text-heading)' }}>{expert.name}</h4>
        <p className="text-[11px] mb-0.5" style={{ color: 'var(--text-muted)' }}>{expert.specialty}</p>
        <div className="flex items-center gap-1 mb-3">
          <CheckCircle size={10} style={{ color: accent }} />
          <span className="text-[11px]" style={{ color: 'var(--text-soft)' }}>{expert.exp} exp.</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="leading-none">
            <span className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-soft)' }}>from </span>
            <span className="text-base font-black" style={{ color: accent }}>₹{expert.price}</span>
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>/min</span>
          </div>
          <motion.button whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.93 }}
            onClick={() => setDone(true)}
            className="flex items-center gap-1.5 text-[11px] font-bold px-3.5 py-2 rounded-full cursor-pointer transition-all duration-300"
            style={{ background: done ? '#10B981' : accent, color: 'white' }}>
            {done ? <><CheckCircle size={11} /> Booked</> : <><PhoneCall size={11} /> Consult</>}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Article Grid Card ─── */
const ArticleGridCard = ({ article, accent, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ delay: index * 0.1 }}
    whileHover={{ y: -8, scale: 1.02 }} whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className="group cursor-pointer overflow-hidden rounded-[1.5rem]"
    style={{ background: 'var(--card-bg)', border: '1px solid var(--border-soft)' }}>
    <div className="overflow-hidden" style={{ height: 180, borderRadius: '1.5rem 1.5rem 0 0' }}>
      <img src={article.image} alt={article.title} className="w-full h-full object-cover"
        style={{ transition: 'transform 0.5s ease' }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
    </div>
    <div className="p-5">
      <TagBadge tag={article.tag} small />
      <h3 className="font-bold text-[15px] mt-2 mb-2 leading-snug tracking-tight transition-colors duration-300"
        style={{ color: 'var(--text-heading)' }}
        onMouseEnter={e => e.currentTarget.style.color = accent}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text-heading)'}>
        {article.title}
      </h3>
      <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>{article.excerpt}</p>
      <div className="flex items-center gap-2">
        <img src={article.author.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
        <span className="text-[11px]" style={{ color: 'var(--text-soft)' }}>{article.author.name} · {article.readTime}</span>
      </div>
    </div>
  </motion.div>
);

/* ─── Article List Card ─── */
const ArticleListCard = ({ article, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }} transition={{ delay: index * 0.07 }}
    whileHover={{ y: -4, scale: 1.01 }}
    onClick={onClick}
    className="group cursor-pointer flex items-start gap-4 p-4 rounded-2xl transition-all duration-300"
    style={{ background: 'var(--card-bg)', border: '1px solid var(--border-soft)' }}>
    <div className="flex-shrink-0 overflow-hidden rounded-xl" style={{ width: 88, height: 70 }}>
      <img src={article.image} alt={article.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
    </div>
    <div className="flex-1 min-w-0">
      <TagBadge tag={article.tag} small />
      <h4 className="font-semibold text-sm mt-1.5 mb-1 leading-snug group-hover:text-[var(--primary)] transition-colors duration-200"
        style={{ color: 'var(--text-heading)' }}>{article.title}</h4>
      <div className="flex items-center gap-2">
        <img src={article.author.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
        <span className="text-[11px]" style={{ color: 'var(--text-soft)' }}>{article.date} · {article.readTime}</span>
      </div>
    </div>
    <ChevronRight size={14} className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      style={{ color: 'var(--text-soft)' }} />
  </motion.div>
);

/* ─── Trust Badge ─── */
const TrustBadge = ({ icon: Icon, label, accent }) => (
  <motion.div whileHover={{ y: -4 }}
    className="flex flex-col items-center gap-2 px-5 py-4 rounded-2xl text-center"
    style={{ background: `${accent}10`, border: `1px solid ${accent}28` }}>
    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${accent}20` }}>
      <Icon size={16} style={{ color: accent }} />
    </div>
    <span className="text-[11px] font-semibold" style={{ color: 'var(--text-heading)' }}>{label}</span>
  </motion.div>
);

/* ═══════════════════════════════════════════════
   MAIN CATEGORY PAGE
═══════════════════════════════════════════════ */
export default function CategoryPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('Latest');
  const [showAll, setShowAll] = useState(false);
  const [chatMode, setChatMode] = useState('chat');

  const cat = CATEGORY_DATA.find(c => c.slug === slug);

  if (!cat) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5" style={{ background: 'var(--bg-soft)' }}>
      <div className="text-5xl">🌌</div>
      <h2 className="font-bold text-2xl" style={{ color: 'var(--text-heading)' }}>Category not found</h2>
      <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
        onClick={() => navigate(-1)}
        className="text-sm font-bold px-6 py-3 rounded-full cursor-pointer"
        style={{ background: 'var(--gradient-primary)', color: 'white' }}>
        ← Go Back
      </motion.button>
    </div>
  );

  const ac = cat.accentColor;
  const related      = ALL_ARTICLES.filter(a => cat.articleTags.includes(a.category) && !a.featured);
  const pinned       = related[0] || ALL_ARTICLES[0];
  const gridArticles = related.slice(1, 4);
  const moreArticles = related.slice(4, 8);
  const shown        = showAll ? cat.experts_data : cat.experts_data.slice(0, 4);

  return (
    <div className="overflow-x-hidden" style={{ minHeight: '100vh', background: 'var(--bg-soft)' }}>

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: 540 }}>
        <div className="absolute inset-0">
          <img src={cat.heroImage} alt={cat.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(160deg, rgba(4,3,2,0.55) 0%, rgba(4,3,2,0.85) 55%, var(--bg-soft) 100%)' }} />
        </div>
        <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.65, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute pointer-events-none"
          style={{ top: '-15%', right: '-8%', width: '52%', height: '100%', borderRadius: '50%',
            background: `radial-gradient(circle, ${ac}40 0%, transparent 65%)`, filter: 'blur(72px)' }} />
        <motion.div animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute pointer-events-none"
          style={{ bottom: '5%', left: '-5%', width: '40%', height: '55%', borderRadius: '50%',
            background: `radial-gradient(circle, ${ac}25 0%, transparent 70%)`, filter: 'blur(60px)' }} />

        <PC className="relative z-10" style={{ paddingTop: '5.5rem', paddingBottom: '5rem' }}>
          <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }} whileHover={{ x: -6 }} onClick={() => navigate(-1)}
            className="mb-9 flex items-center gap-2 text-sm font-semibold cursor-pointer"
            style={{ color: 'rgba(255,255,255,0.5)' }}>
            <ArrowLeft size={14} /> Back
          </motion.button>

          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
            {/* Title block */}
            <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="max-w-xl">
              <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full mb-6"
                style={{ background: `${ac}22`, color: ac, border: `1px solid ${ac}45` }}>
                <Sparkles size={10} /> Expert Category
              </span>
              <h1 className="font-black leading-none tracking-tight text-white mb-3"
                style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', letterSpacing: '-0.04em' }}>
                {cat.name}
              </h1>
              <p className="text-base font-medium mb-6 italic" style={{ color: `${ac}cc` }}>
                "{cat.tagline}"
              </p>
              <p className="text-sm leading-relaxed mb-8 max-w-lg" style={{ color: 'rgba(255,255,255,0.58)' }}>
                {cat.description}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <StatPill value={cat.experts} label="Verified Experts" />
                <StatPill value="4.9★" label="Avg Rating" />
                <StatPill value="24/7" label="Available" />
              </div>
            </motion.div>

            {/* CTA card */}
            <motion.div initial={{ opacity: 0, y: 28, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-72 flex-shrink-0 rounded-2xl p-6"
              style={{ background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.12)', boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-4"
                style={{ color: 'rgba(255,255,255,0.45)' }}>Connect now</p>
              <div className="flex rounded-xl overflow-hidden mb-4"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {[{ k: 'chat', icon: MessageSquare, label: 'Chat' }, { k: 'call', icon: PhoneCall, label: 'Call' }].map(m => (
                  <button key={m.k} onClick={() => setChatMode(m.k)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold cursor-pointer transition-all duration-250"
                    style={{ background: chatMode === m.k ? ac : 'transparent', color: chatMode === m.k ? 'white' : 'rgba(255,255,255,0.45)', borderRadius: 10 }}>
                    <m.icon size={12} /> {m.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] mb-5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                {chatMode === 'chat'
                  ? 'Start typing instantly — no wait time, fully private.'
                  : 'Voice-connect with a verified expert in under 60 seconds.'}
              </p>
              <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold cursor-pointer"
                style={{ background: ac, color: 'white', boxShadow: `0 10px 30px ${ac}55` }}>
                {chatMode === 'chat' ? <MessageSquare size={15} /> : <PhoneCall size={15} />}
                {chatMode === 'chat' ? 'Start Free Chat' : 'Talk to Expert'}
              </motion.button>
              <p className="text-center text-[10px] mt-3" style={{ color: 'rgba(255,255,255,0.28)' }}>
                First ₹100 is on us · No hidden charges
              </p>
            </motion.div>
          </div>
        </PC>
      </section>

      {/* ── WHAT YOU GET + TRUST BADGES ── */}
      <section className="py-12">
        <PC>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            {cat.whatYouGet.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="flex items-start gap-3 p-4 rounded-2xl"
                style={{ background: 'var(--card-bg)', border: `1px solid ${ac}28` }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${ac}18` }}>
                  <CheckCircle size={13} style={{ color: ac }} />
                </div>
                <span className="text-xs font-semibold leading-snug" style={{ color: 'var(--text-heading)' }}>{item}</span>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
            {[
              { icon: Shield, label: '100% Private & Secure' },
              { icon: Award, label: 'Verified Experts Only' },
              { icon: Zap, label: 'Instant Connection' },
              { icon: Users, label: `${cat.experts} Specialists` },
            ].map((b, i) => <TrustBadge key={i} icon={b.icon} label={b.label} accent={ac} />)}
          </div>
        </PC>
      </section>

      <div style={{ borderTop: '1px solid var(--border-soft)' }} />

      {/* ── TOP EXPERTS ── */}
      <section className="py-14">
        <PC>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full" style={{ background: ac }} />
              <Users size={16} style={{ color: ac }} />
              <h2 className="font-bold text-xl tracking-tight" style={{ color: 'var(--text-heading)' }}>
                Top {cat.name} Experts
              </h2>
            </div>
            <motion.button whileHover={{ x: 4 }} onClick={() => setShowAll(v => !v)}
              className="text-xs font-bold flex items-center gap-1.5 cursor-pointer" style={{ color: ac }}>
              {showAll ? 'Show less' : 'View all'} <ArrowRight size={12} />
            </motion.button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatePresence>
              {shown.map((exp, i) => <ExpertCard key={exp.name} expert={exp} accent={ac} index={i} />)}
            </AnimatePresence>
          </div>
        </PC>
      </section>

      <div style={{ borderTop: '1px solid var(--border-soft)' }} />

      {/* ── FEATURED ARTICLE HERO ── */}
      {pinned && (
        <section className="py-14">
          <PC>
            <div className="flex items-center gap-3 mb-7">
              <div className="w-1 h-6 rounded-full" style={{ background: ac }} />
              <BookOpen size={16} style={{ color: ac }} />
              <h2 className="font-bold text-xl tracking-tight" style={{ color: 'var(--text-heading)' }}>Featured Read</h2>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => navigate(`/blog/${pinned.id}`)}
              className="relative rounded-[2rem] overflow-hidden cursor-pointer group"
              style={{ minHeight: 420 }}>
              <div className="absolute inset-0">
                <img src={pinned.image} alt={pinned.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(5,3,1,0.96) 0%, rgba(5,3,1,0.55) 45%, rgba(5,3,1,0.1) 100%)' }} />
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.75, 0.35] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute pointer-events-none"
                  style={{ top: '-20%', right: '-8%', width: '55%', height: '85%', borderRadius: '50%',
                    background: `radial-gradient(circle, ${ac}42 0%, transparent 68%)`, filter: 'blur(60px)' }} />
              </div>
              <div className="relative z-10 flex flex-col lg:flex-row items-end justify-between gap-8 p-8 sm:p-12 lg:p-14"
                style={{ minHeight: 420 }}>
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full text-white"
                      style={{ background: ac }}>{pinned.tag}</span>
                    <span className="text-xs flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      <Clock size={11} /> {pinned.readTime}
                    </span>
                  </div>
                  <h2 className="font-black leading-tight tracking-tight text-white mb-4"
                    style={{ fontSize: 'clamp(1.7rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}>
                    {pinned.title}
                  </h2>
                  <p className="text-sm leading-relaxed mb-6 max-w-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {pinned.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <img src={pinned.author.avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-white/20" />
                    <span className="text-sm font-semibold text-white">{pinned.author.name}</span>
                    <span className="text-xs" style={{ color: 'rgba(255,255,255,0.38)' }}>{pinned.date}</span>
                  </div>
                </div>
                <motion.button whileHover={{ scale: 1.06, y: -3 }} whileTap={{ scale: 0.95 }}
                  onClick={e => { e.stopPropagation(); navigate(`/blog/${pinned.id}`); }}
                  className="flex-shrink-0 inline-flex items-center gap-2.5 text-sm font-bold px-7 py-3.5 rounded-full cursor-pointer whitespace-nowrap"
                  style={{ background: ac, color: 'white', boxShadow: `0 12px 32px ${ac}55` }}>
                  Read Article <ArrowRight size={14} />
                </motion.button>
              </div>
            </motion.div>
          </PC>
        </section>
      )}

      {/* ── ARTICLES SECTION ── */}
      {related.length > 1 && (
        <section className="pb-14">
          <PC>
            <div className="flex items-center justify-between gap-4 mb-8 pb-5"
              style={{ borderBottom: '1px solid var(--border-soft)' }}>
              <div className="flex items-center gap-3">
                <TrendingUp size={16} style={{ color: ac }} />
                <h2 className="font-bold text-xl tracking-tight" style={{ color: 'var(--text-heading)' }}>
                  {cat.name} Articles
                </h2>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: `${ac}15`, color: ac }}>
                  {related.length} stories
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex p-1 rounded-xl gap-1"
                  style={{ background: 'var(--bg-soft)', border: '1px solid var(--border-soft)' }}>
                  {[{ mode: 'grid', icon: <Grid size={13} /> }, { mode: 'list', icon: <List size={13} /> }].map(({ mode, icon }) => (
                    <motion.button key={mode} whileTap={{ scale: 0.88 }} onClick={() => setViewMode(mode)}
                      className="p-1.5 rounded-lg cursor-pointer transition-all duration-200"
                      style={{ background: viewMode === mode ? ac : 'transparent', color: viewMode === mode ? 'white' : 'var(--text-muted)' }}>
                      {icon}
                    </motion.button>
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <Filter size={11} style={{ color: 'var(--text-soft)' }} />
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                    className="text-xs font-semibold px-3 py-2 rounded-full outline-none cursor-pointer"
                    style={{ background: 'var(--bg-soft)', color: 'var(--text-heading)', border: '1px solid var(--border-soft)' }}>
                    {['Latest', 'Popular', 'Oldest'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {viewMode === 'grid' ? (
                <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {gridArticles.map((a, i) => (
                    <ArticleGridCard key={a.id} article={a} accent={ac} index={i}
                      onClick={() => navigate(`/blog/${a.id}`)} />
                  ))}
                </motion.div>
              ) : (
                <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col gap-3 mb-12">
                  {gridArticles.map((a, i) => (
                    <ArticleListCard key={a.id} article={a} index={i} onClick={() => navigate(`/blog/${a.id}`)} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {moreArticles.length > 0 && (
              <>
                <div className="flex items-center gap-3 mb-5">
                  <BookOpen size={15} style={{ color: ac }} />
                  <h3 className="font-bold text-base tracking-tight" style={{ color: 'var(--text-heading)' }}>
                    More to Explore
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {moreArticles.map((a, i) => (
                    <ArticleListCard key={a.id} article={a} index={i} onClick={() => navigate(`/blog/${a.id}`)} />
                  ))}
                </div>
              </>
            )}

            {related.length === 0 && (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--text-heading)' }}>Articles coming soon</h3>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  We're crafting deep-dive content for {cat.name}.
                </p>
              </div>
            )}
          </PC>
        </section>
      )}

      {/* ── NEWSLETTER ── */}
      <div className="pb-16">
        <PC><NewsletterSection /></PC>
      </div>
    </div>
  );
}