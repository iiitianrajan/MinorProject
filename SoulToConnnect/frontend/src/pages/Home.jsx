import React, { useEffect, useState, useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, Phone, PlayCircle, Star, ShoppingBag, Calendar,
  Sparkles, TrendingUp, Award, Users, CheckCircle, ArrowRight,
  Zap, Clock, Shield, Gift, ChevronRight, Quote,
  User, CalendarDays, Orbit,Calculator
} from 'lucide-react';
import FaqSection from './FaqSection';
import Testimonials from './TestimonialCard';
import Galaxy from './Galaxy';
import './Galaxy.css';
import ServicesSection from './ServicesSection';
import panitFrontImg from '../assets/frontPandit.jpg';
import img1  from '../assets/images/face-reading.jpg'
import img2  from '../assets/images/numerology.jpg'
import img3  from '../assets/images/palmistry.jpg'
import img4  from '../assets/images/tarot-reading.jpg'
import img5  from '../assets/images/vastu-shastra.jpg'
import img6  from '../assets/images/vedic-astrology.jpg'
import Counter from './Counter';
import WaveText from '../Animation/WaveText';
import LetterReveal from '../Animation/LetterReveal';
import ShineWrapper from '../Animation/ShineWrapper';
import ProximityText from '../Animation/ProximityText';

/* ─── Tilt Hook ─── */
function useTilt() {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-7, 7]);
  const sx = useSpring(rotateX, { stiffness: 280, damping: 28 });
  const sy = useSpring(rotateY, { stiffness: 280, damping: 28 });
  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };
  return { ref, rotateX: sx, rotateY: sy, onMove, onLeave };
}

/* ─── Magnetic Button ─── */
function MagneticBtn({ children, className, onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
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
      style={{ x: sx, y: sy }}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
    >
      {children}
    </motion.button>
  );
}

/* ─── Tilt Card ─── */
function TiltCard({ children, className }) {
  const { ref, rotateX, rotateY, onMove, onLeave } = useTilt();
  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

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

/* ─── Page wrapper with consistent max-width ─── */
const PageContainer = ({ children, className = '' }) => (
  <div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 ${className}`}>
    {children}
  </div>
);

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCat, setHoveredCat] = useState(null);
  const [hoveredStat, setHoveredStat] = useState(null);

  const length = user.length;
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setUser(data);
       
      } catch (err) {
        console.error('❌ Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const testimonials = [
    { name: 'Priya Sharma', location: 'Mumbai', rating: 5, text: 'The predictions were amazingly accurate! My astrologer guided me through a difficult career decision.', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Rajesh Kumar', location: 'Delhi', rating: 5, text: 'Found my life partner through Kundli matching here. Forever grateful to the expert guidance!', avatar: 'https://i.pravatar.cc/150?img=12' },
    { name: 'Ananya Iyer', location: 'Bangalore', rating: 5, text: "Best astrology consultation I've ever had. The remedies actually worked for me!", avatar: 'https://i.pravatar.cc/150?img=5' },
  ];

  const expertCategories = [
  {
    name: "Vedic Astrology",
    value: 2500,
    suffix: "K+ Experts",
    image: img2,
  },
  {
    name: "Tarot Reading",
    value: 1800,
    suffix: "K+ Experts",
    image: img5,
  },
  {
    name: "Numerology",
    value: 1200,
    suffix: "K+ Experts",
    image: img3,
  },
  {
    name: "Vastu Shastra",
    value: 980,
    suffix: "+ Experts",
    image: img6,
  },
  {
    name: "Palmistry",
    value: 1500,
    suffix: "K+ Experts",
    image: img4,
  },
  {
    name: "Face Reading",
    value: 890,
    suffix: "+ Experts",
    image: img1,
  },
];
  const features = [
    { icon: Shield, title: '100% Privacy', desc: 'End-to-end encrypted consultations' },
    { icon: CheckCircle, title: 'Verified Experts', desc: 'All astrologers background checked' },
    { icon: Clock, title: '24/7 Available', desc: 'Connect anytime, anywhere' },
    { icon: Gift, title: 'First Chat Free', desc: '₹99 cashback on first recharge' },
  ];

  const services = [
    { to: '/astrologerList', icon: User, title: 'All Experts', desc: 'Voice & Video available' },
    { to: '/chat', icon: MessageSquare, title: 'Chat with Expert', desc: 'Instant connection, zero wait' },
    { to: '/astromall', icon: ShoppingBag, title: 'Astromall Shop', desc: 'Authentic gems & remedies' },
    { to: '/pooja', icon: Calendar, title: 'Book a Pooja', desc: 'Expert Pandits online' },
  ];

  const freeServices = [
    { tag: 'Free Kundli', path: '/kundli', icon: <Orbit size={35} className="text-[var(--primary)]" />, desc: 'Detailed planetary positions' },
    { tag: 'Kundli Matching', path: '/kundli-matching', icon: <Sparkles size={35} className="text-[var(--primary)]"  />, desc: 'Check 36 gun milan score' },
    { tag: 'Daily Horoscope', path: '/horoscopepage', icon:<CalendarDays size={35} className="text-[var(--primary)]"  />, desc: 'Read your day ahead' },
    { tag: 'Calculators', path: '/love-calculator', icon: <Calculator size={35} className="text-[var(--primary)]"  />, desc: 'Love signs & more' },
  ];

  const stats = [
  { value: length * 100, suffix: "+", label: "Total Customers", icon: Users },
  { value: 2100, suffix: "+", label: "Top Experts", icon: Award },
  { value: 1000, suffix: "+", label: "Daily Consultations", icon: TrendingUp },
  { value: 4.9, suffix: "", label: "Average Rating", icon: Star, special: true },
];

  return (
    <div className="overflow-x-hidden" style={{ perspective: '1200px' }}>

      {/* ═══════════════════════════════════
          HERO
      ═══════════════════════════════════ */}
      
      <section className="relative min-h-screen flex items-center pt-15 pb-40 overflow-hidden bg-[var(--bg-soft)]">

        {/* Background glow blobs */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-28 -right-28 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,98,0,0.1) 0%, transparent 65%)', filter: 'blur(60px)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.22, 1], opacity: [0.45, 0.85, 0.45] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,140,58,0.08) 0%, transparent 65%)', filter: 'blur(55px)' }}
        />

        <PageContainer>
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">

            {/* ── LEFT: Avatar ── */}
            <motion.div
              initial={{ opacity: 0, x: -52 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-1/2 flex justify-center"
            >
              <div className="relative w-full max-w-[420px] aspect-square" style={{ perspective: 1000 }}>

                <TiltCard className="glass w-full h-full flex flex-col items-center justify-center cursor-pointer overflow-hidden">
                  <div
                    className="absolute inset-4 rounded-[1.8rem] pointer-events-none border border-white/30"
                    style={{ background: 'radial-gradient(circle at 50% 35%, rgba(255,98,0,0.06) 0%, transparent 65%)' }}
                  />
                  <div
                    className="absolute top-0 left-0 right-0 h-1/2 rounded-t-[1.5rem] pointer-events-none"
                    style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%)' }}
                  />

                  <motion.div
                    animate={{ y: [0, -14, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative z-10 select-none w-full h-full"
                  >
                    
                    <img
                      src={panitFrontImg}
                      alt="Expert Astrologer"
                      className="w-full h-full object-cover rounded-[1.4rem]"
                    />
                 </motion.div>

                  <MagneticBtn className="btn-primary flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 z-10 text-sm px-6 py-3 cursor-pointer whitespace-nowrap">
                    {/* <PlayCircle size={16} /> */}
                    ॐ नमः शिवाय
                  </MagneticBtn>
                </TiltCard>

                {/* Floating chips */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.72, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.68, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.09, y: -5 }}
                  className="card absolute top-5 -left-4 sm:-left-8 z-20 flex items-center gap-2 !p-3 !rounded-2xl !shadow-[var(--shadow-md)] cursor-default"
                >
                  <Star size={14} className="text-#b54300-400 fill-#b54300-400 flex-shrink-0" />
                  <span className="font-bold text-sm text-[var(--text-heading)]">4.9</span>
                  <span className="text-xs text-[var(--text-soft)]"><Counter to={10}/>k+ Reviews</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.72, y: -12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.82, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.09, y: -5 }}
                  className="card absolute bottom-7 -right-4 sm:-right-8 z-20 flex items-center gap-2 !p-3 !rounded-2xl !shadow-[var(--shadow-md)] cursor-default"
                >
                  <motion.span
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0 block"
                  />
                  <span className="font-semibold text-xs text-[var(--text-heading)]"><Counter to={900}/> Experts Online</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.96, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.09, x: 5 }}
                  className="card absolute top-[38%] -right-4 sm:-right-9 z-20 flex flex-col gap-1 !p-3 !rounded-2xl !shadow-[var(--shadow-md)] cursor-default"
                >
                  <div className="flex items-center gap-1.5">
                    <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                      <Zap size={12} className="text-[var(--primary)]" />
                    </motion.div>
                    <span className="font-bold text-xs text-[var(--primary)]">Live Now</span>
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)]">Top Rated Available</span>
                </motion.div>
              </div>
            </motion.div>

            {/* ── RIGHT: Copy ── */}
            <motion.div
              initial={{ opacity: 0, x: 52 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.95, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-1/2 flex flex-col items-start"
            >
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
                <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-xs font-semibold uppercase tracking-widest bg-[var(--accent-bg)] border border-[var(--accent-border)] text-[var(--primary)]">
                  
                  <Award size={11} />
                  India's #1 · 200+ Celebrities Trust Us
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36 }}
                className="font-bold leading-[1.05] mb-5 tracking-tight text-[var(--text-heading)]"
                style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}
              >
                
                Chat With<br />
                <motion.span
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    background: 'linear-gradient(90deg, var(--primary-dark), var(--primary), var(--primary-light), var(--primary))',
                    backgroundSize: '220% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    display: 'inline-block',
                  }}
                >
                  Expert Astrologers
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.44 }}
                className="text-lg mb-8 leading-relaxed max-w-[480px] text-[var(--text-muted)]"
              >
                <LetterReveal text="Get personalized guidance from India's top verified astrologers."/>{' '}
                <span className="font-semibold text-[var(--text-heading)]">
                  <LetterReveal text=""/>
                  Your first consultation is on us.</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.52 }}
                className="flex flex-wrap gap-3 mb-10"
              >
                 <ShineWrapper>
                   <Link to="/chat">
                  <MagneticBtn className="btn-primary flex items-center gap-2.5 px-7 py-4 text-base cursor-pointer">
                    <MessageSquare size={18} /> Start Chat Now <ArrowRight size={15} />
                  </MagneticBtn>
                </Link>
                 </ShineWrapper>
               
                <Link to="/pooja">
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2.5 px-7 py-4 rounded-full font-semibold text-base border border-[var(--border-soft)] text-[var(--text-heading)] bg-transparent transition-all duration-300 hover:bg-[var(--accent-bg)] hover:border-[var(--accent-border)] cursor-pointer"
                  >
                    Explore All Poojas
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.68 }}
                className="flex items-center gap-8 sm:gap-10 pt-8 border-t border-[var(--border-soft)] w-full"
              >
                {[
  { v: user.length * 100, suffix: "K+", l: "Happy Customers" },
  { v: 2100, suffix: "+", l: "Expert Astrologers" },
  { v: 99.2, suffix: "%", l: "Satisfaction Rate" },
].map((s, i) => (
  <motion.div
    key={i}
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 320 }}
  >
    <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-heading)]">
      <Counter to={s.v || 900} />
      {s.suffix}
    </div>

    <div className="text-xs font-medium mt-0.5 text-[var(--text-soft)]">
      {s.l}
    </div>
  </motion.div>
))}
              </motion.div>
            </motion.div>
          </div>
        </PageContainer>
      </section>

      {/* ═══════════════════════════════════
          FLOATING SERVICE CARDS
      ═══════════════════════════════════ */}
      <section className="relative z-30 -mt-16">
        <PageContainer>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((item, i) => (
              <Link to={item.to} key={i} className="no-underline">
                <motion.div
                  initial={{ opacity: 0, y: 44 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.09 + 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -10, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="card group cursor-pointer relative overflow-hidden h-full"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[1.5rem]"
                    style={{ background: 'linear-gradient(135deg, rgba(255,98,0,0.05) 0%, transparent 60%)' }}
                  />
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.18 }}
                    transition={{ type: 'spring', stiffness: 320 }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 bg-[var(--accent-bg)] border border-[var(--accent-border)]"
                  >
                    <item.icon size={21} className="text-[var(--primary)]" />
                  </motion.div>
                  <h3 className="font-semibold text-sm mb-1.5 text-[var(--text-heading)]">{item.title}</h3>
                  <p className="text-xs mb-4 text-[var(--text-soft)]">
                    <ProximityText text={item.desc}/></p>
                  <motion.div whileHover={{ x: 5 }} className="flex items-center gap-1 text-xs font-semibold text-[var(--primary)]">
                    Explore <ChevronRight size={13} />
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ═══════════════════════════════════
          WHY CHOOSE US
      ═══════════════════════════════════ */}
      <section className="section">
        <PageContainer>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <SLabel><Sparkles size={12} /> Why Choose Us</SLabel>
            <SHeading sub="We're not just another astrology platform. We're your spiritual companion.">
             <WaveText text=" Why 50 Lakh+ People Choose Us"/>
            </SHeading>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 }}
                whileHover={{ y: -10, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="card-soft text-center group cursor-pointer relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[1.5rem]"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,98,0,0.07) 0%, transparent 68%)' }}
                />
                <motion.div
                  whileHover={{ rotate: 13, scale: 1.22 }}
                  transition={{ type: 'spring', stiffness: 320 }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 bg-[var(--accent-bg)] border border-[var(--accent-border)]"
                >
                  <f.icon size={24} className="text-[var(--primary)]" />
                </motion.div>
                <h3 className="font-semibold text-base mb-2 relative z-10 text-[var(--text-heading)]">{f.title}</h3>
                <p className="text-sm leading-relaxed relative z-10 text-[var(--text-muted)]">
                  <ProximityText text={f.desc}/></p>
              </motion.div>
            ))}
          </div>
        </PageContainer>
      </section>

       {/* ─── SACRED MANTRA MARQUEE ─── */}
      <div className="w-full py-6 border-y border-[var(--border-soft)] overflow-hidden bg-[var(--bg-soft)]/60 backdrop-blur-sm">
        <motion.div 
          animate={{ x: [0, -1200] }} 
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex whitespace-nowrap gap-24 items-center"
        >
          {Array(10).fill(["AS ABOVE SO BELOW", "TRUST THE DIVINE TIMING", "OM MANI PADME HUM"]).flat().map((m, i) => (
            <div key={i} className="flex items-center gap-6">
              <span className="text-sm font-bold uppercase tracking-[0.4em] opacity-30 italic text-[var(--text-heading)]">{m}</span>
              <Sparkles size={16} className="text-[var(--primary)] opacity-40" />
            </div>
          ))}
        </motion.div>
      </div>

     {/* ═══════════════════════════════════
     EXPERT CATEGORIES
═══════════════════════════════════ */}
<section className="section bg-[var(--bg)]">
  <PageContainer>
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <SLabel>Specialisations</SLabel>
      <SHeading sub="Choose from 21000+ verified astrologers across specializations">
        <WaveText text="Explore Expert Categories" />
      </SHeading>
    </motion.div>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {expertCategories.map((cat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, type: 'spring', stiffness: 200 }}
          whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(255,98,0,0.18)' }}
          whileTap={{ scale: 0.97 }}
          onHoverStart={() => setHoveredCat(i)}
          onHoverEnd={() => setHoveredCat(null)}
          onClick={(e)=>{navigate('/chat')}}
          className="cursor-pointer rounded-2xl overflow-hidden bg-[var(--card-bg)] border border-[var(--border-soft)] transition-all duration-300"
          style={{
            boxShadow: hoveredCat === i
              ? '0 20px 40px rgba(255,98,0,0.18)'
              : '0 2px 12px rgba(0,0,0,0.06)',
          }}
        >
          {/* Image — top half, fixed height */}
          <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover transition-transform duration-500 opacity-100 "
              style={{ transform: hoveredCat === i ? 'scale(1.08)'  : 'scale(1)' ,filter: 'grayscale(50%)'
                
               }}
            />
            {/* Subtle bottom fade into card */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[var(--card-bg)] to-transparent" />
          </div>

          {/* Text — below image */}
          <div className="p-3 pt-2">
            <h3 className="font-bold text-sm text-[var(--text-heading)] leading-tight mb-1">
              {cat.name}
            </h3>
            <p
              className="text-[11px] font-semibold flex items-center gap-1"
              style={{ color: 'var(--primary)' }}
            >
               <Counter to={cat.value} />{cat.suffix}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </PageContainer>
</section>


      {/* ═══════════════════════════════════
          FREE SERVICES
      ═══════════════════════════════════ */}
      <section className="section ">
        <PageContainer>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"

          >
            <SLabel>✦ Absolutely Free</SLabel>
            <SHeading sub="Get accurate free predictions and guidance to start your spiritual journey">
              <WaveText text="Complimentary Astrology Services"/>
            </SHeading>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {freeServices.map((srv, i) => (
              <Link to={srv.path} key={i} className="no-underline">
                <motion.div
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.09 }}
                  whileHover={{ y: -12, scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="card-soft text-center group cursor-pointer relative overflow-hidden h-full"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[1.5rem]"
                    style={{ background: 'linear-gradient(135deg, rgba(255,98,0,0.06) 0%, transparent 60%)' }}
                  />
                  <motion.div
                    className="text-5xl mb-4 inline-block select-none"
                    whileHover={{ scale: 1.28, rotate: -9 }}
                    transition={{ type: 'spring', stiffness: 320 }}
                  >
                    {srv.icon}
                  </motion.div>
                  <h3 className="font-semibold text-base mb-1.5 relative z-10 text-[var(--text-heading)]">{srv.tag}</h3>
                  <p className="text-xs mb-4 relative z-10 text-[var(--text-soft)]">
                    <ProximityText text={srv.desc}/></p>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold relative z-10 text-[var(--primary)]"
                  >
                    Try Free <ArrowRight size={12} />
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </div>
        </PageContainer>
      </section>
        {/* ─── SACRED MANTRA MARQUEE ─── */}
      <div className="w-full py-6 border-y border-[var(--border-soft)] overflow-hidden bg-[var(--bg-soft)]/60 backdrop-blur-sm">
        <motion.div 
          animate={{ x: [0, -1200] }} 
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex whitespace-nowrap gap-24 items-center"
        >
          {Array(10).fill(["AS ABOVE SO BELOW", "TRUST THE DIVINE TIMING", "OM MANI PADME HUM"]).flat().map((m, i) => (
            <div key={i} className="flex items-center gap-6">
              <span className="text-sm font-bold uppercase tracking-[0.4em] opacity-30 italic text-[var(--text-heading)]">{m}</span>
              <Sparkles size={16} className="text-[var(--primary)] opacity-40" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ═══════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════ */}
      <section className="section bg-[var(--bg)]">
        <PageContainer>
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <SLabel>Customer Stories</SLabel>
            <SHeading sub="Real stories from real people who found guidance">
              <WaveText text="What Our Customers Say"/>
            </SHeading>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <TiltCard key={i} className="card-soft relative overflow-hidden cursor-default">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.11 }}
                >
                  <Quote size={30} className="absolute top-5 right-5 text-[var(--accent-border)]" />
                  <div className="flex items-center gap-3 mb-4">
                    <motion.img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[var(--accent-border)]"
                      whileHover={{ scale: 1.13 }}
                    />
                    <div>
                      <h4 className="font-semibold text-sm text-[var(--text-heading)]">{t.name}</h4>
                      <p className="text-xs text-[var(--text-soft)]">{t.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.rating)].map((_, j) => (
                      <motion.div key={j} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: j * 0.05 + i * 0.1 }}>
                        <Star size={13} className="text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-sm italic leading-relaxed text-[var(--text-muted)]">
                    <LetterReveal text={t.text}/> </p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ═══════════════════════════════════
          WHY ASTROLOGY — DARK BANNER
      ═══════════════════════════════════ */}
      <section className="section">
        <PageContainer>
          <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div
              className="relative rounded-[2rem] overflow-hidden px-8 py-14 sm:px-12 lg:px-20 lg:py-20"
              style={{ background: 'linear-gradient(135deg, #682a06 0%, #1c1c1c 50%, #111 100%)',filter: 'grayscale(30%)' }}
            >
              <motion.div
                animate={{ scale: [1, 1.22, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute pointer-events-none inset-0"
                style={{ background: 'radial-gradient(ellipse 60% 80% at 72% 50%, rgba(255,98,0,0.18) 0%, transparent 65%)' }}
              />

              {/* Floating tarot cards */}
             <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-4">
  {[
    { r: -9, w: 80, h: 116, delay: 0, img: "https://res.cloudinary.com/dqzin6dfk/image/upload/v1776092681/Gemini_Generated_Image_3fejpc3fejpc3fej_eamomt.png" },
    { r: 0, w: 98, h: 140, c: true, delay: 0.5, img: "https://res.cloudinary.com/dqzin6dfk/image/upload/v1776092766/Astrological_study_in_a_sacred_space_zxi3ib.png" },
    { r: 9, w: 80, h: 116, delay: 1, img: "https://res.cloudinary.com/dqzin6dfk/image/upload/v1776093072/Astrological_study_in_warm_light_g4nkxx.png" }
  ].map((c, i) => (
    <motion.div
      key={i}
      animate={{ y: [0, -9, 0] }}
      transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
      whileHover={{ scale: 1.12 }}
      className="flex flex-col items-center justify-end cursor-pointer overflow-hidden relative"
      style={{
        width: c.w, height: c.h,
        transform: `rotate(${c.r}deg)${c.c ? ' translateY(-10px)' : ''}`,
        borderRadius: 14,
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(255,255,255,0.13)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.28)',
      }}
    >
      {/* Pandit image fills the card */}
      <img
        src={c.img}
        alt="Pandit"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top center',
          borderRadius: 14,
          filter: 'brightness(0.85)',
        }}
      />

      {/* Gradient overlay at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '45%',
        background: 'linear-gradient(to top, rgba(30,15,5,0.85) 0%, transparent 100%)',
        borderRadius: '0 0 14px 14px',
        zIndex: 1,
      }} />

      {/* Sparkles icon on center card only */}
      {c.c && (
        <div style={{
          position: 'absolute',
          top: 8, right: 8,
          zIndex: 2,
          background: 'rgba(0,0,0,0.4)',
          borderRadius: '50%',
          padding: 4,
        }}>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles size={16} className="text-[var(--primary-light)]" style={{ color: '#e07b39' }} />
          </motion.div>
        </div>
      )}
    </motion.div>
  ))}
</div>

              <div className="relative z-10 max-w-lg">
                <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-[var(--primary-light)]">
                  <WaveText text="Divine Wisdom"/>
                 </p>
                <h2 className="text-3xl lg:text-5xl font-bold leading-tight mb-5 tracking-tight" style={{ color: '#f5f5f5' }}>
                 
                  Why Astrology Matters?
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(245,245,245,0.55)' }}>
                  <LetterReveal text="Astrology reveals how divine cosmic energy flows through our lives, helping us make better decisions in love, career, health, and personal growth. It's not about predicting the future—it's about understanding yourself and the universe's timing."/>
                  
                </p>
                <Link to="/astrology-guide" >
                  <motion.button
                    whileHover={{ scale: 1.06, y: -3, boxShadow: '0 18px 44px rgba(0,0,0,0.38)' }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2.5 font-semibold text-sm px-7 py-3.5 rounded-full bg-white text-[var(--text-heading)] shadow-[0_8px_28px_rgba(0,0,0,0.22)] transition-all duration-300 cursor-pointer"
                  >
                    Discover More <ArrowRight size={15} />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </PageContainer>
      </section>

      {/* ═══════════════════════════════════
          STATS
      ═══════════════════════════════════ */}
      <section className="section bg-[var(--bg)] border-t border-[var(--border-soft)] border-b">
        <PageContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.09, type: 'spring', stiffness: 140, damping: 14 }}
                whileHover={{ y: -10, scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onHoverStart={() => setHoveredStat(i)}
                onHoverEnd={() => setHoveredStat(null)}
                className={`card text-center cursor-pointer relative overflow-hidden transition-all duration-300 ${hoveredStat === i ? '!border-[var(--accent-border)] !shadow-[var(--shadow-lg)]' : ''}`}
              >
                <AnimatePresence>
                  {hoveredStat === i && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none rounded-[1.5rem]"
                      style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,98,0,0.07) 0%, transparent 65%)' }}
                    />
                  )}
                </AnimatePresence>

                <motion.div
                  whileHover={{ rotate: 11, scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 320 }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10 gradient-primary shadow-[0_6px_22px_rgba(255,98,0,0.28)]"
                >
                  <stat.icon size={21} color="#fff" />
                </motion.div>

                <div className="text-3xl sm:text-4xl font-bold mb-1.5 flex items-center justify-center gap-2 tracking-tight relative z-10 text-[var(--text-heading)]">
                  <Counter to={stat.value || 900} />{stat.suffix}
                  {stat.special && (
                    <motion.span initial={{ rotate: 0 }} whileInView={{ rotate: 360 }} transition={{ duration: 0.8 }}>
                      <Star size={19} className="text-#b54300-400 fill-[#b54300]" />
                    </motion.span>
                  )}
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider relative z-10 text-[var(--text-soft)]">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* cta dark */}

<section className="section">
  <PageContainer>
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div
        className="relative rounded-[2rem] overflow-hidden px-8 py-14 sm:px-12 lg:px-20 lg:py-20 text-center"
        style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1c1c1c 50%, #111 100%)' }}
      >

        {/* SAME overlay style */}
        <motion.div
          animate={{ scale: [1, 1.22, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute pointer-events-none inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 72% 50%, rgba(255,98,0,0.18) 0%, transparent 65%)',
          }}
        />

        {/* OPTIONAL floating elements (same positioning logic) */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-4">
  {[
    { r: -9, w: 80, h: 116, delay: 0, img: "https://res.cloudinary.com/dqzin6dfk/image/upload/v1776093366/Gemini_Generated_Image_95yyfd95yyfd95yy_abpnoy.png" },
    { r: 0, w: 98, h: 140, c: true, delay: 0.5, img: "https://res.cloudinary.com/dqzin6dfk/image/upload/v1776093426/Gemini_Generated_Image_95yyfd95yyfd95yy_2_bcozd2.png" },
    { r: 9, w: 80, h: 116, delay: 1, img: "https://res.cloudinary.com/dqzin6dfk/image/upload/v1776093438/Gemini_Generated_Image_95yyfd95yyfd95yy_1_oquhnw.png" }
  ].map((c, i) => (
    <motion.div
      key={i}
      animate={{ y: [0, -9, 0] }}
      transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
      whileHover={{ scale: 1.12 }}
      className="flex flex-col items-center justify-end cursor-pointer overflow-hidden relative"
      style={{
        width: c.w, height: c.h,
        transform: `rotate(${c.r}deg)${c.c ? ' translateY(-10px)' : ''}`,
        borderRadius: 14,
        background: 'rgba(255,255,255,0.07)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(255,255,255,0.13)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.28)',
      }}
    >
      {/* Pandit image fills the card */}
      <img
        src={c.img}
        alt="Pandit"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top center',
          borderRadius: 14,
          filter: 'brightness(0.85)',
        }}
      />

      {/* Gradient overlay at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '45%',
        background: 'linear-gradient(to top, rgba(30,15,5,0.85) 0%, transparent 100%)',
        borderRadius: '0 0 14px 14px',
        zIndex: 1,
      }} />

      {/* Sparkles icon on center card only */}
      {c.c && (
        <div style={{
          position: 'absolute',
          top: 8, right: 8,
          zIndex: 2,
          background: 'rgba(0,0,0,0.4)',
          borderRadius: '50%',
          padding: 4,
        }}>
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles size={16} className="text-[var(--primary-light)]" style={{ color: '#e07b39' }} />
          </motion.div>
        </div>
      )}
    </motion.div>
  ))}
</div>

        {/* CONTENT — SAME STRUCTURE AS FIRST */}
        <div className="relative z-10 max-w-lg mx-auto" style={{filter: 'grayscale(60%)'}}>

          <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-[var(--primary)]">
            <WaveText text="Start Your Journey Today"/>
            
          </p>

          <h2
            className="text-3xl lg:text-5xl font-bold leading-tight mb-5 tracking-tight"
            style={{ color: '#f5f5f5' }}
          >
            <WaveText text="Ready to Transform Your Life?"/>
            
          </h2>

          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: 'rgba(245,245,245,0.55)' }}
          >
            <LetterReveal text="Join 50 lakh+ people who found clarity, peace, and direction through expert astrology guidance."/>
            
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">

            <Link to="/chat" className='cursor-pointer'>
              <motion.button
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2.5 font-semibold text-sm px-7 py-3.5 rounded-full bg-white text-[var(--text-heading)] shadow-[0_8px_28px_rgba(0,0,0,0.22)] transition-all duration-300 cursor-pointer"
              >
                <MessageSquare size={15} />
                Start Free Chat
              </motion.button>
            </Link>

            <Link to="/call">
              <motion.button
                whileHover={{ scale: 1.06, y: -3 }}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-2.5 font-semibold text-sm px-7 py-3.5 rounded-full text-white transition-all duration-300 cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.13)',
                }}
              >
                <Phone size={15} />
                Talk to Expert
              </motion.button>
            </Link>

          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {['First consultation free', '24/7 available', '100% private & secure'].map((txt, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.06, y: -2 }}
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs cursor-default"
                style={{
                  background: 'rgba(62, 26, 5, 0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(245,245,245,0.45)',
                }}
              >
                <CheckCircle size={11} style={{ color: '#e2e8e4' }} />
                {txt}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  </PageContainer>
</section>
      <Testimonials />
      <ServicesSection />
      <FaqSection />
    </div>
  );
}