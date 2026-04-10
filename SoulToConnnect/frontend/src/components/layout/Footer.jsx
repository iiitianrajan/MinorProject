import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Sparkles, Star, Heart, ArrowRight, Shield, Phone, MessageSquare } from 'lucide-react';

const socialLinks = [
  { href: 'https://www.facebook.com/', icon: Facebook, label: 'Facebook' },
  { href: 'https://www.instagram.com/', icon: Instagram, label: 'Instagram' },
  { href: 'https://www.twitter.com/', icon: Twitter, label: 'Twitter' },
  { href: 'https://www.youtube.com/', icon: Youtube, label: 'YouTube' },
];

const astrologyServices = [
  { name: 'Chat with Expert', path: '/chat' },
  { name: 'Talk to Expert', path: '/call' },
  { name: 'Free Janam Kundli', path: '/kundali' },
  { name: 'Kundli Matching', path: '/kundali/matching' },
  { name: 'Book a Pooja Online', path: '/pooja' },
  { name: 'add a Pooja Online', path: '/addpuja' },
];

const horoscopes = [
  'Aries Horoscope',
  'Taurus Horoscope',
  'Gemini Horoscope',
  'Cancer Horoscope',
  'Leo Horoscope',
  'Virgo Horoscope',
];

const importantLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'Terms of Use', path: '/terms' },
  { name: 'Contact Us', path: '/contact' },
];

const paymentMethods = ['VISA', 'MasterCard', 'Paytm', 'Rupay'];

const trustBadges = [
  { icon: Shield, label: '100% Secure' },
  { icon: Star, label: '4.9 Rated' },
  { icon: MessageSquare, label: '24/7 Support' },
];

/* ─── Column Heading ─── */
function ColHeading({ icon: Icon, children }) {
  return (
    <h4
      className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-5"
      style={{ color: 'var(--text-heading)', fontFamily: 'Poppins, sans-serif' }}
    >
      <span
        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}
      >
        <Icon size={12} style={{ color: 'var(--primary-light)' }} />
      </span>
      {children}
    </h4>
  );
}

/* ─── Footer Link ─── */
function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="group flex items-center gap-2.5 text-sm py-0.5 transition-all duration-200"
        style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
        onMouseEnter={e => {
          e.currentTarget.style.color = 'var(--primary-light)';
          e.currentTarget.style.transform = 'translateX(4px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = 'var(--text-muted)';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        <span
          className="w-1 h-1 rounded-full flex-shrink-0"
          style={{ background: 'var(--primary-light)', opacity: 0.45 }}
        />
        {children}
      </Link>
    </li>
  );
}

const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'var(--bg-soft)', borderTop: '1px solid var(--border-soft)' }}
    >
      {/* Ambient tonal blobs — mirrors Home.jsx hero blobs */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,98,0,0.07) 0%, transparent 70%)',
          filter: 'blur(80px)',
          transform: 'translate(-30%, -30%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,140,58,0.06) 0%, transparent 70%)',
          filter: 'blur(70px)',
          transform: 'translate(30%, 30%)',
        }}
      />

      {/* ── CTA Banner ── */}
      <div style={{ borderBottom: '1px solid var(--border-soft)' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div
            className="rounded-2xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
            style={{
              background: 'var(--bg-elevated)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-soft)',
            }}
          >
            <div
              className="absolute right-0 top-0 w-72 h-full pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at right, rgba(255,98,0,0.06) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10 text-center md:text-left">
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-3 text-xs font-semibold uppercase tracking-widest"
                style={{
                  background: 'var(--accent-bg)',
                  border: '1px solid var(--accent-border)',
                  color: 'var(--primary-light)',
                }}
              >
                <Sparkles size={10} /> First Consultation Free
              </div>
              <h3
                className="text-xl md:text-2xl font-bold mb-1"
                style={{ color: 'var(--text-heading)', fontFamily: 'Poppins, sans-serif', letterSpacing: '-0.03em' }}
              >
                Ready to discover your destiny?
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Connect with India's top verified astrologers right now.
              </p>
            </div>

            <div className="relative z-10 flex gap-3 flex-wrap justify-center">
              <Link
                to="/chat"
                className="btn-primary flex items-center gap-2 text-sm"
                style={{ textDecoration: 'none' }}
              >
                <MessageSquare size={15} /> Start Free Chat
              </Link>
              <Link
                to="/call"
                className="flex items-center gap-2 text-sm font-semibold px-5 py-3 rounded-full transition-all duration-300"
                style={{
                  background: 'var(--bg-soft)',
                  border: '1px solid var(--border-soft)',
                  color: 'var(--text-heading)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--accent-bg)';
                  e.currentTarget.style.borderColor = 'var(--accent-border)';
                  e.currentTarget.style.color = 'var(--primary-light)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--bg-soft)';
                  e.currentTarget.style.borderColor = 'var(--border-soft)';
                  e.currentTarget.style.color = 'var(--text-heading)';
                }}
              >
                <Phone size={15} /> Talk to Expert
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                style={{
                  background: 'var(--gradient-primary)',
                  boxShadow: '0 0 24px rgba(255,98,0,0.2)',
                }}
              >
                🕉️
              </div>
              <div className="flex flex-col">
                <span
                  className="text-2xl font-extrabold tracking-tight leading-none"
                  style={{
                    background: 'var(--gradient-primary)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  SoulToConnect
                </span>
                <span
                  className="text-[11px] font-semibold tracking-widest uppercase mt-0.5"
                  style={{ color: 'var(--text-soft)' }}
                >
                  DivyaDarshan
                </span>
              </div>
            </Link>

            <p className="text-sm leading-relaxed max-w-sm" style={{ color: 'var(--text-muted)' }}>
              India's premier astrology platform connecting you with verified Vedic astrologers,
              Tarot readers, and Numerologists. Over 5 Crore users trust us for guidance in
              love, career, and life.
            </p>

            {/* Trust badges — same pill style as Home's hero badge */}
            <div className="flex gap-2 flex-wrap">
              {trustBadges.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{
                    background: 'var(--accent-bg)',
                    border: '1px solid var(--accent-border)',
                    color: 'var(--primary)',
                  }}
                >
                  <b.icon size={11} style={{ color: 'var(--primary-light)' }} />
                  {b.label}
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex gap-3">
              {socialLinks.map((item, i) => {
                const IconComp = item.icon;
                return (
                  <a
                    key={i}
                    href={item.href}
                    aria-label={item.label}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-soft)',
                      color: 'var(--text-soft)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'var(--gradient-primary)';
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.boxShadow = '0 0 18px rgba(255,98,0,0.28)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'var(--bg-elevated)';
                      e.currentTarget.style.color = 'var(--text-soft)';
                      e.currentTarget.style.borderColor = 'var(--border-soft)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                    }}
                  >
                    <IconComp size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Astrology Services */}
          <div
            className="rounded-2xl p-5 transition-all duration-300 hover:shadow-md"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-soft)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <ColHeading icon={Sparkles}>Astrology Services</ColHeading>
            <ul className="space-y-2">
              {astrologyServices.map((link, idx) => (
                <FooterLink key={idx} to={link.path}>{link.name}</FooterLink>
              ))}
            </ul>
          </div>

          {/* Horoscope */}
          <div
            className="rounded-2xl p-5 transition-all duration-300 hover:shadow-md"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-soft)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <ColHeading icon={Star}>Horoscope 2026</ColHeading>
            <ul className="space-y-2">
              {horoscopes.map((zodiac, idx) => (
                <FooterLink key={idx} to={'/horoscope/' + zodiac.toLowerCase().split(' ')[0]}>
                  {zodiac}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div
            className="rounded-2xl p-5 transition-all duration-300 hover:shadow-md"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-soft)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <ColHeading icon={Heart}>Important Links</ColHeading>
            <ul className="space-y-2">
              {importantLinks.map((link, idx) => (
                <FooterLink key={idx} to={link.path}>{link.name}</FooterLink>
              ))}
            </ul>

            {/* Mini stats */}
            <div
              className="mt-6 pt-5 space-y-3"
              style={{ borderTop: '1px solid var(--border-soft)' }}
            >
              {[
                { emoji: '⭐', value: '4.9 / 5', label: 'App Rating' },
                { emoji: '👥', value: '5 Crore+', label: 'Happy Users' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{s.emoji}</span>
                  <div>
                    <div
                      className="text-sm font-bold leading-tight"
                      style={{ color: 'var(--text-heading)', fontFamily: 'Poppins, sans-serif' }}
                    >
                      {s.value}
                    </div>
                    <div className="text-[11px]" style={{ color: 'var(--text-soft)' }}>
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-8" style={{ background: 'var(--border-soft)' }} />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">

          {/* Payment Methods */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-xs font-medium" style={{ color: 'var(--text-soft)' }}>
              Secure Payments:
            </span>
            {paymentMethods.map((pm, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded-lg text-xs font-bold cursor-default transition-all duration-200 hover:scale-105"
                style={{
                  background: 'var(--bg-elevated)',
                  color: 'var(--text-heading)',
                  border: '1px solid var(--border-soft)',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--accent-bg)';
                  e.currentTarget.style.color = 'var(--primary)';
                  e.currentTarget.style.borderColor = 'var(--accent-border)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--bg-elevated)';
                  e.currentTarget.style.color = 'var(--text-heading)';
                  e.currentTarget.style.borderColor = 'var(--border-soft)';
                }}
              >
                {pm}
              </div>
            ))}
          </div>

          {/* Copyright */}
          <p
            className="text-xs text-center md:text-right leading-relaxed"
            style={{ color: 'var(--text-soft)' }}
          >
            © 2026 SoulToConnect / DivyaDarshan. All rights reserved.
            <br />
            Made with ❤️ using React, Tailwind &amp; Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;