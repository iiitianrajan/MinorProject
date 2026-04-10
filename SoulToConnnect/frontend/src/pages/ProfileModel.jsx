import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Mail, Phone, LogOut, Wallet, Calendar, MapPin, User,
  ShieldCheck, Star, Sparkles, Settings, Bell, Globe, LifeBuoy,
  ChevronRight, ArrowRight, Sun, Moon, Zap, Clock, MoreHorizontal,
  TrendingUp, Package
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

/* ─── Section Label (matches Home.jsx) ─── */
const SLabel = ({ children }) => (
  <p
    className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1"
    style={{ color: 'var(--primary)' }}
  >
    {children}
  </p>
);

/* ─── Nav Item ─── */
const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <motion.button
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border-0 text-left"
    style={
      active
        ? { background: 'var(--accent-bg)', color: 'var(--primary)', fontWeight: 700 }
        : { background: 'transparent', color: 'var(--text-muted)' }
    }
  >
    <Icon size={15} style={{ color: active ? 'var(--primary)' : 'var(--text-soft)' }} />
    {label}
  </motion.button>
);

/* ─── Birth Chart Sign Card ─── */
const SignCard = ({ label, sign, desc, icon }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
    className="card flex-1 cursor-pointer"
    style={{ minWidth: 0 }}
  >
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
      style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}
    >
      <span className="text-lg">{icon}</span>
    </div>
    <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-soft)' }}>
      {label}
    </p>
    <h4 className="font-bold text-base mb-1.5" style={{ color: 'var(--text-heading)' }}>{sign}</h4>
    <p className="text-xs leading-relaxed line-clamp-3" style={{ color: 'var(--text-muted)' }}>{desc}</p>
  </motion.div>
);

/* ─── Order Row ─── */
const OrderRow = ({ name, orderId, date, price, status, image }) => (
  <motion.div
    whileHover={{ x: 3 }}
    className="flex items-center gap-4 py-4 cursor-pointer"
    style={{ borderBottom: '1px solid var(--border-soft)' }}
  >
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-xl"
      style={{ background: 'var(--bg-soft)' }}
    >
      {image || '🔮'}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-heading)' }}>{name}</p>
      <p className="text-xs" style={{ color: 'var(--text-soft)' }}>{orderId} · {date}</p>
    </div>
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="text-right">
        <p className="text-sm font-bold" style={{ color: 'var(--text-heading)' }}>₹{price}</p>
        <p
          className="text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: status === 'Delivered' ? '#16a34a' : 'var(--primary)' }}
        >
          {status}
        </p>
      </div>
      <ChevronRight size={14} style={{ color: 'var(--text-soft)' }} />
    </div>
  </motion.div>
);

/* ─── Main Component ─── */
const ProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, logout } = useAuth();
  const [activeNav, setActiveNav] = useState('Profile Dashboard');
  const [activeTab, setActiveTab] = useState('AstroMall Orders');

  if (!isOpen) return null;

  const navItems = [
    { icon: User, label: 'Profile Dashboard' },
    { icon: Settings, label: 'Account Settings' },
    { icon: Bell, label: 'Notifications' },
    { icon: Globe, label: 'Language' },
    { icon: LifeBuoy, label: 'Support' },
  ];

  const birthSigns = [
    { label: 'Sun Sign', sign: 'Leo', icon: '☀️', desc: 'Radiant, creative, and ruled by the sun. Your core essence glows with confidence.' },
    { label: 'Moon Sign', sign: 'Pisces', icon: '🌙', desc: 'Deeply intuitive, empathetic, and spiritual. Your emotional world is vast as the sea.' },
    { label: 'Rising Sign', sign: 'Scorpio', icon: '↗', desc: 'Mysterious, intense, and transformative. The mask you wear is powerful and magnetic.' },
  ];

  const tabs = ['AstroMall Orders', 'Daily Readings', 'Past Sessions'];

  const orders = [
    { name: 'Midnight Obsidian Ritual Kit', orderId: 'Order #CP-62913', date: 'Delivered Oct 12', price: '45.00', status: 'Delivered', image: '🌑' },
    { name: 'Digital 12-Month Transit Forecast', orderId: 'Order #CP-51725', date: 'Delivered Sep 29', price: '29.99', status: 'Success', image: '📊' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(26,28,26,0.4)', backdropFilter: 'blur(12px)' }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="w-full overflow-hidden"
            style={{
              maxWidth: 860,
              maxHeight: '92vh',
              background: 'var(--bg)',
              borderRadius: '2rem',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* ─── Header Card ─── */}
            <div
              className="flex-shrink-0 relative"
              style={{
                background: 'var(--bg-elevated)',
                borderBottom: '1px solid var(--border-soft)',
              }}
            >
              {/* Ambient glow */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-0 right-0 w-64 h-32 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle, rgba(255,98,0,0.08) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />

              <div className="flex items-center justify-between p-6">
                {/* Avatar + Name */}
                <div className="flex items-center gap-4">
                  {/* Avatar ring */}
                  <div className="relative">
                    <div
                      className="w-16 h-16 rounded-full p-0.5"
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      <div
                        className="w-full h-full rounded-full flex items-center justify-center text-2xl font-bold text-white overflow-hidden"
                        style={{ background: 'var(--bg-soft)' }}
                      >
                        {currentUser?.profilePicture ? (
                          <img
                            src={currentUser.profilePicture}
                            alt="profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span style={{ color: 'var(--primary)', background: 'var(--accent-bg)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {currentUser?.name?.charAt(0) || 'U'}
                          </span>
                        )}
                      </div>
                    </div>
                    {currentUser?.isVerified && (
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: 'var(--gradient-primary)', border: '2px solid var(--bg-elevated)' }}
                      >
                        <ShieldCheck size={10} color="#fff" />
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Premium badge */}
                    <div
                      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest mb-1"
                      style={{ background: 'var(--accent-bg)', color: 'var(--primary)', border: '1px solid var(--accent-border)' }}
                    >
                      <Sparkles size={8} /> Premium Member
                    </div>
                    <h2
                      className="text-xl font-bold leading-tight"
                      style={{ color: 'var(--text-heading)' }}
                    >
                      {currentUser?.name || 'Guest User'}
                    </h2>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Zap size={10} style={{ color: 'var(--primary)' }} />
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {currentUser?.role === 'admin' ? 'Admin' : 'Starseed & Seeker'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Wallet + Close */}
                <div className="flex items-center gap-4">
                  {/* Wallet balance */}
                  <div
                    className="card-soft flex flex-col items-end"
                    style={{ padding: '0.75rem 1rem', borderRadius: '1rem' }}
                  >
                    <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: 'var(--text-soft)' }}>
                      Celestial Balance
                    </p>
                    <p className="text-2xl font-bold leading-none" style={{ color: 'var(--text-heading)' }}>
                      ₹<span style={{
                        background: 'var(--gradient-primary)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}>
                        {currentUser?.walletBalance || 0}
                      </span>
                    </p>
                    <p className="text-[9px] mt-0.5" style={{ color: 'var(--text-soft)' }}>Stardust Credits</p>
                    <motion.button
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.96 }}
                      className="btn-primary mt-2 text-xs"
                      style={{ padding: '0.35rem 1rem', borderRadius: '9999px' }}
                    >
                      Top Up Balance
                    </motion.button>
                  </div>

                  {/* Close */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center border-0 flex-shrink-0"
                    style={{ background: 'var(--bg-soft)', color: 'var(--text-muted)' }}
                  >
                    <X size={14} />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* ─── Body ─── */}
            <div
              className="flex flex-1 overflow-hidden"
              style={{ minHeight: 0 }}
            >
              {/* ── Left sidebar ── */}
              <div
                className="hidden md:flex flex-col w-48 flex-shrink-0 overflow-y-auto p-4 gap-1"
                style={{
                  background: 'var(--bg-elevated)',
                  borderRight: '1px solid var(--border-soft)',
                }}
              >
                <p className="text-[9px] font-bold uppercase tracking-widest px-3 mb-2 mt-1" style={{ color: 'var(--text-soft)' }}>
                  Management
                </p>
                {navItems.map((item) => (
                  <NavItem
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    active={activeNav === item.label}
                    onClick={() => setActiveNav(item.label)}
                  />
                ))}

                {/* Upgrade CTA */}
                <div className="mt-auto pt-4">
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="card-soft cursor-pointer relative overflow-hidden"
                    style={{ padding: '1rem', borderRadius: '1rem' }}
                  >
                    <div
                      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,98,0,0.06) 0%, transparent 70%)' }}
                    />
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center mb-2"
                      style={{ background: 'var(--accent-bg)' }}
                    >
                      <Star size={14} style={{ color: 'var(--primary)' }} />
                    </div>
                    <p className="text-xs font-bold mb-1" style={{ color: 'var(--text-heading)' }}>
                      Upgrade to Cosmic Plus
                    </p>
                    <p className="text-[10px] leading-relaxed mb-2" style={{ color: 'var(--text-muted)' }}>
                      Unlock unlimited birth chart comparisons and monthly tarot insights.
                    </p>
                    <motion.div
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-1 text-[10px] font-semibold"
                      style={{ color: 'var(--primary)' }}
                    >
                      Learn More <ArrowRight size={10} />
                    </motion.div>
                  </motion.div>

                  {/* Logout */}
                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { logout(); onClose(); }}
                    className="w-full mt-3 btn-primary flex items-center justify-center gap-2 text-xs"
                    style={{ padding: '0.6rem 1rem', borderRadius: '0.75rem' }}
                  >
                    <LogOut size={12} /> Logout
                  </motion.button>
                </div>
              </div>

              {/* ── Main content ── */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6" style={{ minWidth: 0 }}>

                {/* ── Birth Chart ── */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <SLabel>Celestial Alignment</SLabel>
                      <h3 className="text-xl font-bold" style={{ color: 'var(--text-heading)' }}>
                        Your Birth Chart
                      </h3>
                    </div>
                    <motion.button
                      whileHover={{ x: 2 }}
                      className="flex items-center gap-1 text-xs font-semibold border-0 bg-transparent"
                      style={{ color: 'var(--primary)' }}
                    >
                      View Full Chart <ChevronRight size={12} />
                    </motion.button>
                  </div>

                  <div className="flex gap-4">
                    {birthSigns.map((s, i) => (
                      <SignCard key={i} {...s} />
                    ))}
                  </div>
                </section>

                {/* ── Active Rituals ── */}
                <section>
                  <div className="mb-4">
                    <SLabel>Upcoming Events</SLabel>
                    <h3 className="text-xl font-bold" style={{ color: 'var(--text-heading)' }}>
                      Active Rituals
                    </h3>
                  </div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="card overflow-hidden flex flex-col sm:flex-row gap-0 cursor-pointer"
                    style={{ padding: 0 }}
                  >
                    {/* Thumbnail */}
                    <div
                      className="sm:w-36 h-36 sm:h-auto flex-shrink-0 flex items-center justify-center text-4xl"
                      style={{ background: 'var(--bg-soft)', borderRadius: '1.5rem 0 0 1.5rem' }}
                    >
                      🌌
                    </div>
                    {/* Content */}
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                            style={{ background: 'var(--accent-bg)', color: 'var(--primary)', border: '1px solid var(--accent-border)' }}
                          >
                            1:1 Virtual Session
                          </span>
                          <div className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-soft)' }}>
                            <Clock size={11} /> Oct 24, 2024
                          </div>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="w-7 h-7 rounded-full flex items-center justify-center border-0 flex-shrink-0"
                          style={{ background: 'var(--bg-soft)', color: 'var(--text-muted)' }}
                        >
                          <MoreHorizontal size={13} />
                        </motion.button>
                      </div>

                      <h4 className="text-lg font-bold mb-1.5" style={{ color: 'var(--text-heading)' }}>
                        Solar Return Deep Dive
                      </h4>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
                        Explore the themes for your upcoming birthday year. We'll track all your transits, solar house placements, and key planetary cycles.
                      </p>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                            style={{ background: 'var(--accent-bg)' }}
                          >
                            🔮
                          </div>
                          <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                            Master Astrologer
                          </span>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.04, y: -1 }}
                          whileTap={{ scale: 0.96 }}
                          className="btn-primary text-sm flex items-center gap-2"
                          style={{ padding: '0.5rem 1.4rem' }}
                        >
                          <Zap size={13} /> Join Session
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </section>

                {/* ── Cosmic History ── */}
                <section>
                  <div className="mb-4">
                    <SLabel>Your Journey</SLabel>
                    <h3 className="text-xl font-bold" style={{ color: 'var(--text-heading)' }}>
                      Cosmic History
                    </h3>
                  </div>

                  {/* Tabs */}
                  <div
                    className="flex gap-1 p-1 rounded-xl mb-5 w-fit"
                    style={{ background: 'var(--bg-soft)' }}
                  >
                    {tabs.map((tab) => (
                      <motion.button
                        key={tab}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setActiveTab(tab)}
                        className="px-4 py-2 rounded-lg text-sm font-semibold transition-all border-0"
                        style={
                          activeTab === tab
                            ? {
                                background: 'var(--bg-elevated)',
                                color: 'var(--primary)',
                                boxShadow: 'var(--shadow-sm)',
                              }
                            : {
                                background: 'transparent',
                                color: 'var(--text-muted)',
                              }
                        }
                      >
                        {tab}
                      </motion.button>
                    ))}
                  </div>

                  {/* Orders list */}
                  <div
                    className="card"
                    style={{ padding: '0.5rem 1.25rem 0.25rem' }}
                  >
                    {orders.map((order, i) => (
                      <OrderRow key={i} {...order} />
                    ))}
                  </div>

                  {/* Load more */}
                  <motion.button
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    className="w-full mt-4 py-3 rounded-xl text-sm font-semibold border-0 transition-all"
                    style={{
                      background: 'var(--bg-elevated)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border-soft)',
                    }}
                  >
                    Load More History
                  </motion.button>
                </section>

                {/* ── Account Info (shown below on mobile) ── */}
                <section className="md:hidden">
                  <div className="mb-4">
                    <SLabel>Account Details</SLabel>
                    <h3 className="text-xl font-bold" style={{ color: 'var(--text-heading)' }}>
                      Your Information
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: Mail, label: 'Email', value: currentUser?.email || 'Not provided' },
                      { icon: Phone, label: 'Phone', value: currentUser?.phone || 'Not provided' },
                      { icon: Calendar, label: 'Date of Birth', value: currentUser?.dateOfBirth ? new Date(currentUser.dateOfBirth).toLocaleDateString() : 'Not set' },
                      { icon: MapPin, label: 'Place of Birth', value: currentUser?.placeOfBirth || 'Not set' },
                    ].map(({ icon: Icon, label, value }) => (
                      <motion.div
                        key={label}
                        whileHover={{ x: 3 }}
                        className="card-soft flex items-center gap-3"
                        style={{ padding: '0.875rem 1rem', borderRadius: '1rem' }}
                      >
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: 'var(--accent-bg)' }}
                        >
                          <Icon size={14} style={{ color: 'var(--primary)' }} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-soft)' }}>{label}</p>
                          <p className="text-sm font-medium" style={{ color: 'var(--text-heading)' }}>{value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { logout(); onClose(); }}
                    className="w-full mt-4 btn-primary flex items-center justify-center gap-2"
                  >
                    <LogOut size={14} /> Logout
                  </motion.button>
                </section>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;