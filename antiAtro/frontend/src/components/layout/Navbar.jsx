import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, User as UserIcon, LogOut, Wallet, MessageCircle, Phone, ShoppingBag, BookOpen } from 'lucide-react';
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



  return (
    <>
      <nav ref={navRef} className="sticky top-0 z-50 bg-white shadow-md font-sans">

        {/* Top Boundary / Row 1 */}
        <div className="border-b border-gray-200 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex justify-between items-center text-sm font-semibold text-gray-700">

            {/* Left aligned logo (in exact astro, logo is spanning both rows but we'll adapt for layout) */}
            <div className="flex items-center gap-2">
              <Link to="/" className="flex items-center gap-2 mr-6">
                <img src="https://as2.ftcdn.net/v2/jpg/05/77/75/23/1000_F_577752354_WbjctGllEUKGVBW29pojzAHAlwysroaX.jpg" alt="Logo" className="w-8 h-8 rounded-full" onError={(e) => { e.target.style.display = 'none' }} />
                <span className="text-[22px] font-black tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Soul<span style={{ color: '#ffdb42' }}>ToConnect</span>
                </span>
              </Link>
            </div>

            {/* Right aligned top nav items */}
            <div className="flex items-center gap-6">
              <Link to={"/kundli"}
                onClick={(e) => {
                  if (!currentUser) {
                    e.preventDefault();   // stop navigation
                    setIsAuthModalOpen(true); // open login modal
                  }
                }}
                className="hover:text-[#ffdb42] transition-colors">Free Kundli
              </Link>


              <Link to="/kundli-matching"
                onClick={(e) => {
                  if (!currentUser) {
                    e.preventDefault();   // stop navigation
                    setIsAuthModalOpen(true); // open login modal
                  }
                }}
                className="hover:text-[#ffdb42] transition-colors">Kundli Matching
              </Link>

              <Link to="/compatibility"
                onClick={(e) => {
                  if (!currentUser) {
                    e.preventDefault();   // stop navigation
                    setIsAuthModalOpen(true); // open login modal
                  }
                }}
                className="hover:text-[#ffdb42] transition-colors">
                Compatibility
              </Link>

              <div className="relative inline-block group">

                {/* Trigger */}
                <span className="flex items-center gap-1 hover:text-[#ffdb42] transition cursor-pointer">
                  Calculators
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-300 group-hover:rotate-180"
                  />
                </span>

                {/* Dropdown */}
                <div
                  className="absolute left-0 top-full w-52 
    bg-white/90 backdrop-blur-xl 
    border border-white/30 
    shadow-[0_10px_40px_rgba(0,0,0,0.2)] 
    rounded-xl py-2 z-50

    opacity-0 invisible pointer-events-none 
    scale-95 translate-y-1

    group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto 
    group-hover:scale-100 group-hover:translate-y-0

    transition-all duration-200 ease-out"
                >
                  <Link
                    to="/love-calculator"
                    onClick={(e) => {
                  if (!currentUser) {
                    e.preventDefault();   // stop navigation
                    setIsAuthModalOpen(true); // open login modal
                  }
                }}
                    className="block px-4 py-2 rounded-md 
  text-gray-800 
  transition-all duration-200 
  hover:bg-gradient-to-r hover:from-[#ffdb42]/30 hover:to-yellow-100 
  hover:text-black hover:pl-5"
                  >
                    💖 Love Calculator
                  </Link>
                  <Link
                    to="/moon-sign"
                    onClick={(e) => {
                  if (!currentUser) {
                    e.preventDefault();   // stop navigation
                    setIsAuthModalOpen(true); // open login modal
                  }
                }}
                    className="block px-4 py-2 rounded-md 
  text-gray-800 
  transition-all duration-200 
  hover:bg-gradient-to-r hover:from-[#ffdb42]/30 hover:to-yellow-100 
  hover:text-black hover:pl-5"
                  >
                    🌙 Moon Sign
                  </Link>
                </div>

              </div>

              <div
                className="relative inline-block group cursor-pointer"
                onMouseEnter={() => toggleDropdown('horoscopes')}
                onMouseLeave={() => toggleDropdown(null)}
              >
                {/* Trigger */}
                <span className="flex items-center gap-1 hover:text-[#ffdb42] transition">
                  Horoscopes
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${openDropdown === 'horoscopes' ? 'rotate-180' : ''
                      }`}
                  />
                </span>

                <AnimatePresence>
                  {openDropdown === 'horoscopes' && (
                    <>
                      {/* invisible bridge (prevents flicker) */}
                      <div className="absolute top-full left-0 w-full h-2"></div>

                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-52 
          bg-white/90 backdrop-blur-xl 
          border border-white/30 
          shadow-[0_10px_40px_rgba(0,0,0,0.2)] 
          rounded-xl py-2 z-50"
                      >

                        {/* OPTION 1 */}
                        <Link
                          to="/horoscope/daily"
                          onClick={(e) => {
                  if (!currentUser) {
                    e.preventDefault();   // stop navigation
                    setIsAuthModalOpen(true); // open login modal
                  }
                }}
                          className="flex items-center gap-2 px-4 py-2 rounded-md 
            text-gray-800 transition-all duration-200 
            hover:bg-gradient-to-r hover:from-[#ffdb42]/30 hover:to-yellow-100 
            hover:pl-5 group"
                        >
                          <span className="transition-transform duration-200 group-hover:scale-110">
                            🔮
                          </span>
                          Daily Horoscope
                        </Link>

                        {/* OPTION 2 */}
                        <Link
                          to="/horoscope/weekly"
                          onClick={(e) => {
                  if (!currentUser) {
                    e.preventDefault();   // stop navigation
                    setIsAuthModalOpen(true); // open login modal
                  }
                }}
                          className="flex items-center gap-2 px-4 py-2 rounded-md 
            text-gray-800 transition-all duration-200 
            hover:bg-gradient-to-r hover:from-[#ffdb42]/30 hover:to-yellow-100 
            hover:pl-5 group"
                        >
                          <span className="transition-transform duration-200 group-hover:scale-110">
                            📅
                          </span>
                          Weekly Horoscope
                        </Link>

                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>


            </div>
          </div>
        </div>

        {/* Bottom Boundary / Row 2 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[60px] flex justify-between items-center text-sm font-bold text-gray-800">

          <button className="md:hidden text-gray-800" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>

          <div className="flex md:hidden items-center">
            <Link to="/" className="text-[20px] font-black tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Soul<span style={{ color: '#ffdb42' }}>ToConnect</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center h-full gap-8">
            <Link to="/" className="hover:text-[#ffdb42] flex items-center gap-1">Home</Link>
            <Link to="/chat" className="hover:text-[#ffdb42] flex items-center gap-1">Chat with Expert</Link>
            <Link to="/call" className="hover:text-[#ffdb42] flex items-center gap-1">Talk to Expert</Link>
            <Link to="/astromall" className="hover:text-[#ffdb42] flex items-center gap-1">Astromall</Link>
            <Link to="/store" className="hover:text-[#ffdb42] flex items-center gap-1">Astrotalk Store</Link>

            <div
              className="relative h-full flex items-center cursor-pointer"
              onMouseEnter={() => toggleDropdown('blogs')}
              onMouseLeave={() => toggleDropdown(null)}
            >
              {/* Trigger */}
              <span
                className={`flex items-center gap-1 transition ${openDropdown === 'blogs' ? 'text-[#ffdb42]' : 'hover:text-[#ffdb42]'
                  }`}
              >
                Blogs
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${openDropdown === 'blogs' ? 'rotate-180' : ''
                    }`}
                />
              </span>

              <AnimatePresence>
                {openDropdown === 'blogs' && (
                  <>
                    {/* invisible bridge (prevents flicker) */}
                    <div className="absolute top-full right-0 w-full h-2"></div>

                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 w-52 
          bg-white/90 backdrop-blur-xl 
          border border-white/30 
          shadow-[0_10px_40px_rgba(0,0,0,0.2)] 
          rounded-xl py-2 z-50"
                    >

                      {/* OPTION 1 */}
                      <Link
                        to="/blog/love"
                        className="flex items-center gap-2 px-4 py-2 rounded-md 
            text-gray-800 font-medium 
            transition-all duration-200 
            hover:bg-gradient-to-r hover:from-[#ffdb42]/30 hover:to-yellow-100 
            hover:pl-5 group"
                      >
                        <span className="transition-transform duration-200 group-hover:scale-110">
                          💖
                        </span>
                        Love & Relationships
                      </Link>

                      {/* OPTION 2 */}
                      <Link
                        to="/blog/career"
                        className="flex items-center gap-2 px-4 py-2 rounded-md 
            text-gray-800 font-medium 
            transition-all duration-200 
            hover:bg-gradient-to-r hover:from-[#ffdb42]/30 hover:to-yellow-100 
            hover:pl-5 group"
                      >
                        <span className="transition-transform duration-200 group-hover:scale-110">
                          💼
                        </span>
                        Career
                      </Link>

                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <Link to={'/contact'}> Contact Us </Link>
          </div>

          <div className="flex items-center h-full gap-4">

            {/* Global Search Bar */}
            <div className="hidden lg:flex items-center relative">
              <input
                type="text"
                placeholder="Search Expert, Product..."
                className="pl-4 pr-10 py-1.5 w-64 border border-gray-200 rounded-full text-xs font-medium outline-none focus:border-[#ffdb42] bg-gray-50 focus:bg-white transition-colors"
              />
              <button className="absolute right-3 text-gray-400 hover:text-[#ffdb42]">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
            </div>

            {currentUser ? (
              <div className="flex items-center gap-3">
                <Link to="/cart" className="relative flex items-center">

                  <div className="p-2 rounded-full hover:bg-gray-100 transition">
                    <ShoppingCart size={22} />
                  </div>

                  {/* 🔴 Badge */}
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {totalItems}
                    </span>
                  )}

                </Link>
                <button onClick={() => setIsWalletModalOpen(true)} className="flex items-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded-full border border-gray-200 hover:border-amber-300">
                  <Wallet size={14} className="text-gray-500" />
                  <span className="text-xs text-black font-bold">₹ 150</span>
                </button>
                <div className="relative" onClick={() => toggleDropdown('profile')}>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-8 bg-amber-500 rounded-full text-white flex items-center justify-center text-sm font-bold shadow-sm">{currentUser.email.charAt(0).toUpperCase()}</div>
                  </div>
                  <AnimatePresence>
                    {openDropdown === 'profile' && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }} className="absolute top-[120%] right-0 w-48 bg-white border border-gray-100 shadow-xl rounded-md py-2 z-50">
                        <div className="px-4 py-2 border-b">
                          <p className="text-sm truncate font-bold">{currentUser.name}</p>
                        </div>
                        {/* profile button */}
                        <button onClick={onProfileClick} className="block px-4 py-2 hover:bg-gray-50 hover:text-amber-500 font-medium text-sm flex items-center gap-2"><UserIcon size={14} /> Profile</button>

                        {/* add product by admin */}
                        {currentUser.role === 'admin' &&
                        <button onClick={onProfileClick} className="block px-4 py-2 hover:bg-gray-50 hover:text-amber-500 font-medium text-sm flex items-center gap-2"><ShoppingBag  size={14} /> Add Product</button>}

                        {/* add expert button */}
                        <button onClick={onAddExpertClick} className="block px-4 py-2 hover:bg-gray-50 hover:text-amber-500 font-medium text-sm flex items-center gap-2"><UserIcon size={14} /> Add New Expert</button>
                        
                        {/* <Link to="/profile" className="block px-4 py-2 hover:bg-gray-50 hover:text-amber-500 font-medium text-sm flex items-center gap-2"><UserIcon size={14}/> Profile</Link> */}
                        <button onClick={logout} className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-50 hover:text-red-500 text-red-500 font-medium text-sm"><LogOut size={14} /> Logout</button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <button onClick={() => openAuth('login')} className="bg-[#ffdb42] text-black px-6 py-2 rounded font-bold text-sm tracking-wide shadow-sm hover:shadow-md transition-shadow">
                Get Started
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-[100]" onClick={() => setMobileMenuOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed inset-y-0 left-0 w-[280px] bg-white z-[101] shadow-2xl flex flex-col">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <span className="text-[22px] font-black tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Astro<span style={{ color: '#ffdb42' }}>Talk</span></span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1"><X size={24} /></button>
              </div>
              <div className="overflow-y-auto p-4 flex flex-col gap-4 font-bold text-gray-800">
                <Link to="/chat" className="flex items-center gap-3 py-2 border-b border-gray-50"><MessageCircle size={18} className="text-[#ffdb42]" /> Chat with Expert</Link>
                <Link to="/call" className="flex items-center gap-3 py-2 border-b border-gray-50"><Phone size={18} className="text-[#ffdb42]" /> Talk to Expert</Link>
                <Link to="/kundli" className="py-2 border-b border-gray-50">Free Kundli</Link>
                <Link to="/astromall" className="flex items-center gap-3 py-2 border-b border-gray-50"><ShoppingBag size={18} className="text-[#ffdb42]" /> Astromall Shop</Link>
              </div>
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
