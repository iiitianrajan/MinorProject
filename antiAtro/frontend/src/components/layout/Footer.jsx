import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF9933] to-[#FFB800] flex items-center justify-center text-2xl shadow-lg">
                🕉️
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-white tracking-tight leading-none">
                  Soul<span className="text-[#FF9933]">ToConnect</span>
                </span>
                <span className="text-[11px] text-gray-400 font-medium tracking-widest uppercase mt-0.5">
                  DivyaDarshan
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              India's premier astrology platform connecting you with verified Vedic astrologers, Tarot readers, and Numerologists for accurate future predictions. Over 5 Crore users trust us for guidance in love, career, and life.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF9933] hover:text-white transition-all text-gray-300">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF9933] hover:text-white transition-all text-gray-300">
                <Instagram size={18} />
              </a>
              <a href="https://www.twitter.com/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF9933] hover:text-white transition-all text-gray-300">
                <Twitter size={18} />
              </a>
              <a href="https://www.youtube.com/" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FF9933] hover:text-white transition-all text-gray-300">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-[#FF9933] font-bold mb-6 text-sm uppercase tracking-wider">Astrology Services</h4>
            <ul className="space-y-3 relative">
              {[
                { name: 'Chat with Expert', path: '/chat' },
                { name: 'Talk to Expert', path: '/call' },
                { name: 'Free Janam Kundli', path: '/kundali' },
                { name: 'Kundli Matching', path: '/kundali/matching' },
                { name: 'Book a Pooja Online', path: '/pooja' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-gray-400 hover:text-white hover:underline text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horoscopes */}
          <div>
            <h4 className="text-[#FF9933] font-bold mb-6 text-sm uppercase tracking-wider">Horoscope 2026</h4>
            <ul className="space-y-3">
              {[
                'Aries Horoscope', 'Taurus Horoscope', 'Gemini Horoscope',
                'Cancer Horoscope', 'Leo Horoscope', 'Virgo Horoscope'
              ].map((zodiac, idx) => (
                <li key={idx}>
                  <Link to={`/horoscope/${zodiac.toLowerCase().split(' ')[0]}`} className="text-gray-400 hover:text-white hover:underline text-sm transition-colors">
                    {zodiac}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Info */}
          <div>
            <h4 className="text-[#FF9933] font-bold mb-6 text-sm uppercase tracking-wider">Important Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Use', path: '/terms' },
                { name: 'Contact Us', path: '/contact' }
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-gray-400 hover:text-white hover:underline text-sm transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Secure & Payment Methods */}
        <div className="border-t border-white/10 pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
            {/* Mocking Razorpay/Stripe/Visa icons */}
            <div className="px-3 py-1.5 bg-white rounded text-black font-bold text-xs italic">VISA</div>
            <div className="px-3 py-1.5 bg-white rounded text-black font-bold text-xs italic">MasterCard</div>
            <div className="px-3 py-1.5 bg-white rounded text-[#00008B] font-bold text-xs">Paytm</div>
            <div className="px-3 py-1.5 bg-white rounded text-[#4466B1] font-bold text-xs">Rupay</div>
          </div>
          <div className="text-gray-500 text-xs text-center md:text-right">
            © 2026 SoulToConnect/DivyaDarshan . All rights reserved.<br/>
            Made with ❤️ using React, Tailwind & Framer Motion.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
