import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, User as UserIcon, LogOut, Wallet, MessageCircle, Phone, ShoppingBag, BookOpen, Sparkles, Star, Heart, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../auth/AuthModal';
import WalletModal from '../payment/WalletModal';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';

const Navbar = ({ onProfileClick, onAddExpertClick }) => {
  const { totalItems } = useCart();
  const { currentUser, logout, login } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState('login');
  const [scrolled, setScrolled] = useState(false);

  // State for click-based dropdowns
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  const openAuth = (tab) => {
    setAuthTab(tab);
    setIsAuthModalOpen(true);
  };

  const toggleDropdown = (name) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll effect
 const [showNavbar, setShowNavbar] = useState(true);
const lastScrollY = useRef(0);

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    setScrolled(currentScrollY > 20);

    // Add threshold to prevent jitter
    if (Math.abs(currentScrollY - lastScrollY.current) < 10) return;

    if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
      setShowNavbar(false); // scroll down
    } else {
      setShowNavbar(true); // scroll up
    }

    lastScrollY.current = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <>
      <nav
  ref={navRef}
  className={`sticky top-0 z-50 transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
    showNavbar
      ? "translate-y-0 opacity-100"
      : "-translate-y-full opacity-0"
  } ${
    scrolled
      ? "bg-white/80 backdrop-blur-2xl shadow-xl"
      : "bg-transparent"
  }`}
>

        {/* ✨ PREMIUM TOP BAR */}
        <div className={`border-b transition-colors duration-300 hidden md:block ${scrolled ? 'border-gray-200' : 'border-amber-200/50'
          }`}>
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 h-14 flex justify-between items-center text-sm">

            {/* Premium Logo */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition"></div>
                  <img
                    src="https://as2.ftcdn.net/v2/jpg/05/77/75/23/1000_F_577752354_WbjctGllEUKGVBW29pojzAHAlwysroaX.jpg"
                    alt="Logo"
                    className="relative w-10 h-10 rounded-full border-2 border-white shadow-lg group-hover:scale-110 transition-transform"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Soul
                  </span>
                  <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 bg-clip-text text-transparent" style={{ fontFamily: "'Playfair Display', serif" }}>
                    ToConnect
                  </span>
                  <Sparkles className="text-amber-500 ml-1" size={18} />
                </div>
              </Link>
            </div>

            {/* Premium Top NavBar Items */}
            <div className="flex items-center gap-8">

              <Link to="/" className="flex items-center gap-2 font-semibold text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </Link>

              <Link to="/astromall" className="flex items-center gap-2 font-semibold text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition">
                {/* <ShoppingBag size={18} className="text-blue-500" /> */}
                Astromall
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
              </Link>


              {/* kundli dropdown modal */}
              <div
                className="relative inline-block group cursor-pointer"
                onMouseEnter={() => toggleDropdown('kundli')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <span className="flex items-center gap-2 font-semibold text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition">
                  Kundli
                  <ChevronDown size={16} className={`transition-transform duration-300 text-amber-500 ${openDropdown === 'kundli' ? 'rotate-180' : ''}`} />
                </span>

                <AnimatePresence>
                  {openDropdown === 'kundli' && (
                    <>
                      <div className="absolute top-full left-0 w-full h-3"></div>
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-3 w-64 bg-white/95 backdrop-blur-2xl border border-purple-100 shadow-2xl rounded-2xl py-3 z-50"
                      >
                        <div className="absolute -top-2 left-8 w-4 h-4 bg-white border-l border-t border-purple-100 transform rotate-45"></div>

                        <Link
                          to="/kundli"
                          onClick={(e) => {
                            if (!currentUser) {
                              e.preventDefault();
                              setIsAuthModalOpen(true);
                            }
                          }}
                          className="group/item flex items-center gap-3 px-5 py-3 mx-2 rounded-xl text-gray-800 font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:pl-6"
                        >
                          <span className="text-2xl group-hover/item:scale-125 transition-transform"><Star size={16} className="text-amber-500 group-hover:text-pink-500 transition" /></span>
                          <div>
                            <div className="font-bold text-gray-900 group-hover/item:text-orange-600 transition">Free Kundli</div>
                            {/* <div className="text-xs text-gray-500">Today's predictions</div> */}
                          </div>
                        </Link>

                        <Link
                          to="/kundli-matching"
                          onClick={(e) => {
                            if (!currentUser) {
                              e.preventDefault();
                              setIsAuthModalOpen(true);
                            }
                          }}
                          className="group/item flex items-center gap-3 px-5 py-3 mx-2 rounded-xl text-gray-800 font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:pl-6"
                        >
                          <span className="text-2xl group-hover/item:scale-125 transition-transform"><Heart size={16} className="text-pink-500 group-hover:text-purple-500 transition" /></span>
                          <div>
                            <div className="font-bold text-gray-900 group-hover/item:text-purple-600 transition">Kundli Matching</div>
                            {/* <div className="text-xs text-gray-500">Week ahead forecast</div> */}
                          </div>
                        </Link>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>


              {/* <Link 
                to={"/kundli"}
                onClick={(e) => {
                  if (!currentUser) {
                    e.preventDefault();
                    setIsAuthModalOpen(true);
                  }
                }}
                className="group flex items-center gap-2 font-semibold text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition-all"
              >
                <Star size={16} className="text-amber-500 group-hover:text-pink-500 transition" />
                Free Kundli
              </Link>

              <Link 
                to="/kundli-matching"
                onClick={(e) => {
                  if (!currentUser) {
                    e.preventDefault();
                    setIsAuthModalOpen(true);
                  }
                }}
                className="group flex items-center gap-2 font-semibold text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition-all"
              >
                <Heart size={16} className="text-pink-500 group-hover:text-purple-500 transition" />
                Kundli Matching
              </Link> */}

              {/* <Link 
                to="/compatibility"
                onClick={(e) => {
                  if (!currentUser) {
                    e.preventDefault();
                    setIsAuthModalOpen(true);
                  }
                }}
                className="group flex items-center gap-2 font-semibold text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition-all"
              >
                <Sparkles size={16} className="text-purple-500 group-hover:text-pink-500 transition" />
                Compatibility
              </Link> */}


              {/* Premium Calculators Dropdown */}
              <div className="relative inline-block group">
                <span className="flex items-center gap-2 font-semibold text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition cursor-pointer">
                  Calculators
                  <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180 text-amber-500" />
                </span>

                <div className="absolute left-0 top-full mt-3 w-64 bg-white/95 backdrop-blur-2xl border border-purple-100 shadow-2xl rounded-2xl py-3 z-50 opacity-0 invisible pointer-events-none scale-95 translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300">
                  <div className="absolute -top-2 left-8 w-4 h-4 bg-white border-l border-t border-purple-100 transform rotate-45"></div>

                  <Link
                    to="/love-calculator"
                    onClick={(e) => {
                      if (!currentUser) {
                        e.preventDefault();
                        setIsAuthModalOpen(true);
                      }
                    }}
                    className="group/item flex items-center gap-3 px-5 py-3 mx-2 rounded-xl text-gray-800 font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:pl-6"
                  >
                    <span className="text-2xl group-hover/item:scale-125 transition-transform">💖</span>
                    <div>
                      <div className="font-bold text-gray-900 group-hover/item:text-pink-600 transition">Love Calculator</div>
                      <div className="text-xs text-gray-500">Find your match %</div>
                    </div>
                  </Link>

                  <Link
                    to="/moon-sign"
                    onClick={(e) => {
                      if (!currentUser) {
                        e.preventDefault();
                        setIsAuthModalOpen(true);
                      }
                    }}
                    className="group/item flex items-center gap-3 px-5 py-3 mx-2 rounded-xl text-gray-800 font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:pl-6"
                  >
                    <span className="text-2xl group-hover/item:scale-125 transition-transform">🌙</span>
                    <div>
                      <div className="font-bold text-gray-900 group-hover/item:text-purple-600 transition">Moon Sign</div>
                      <div className="text-xs text-gray-500">Discover your lunar sign</div>
                    </div>
                  </Link>
                </div>
              </div>


              {/* Premium Horoscopes Dropdown */}
              <div
                className="relative inline-block group cursor-pointer"
                onMouseEnter={() => toggleDropdown('horoscopes')}
                onMouseLeave={() => toggleDropdown(null)}
              >
                <span className="flex items-center gap-2 font-semibold text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition">
                  Horoscopes
                  <ChevronDown size={16} className={`transition-transform duration-300 text-amber-500 ${openDropdown === 'horoscopes' ? 'rotate-180' : ''}`} />
                </span>

                <AnimatePresence>
                  {openDropdown === 'horoscopes' && (
                    <>
                      <div className="absolute top-full left-0 w-full h-3"></div>
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-3 w-64 bg-white/95 backdrop-blur-2xl border border-purple-100 shadow-2xl rounded-2xl py-3 z-50"
                      >
                        <div className="absolute -top-2 left-8 w-4 h-4 bg-white border-l border-t border-purple-100 transform rotate-45"></div>

                        <Link
                          to="/horoscope/daily"
                          onClick={(e) => {
                            if (!currentUser) {
                              e.preventDefault();
                              setIsAuthModalOpen(true);
                            }
                          }}
                          className="group/item flex items-center gap-3 px-5 py-3 mx-2 rounded-xl text-gray-800 font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:pl-6"
                        >
                          <span className="text-2xl group-hover/item:scale-125 transition-transform">🔮</span>
                          <div>
                            <div className="font-bold text-gray-900 group-hover/item:text-orange-600 transition">Daily Horoscope</div>
                            <div className="text-xs text-gray-500">Today's predictions</div>
                          </div>
                        </Link>

                        <Link
                          to="/horoscope/weekly"
                          onClick={(e) => {
                            if (!currentUser) {
                              e.preventDefault();
                              setIsAuthModalOpen(true);
                            }
                          }}
                          className="group/item flex items-center gap-3 px-5 py-3 mx-2 rounded-xl text-gray-800 font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:pl-6"
                        >
                          <span className="text-2xl group-hover/item:scale-125 transition-transform">📅</span>
                          <div>
                            <div className="font-bold text-gray-900 group-hover/item:text-purple-600 transition">Weekly Horoscope</div>
                            <div className="text-xs text-gray-500">Week ahead forecast</div>
                          </div>
                        </Link>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* premium contact dropdown */}
              <div
                className="relative inline-block group cursor-pointer"
                onMouseEnter={() => toggleDropdown('contact')}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <span className="flex items-center gap-2 font-semibold text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition">
                  Contact
                  <ChevronDown size={16} className={`transition-transform duration-300 text-amber-500 ${openDropdown === 'contact' ? 'rotate-180' : ''}`} />
                </span>

                <AnimatePresence>
                  {openDropdown === 'contact' && (
                    <>
                      <div className="absolute top-full left-0 w-full h-3"></div>
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-3 w-64 bg-white/95 backdrop-blur-2xl border border-purple-100 shadow-2xl rounded-2xl py-3 z-50"
                      >
                        <div className="absolute -top-2 left-8 w-4 h-4 bg-white border-l border-t border-purple-100 transform rotate-45"></div>

                        <Link
                          to="/chat"
                          onClick={(e) => {
                            if (!currentUser) {
                              e.preventDefault();
                              setIsAuthModalOpen(true);
                            }
                          }}
                          className="group/item flex items-center gap-3 px-5 py-3 mx-2 rounded-xl text-gray-800 font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 hover:pl-6"
                        >
                          <span className="text-2xl group-hover/item:scale-125 transition-transform"><MessageCircle size={18} className="text-purple-500" /></span>
                          <div>
                            <div className="font-bold text-gray-900 group-hover/item:text-orange-600 transition">Chat with Expert</div>
                            {/* <div className="text-xs text-gray-500">Today's predictions</div> */}
                          </div>
                        </Link>

                        <Link
                          to="/call"
                          onClick={(e) => {
                            if (!currentUser) {
                              e.preventDefault();
                              setIsAuthModalOpen(true);
                            }
                          }}
                          className="group/item flex items-center gap-3 px-5 py-3 mx-2 rounded-xl text-gray-800 font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:pl-6"
                        >
                          <span className="text-2xl group-hover/item:scale-125 transition-transform"><Phone size={18} className="text-teal-500" /></span>
                          <div>
                            <div className="font-bold text-gray-900 group-hover/item:text-purple-600 transition">Talk to Expert </div>
                            {/* <div className="text-xs text-gray-500">Week ahead forecast</div> */}
                          </div>
                        </Link>

                        <Link
                          to="/contact"
                          onClick={(e) => {
                            if (!currentUser) {
                              e.preventDefault();
                              setIsAuthModalOpen(true);
                            }
                          }}
                          className="group/item flex items-center gap-3 px-5 py-3 mx-2 rounded-xl text-gray-800 font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:pl-6"
                        >
                          <span className="text-2xl group-hover/item:scale-125 transition-transform"><Heart size={16} className="text-pink-500 group-hover:text-purple-500 transition" /></span>
                          <div>
                            <div className="font-bold text-gray-900 group-hover/item:text-purple-600 transition">Contact Us </div>
                            {/* <div className="text-xs text-gray-500">Week ahead forecast</div> */}
                          </div>
                        </Link>


                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>


              {/* Premium Blogs Dropdown */}
              <div
                className="relative h-full flex items-center cursor-pointer"
                onMouseEnter={() => toggleDropdown('blogs')}
                onMouseLeave={() => toggleDropdown(null)}
              >
                <span className="flex items-center gap-2 font-semibold text-gray-700 hover:text-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:bg-clip-text transition">
                  Blogs
                  <ChevronDown size={16} className={`transition-transform duration-300 text-amber-500 ${openDropdown === 'blogs' ? 'rotate-180' : ''}`} />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                </span>

                <AnimatePresence>
                  {openDropdown === 'blogs' && (
                    <>
                      <div className="absolute top-full right-0 w-full h-3"></div>
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-3 w-64 bg-white/95 backdrop-blur-2xl border border-purple-100 shadow-2xl rounded-2xl py-3 z-50"
                      >
                        <div className="absolute -top-2 right-8 w-4 h-4 bg-white border-l border-t border-purple-100 transform rotate-45"></div>

                        <Link
                          to="/blog/love"
                          className="group/item flex items-center gap-3 px-5 py-3 mx-2 rounded-xl text-gray-800 font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 hover:pl-6"
                        >
                          <span className="text-2xl group-hover/item:scale-125 transition-transform">💖</span>
                          <div>
                            <div className="font-bold text-gray-900 group-hover/item:text-pink-600 transition">Love & Relationships</div>
                            <div className="text-xs text-gray-500">Find your soulmate</div>
                          </div>
                        </Link>

                        <Link
                          to="/blog/career"
                          className="group/item flex items-center gap-3 px-5 py-3 mx-2 rounded-xl text-gray-800 font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:pl-6"
                        >
                          <span className="text-2xl group-hover/item:scale-125 transition-transform">💼</span>
                          <div>
                            <div className="font-bold text-gray-900 group-hover/item:text-blue-600 transition">Career</div>
                            <div className="text-xs text-gray-500">Professional guidance</div>
                          </div>
                        </Link>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>


              {currentUser ? (
                <div className="flex items-center gap-5">
                  {/* Premium Cart */}
                  <Link to="/cart" className="relative group">
                    <div className="p-2.5 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition-all hover:shadow-lg">
                      <ShoppingCart size={22} className="text-purple-600" />
                    </div>
                    {totalItems > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </Link>

                  {/* Premium Wallet */}
                  {/* <button
                    onClick={() => setIsWalletModalOpen(true)}
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 border-2 border-amber-300 hover:shadow-lg transition-all"
                  >
                    <Wallet size={18} className="text-amber-700 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-black bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">₹ 150</span>
                    <Zap size={14} className="text-amber-600" />
                  </button> */}

                  {/* Premium Profile Dropdown */}
                  <div className="relative" onClick={() => toggleDropdown('profile')}>
                    <div className="flex items-center gap-2 cursor-pointer group">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-md opacity-50 group-hover:opacity-75 transition"></div>
                        <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-white flex items-center justify-center text-base font-black shadow-lg group-hover:scale-110 transition-transform border-2 border-white">
                          {currentUser.name.charAt(0).toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {openDropdown === 'profile' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-[120%] right-0 w-64 bg-white/95 backdrop-blur-2xl border border-purple-100 shadow-2xl rounded-2xl py-3 z-50"
                        >
                          <div className="px-5 py-3 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-2xl">
                            <p className="text-sm font-black text-gray-900 truncate">{currentUser.name}</p>
                            <p className="text-xs text-gray-500">{currentUser.email}</p>
                          </div>

                          <button
                            onClick={onProfileClick}
                            className="w-full text-left px-5 py-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 font-semibold text-sm flex items-center gap-3 group/item transition-all rounded-xl mx-1 my-1"
                          >
                            <UserIcon size={18} className="text-purple-500 group-hover/item:scale-110 transition-transform" />
                            <span className="text-gray-800 group-hover/item:text-purple-600 transition">Profile</span>
                          </button>

                          {/* wallet inside profile */}
                            <button
                              onClick={() => { setIsWalletModalOpen(true); setProfileOpen(false); }}
                              className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-200 group/pi"
                            >
                              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center group-hover/pi:bg-amber-200 transition-colors duration-200">
                                <Wallet size={15} className="text-amber-600" />
                              </div>
                              <div className="text-left">
                                <div className="text-sm font-bold text-gray-800 group-hover/pi:text-amber-700 transition-colors duration-200">My Wallet</div>
                                <div className="text-xs text-amber-500 font-semibold">₹ 150 available</div>
                              </div>
                              {/* <Zap size={14} className="text-amber-400 ml-auto" /> */}
                            </button>

                          {currentUser.role === 'admin' && (
                            <button
                              onClick={onProfileClick}
                              className="w-full text-left px-5 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 font-semibold text-sm flex items-center gap-3 group/item transition-all rounded-xl mx-1 my-1"
                            >
                              <ShoppingBag size={18} className="text-blue-500 group-hover/item:scale-110 transition-transform" />
                              <span className="text-gray-800 group-hover/item:text-blue-600 transition">Add Product</span>
                            </button>
                          )}

                          <button
                            onClick={onAddExpertClick}
                            className="w-full text-left px-5 py-3 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 font-semibold text-sm flex items-center gap-3 group/item transition-all rounded-xl mx-1 my-1"
                          >
                            <UserIcon size={18} className="text-amber-500 group-hover/item:scale-110 transition-transform" />
                            <span className="text-gray-800 group-hover/item:text-amber-600 transition">Add New Expert</span>
                          </button>

                          <div className="border-t border-purple-100 mt-2 pt-2">
                            <button
                              onClick={logout}
                              className="w-full text-left flex items-center gap-3 px-5 py-3 hover:bg-red-50 text-red-500 font-semibold text-sm group/item transition-all rounded-xl mx-1 my-1"
                            >
                              <LogOut size={18} className="group-hover/item:scale-110 transition-transform" />
                              Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => openAuth('login')}
                  className="group relative px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-black text-sm tracking-wide shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              )}



            </div>
          </div>
        </div>

        
      </nav>

      {/* ✨ PREMIUM MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[320px] bg-gradient-to-b from-white via-purple-50/30 to-pink-50/30 backdrop-blur-xl z-[101] shadow-2xl flex flex-col border-r-4 border-purple-200"
            >
              {/* Mobile Header */}
              <div className="p-6 border-b border-purple-200 flex justify-between items-center bg-gradient-to-r from-purple-100 to-pink-100">
                <div className="flex items-center gap-2">
                  <img
                    src="https://as2.ftcdn.net/v2/jpg/05/77/75/23/1000_F_577752354_WbjctGllEUKGVBW29pojzAHAlwysroaX.jpg"
                    alt="Logo"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                  <span className="text-xl font-black" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Soul<span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">ToConnect</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-white/50 hover:bg-white transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Menu Items */}
              <div className="overflow-y-auto p-6 flex flex-col gap-3 font-bold text-gray-800">
                <Link
                  to="/chat"
                  className="flex items-center gap-4 py-4 px-5 rounded-2xl bg-white hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 border-2 border-purple-100 hover:border-purple-300 transition-all group"
                >
                  <div className="p-2 rounded-full bg-purple-100 group-hover:bg-purple-200 transition">
                    <MessageCircle size={20} className="text-purple-600" />
                  </div>
                  <span className="group-hover:text-purple-600 transition">Chat with Expert</span>
                </Link>

                <Link
                  to="/call"
                  className="flex items-center gap-4 py-4 px-5 rounded-2xl bg-white hover:bg-gradient-to-r hover:from-teal-100 hover:to-blue-100 border-2 border-teal-100 hover:border-teal-300 transition-all group"
                >
                  <div className="p-2 rounded-full bg-teal-100 group-hover:bg-teal-200 transition">
                    <Phone size={20} className="text-teal-600" />
                  </div>
                  <span className="group-hover:text-teal-600 transition">Talk to Expert</span>
                </Link>

                <Link
                  to="/kundli"
                  className="flex items-center gap-4 py-4 px-5 rounded-2xl bg-white hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 border-2 border-amber-100 hover:border-amber-300 transition-all group"
                >
                  <div className="p-2 rounded-full bg-amber-100 group-hover:bg-amber-200 transition">
                    <Star size={20} className="text-amber-600" />
                  </div>
                  <span className="group-hover:text-amber-600 transition">Free Kundli</span>
                </Link>

                <Link
                  to="/astromall"
                  className="flex items-center gap-4 py-4 px-5 rounded-2xl bg-white hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 border-2 border-blue-100 hover:border-blue-300 transition-all group"
                >
                  <div className="p-2 rounded-full bg-blue-100 group-hover:bg-blue-200 transition">
                    <ShoppingBag size={20} className="text-blue-600" />
                  </div>
                  <span className="group-hover:text-blue-600 transition">Astromall Shop</span>
                </Link>
              </div>

              {/* Mobile Footer CTA */}
              {!currentUser && (
                <div className="p-6 border-t border-purple-200 bg-gradient-to-r from-purple-100 to-pink-100">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuth('login');
                    }}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-base shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles size={20} />
                    Get Started Free
                  </button>
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