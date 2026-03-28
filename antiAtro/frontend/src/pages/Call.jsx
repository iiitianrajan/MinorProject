import React from 'react';
import { Search, Filter, Star, Phone } from 'lucide-react';
import { motion } from "framer-motion";

const Call = () => {

  // 🔥 page animation
  const pageVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  };

  // 🔥 stagger container
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  // 🔥 card animation
  const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <motion.div
      variants={pageVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="bg-[#f8f9fa] min-h-screen py-8 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-800">Talk to Astrologer</h1>
            <p className="text-gray-500 text-sm mt-1">Get immediate voice or video consultation</p>
          </div>
          
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold"
            >
              <Filter size={16} /> Sort by Rating
            </motion.button>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            
            <motion.div
              key={item}
              variants={cardVariant}

              whileHover={{
                y: -8,
                scale: 1.03,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.1)"
              }}

              whileTap={{ scale: 0.97 }}

              className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-gray-100 cursor-pointer transition-all"
            >
              <div className="flex items-start gap-4">

                {/* Profile */}
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-20 h-20 bg-gradient-to-br from-teal-50 to-teal-200 rounded-full border-2 border-teal-400 overflow-hidden"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl">👩‍🦰</span>
                    </div>
                  </motion.div>

                  {/* Online dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white shadow-md"
                  />
                </div>
                
                {/* Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    
                    <motion.h3
                      whileHover={{ scale: 1.05 }}
                      className="font-bold text-gray-800 text-lg cursor-pointer"
                    >
                      Astro {['Neha', 'Rohit', 'Simran', 'Kavita', 'Ravi', 'Ramesh'][item-1]}
                    </motion.h3>

                    <div className="flex items-center gap-1 text-xs font-bold bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded">
                      <Star size={12} className="fill-[#ffdb42] text-[#ffdb42]" /> 4.8
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">Nadi, KP, Vastu</p>
                  <p className="text-xs text-gray-500 mt-0.5">Eng, Hindi, Marathi</p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-gray-800">
                        ₹{15 + (item * 2)}/min
                      </p>
                    </div>

                    {/* 🔥 Premium button */}
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "#14b8a6",
                        color: "#fff"
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1 px-5 py-2 border border-teal-500 text-teal-600 rounded-full text-xs font-bold transition-all"
                    >
                      <Phone size={14} /> Call
                    </motion.button>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Call;