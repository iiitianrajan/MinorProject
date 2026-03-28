import React, { useEffect, useState } from 'react';
import { ShoppingBag, Star, Filter, Sparkles, Zap, Tag } from 'lucide-react';
import { motion } from "framer-motion";
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import AuthModal from '../components/auth/AuthModal';

const categories = ['All Products', 'Gemstone', 'Rudraksha', 'Yantra', 'Evil Eye', 'Feng Shui'];

const pageVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const categoryGradients = {
  'All Products': 'linear-gradient(135deg,#a855f7,#ec4899)',
  'Gemstone':     'linear-gradient(135deg,#3b82f6,#a855f7)',
  'Rudraksha':    'linear-gradient(135deg,#f59e0b,#f97316)',
  'Yantra':       'linear-gradient(135deg,#ec4899,#f43f5e)',
  'Evil Eye':     'linear-gradient(135deg,#06b6d4,#3b82f6)',
  'Feng Shui':    'linear-gradient(135deg,#22c55e,#16a34a)',
};

const Astromall = () => {
  const { currentUser } = useAuth();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Products');

  const { addToCart } = useCart();

  useEffect(function () {
    const fetchProducts = async function () {
      try {
        const res = await fetch('http://localhost:5001/api/product');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts =
    selectedCategory === 'All Products'
      ? products
      : products.filter(function (p) { return p.category === selectedCategory; });

  return (
    <motion.div
      variants={pageVariant}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-10 font-sans relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg,#fdf4ff 0%,#fff7ed 30%,#fdf2f8 60%,#fffbeb 100%)',
      }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle,rgba(168,85,247,0.13) 0%,transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate(-30%,-30%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle,rgba(251,146,60,0.13) 0%,transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate(30%,30%)',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle,rgba(236,72,153,0.08) 0%,transparent 70%)',
          filter: 'blur(70px)',
          transform: 'translate(-50%,-50%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 p-6 rounded-3xl relative overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(168,85,247,0.15)',
            boxShadow: '0 8px 40px rgba(168,85,247,0.1)',
          }}
        >
          {/* Top accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5"
            style={{
              background: 'linear-gradient(90deg,#a855f7,#ec4899,#f59e0b)',
            }}
          />

          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={14} style={{ color: '#f59e0b' }} />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{
                  background: 'linear-gradient(90deg,#f59e0b,#ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                100% Authentic Products
              </span>
            </div>
            <h1
              className="text-4xl font-black flex items-center gap-3"
              style={{
                background: 'linear-gradient(90deg,#1f2937,#7c3aed,#ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <ShoppingBag
                size={32}
                style={{ color: '#f59e0b', flexShrink: 0 }}
              />
              Astromall Shop
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Authentic Gemstones, lowest price guaranteed.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-white px-5 py-2.5 rounded-full text-sm font-bold border-0"
            style={{
              background: 'linear-gradient(90deg,#a855f7,#ec4899)',
              boxShadow: '0 4px 14px rgba(168,85,247,0.35)',
            }}
          >
            <Filter size={15} /> Filter Categories
          </motion.button>
        </motion.div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map(function (cat, i) {
            const isActive = selectedCategory === cat;
            return (
              <motion.button
                key={i}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={function () { setSelectedCategory(cat); }}
                className="whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold border-0 transition-all flex-shrink-0"
                style={
                  isActive
                    ? {
                        background: categoryGradients[cat] || 'linear-gradient(135deg,#a855f7,#ec4899)',
                        color: '#fff',
                        boxShadow: '0 4px 14px rgba(168,85,247,0.35)',
                      }
                    : {
                        background: 'rgba(255,255,255,0.75)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(168,85,247,0.15)',
                        color: '#6b7280',
                      }
                }
              >
                {cat}
              </motion.button>
            );
          })}
        </div>

        {/* Products Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map(function (item) {
            return (
              <motion.div
                key={item._id}
                variants={cardVariant}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: '0px 24px 48px rgba(168,85,247,0.18)',
                }}
                whileTap={{ scale: 0.97 }}
                className="rounded-2xl overflow-hidden cursor-pointer relative"
                style={{
                  background: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(168,85,247,0.12)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                {/* Card top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 z-10"
                  style={{
                    background: 'linear-gradient(90deg,#a855f7,#ec4899,#f59e0b)',
                  }}
                />

                {/* Image area */}
                <div
                  className="h-48 flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg,rgba(168,85,247,0.06),rgba(251,146,60,0.08),rgba(236,72,153,0.06))',
                    borderBottom: '1px solid rgba(168,85,247,0.1)',
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ duration: 0.4 }}
                    className="text-[80px]"
                  >
                    {item.image || '🔮'}
                  </motion.div>

                  {item.originalPrice && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="absolute top-3 left-3 text-white text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1"
                      style={{
                        background: 'linear-gradient(90deg,#ef4444,#f97316)',
                        boxShadow: '0 2px 8px rgba(239,68,68,0.4)',
                      }}
                    >
                      <Tag size={9} />
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                    </motion.div>
                  )}
                </div>

                <div className="p-4">
                  {/* Rating */}
                  <div
                    className="flex items-center gap-1 text-xs font-bold mb-1.5 w-fit px-2 py-0.5 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg,rgba(251,191,36,0.15),rgba(245,158,11,0.1))',
                      color: '#b45309',
                      border: '1px solid rgba(245,158,11,0.25)',
                    }}
                  >
                    <Star size={11} style={{ fill: '#f59e0b', color: '#f59e0b' }} />
                    {item.rating || 4.5}
                  </div>

                  {/* Title */}
                  <h3
                    className="font-bold text-base mb-1 line-clamp-1"
                    style={{ color: '#1f2937' }}
                  >
                    {item.name}
                  </h3>

                  {/* Price row */}
                  <div className="mt-3 flex items-end gap-2">
                    <p
                      className="text-xl font-black"
                      style={{
                        background: 'linear-gradient(90deg,#1f2937,#7c3aed)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      ₹{item.price}
                    </p>
                    {item.originalPrice && (
                      <p className="text-sm font-bold text-gray-400 line-through mb-0.5">
                        ₹{item.originalPrice}
                      </p>
                    )}
                  </div>

                  {/* Add to Cart button */}
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={function () {
                      if (currentUser) {
                        addToCart(item);
                      } else {
                        setIsModelOpen(true);
                      }
                    }}
                    className="w-full mt-4 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border-0 text-white transition-all"
                    style={{
                      background: 'linear-gradient(90deg,#a855f7,#ec4899)',
                      boxShadow: '0 4px 14px rgba(168,85,247,0.3)',
                    }}
                    onMouseEnter={function (e) {
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(168,85,247,0.5)';
                    }}
                    onMouseLeave={function (e) {
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(168,85,247,0.3)';
                    }}
                  >
                    <Zap size={14} />
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      <AuthModal
        isOpen={isModelOpen}
        onClose={function () { setIsModelOpen(false); }}
      />
    </motion.div>
  );
};

export default Astromall;