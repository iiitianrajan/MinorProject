import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  ChevronDown, Menu, X, User as UserIcon, LogOut, Wallet,
  MessageCircle, Phone, ShoppingBag, Sparkles, Star, Heart
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';
import WalletModal from '../payment/WalletModal';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import ShineWrapper from '../../Animation/ShineWrapper';

/* ─── Dropdown panel base class ─── */
const DD =
  'absolute top-full mt-3 w-60 z-50 rounded-2xl py-2 ' +
  'bg-[var(--bg-elevated)] border border-[var(--border-soft)] ' +
  'shadow-[var(--shadow-lg)] backdrop-blur-2xl';

/* ─── Arrow pip ─── */
const Pip = ({ right = false }) => (
  <span
    className={`absolute -top-[7px] ${right ? 'right-7' : 'left-7'} w-3.5 h-3.5 rotate-45
      bg-[var(--bg-elevated)] border-l border-t border-[var(--border-soft)]`}
  />
);

/* ─── Nav link ─── */
const NavLink = ({ children, className = '' }) => (
  <span
    className={`flex items-center gap-1.5 text-[13px] font-semibold whitespace-nowrap select-none cursor-pointer
      text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors duration-200 ${className}`}
  >
    {children}
  </span>
);

/* ─── Dropdown row ─── */
const DropRow = ({ to, icon, label, sub, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="group/r flex items-center gap-3 px-4 py-2.5 mx-1.5 rounded-xl
      transition-all duration-200 hover:bg-[var(--accent-bg)] hover:pl-5"
  >
    <span className="flex-shrink-0 text-[var(--primary)] group-hover/r:scale-110 transition-transform">
      {icon}
    </span>
    <div>
      <p className="text-[13px] font-semibold leading-none mb-0.5
        text-[var(--text-heading)] group-hover/r:text-[var(--primary)] transition-colors">
        {label}
      </p>
      {sub && <p className="text-[11px] text-[var(--text-soft)]">{sub}</p>}
    </div>
  </Link>
);

/* ─── Shared dropdown animation props ─── */
const ddAnim = {
  initial: { opacity: 0, y: 8, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 8, scale: 0.97 },
  transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] },
};

const Navbar = ({ onProfileClick, onAddExpertClick }) => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { currentUser, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  // Keep your existing refs, just add these two:
  const lastScrollY = useRef(0);
  const ticking = useRef(false);   // rAF gate
  const scrollDelta = useRef(0);       // accumulated delta for jitter filter
  // ── Smooth scroll-driven background ──────────────────────────
  const { scrollY } = useScroll();

  // Raw scroll → 0 to 1 over first 80px
  const rawBg = useTransform(scrollY, [0, 80], [0, 1]);

  // Spring smoothing — makes the transition feel physical, not instant
  const bgProgress = useSpring(rawBg, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });

  // Interpolate background color: transparent → #c84c00 with opacity
  const navBackground = useTransform(
    bgProgress,
    [0, 1],
    ['rgba(200, 76, 0, 0)', 'rgba(149, 58, 1, 0.7)']
  );

  
  const navShadow = useTransform(
    bgProgress,
    [0, 1],
    ['0 0px 0px rgba(200,76,0,0)', '0 4px 32px rgba(200,76,0,0.25)']
  );

  // Interpolate border opacity
  const navBorder = useTransform(
    bgProgress,
    [0, 1],
    ['rgba(255,255,255,0)', 'rgba(255,255,255,0.15)']
  );

  const openAuth = (tab) => { setAuthTab(tab); setIsAuthModalOpen(true); };
  const toggle = (name) => setOpenDropdown(p => (p === name ? null : name));
  const close = () => setOpenDropdown(null);
  const requireAuth = (e) => { if (!currentUser) { e.preventDefault(); setIsAuthModalOpen(true); } };

  useEffect(() => {
    const onOut = (e) => { if (navRef.current && !navRef.current.contains(e.target)) close(); };
    document.addEventListener('mousedown', onOut);
    return () => document.removeEventListener('mousedown', onOut);
  }, []);

  useEffect(() => {
    const THRESHOLD = 10;   
    const TOP_LOCK = 80;   

    const update = () => {
      const y = window.scrollY;

      
      setScrolled(y > 20);

      const delta = y - lastScrollY.current;
      scrollDelta.current += delta;

      // Only act once accumulated movement exceeds threshold
      if (Math.abs(scrollDelta.current) >= THRESHOLD) {
        if (y <= TOP_LOCK) {
          setShowNavbar(true);                        // always visible near top
        } else if (scrollDelta.current > 0) {
          setShowNavbar(false);                       // scrolling down → hide
        } else {
          setShowNavbar(true);                        // scrolling up  → show
        }
        scrollDelta.current = 0;                      // reset accumulator
      }

      lastScrollY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/*DESKTOP NAV*/}
      <motion.nav
        ref={navRef}
        style={{
          backgroundColor: navBackground,
          boxShadow: navShadow,
          borderBottomColor: navBorder,
        }}
        animate={{
          y: showNavbar ? 0 : '-100%',
          opacity: showNavbar ? 1 : 0,
          marginLeft: showNavbar ? '0px' : '48px',
          marginRight: showNavbar ? '0px' : '48px',
          borderRadius: showNavbar ? '0px' : '999px',
          marginTop: showNavbar ? '0px' : '10px',
        }}
        transition={{
          y: { type: 'spring', stiffness: 260, damping: 28, mass: 0.8 },
          opacity: { duration: 0.25, ease: 'easeInOut' },
          marginLeft: { type: 'spring', stiffness: 200, damping: 26 },
          marginRight: { type: 'spring', stiffness: 200, damping: 26 },
          borderRadius: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          marginTop: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
        }}
        className={[
          'fixed top-0 left-0 right-0 z-50',   
          'will-change-transform',
          'border-b backdrop-blur-xl',
          !showNavbar && 'pointer-events-none',
        ].filter(Boolean).join(' ')}
      >
        {/* ... rest of your nav content unchanged ... */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 gradient-primary rounded-full blur-md opacity-25
                group-hover:opacity-50 transition-opacity duration-300" />
              <img
                src="https://res.cloudinary.com/dqzin6dfk/image/upload/v1776115989/Screenshot_2026-04-14_030248_ssk8fr.png"
                alt="Logo"
                className="relative w-9 h-9 rounded-full border-2 border-[var(--bg-elevated)]
                  shadow-[var(--shadow-sm)] group-hover:scale-105 transition-transform duration-300"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <div className="flex items-baseline">
              <span className="text-[1.2rem] font-black tracking-tight text-[var(--text-heading)]"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                Soul
              </span>
              <span className="text-[1.2rem] font-black tracking-tight text-[var(--primary)]"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                ToConnect
              </span>
              <Sparkles size={13} className="text-[var(--primary)] ml-1" />
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-5 flex-1 justify-center">

            <Link to="/"><NavLink>Home</NavLink></Link>
            <Link to="/astromall"><NavLink>Astromall</NavLink></Link>
            <Link to="/horoscopepage"><NavLink>Horoscope</NavLink></Link>

            {/* Kundli */}
            <div className="relative" onMouseEnter={() => toggle('kundli')} onMouseLeave={close}>
              <NavLink>
                Kundli
                <ChevronDown size={13} className={`text-[var(--primary)] transition-transform duration-300
                  ${openDropdown === 'kundli' ? 'rotate-180' : ''}`} />
              </NavLink>
              <AnimatePresence>
                {openDropdown === 'kundli' && (
                  <>
                    <div className="absolute top-full left-0 h-3 w-full" />
                    <motion.div {...ddAnim} className={DD}>
                      <Pip />
                      <DropRow to="/kundli" icon={<Star size={14} />} label="Free Kundli" onClick={requireAuth} />
                      <DropRow to="/kundli-matching" icon={<Heart size={14} />} label="Kundli Matching" onClick={requireAuth} />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Calculators — CSS-only hover */}
            <div className="relative group" onMouseEnter={() => toggle('calculator')} onMouseLeave={close}>
              <NavLink>
                Calculators
                <ChevronDown size={13} className={`text-[var(--primary)] transition-transform duration-300
                  ${openDropdown === 'calculator' ? 'rotate-180' : ''}`} />
              </NavLink>
              <div className={`${DD}
                opacity-0 invisible pointer-events-none scale-[0.97] translate-y-2
                group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto
                group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200`}>
                <Pip />
                <DropRow to="/love-calculator" icon={<span>💖</span>} label="Love Calculator" sub="Find your match %" onClick={requireAuth} />
                <DropRow to="/moon-sign" icon={<span>🌙</span>} label="Moon Sign" sub="Discover your lunar sign" onClick={requireAuth} />
              </div>
            </div>



            {/* Contact */}
            <div className="relative" onMouseEnter={() => toggle('contact')} onMouseLeave={close}>
              <NavLink>
                Contact
                <ChevronDown size={13} className={`text-[var(--primary)] transition-transform duration-300
                  ${openDropdown === 'contact' ? 'rotate-180' : ''}`} />
              </NavLink>
              <AnimatePresence>
                {openDropdown === 'contact' && (
                  <>
                    <div className="absolute top-full left-0 h-3 w-full" />
                    <motion.div {...ddAnim} className={DD}>
                      <Pip />
                      <DropRow to="/chat" icon={<MessageCircle size={14} />} label="Chat with Expert" onClick={requireAuth} />
                      <DropRow to="/call" icon={<Phone size={14} />} label="Talk to Expert" onClick={requireAuth} />
                      <DropRow to="/contact" icon={<Heart size={14} />} label="Contact Us" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Blogs */}
            <div className="relative" onMouseEnter={() => toggle('blogs')} onMouseLeave={close}>
              <NavLink>
                Blogs
                <ChevronDown size={13} className={`text-[var(--primary)] transition-transform duration-300
                  ${openDropdown === 'blogs' ? 'rotate-180' : ''}`} />
              </NavLink>
              <AnimatePresence>
                {openDropdown === 'blogs' && (
                  <>
                    <div className="absolute top-full left-0 h-3 w-full" />
                    <motion.div {...ddAnim} className={`${DD} left-auto right-0`}>
                      <Pip right />
                      <DropRow to="/blog/love" icon={<span>💖</span>} label="Love & Relationships" sub="Find your soulmate" />

                      <DropRow to="/blog/career" icon={<span>💼</span>} label="Career" sub="Professional guidance" />

                      <DropRow to="/blog" icon={<span>💼</span>} label="Blog" sub="General Blogs" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {currentUser ? (
              <>
                {/* Cart */}
                <Link to="/cart" className="relative group">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center
                    bg-[var(--accent-bg)] border border-[var(--accent-border)]
                    hover:bg-[var(--bg-high)] transition-colors duration-200">
                    <ShoppingCart size={17} className="text-[var(--primary)]" />
                  </div>
                  <AnimatePresence>
                    {totalItems > 0 && (
                      <motion.span
                        initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 gradient-primary text-white
                          text-[10px] font-bold min-w-[17px] h-[17px] px-1 rounded-full
                          flex items-center justify-center leading-none"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>

                {/* Profile */}
                <div className="relative" onClick={() => toggle('profile')}>
                  <div className="relative cursor-pointer group">
                    <div className="absolute inset-0 gradient-primary rounded-full blur-md opacity-25
                      group-hover:opacity-50 transition-opacity duration-300" />
                    <div className="relative w-9 h-9 gradient-primary rounded-full text-white
                      flex items-center justify-center text-sm font-black
                      border-2 border-[var(--bg-elevated)] shadow-[var(--shadow-sm)]
                      group-hover:scale-105 transition-transform duration-200">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  <AnimatePresence>
                    {openDropdown === 'profile' && (
                      <motion.div {...ddAnim} className={`${DD} right-0 left-auto top-[120%]`}>
                        {/* Header */}
                        <div className="px-4 py-3 mb-1 rounded-t-2xl bg-[var(--accent-bg)] border-b border-[var(--border-soft)]">
                          <p className="text-[13px] font-bold truncate text-[var(--text-heading)]">{currentUser.name}</p>
                          <p className="text-xs text-[var(--text-soft)] truncate">{currentUser.email}</p>
                        </div>

                        <DropRow to="#" icon={<UserIcon size={14} />} label="Profile" onClick={(e) => { e.preventDefault(); onProfileClick(); }} />

                        {/* Wallet (button, not link) */}
                        <button
                          onClick={() => { setIsWalletModalOpen(true); close(); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 mx-0 rounded-xl
                            hover:bg-[var(--accent-bg)] transition-colors duration-200 group/w"
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent-bg)] border border-[var(--accent-border)]
                            flex items-center justify-center group-hover/w:scale-110 transition-transform">
                            <Wallet size={12} className="text-[var(--primary)]" />
                          </span>
                          <div className="text-left">
                            <p className="text-[13px] font-semibold text-[var(--text-heading)] group-hover/w:text-[var(--primary)] transition-colors leading-none mb-0.5">
                              My Wallet
                            </p>
                            <p className="text-[11px] font-semibold text-[var(--primary)]">₹ 150 available</p>
                          </div>
                        </button>

                        {currentUser.role === 'admin' && (
                          <DropRow to="#" icon={<ShoppingBag size={14} />} label="Add Product" onClick={(e) => { e.preventDefault(); navigate('/addproduct') }} />
                        )}

                        <DropRow to="#" icon={<UserIcon size={14} />} label="Join as an Expert" onClick={(e) => { e.preventDefault(); onAddExpertClick(); }} />

                        <div className="border-t border-[var(--border-soft)] mt-1 pt-1">
                          <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl
                              hover:bg-red-50 transition-colors duration-200 group/lo"
                          >
                            <LogOut size={14} className="text-red-400 group-hover/lo:scale-110 transition-transform flex-shrink-0" />
                            <span className="text-[13px] font-semibold text-red-500">Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (

              <ShineWrapper>
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => openAuth('login')}
                  className="btn-primary flex items-center gap-2 text-[13px] px-5 py-2.5 cursor-pointer"
                >
                  Get Started
                  <Sparkles size={13} />
                </motion.button>
              </ShineWrapper>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-9 h-9 rounded-full flex items-center justify-center
                bg-[var(--accent-bg)] border border-[var(--accent-border)]
                text-[var(--primary)] hover:bg-[var(--bg-high)] transition-colors duration-200"
            >
              <Menu size={17} />
            </button>
          </div>

        </div>
      </motion.nav>

      {/* ════════════════════════════
          MOBILE DRAWER
      ════════════════════════════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[var(--text)]/40 backdrop-blur-sm z-[100]"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 210 }}
              className="fixed inset-y-0 left-0 w-[296px] z-[101] flex flex-col
                bg-[var(--bg-elevated)] shadow-[var(--shadow-lg)]"
            >
              {/* Header */}
              <div className="p-5 flex justify-between items-center border-b border-[var(--border-soft)] bg-[var(--accent-bg)]">
                <div className="flex items-center gap-2">
                  <img
                    src="https://as2.ftcdn.net/v2/jpg/05/77/75/23/1000_F_577752354_WbjctGllEUKGVBW29pojzAHAlwysroaX.jpg"
                    alt="Logo"
                    className="w-8 h-8 rounded-full border-2 border-[var(--bg-elevated)]"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span className="text-[15px] font-black text-[var(--text-heading)]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Soul<span className="text-[var(--primary)]">ToConnect</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-[var(--bg-soft)] flex items-center justify-center
                    text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors duration-200"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Nav items */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                {[
                  { to: '/chat', icon: <MessageCircle size={16} />, label: 'Chat with Expert' },
                  { to: '/call', icon: <Phone size={16} />, label: 'Talk to Expert' },
                  { to: '/kundli', icon: <Star size={16} />, label: 'Free Kundli' },
                  { to: '/astromall', icon: <ShoppingBag size={16} />, label: 'Astromall Shop' },
                  { to: '/horoscope/daily', icon: <span>🔮</span>, label: 'Daily Horoscope' },
                  { to: '/blog/love', icon: <Heart size={16} />, label: 'Love Blogs' },
                ].map(({ to, icon, label }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 py-3 px-4 rounded-2xl group
                      bg-[var(--bg-soft)] border border-[var(--border-soft)]
                      hover:bg-[var(--accent-bg)] hover:border-[var(--accent-border)]
                      transition-all duration-200"
                  >
                    <span className="text-[var(--primary)] group-hover:scale-110 transition-transform duration-200">
                      {icon}
                    </span>
                    <span className="text-[13px] font-semibold text-[var(--text-heading)]
                      group-hover:text-[var(--primary)] transition-colors duration-200">
                      {label}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Footer CTA */}
              {!currentUser && (
                <div className="p-4 border-t border-[var(--border-soft)] bg-[var(--accent-bg)]">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setMobileMenuOpen(false); openAuth('login'); }}
                    className="btn-primary w-full flex items-center justify-center gap-2 text-sm py-3.5 cursor-pointer"
                  >
                    <Sparkles size={14} />
                    Get Started Free
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} defaultTab={authTab} />
      <WalletModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
    </>
  );
};

export default Navbar;