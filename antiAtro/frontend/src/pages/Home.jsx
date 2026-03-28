import React, { useEffect, useState,Suspense  } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MessageSquare, Phone, PlayCircle, Star, ShieldCheck, ShoppingBag, Calendar,
  Sparkles, Heart, TrendingUp, Award, Users, CheckCircle, ArrowRight,
  Zap, Clock, Shield, Gift, ChevronRight, Quote
} from 'lucide-react';
// import { StaggerTestimonials } from './TestimonialCard';
import FaqSection from './FaqSection';
import Testimonials from './TestimonialCard';

// import Praying3DCard from './Praying3DCard';
import Galaxy from './Galaxy';
import './Galaxy.css';
import ServicesSection from './ServicesSection';






const Home = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  
  

 useEffect(() => {
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // or wherever you store it

      const res = await fetch('http://localhost:5001/api/auth', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();
      let length = user.length;
      setUser(data);
    } catch (error) {
      console.error("❌ Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);

  // Testimonials Data
  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      text: "The predictions were amazingly accurate! My astrologer guided me through a difficult career decision.",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      text: "Found my life partner through Kundli matching here. Forever grateful to the expert guidance!",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
      name: "Ananya Iyer",
      location: "Bangalore",
      rating: 5,
      text: "Best astrology consultation I've ever had. The remedies actually worked for me!",
      avatar: "https://i.pravatar.cc/150?img=5"
    }
  ];

  // Expert Categories
  const expertCategories = [
    { name: "Vedic Astrology", experts: "2.5K+", icon: "🕉️" },
    { name: "Tarot Reading", experts: "1.8K+", icon: "🔮" },
    { name: "Numerology", experts: "1.2K+", icon: "🔢" },
    { name: "Vastu Shastra", experts: "980+", icon: "🏛️" },
    { name: "Palmistry", experts: "1.5K+", icon: "✋" },
    { name: "Face Reading", experts: "890+", icon: "👤" }
  ];

  // Why Choose Us
  const features = [
    { icon: Shield, title: "100% Privacy", desc: "End-to-end encrypted consultations" },
    { icon: CheckCircle, title: "Verified Experts", desc: "All astrologers background checked" },
    { icon: Clock, title: "24/7 Available", desc: "Connect anytime, anywhere" },
    { icon: Gift, title: "First Chat Free", desc: "₹99 cashback on first recharge" }
  ];

  return (
    <div className="bg-gradient-to-b from-amber-50 via-white to-purple-50 font-sans overflow-hidden">
      
      {/* ✨ PREMIUM HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#FFD93D] via-[#FFF4B8] to-[#FFE5A0] pt-8 pb-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full px-6 py-2.5 shadow-2xl">
              <Award className="animate-pulse" size={20} />
              <span className="font-bold text-sm uppercase tracking-wide">India's #1 Astrology Platform</span>
              <Sparkles size={18} />
            </div>
          </motion.div>

          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16">
            
            {/* Left - Avatar Section */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 flex justify-center w-full"
            >
              <div className="relative w-full max-w-[450px] aspect-square">
                
                {/* Main Avatar Container */}
                <div className="relative w-full h-full rounded-[3rem] overflow-hidden flex items-center justify-center bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-2xl border-8 border-white/60 shadow-2xl">
                  
                  <div className="z-10 text-center flex flex-col items-center">
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="text-[160px] mb-2 drop-shadow-2xl filter"
                    >
                      🧘‍♂️
                    </motion.div>
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 backdrop-blur-md px-8 py-4 rounded-full font-bold text-white shadow-2xl flex items-center gap-3 hover:scale-105 transition cursor-pointer">
                      <PlayCircle size={24} className="animate-pulse" /> 
                      <span className="text-sm">3D Avatar Coming Soon</span>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-6 left-6 bg-white rounded-2xl px-5 py-3 shadow-2xl text-sm font-bold flex items-center gap-2 z-20"
                  >
                    <Star className="text-yellow-500 fill-yellow-500" size={18} />
                    <span className="text-gray-800">4.9</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-gray-500">10k+ Reviews</span>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="absolute bottom-8 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl px-5 py-3 shadow-2xl text-sm font-bold flex items-center gap-2 z-20"
                  >
                    <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
                    <span>5,243 Experts Online</span>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    className="absolute top-1/3 -right-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl px-4 py-3 shadow-2xl text-xs font-bold z-20"
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <Zap size={14} className="text-yellow-300" />
                      <span>Live Now</span>
                    </div>
                    <div className="text-white/90">Top Rated Available</div>
                  </motion.div>
                </div>

                {/* Decorative Stars */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-8 -right-8 text-6xl opacity-30"
                >
                  ✨
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-8 -left-8 text-5xl opacity-30"
                >
                  🌟
                </motion.div>
              </div>
            </motion.div>

            {/* Right - Hero Content */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:w-1/2 text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 bg-amber-900/15 border border-amber-900/30 rounded-full px-5 py-2 text-sm font-bold text-amber-900 mb-8 uppercase tracking-wider"
              >
                <Sparkles size={16} className="text-yellow-600" />
                200+ Celebrities Trust Us
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-6"
              >
                Chat With<br/>
                <span className="bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Expert Astrologers
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg"
              >
                Get personalized guidance from India's top verified astrologers. 
                <span className="font-semibold text-gray-800"> Your first consultation is on us!</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/chat">
                  <button className="group flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-orange-600 to-pink-600 text-white font-bold text-lg shadow-2xl hover:shadow-orange-500/50 hover:scale-105 transition-all">
                    <MessageSquare size={24} />
                    Start Chat Now
                    <ArrowRight className="group-hover:translate-x-1 transition" size={20} />
                  </button>
                </Link>

                <Link to="/astrologerList">
                  <button className="flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white text-gray-900 font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all border-2 border-gray-200">
                    
                    Explore All 
                  </button>
                </Link>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-8 mt-10 pt-8 border-t border-gray-300"
              >
                <div>
                  <div className="text-3xl font-black text-gray-900">{length}K+</div>
                  <div className="text-sm text-gray-500 font-medium">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-gray-900">21K+</div>
                  <div className="text-sm text-gray-500 font-medium">Expert Astrologers</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-gray-900">99.2%</div>
                  <div className="text-sm text-gray-500 font-medium">Satisfaction Rate</div>
                </div>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ✨ PREMIUM FEATURE CARDS (Floating above next section) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-30 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { to: '/chat', icon: MessageSquare, color: 'pink', title: 'Chat with Expert', desc: 'Instant connection, zero wait' },
            { to: '/call', icon: Phone, color: 'teal', title: 'Talk to Expert', desc: 'Voice & Video available' },
            { to: '/astromall', icon: ShoppingBag, color: 'blue', title: 'Astromall Shop', desc: 'Authentic gems & remedies' },
            { to: '/pooja', icon: Calendar, color: 'orange', title: 'Book a Pooja', desc: 'Expert Pandits online' }
          ].map((item, i) => (
            <Link to={item.to} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl border-2 border-gray-100 hover:border-${item.color}-200 cursor-pointer transition-all hover:-translate-y-2"
              >
                <div className={`w-20 h-20 rounded-2xl bg-${item.color}-100 flex items-center justify-center mb-5 group-hover:bg-${item.color}-200 transition-colors group-hover:scale-110 transform`}>
                  <item.icon size={36} className={`text-${item.color}-600`} />
                </div>
                <h3 className="font-black text-gray-900 text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                <div className="mt-4 flex items-center text-sm font-bold text-${item.color}-600 group-hover:gap-2 transition-all">
                  Explore <ChevronRight size={18} className="group-hover:translate-x-1 transition" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* ✨ WHY CHOOSE US SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-black text-gray-900 mb-4">
            Why 50 Lakh+ People Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're not just another astrology platform. We're your spiritual companion.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <feature.icon size={40} className="text-purple-600" />
              </div>
              <h3 className="font-bold text-xl text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✨ EXPERT CATEGORIES */}
      <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              Explore Expert Categories
            </h2>
            <p className="text-xl text-gray-600">
              Choose from 21,000+ verified astrologers across specializations
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {expertCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-2xl cursor-pointer transition-all hover:-translate-y-2 border-2 border-transparent hover:border-purple-300 group"
              >
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{cat.name}</h3>
                <p className="text-sm text-purple-600 font-semibold">{cat.experts} Experts</p>
              </motion.div>
            ))}

          </div>
          
        </div>
      </section>

      {/* ✨ COMPLIMENTARY SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full mb-6">
            <span className="text-orange-600 font-bold text-sm uppercase tracking-wide">
              ✨ Absolutely Free
            </span>
          </div>
          <h2 className="text-5xl font-black text-gray-900 mb-4">
            Complimentary Astrology Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get accurate free predictions and guidance to start your spiritual journey
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { tag: 'Free Kundli', path: '/kundli', icon: '📜', desc: 'Detailed planetary positions', color: 'from-blue-500 to-cyan-500' },
            { tag: 'Kundli Matching', path: '/kundli-matching', icon: '❤️', desc: 'Check 36 gun milan score', color: 'from-pink-500 to-rose-500' },
            { tag: 'Daily Horoscope', path: '/horoscope/daily', icon: '✨', desc: 'Read your day ahead', color: 'from-purple-500 to-indigo-500' },
            { tag: 'Calculators', path: '/calc/love', icon: '🔢', desc: 'Love, moon signs & more', color: 'from-orange-500 to-amber-500' }
          ].map((srv, i) => (
            <Link to={srv.path} key={i}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white border-2 border-gray-200 rounded-3xl p-8 text-center hover:border-transparent hover:shadow-2xl cursor-pointer transition-all hover:-translate-y-2 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${srv.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className="text-7xl mb-5 group-hover:scale-125 transition-transform relative z-10">
                  {srv.icon}
                </div>
                <h3 className="font-black text-gray-900 text-xl mb-2 relative z-10">{srv.tag}</h3>
                <p className="text-sm text-gray-500 relative z-10">{srv.desc}</p>
                <div className="mt-4 inline-flex items-center text-sm font-bold text-purple-600 group-hover:gap-2 transition-all relative z-10">
                  Try Free <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* ✨ TESTIMONIALS */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-black text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from real people who found guidance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((test, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all relative"
              >
                <Quote className="absolute top-6 right-6 text-orange-200" size={48} />
                <div className="flex items-center gap-4 mb-6">
                  <img 
                    src={test.avatar} 
                    alt={test.name}
                    className="w-16 h-16 rounded-full border-4 border-orange-200"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{test.name}</h4>
                    <p className="text-sm text-gray-500">{test.location}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{test.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✨ WHY ASTROLOGY MATTERS */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-block p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-6">
            <Sparkles className="text-purple-600" size={32} />
          </div>
          <h2 className="text-5xl font-black text-gray-900 mb-6">
            Why Astrology Matters?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
            Astrology reveals how divine cosmic energy flows through our lives, helping us make better 
            decisions in love, career, health, and personal growth. It's not about predicting the future—it's 
            about understanding yourself and the universe's timing.
          </p>
          <Link to="/astrology-guide">
            <button className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:scale-105 transition shadow-2xl hover:shadow-purple-500/50 inline-flex items-center gap-3">
              Discover More
              <ArrowRight size={20} />
            </button>
          </Link>
        </motion.div>
      </section>


      {/* ✨ PREMIUM STATS BAR */}
      
  <div
  className="py-16 border-t-4"
  style={{
    background: '#fff9eb',
    borderColor: '#facc15'
  }}
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      

      {[
        { value: `${length}+`, label: "Total Customers", icon: Users },
        { value: "21K+", label: "Top Experts", icon: Award },
        { value: "1 Lk+", label: "Daily Consultations", icon: TrendingUp },
        { value: "4.9", label: "Average Rating", icon: Star, special: true }
      ].map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 60, scale: 0.85 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            delay: i * 0.1,
            type: "spring",
            stiffness: 150,
            damping: 12
          }}

          whileHover={{
            y: -10,
            scale: 1.06,
            transition: { type: "spring", stiffness: 300 }
          }}

          whileTap={{ scale: 0.95 }}

          className="group p-6 rounded-2xl cursor-pointer"
          style={{
            background: '#ffffff',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
          }}
        >

          {/* Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{
              background: 'linear-gradient(135deg, #facc15, #fb923c)',
              boxShadow: '0 6px 20px rgba(251,146,60,0.4)'
            }}
            whileHover={{ rotate: 8, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <stat.icon size={28} className="text-white" />
          </motion.div>

          {/* Value */}
          <motion.div
            className="text-4xl md:text-5xl font-black text-gray-900 mb-2 flex items-center justify-center gap-2"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: i * 0.15, type: "spring" }}
          >
            {stat.value}
            {stat.special && (
              <motion.span
                initial={{ rotate: 0 }}
                whileInView={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                <Star size={26} className="text-yellow-500 fill-yellow-500" />
              </motion.span>
            )}
          </motion.div>

          {/* Label */}
          <motion.div
            className="text-sm text-gray-600 font-bold uppercase tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.2 }}
          >
            {stat.label}
          </motion.div>

        </motion.div>
      ))}

    </div>
  </div>
</div>

      <section className="relative py-24 overflow-hidden">

  {/* 🌈 Animated Gradient Background */}
  <div className="absolute inset-0 animate-gradient bg-[length:300%_300%] bg-gradient-to-r from-orange-100 via-pink-100 to-purple-200"></div>

  {/* 🌊 Soft overlay for readability */}
  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

  <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
    
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80 }}
      viewport={{ once: true }}
    >

      {/* Heading */}
      <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
        Ready to Transform Your Life?
      </h2>

      {/* Subtext */}
      <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
        Join 50 lakh+ people who found clarity, peace, and direction through expert astrology guidance.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-5">
        
        {/* Primary */}
        <Link to="/chat">
          <button className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-bold text-lg shadow-lg flex items-center gap-3 transition-all duration-300 hover:scale-110 hover:shadow-2xl">
            <MessageSquare size={22} />
            Start Free Chat
          </button>
        </Link>

        {/* Secondary */}
        <Link to="/call">
          <button className="px-10 py-4 border-2 border-purple-400 text-purple-600 rounded-full font-bold text-lg flex items-center gap-3 transition-all duration-300 hover:bg-purple-500 hover:text-white hover:scale-110 hover:shadow-lg">
            <Phone size={22} />
            Talk to Expert
          </button>
        </Link>

      </div>

      {/* Footer */}
      <p className="text-gray-600 mt-6 text-sm">
        ⭐ First consultation free • 24/7 available • 100% private & secure
      </p>

    </motion.div>
  </div>
</section>
<div>
      {/* <StaggerTestimonials /> */}
      <Testimonials/>
    </div>

<ServicesSection/>
<FaqSection/>
{/* <Praying3DCard/> */}



    </div>
    
  );
};

export default Home;