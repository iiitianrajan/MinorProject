import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Sparkles, Star, Heart } from 'lucide-react';
import Galaxy from '../../pages/Galaxy';
import '../../pages/Galaxy.css'

const socialLinks = [
  { href: 'https://www.facebook.com/', icon: Facebook, color: '#3b82f6' },
  { href: 'https://www.instagram.com/', icon: Instagram, color: '#ec4899' },
  { href: 'https://www.twitter.com/', icon: Twitter, color: '#06b6d4' },
  { href: 'https://www.youtube.com/', icon: Youtube, color: '#ef4444' },
];

const astrologyServices = [
  { name: 'Chat with Expert', path: '/chat' },
  { name: 'Talk to Expert', path: '/call' },
  { name: 'Free Janam Kundli', path: '/kundali' },
  { name: 'Kundli Matching', path: '/kundali/matching' },
  { name: 'Book a Pooja Online', path: '/pooja' },
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

const paymentMethods = [
  { label: 'VISA', textColor: '#1a1a6e', fontStyle: 'italic' },
  { label: 'MasterCard', textColor: '#7c0000', fontStyle: 'italic' },
  { label: 'Paytm', textColor: '#00008B', fontStyle: 'normal' },
  { label: 'Rupay', textColor: '#4466B1', fontStyle: 'normal' },
];

const glassCard = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.08)',
};

function GradientDot({ gradient }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 4,
        height: 4,
        borderRadius: '50%',
        background: gradient,
        flexShrink: 0,
      }}
    />
  );
}

function GradientHeading({ gradient, iconColor, IconComponent, children }) {
  return (
    <h4
      className="font-bold mb-5 text-xs uppercase tracking-widest flex items-center gap-1"
      style={{
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      <IconComponent size={13} style={{ color: iconColor, flexShrink: 0 }} />
      {children}
    </h4>
  );
}

const Footer = () => {
  function handleLinkEnter(e, gradient) {
    e.currentTarget.style.background = gradient;
    e.currentTarget.style.WebkitBackgroundClip = 'text';
    e.currentTarget.style.WebkitTextFillColor = 'transparent';
  }

  function handleLinkLeave(e) {
    e.currentTarget.style.background = 'none';
    e.currentTarget.style.WebkitBackgroundClip = 'unset';
    e.currentTarget.style.WebkitTextFillColor = 'unset';
    e.currentTarget.style.color = '#9ca3af';
  }

  function handleSocialEnter(e, color) {
    e.currentTarget.style.background = color;
    e.currentTarget.style.color = '#fff';
    e.currentTarget.style.boxShadow = '0 0 16px ' + color + '66';
    e.currentTarget.style.borderColor = color;
  }

  function handleSocialLeave(e) {
    e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
    e.currentTarget.style.color = '#9ca3af';
    e.currentTarget.style.boxShadow = 'none';
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
  }

  return (
    <footer
      className="relative text-white pt-16 pb-8 font-sans overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f0c29 0%, #1a1040 30%, #1A1A1A 60%, #0d0d1a 100%)',
      }}
    >
      <div className="absolute inset-0">
  <Galaxy />
</div>
     
      {/* Ambient blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'translate(-30%, -30%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(251,146,60,0.15) 0%, transparent 70%)',
          filter: 'blur(40px)',
          transform: 'translate(30%, 30%)',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(236,72,153,0.10) 0%, transparent 70%)',
          filter: 'blur(50px)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.6), rgba(251,146,60,0.6), rgba(236,72,153,0.6), transparent)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: 'linear-gradient(135deg, #FF9933 0%, #FFB800 50%, #f97316 100%)',
                  boxShadow: '0 0 20px rgba(255,153,51,0.45), 0 0 40px rgba(255,153,51,0.2)',
                }}
              >
                🕉️
              </div>
              <div className="flex flex-col">
                <span
                  className="text-2xl font-extrabold tracking-tight leading-none"
                  style={{
                    background: 'linear-gradient(90deg, #fff 0%, #FF9933 40%, #ec4899 70%, #a855f7 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  SoulToConnect
                </span>
                <span className="text-[11px] text-gray-400 font-medium tracking-widest uppercase mt-0.5">
                  DivyaDarshan
                </span>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              India's premier astrology platform connecting you with verified Vedic astrologers, Tarot readers, and Numerologists for accurate future predictions. Over 5 Crore users trust us for guidance in love, career, and life.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((item, i) => {
                const IconComp = item.icon;
                return (
                  <a
                    key={i}
                    href={item.href}
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: '#9ca3af',
                    }}
                    onMouseEnter={e => handleSocialEnter(e, item.color)}
                    onMouseLeave={handleSocialLeave}
                  >
                    <IconComp size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Astrology Services */}
          <div className="rounded-2xl p-5" style={glassCard}>
            <GradientHeading
              gradient="linear-gradient(90deg, #f59e0b, #f97316)"
              iconColor="#f59e0b"
              IconComponent={Sparkles}
            >
              Astrology Services
            </GradientHeading>
            <ul className="space-y-2.5">
              {astrologyServices.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm transition-all duration-200 flex items-center gap-2"
                    style={{ textDecoration: 'none' }}
                    onMouseEnter={e => handleLinkEnter(e, 'linear-gradient(90deg,#f59e0b,#f97316,#ec4899)')}
                    onMouseLeave={handleLinkLeave}
                  >
                    <GradientDot gradient="linear-gradient(90deg,#f59e0b,#ec4899)" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horoscope 2026 */}
          <div className="rounded-2xl p-5" style={glassCard}>
            <GradientHeading
              gradient="linear-gradient(90deg, #a855f7, #ec4899)"
              iconColor="#a855f7"
              IconComponent={Star}
            >
              Horoscope 2026
            </GradientHeading>
            <ul className="space-y-2.5">
              {horoscopes.map((zodiac, idx) => (
                <li key={idx}>
                  <Link
                    to={'/horoscope/' + zodiac.toLowerCase().split(' ')[0]}
                    className="text-gray-400 text-sm transition-all duration-200 flex items-center gap-2"
                    style={{ textDecoration: 'none' }}
                    onMouseEnter={e => handleLinkEnter(e, 'linear-gradient(90deg,#a855f7,#ec4899)')}
                    onMouseLeave={handleLinkLeave}
                  >
                    <GradientDot gradient="linear-gradient(90deg,#a855f7,#ec4899)" />
                    {zodiac}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div className="rounded-2xl p-5" style={glassCard}>
            <GradientHeading
              gradient="linear-gradient(90deg, #f43f5e, #f97316)"
              iconColor="#f43f5e"
              IconComponent={Heart}
            >
              Important Links
            </GradientHeading>
            <ul className="space-y-2.5">
              {importantLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-gray-400 text-sm transition-all duration-200 flex items-center gap-2"
                    style={{ textDecoration: 'none' }}
                    onMouseEnter={e => handleLinkEnter(e, 'linear-gradient(90deg,#f43f5e,#f97316)')}
                    onMouseLeave={handleLinkLeave}
                  >
                    <GradientDot gradient="linear-gradient(90deg,#f43f5e,#f97316)" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div
          className="h-px mb-6"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.4), rgba(251,146,60,0.4), rgba(236,72,153,0.4), transparent)',
          }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-3">
            {paymentMethods.map((pm, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded text-xs font-bold transition-all duration-300 hover:scale-105"
                style={{
                  background: '#fff',
                  color: pm.textColor,
                  fontStyle: pm.fontStyle,
                  opacity: 0.6,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.6'; }}
              >
                {pm.label}
              </div>
            ))}
          </div>

          <div className="text-gray-500 text-xs text-center md:text-right leading-relaxed">
            © 2026 SoulToConnect/DivyaDarshan. All rights reserved.
            <br />
            Made with ❤️ using React, Tailwind &amp; Framer Motion.
          </div>
        </div>
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(236,72,153,0.5), rgba(251,146,60,0.5), transparent)',
        }}
      />
     
    </footer>
  );
};

export default Footer;
