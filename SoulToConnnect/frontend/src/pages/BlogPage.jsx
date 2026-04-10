import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ArrowRight, Clock, Sparkles,
  TrendingUp, BookOpen, Star, Mail, CheckCircle, Menu, X
} from 'lucide-react';

/* ─── Page Container ─── */
const PageContainer = ({ children, className = '' }) => (
  <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

/* ─── All Article Data (shared/exported for detail page) ─── */
export const ALL_ARTICLES = [
  {
    id: 'great-conjunction',
    tag: 'Feature Story',
    category: 'Zodiac',
    readTime: '8 min read',
    title: 'The Great Conjunction: Navigating the Era of Air',
    excerpt: 'As Saturn and Jupiter align in Aquarius, we enter a profound shift in collective consciousness. Discover how this celestial movement affects your path.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&h=500&fit=crop',
    author: { name: 'Elowen Starlight', avatar: 'https://i.pravatar.cc/40?img=47', bio: 'Elowen is a master astrologer and celestial historian with over 15 years of experience decoding planetary movements. She specializes in transit interpretation and karmic astrology.' },
    date: 'Oct 24, 2024',
    featured: true,
  },
  {
    id: 'moon-phase-manifestation',
    tag: 'Rituals',
    category: 'Rituals',
    readTime: '5 min read',
    title: 'Moon Phase Manifestation: A Guide to New Beginnings',
    excerpt: 'Learn how to synchronize your intentions with the lunar cycle for maximum potency and clarity in your manifestation practice.',
    image: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=700&h=420&fit=crop',
    author: { name: 'Elena Solstice', avatar: 'https://i.pravatar.cc/40?img=32', bio: 'Elena is a sacred ritual designer and lunar cycle coach who helps thousands align their daily practices with cosmic timing.' },
    date: 'Oct 24, 2024',
    hero: true,
  },
  {
    id: 'crystals-solstice',
    tag: 'Crystals',
    category: 'Crystals',
    readTime: '4 min read',
    title: 'Charging your toolkit for the Solstice',
    excerpt: 'A comprehensive guide to cleansing your stones under the most potent solar event of the year.',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=260&fit=crop',
    author: { name: 'Jade Celeste', avatar: 'https://i.pravatar.cc/40?img=9', bio: 'Crystal healer and energy worker with a passion for making vibrational medicine accessible to the modern seeker.' },
    date: 'Oct 22, 2024',
  },
  {
    id: 'jung-stars',
    tag: 'Psychology',
    category: 'Astro-Psychology',
    readTime: '6 min read',
    title: 'The Intersection of Jung and Stars',
    excerpt: 'Exploring how archetypal psychology mirrors the celestial houses of the ancient natal chart.',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=260&fit=crop',
    author: { name: 'Lyra Voss', avatar: 'https://i.pravatar.cc/40?img=23', bio: 'Depth psychologist and astrologer who bridges the worlds of modern therapy and ancient star wisdom.' },
    date: 'Oct 20, 2024',
  },
  {
    id: 'hermeticism',
    tag: 'Philosophy',
    category: 'Philosophy',
    readTime: '7 min read',
    title: 'As Above, So Below: Hermeticism Today',
    excerpt: 'Understanding the ancient philosophy that bridges the gap between the macrocosm and our daily lives.',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=260&fit=crop',
    author: { name: 'Sol Brennan', avatar: 'https://i.pravatar.cc/40?img=15', bio: 'Philosopher, author, and esoteric scholar who writes about the intersection of ancient wisdom and contemporary life.' },
    date: 'Oct 18, 2024',
  },
  {
    id: 'venus-retrograde',
    tag: 'Zodiac',
    category: 'Zodiac',
    readTime: '6 min read',
    title: 'Venus in Retrograde: Love, Money & Beauty Reimagined',
    excerpt: 'When Venus goes retrograde, every relationship and value system comes under cosmic review.',
    image: 'https://images.unsplash.com/photo-1457365050282-c53d772ef8b2?w=400&h=260&fit=crop',
    author: { name: 'Aria Moonwhisper', avatar: 'https://i.pravatar.cc/40?img=32', bio: 'Relationship astrologer specializing in Venus transits and synastry chart readings.' },
    date: 'Nov 2, 2024',
  },
  {
    id: 'planetary-hours',
    tag: 'Rituals',
    category: 'Rituals',
    readTime: '4 min read',
    title: 'The Art of Planetary Hours: Ancient Timing for Modern Life',
    excerpt: 'Use the seven classical planets to schedule your day for maximum cosmic alignment.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=260&fit=crop',
    author: { name: 'Sol Brennan', avatar: 'https://i.pravatar.cc/40?img=15', bio: 'Philosopher, author, and esoteric scholar.' },
    date: 'Oct 30, 2024',
  },
  {
    id: 'chiron-aries',
    tag: 'Astro-Psychology',
    category: 'Astro-Psychology',
    readTime: '7 min read',
    title: 'Chiron in Aries: Healing the Wound of Self',
    excerpt: "The wounded healer's journey through the first house opens a portal to radical self-acceptance.",
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=260&fit=crop',
    author: { name: 'Lyra Voss', avatar: 'https://i.pravatar.cc/40?img=23', bio: 'Depth psychologist and astrologer.' },
    date: 'Oct 28, 2024',
  },
  {
    id: 'black-tourmaline',
    tag: 'Crystals',
    category: 'Crystals',
    readTime: '3 min read',
    title: 'Black Tourmaline: The Ultimate Psychic Shield',
    excerpt: 'How to work with this powerful grounding stone to protect your energy field and auric body.',
    image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=400&h=260&fit=crop',
    author: { name: 'Jade Celeste', avatar: 'https://i.pravatar.cc/40?img=9', bio: 'Crystal healer and energy worker.' },
    date: 'Oct 25, 2024',
  },
  {
    id: 'mercury-rx',
    tag: 'Retrogrades',
    category: 'Retrogrades',
    readTime: '5 min read',
    title: 'Mercury RX Survival Kit for Communication',
    excerpt: "Navigate the trickster planet's backward dance with clarity and cosmic confidence.",
    image: 'https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=400&h=260&fit=crop',
    author: { name: 'Elowen Starlight', avatar: 'https://i.pravatar.cc/40?img=47', bio: 'Master astrologer and celestial historian.' },
    date: 'Oct 15, 2024',
  },
  {
    id: 'scorpio-alchemists',
    tag: 'Zodiac',
    category: 'Zodiac',
    readTime: '5 min read',
    title: "Why Scorpios Are the Zodiac's Ultimate Alchemists",
    excerpt: 'The transformative power of Scorpio energy and why this sign holds the keys to collective rebirth.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=260&fit=crop',
    author: { name: 'Aria Moonwhisper', avatar: 'https://i.pravatar.cc/40?img=32', bio: 'Relationship astrologer specializing in Venus transits and synastry chart readings.' },
    date: 'Oct 12, 2024',
  },
  {
    id: 'shadow-rising',
    tag: 'Astro-Psychology',
    category: 'Astro-Psychology',
    readTime: '8 min read',
    title: 'Shadow Work Through Your Rising Sign',
    excerpt: 'Your Ascendant reveals not just how others see you, but the unconscious patterns you must integrate.',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=260&fit=crop',
    author: { name: 'Lyra Voss', avatar: 'https://i.pravatar.cc/40?img=23', bio: 'Depth psychologist and astrologer.' },
    date: 'Oct 10, 2024',
  },
];

const CATEGORIES = ['All Stories', 'Zodiac', 'Rituals', 'Retrogrades', 'Astro-Psychology', 'Crystals', 'Philosophy'];

const TRENDING = [
  { id: 'mercury-rx', tag: 'Retrogrades', title: 'Mercury RX survival kit for communication' },
  { id: 'scorpio-alchemists', tag: 'Zodiac', title: "Why Scorpios are the zodiac's ultimate alchemists" },
  { id: 'shadow-rising', tag: 'Astro-Psychology', title: 'Shadow work through your Rising Sign' },
];

/* ─── Tag Badge ─── */
export const TagBadge = ({ tag, small = false }) => (
  <span
    className={`inline-block font-bold uppercase tracking-widest rounded-full ${small ? 'text-[9px] px-2.5 py-0.5' : 'text-[10px] px-3 py-1'}`}
    style={{ background: 'var(--accent-bg)', color: 'var(--primary)', border: '1px solid var(--accent-border)' }}
  >
    {tag}
  </span>
);



/* ─── Newsletter ─── */
export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      className="relative rounded-[2rem] overflow-hidden px-8 py-16 sm:px-12 lg:px-20 text-center mb-16"
      style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1c1c1c 50%, #111 100%)' }}>
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute pointer-events-none inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 120%, rgba(255,98,0,0.2) 0%, transparent 65%)' }} />
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-4">
        {[{ r: -8, w: 72, h: 104, delay: 0 }, { r: 0, w: 90, h: 128, c: true, delay: 0.5 }, { r: 8, w: 72, h: 104, delay: 1 }].map((c, i) => (
          <motion.div key={i} animate={{ y: [0, -9, 0] }} transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
            style={{ width: c.w, height: c.h, borderRadius: 14, transform: `rotate(${c.r}deg)${c.c ? ' translateY(-10px)' : ''}`, background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(14px)', border: '1px solid rgba(255,255,255,0.13)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {c.c && <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}><Sparkles size={20} style={{ color: 'var(--primary-light)' }} /></motion.div>}
          </motion.div>
        ))}
      </div>
      <div className="relative z-10 max-w-lg mx-auto">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--gradient-primary)' }}>
          <Mail size={20} color="white" />
        </div>
        <h2 className="font-bold text-white leading-tight mb-3 tracking-tight" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)' }}>Join the Starseed Newsletter</h2>
        <p className="text-sm leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.5)' }}>Weekly cosmic transmissions, retrograde survival guides, and moon rituals delivered directly to your inbox.</p>
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="flex items-center gap-3 max-w-md mx-auto mb-4">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address"
                  className="flex-1 text-sm px-5 py-3.5 rounded-full outline-none"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.13)', color: 'white' }}
                  onKeyDown={(e) => e.key === 'Enter' && email.trim() && setSubmitted(true)} />
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={() => email.trim() && setSubmitted(true)}
                  className="btn-primary px-6 py-3.5 text-sm font-semibold whitespace-nowrap cursor-pointer">Subscribe</motion.button>
              </div>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.28)' }}>By signing up, you agree to receive celestial updates. View Privacy Policy</p>
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(134,239,172,0.15)' }}>
                <CheckCircle size={24} color="#86efac" />
              </div>
              <p className="font-semibold text-white">You're aligned with the cosmos ✨</p>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Check your inbox for a welcome transmission.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─── Main Blog Page ─── */
export default function BlogPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All Stories');

  const featuredArticle = ALL_ARTICLES.find(a => a.featured);
  const heroArticle = ALL_ARTICLES.find(a => a.hero);

  const basePool = ALL_ARTICLES.filter(a => !a.featured && !a.hero);
  const filtered = activeCategory === 'All Stories'
    ? basePool
    : basePool.filter(a => a.category === activeCategory);

  const gridArticles = filtered.slice(0, 3);
  const moreArticles = filtered.slice(3, 7);

  const goTo = (id) => navigate(`/blog/${id}`);

  return (
    <div className="overflow-x-hidden" style={{ minHeight: '100vh', background: 'var(--bg-soft)' }}>
      

      <div style={{ paddingTop: '3rem', paddingBottom: '2rem' }}>
        <PageContainer>

          {/* ── Featured Hero ── */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => goTo(featuredArticle.id)}
            className="relative rounded-[2rem] overflow-hidden mb-10 cursor-pointer group" style={{ minHeight: 400 }}>
            <div className="absolute inset-0">
              <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,8,6,0.92) 0%, rgba(10,8,6,0.55) 50%, rgba(10,8,6,0.2) 100%)' }} />
              <motion.div animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute pointer-events-none"
                style={{ top: '-20%', right: '-10%', width: '60%', height: '80%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,98,0,0.22) 0%, transparent 70%)', filter: 'blur(60px)' }} />
            </div>
            <div className="relative z-10 p-8 sm:p-12 lg:p-14 flex flex-col justify-end" style={{ minHeight: 400 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: 'var(--gradient-primary)', color: 'white' }}>{featuredArticle.tag}</span>
                <span className="text-xs font-medium flex items-center gap-1" style={{ color: 'rgba(255,255,255,0.55)' }}><Clock size={11} /> {featuredArticle.readTime}</span>
              </div>
              <h1 className="font-bold leading-tight mb-4 tracking-tight text-white max-w-2xl" style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.2rem)' }}>{featuredArticle.title}</h1>
              <p className="text-sm leading-relaxed mb-7 max-w-lg" style={{ color: 'rgba(255,255,255,0.62)' }}>{featuredArticle.excerpt}</p>
              <motion.button whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }} onClick={(e) => { e.stopPropagation(); goTo(featuredArticle.id); }}
                className="inline-flex items-center gap-2.5 font-semibold text-sm px-7 py-3.5 rounded-full cursor-pointer w-fit transition-all duration-300"
                style={{ background: 'var(--bg-elevated)', color: 'var(--primary)' }}>
                Read the Full Forecast <ArrowRight size={14} />
              </motion.button>
            </div>
          </motion.div>

          {/* ── Category Bar ── */}
          <div className="flex items-center justify-between gap-4 mb-12 py-4 px-1 overflow-x-auto" style={{ borderBottom: '1px solid var(--border-soft)' }}>
            <div className="flex items-center gap-2 flex-nowrap min-w-max">
              {CATEGORIES.map((cat) => {
                const isActive = cat === activeCategory;
                return (
                  <motion.button key={cat} onClick={() => setActiveCategory(cat)} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
                    className="text-xs font-semibold px-4 py-2 rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap"
                    style={{ background: isActive ? 'var(--gradient-primary)' : 'var(--bg-soft)', color: isActive ? 'white' : 'var(--text-muted)', boxShadow: isActive ? '0 4px 16px rgba(255,98,0,0.25)' : 'none' }}>
                    {cat}
                  </motion.button>
                );
              })}
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs font-medium" style={{ color: 'var(--text-soft)' }}>Sort by:</span>
              <select className="text-xs font-semibold px-3 py-2 rounded-full outline-none cursor-pointer"
                style={{ background: 'var(--bg-soft)', color: 'var(--text-heading)', border: '1px solid var(--border-soft)' }}>
                <option>Latest</option><option>Popular</option><option>Oldest</option>
              </select>
            </div>
          </div>

          {/* ── Hero Article + Sidebar ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                whileHover={{ y: -6 }} onClick={() => goTo(heroArticle.id)}
                className="card group cursor-pointer overflow-hidden" style={{ padding: 0 }}>
                <div className="relative overflow-hidden rounded-t-[1.5rem]" style={{ height: 280 }}>
                  <img src={heroArticle.image} alt={heroArticle.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-4 left-4"><TagBadge tag={heroArticle.tag} /></div>
                </div>
                <div className="p-6">
                  <h2 className="font-bold text-xl mb-2 leading-tight tracking-tight group-hover:text-[var(--primary)] transition-colors duration-300" style={{ color: 'var(--text-heading)' }}>{heroArticle.title}</h2>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-muted)' }}>{heroArticle.excerpt}</p>
                  <div className="flex items-center gap-3">
                    <img src={heroArticle.author.avatar} alt={heroArticle.author.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-heading)' }}>{heroArticle.author.name}</span>
                      <span className="text-xs ml-2" style={{ color: 'var(--text-soft)' }}>{heroArticle.date} · {heroArticle.readTime}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="card">
                <div className="flex items-center gap-2 mb-5" style={{ borderLeft: '3px solid var(--primary)', paddingLeft: 10 }}>
                  <TrendingUp size={14} style={{ color: 'var(--primary)' }} />
                  <h3 className="font-bold text-sm uppercase tracking-widest" style={{ color: 'var(--text-heading)' }}>Trending Insight</h3>
                </div>
                <div className="flex flex-col">
                  {TRENDING.map((item, i) => (
                    <motion.div key={i} whileHover={{ x: 4 }} onClick={() => goTo(item.id)} className="cursor-pointer group">
                      <div className="py-4" style={{ borderBottom: i < TRENDING.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
                        <TagBadge tag={item.tag} small />
                        <p className="text-sm font-semibold mt-1.5 leading-snug group-hover:text-[var(--primary)] transition-colors duration-200" style={{ color: 'var(--text-heading)' }}>{item.title}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                whileHover={{ y: -4 }} className="card-soft relative overflow-hidden cursor-pointer">
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute pointer-events-none"
                  style={{ right: -20, bottom: -20, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,98,0,0.12) 0%, transparent 70%)' }} />
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'var(--gradient-primary)' }}><Star size={18} color="white" /></div>
                  <h4 className="font-bold text-base mb-1.5 tracking-tight" style={{ color: 'var(--text-heading)' }}>Your Birth Chart</h4>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>Unlock the blueprint of your soul with our precision mapping engine.</p>
                  <Link to="/kundli">
                    <motion.span whileHover={{ x: 4 }} className="inline-flex items-center gap-1.5 text-xs font-bold cursor-pointer" style={{ color: 'var(--primary)' }}>
                      Calculate Now <ArrowRight size={12} />
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Grid Articles ── */}
          {gridArticles.length > 0 && (
            <div className="mb-16">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridArticles.map((article, i) => (
                  <motion.div key={article.id} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }} whileHover={{ y: -8, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => goTo(article.id)} className="card group cursor-pointer overflow-hidden" style={{ padding: 0 }}>
                    <div className="overflow-hidden rounded-t-[1.5rem]" style={{ height: 180 }}>
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover" style={{ transition: 'transform 0.5s ease' }} />
                    </div>
                    <div className="p-5">
                      <TagBadge tag={article.tag} small />
                      <h3 className="font-bold text-base mt-2 mb-2 leading-snug tracking-tight group-hover:text-[var(--primary)] transition-colors duration-300" style={{ color: 'var(--text-heading)' }}>{article.title}</h3>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{article.excerpt}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* ── More Articles ── */}
          {moreArticles.length > 0 && (
            <div className="mb-16">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-center gap-3 mb-8">
                <BookOpen size={18} style={{ color: 'var(--primary)' }} />
                <h2 className="font-bold text-xl tracking-tight" style={{ color: 'var(--text-heading)' }}>More to Explore</h2>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {moreArticles.map((article, i) => (
                  <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }} whileHover={{ y: -4, scale: 1.01 }}
                    onClick={() => goTo(article.id)} className="card group cursor-pointer flex items-start gap-4">
                    <div className="flex-shrink-0 overflow-hidden rounded-2xl" style={{ width: 88, height: 72 }}>
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <TagBadge tag={article.tag} small />
                      <h4 className="font-semibold text-sm mt-1.5 mb-1 leading-snug group-hover:text-[var(--primary)] transition-colors duration-200" style={{ color: 'var(--text-heading)' }}>{article.title}</h4>
                      <div className="flex items-center gap-2">
                        <img src={article.author.avatar} alt={article.author.name} className="w-5 h-5 rounded-full object-cover" />
                        <span className="text-[11px]" style={{ color: 'var(--text-soft)' }}>{article.date} · {article.readTime}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <NewsletterSection />
        </PageContainer>
      </div>

    
    </div>
  );
}