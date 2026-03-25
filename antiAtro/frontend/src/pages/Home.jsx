import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { motion } from 'framer-motion';
import { MessageSquare, Phone, PlayCircle, Star, ShieldCheck, ShoppingBag, Calendar } from 'lucide-react';
// import Spline from '@splinetool/react-spline'; // Ready for user's spline URL

const Home = () => {
  const [user,setUser] = useState([]);
   const [loading, setLoading] = useState(true);
  // ✅ Fetch from backend
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const res = await fetch('http://localhost:5001/api/auth');
          const data = await res.json();
  
         
  
          setUser(data);
        } catch (error) {
          console.error("❌ Fetch error:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, []);
  return (
    <div className="bg-[#f8f9fa] font-sans">
      
      {/* AstroTalk Exact Hero Section */}
      <section className="bg-gradient-to-br from-[#ffdb42] to-[#fff6c2] pt-12 pb-24 border-b border-[#ffd4b0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            
            {/* Left Content / Avatar / Spline */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 flex justify-center w-full"
            >
              <div className="relative w-full max-w-[400px] aspect-square rounded-[3rem] overflow-hidden flex items-center justify-center">
                
                {/* 🔴 SPLINE PLACEHOLDER - Perfectly fits the Astrotalk Avatar area 🔴 */}
                <div className="absolute inset-0 z-0 bg-white/20 backdrop-blur-3xl rounded-[3rem] border-8 border-white/40 shadow-2xl"></div>
                
                <div className="z-10 text-center flex flex-col items-center">
                  <div className="text-[140px] mb-2 drop-shadow-xl">👳‍♂️</div>
                  <div className="bg-black/80 backdrop-blur-md px-6 py-3 rounded-full font-bold text-[#ffdb42] shadow-lg flex items-center gap-2">
                    <PlayCircle size={20} /> Insert Spline 3D URL
                  </div>
                </div>

                {/* Floating Badges */}
                <div className="absolute top-8 left-4 bg-white rounded-full px-4 py-2 shadow-lg text-xs font-bold flex items-center gap-1 z-20 text-gray-800">
                   ⭐ 4.9 <span className="text-gray-400 font-normal">| 10k+ Calls</span>
                </div>
                <div className="absolute bottom-8 right-4 bg-white rounded-full px-4 py-2 shadow-lg text-xs font-bold flex items-center gap-2 z-20 text-green-600">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Online Now
                </div>
              </div>
            </motion.div>

            {/* Right Content / Exact AstroTalk Hero Text */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:w-1/2 text-left"
            >
              <div className="inline-flex items-center gap-2 bg-yellow-900/10 rounded-full px-4 py-1.5 text-sm font-bold text-yellow-900 mb-6 uppercase tracking-wider">
                🌟 200+ Celebs recommend Astrotalk
              </div>
              <h1 className="text-5xl md:text-[64px] font-black text-[#1A1A1A] leading-[1.1] mb-6">
                Chat With<br/>Expert
              </h1>
              
              <Link to={"/chat"}>
              <button className="flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-black text-white font-bold text-lg shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:shadow-xl hover:scale-105 transition-all">
                <MessageSquare size={20} /> Chat Now
              </button>
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* AstroTalk 4 Feature Cards (Immediately below hero, overlapping boundary) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <Link to='/chat'>
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 flex flex-col items-center justify-center text-center cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all border border-gray-100 group">
            <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors">
              <MessageSquare size={28} className="text-pink-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Chat with Expert</h3>
            <p className="text-xs text-gray-500 font-medium hidden md:block">Instant connection, zero wait time</p>
          </div></Link>

        <Link to={'/call'}>
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 flex flex-col items-center justify-center text-center cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all border border-gray-100 group">
            <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
              <Phone size={28} className="text-teal-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Talk to Expert</h3>
            <p className="text-xs text-gray-500 font-medium hidden md:block">Voice & Video calls available</p>
          </div></Link>
        <Link to={'/astromall'}>
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 flex flex-col items-center justify-center text-center cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all border border-gray-100 group">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
              <ShoppingBag size={28} className="text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Astromall Shop</h3>
            <p className="text-xs text-gray-500 font-medium hidden md:block">Remedies & authentic gems</p>
          </div>
          </Link>

        <Link to={'/pooja'}>
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 flex flex-col items-center justify-center text-center cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all border border-gray-100 group">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
              <Calendar size={28} className="text-orange-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-1">Book a Pooja</h3>
            <p className="text-xs text-gray-500 font-medium hidden md:block">Expert Pandits online & offline</p>
          </div>
          </Link>

        </div>
      </div>

      {/* AstroTalk Complimentary Services Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mb-20">
        <h2 className="text-3xl font-black text-center text-gray-800 mb-2">Complimentary Astrology Services</h2>
        <p className="text-center text-gray-500 mb-12">Get accurate free predictions and guidance</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { tag: 'Free Kundli', path:'/kundli', icon: '📜', desc: 'Detailed planetary positions' },
            { tag: 'Kundli Matching', path:'/kundli-matching', icon: '❤️', desc: 'Check 36 gun milan score' },
            { tag: 'Daily Horoscope', path:'/horoscope/daily', icon: '✨', desc: 'Read your day ahead' },
            { tag: 'Calculators', path:'/calc/love', icon: '🔢', desc: 'Love, moon signs & more' }
          ].map((srv, i) => (
            <>
            <Link to={srv.path}>
             <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:border-[#ffdb42] hover:shadow-xl cursor-pointer transition-all group">
               <div className="text-[60px] mb-4 group-hover:scale-110 transition-transform">{srv.icon}</div>
               <h3 className="font-bold text-gray-800 text-lg">{srv.tag}</h3>
               <p className="text-xs text-gray-500 mt-2">{srv.desc}</p>
             </div>
             </Link>
             </>
          ))}
        </div>
      </section>

      {/* AstroTalk Stats Bar (Moved to bottom) */}
      <div className="bg-white border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-100">
            <div>
              <div className="text-3xl font-black text-[#1A1A1A] mb-1"> {user.length} </div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Total Customers</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#1A1A1A] mb-1">21K+</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Top Expert</div>
            </div>
            <div>
              <div className="text-3xl font-black text-[#1A1A1A] mb-1">1 Lk+</div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Daily Consultations</div>
            </div>
            <div>
              <div className="text-3xl font-black flex items-center justify-center gap-1 text-[#1A1A1A] mb-1">
                4.9 <Star size={24} className="text-[#FF9933] fill-[#FF9933]" />
              </div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
