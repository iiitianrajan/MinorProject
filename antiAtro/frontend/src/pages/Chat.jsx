import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import ChatBox from './ChatBox';
import AuthModal from '../components/auth/AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const pageVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -30 },
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1 },
};

const Chat = () => {
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAstrologer, setSelectedAstrologer] = useState(null);
  const [astrologers, setAstrologers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAstrologers = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/astrologer');
        const data = await res.json();
        setAstrologers(data);
      } catch (error) {
        console.error('❌ Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAstrologers();
  }, []);

  function handleCardClick(e, astroId) {
    e.stopPropagation();
    if (currentUser) {
      navigate('/astrologer/' + astroId);
    } else {
      setIsModalOpen(true);
    }
  }

  function handleChatClick(e, astroName) {
    e.stopPropagation();
    if (currentUser) {
      setSelectedAstrologer(astroName || 'Astrologer');
    } else {
      setIsModalOpen(true);
    }
  }

  return (
    <motion.div
      variants={pageVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="min-h-screen py-10 font-sans relative overflow-hidden"
      style={{
        background:
          'linear-gradient(135deg, #fdf4ff 0%, #fff7ed 30%, #fdf2f8 60%, #fffbeb 100%)',
      }}
    >
      {/* Ambient blobs */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate(-30%, -30%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(251,146,60,0.14) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate(30%, 30%)',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(236,72,153,0.09) 0%, transparent 70%)',
          filter: 'blur(70px)',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={20} style={{ color: '#f59e0b' }} />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{
                  background: 'linear-gradient(90deg,#f59e0b,#ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Live Experts
              </span>
            </div>
            <h1
              className="text-4xl font-black"
              style={{
                background:
                  'linear-gradient(90deg, #1f2937 0%, #7c3aed 50%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Chat with Astrologer
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Connect instantly with verified Vedic experts
            </p>
          </div>

          <div className="flex gap-3">
            {/* Premium Search */}
            <div
              className="relative rounded-full p-px"
              style={{
                background:
                  'linear-gradient(90deg,#a855f7,#ec4899,#f59e0b)',
              }}
            >
              <div className="relative bg-white rounded-full flex items-center">
                <Search
                  className="absolute left-3"
                  size={16}
                  style={{ color: '#a855f7' }}
                />
                <input
                  type="text"
                  placeholder="Search name or skill..."
                  className="pl-9 pr-4 py-2 rounded-full text-sm outline-none w-60 bg-transparent"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border-0 text-white"
              style={{
                background:
                  'linear-gradient(90deg,#a855f7,#ec4899)',
                boxShadow: '0 4px 14px rgba(168,85,247,0.35)',
              }}
            >
              <Filter size={15} /> Filter
            </motion.button>
          </div>
        </div>

        {/* Skeleton Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2, 3, 4, 5].map(function(i) {
              return (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="h-36 rounded-2xl"
                  style={{
                    background:
                      'linear-gradient(135deg,rgba(168,85,247,0.08),rgba(236,72,153,0.08))',
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Astrologers Grid */}
        {!loading && (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {astrologers.map(function(astro) {
              return (
                <motion.div
                  key={astro._id}
                  variants={cardVariant}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    boxShadow:
                      '0px 24px 48px rgba(168,85,247,0.18)',
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={function(e) {
                    handleCardClick(e, astro._id);
                  }}
                  className="relative cursor-pointer rounded-2xl p-5 overflow-hidden"
                  style={{
                    background: 'rgba(255,255,255,0.75)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(168,85,247,0.15)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                  }}
                >
                  {/* Card gradient accent top */}
                  <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{
                      background:
                        'linear-gradient(90deg,#a855f7,#ec4899,#f59e0b)',
                    }}
                  />

                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="rounded-full p-0.5"
                        style={{
                          background:
                            'linear-gradient(135deg,#a855f7,#ec4899,#f59e0b)',
                          boxShadow:
                            '0 0 16px rgba(168,85,247,0.4)',
                        }}
                      >
                        <motion.img
                          whileHover={{ scale: 1.08 }}
                          transition={{
                            type: 'spring',
                            stiffness: 200,
                          }}
                          src={
                            astro.profileImage ||
                            'https://via.placeholder.com/80'
                          }
                          alt="astro"
                          className="w-20 h-20 rounded-full object-cover block"
                          style={{ border: '2px solid white' }}
                        />
                      </div>

                      {astro.isOnline && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white"
                          style={{
                            background: '#22c55e',
                            boxShadow: '0 0 8px rgba(34,197,94,0.6)',
                          }}
                        />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-gray-800 text-base leading-tight">
                          {astro.userId?.name || 'Astrologer'}
                        </h3>

                        <div
                          className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{
                            background:
                              'linear-gradient(90deg,rgba(251,191,36,0.15),rgba(245,158,11,0.15))',
                            color: '#b45309',
                            border: '1px solid rgba(245,158,11,0.3)',
                          }}
                        >
                          <Star
                            size={11}
                            style={{ fill: '#fbbf24', color: '#fbbf24' }}
                          />
                          {astro.rating || 0}
                        </div>
                      </div>

                      <p
                        className="text-xs mt-1 truncate"
                        style={{
                          background:
                            'linear-gradient(90deg,#7c3aed,#ec4899)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontWeight: 600,
                        }}
                      >
                        {astro.specialties?.join(', ')}
                      </p>

                      <p className="text-xs text-gray-400 mt-0.5">
                        {astro.languages?.join(', ')}
                      </p>

                      <p className="text-xs font-semibold text-gray-500 mt-0.5">
                        Exp:{' '}
                        <span className="text-gray-700">
                          {astro.experienceYears} Years
                        </span>
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <p
                            className="text-sm font-black"
                            style={{
                              background:
                                'linear-gradient(90deg,#ef4444,#f97316)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                            }}
                          >
                            ₹{astro.pricePerMinute}/min
                          </p>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={function(e) {
                            handleChatClick(
                              e,
                              astro.userId?.name
                            );
                          }}
                          className="px-5 py-1.5 rounded-full text-xs font-bold text-white border-0"
                          style={{
                            background:
                              'linear-gradient(90deg,#22c55e,#16a34a)',
                            boxShadow:
                              '0 4px 12px rgba(34,197,94,0.35)',
                          }}
                        >
                          <span className="flex items-center gap-1">
                            <Zap size={11} />
                            Chat
                          </span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        <AuthModal
          isOpen={isModalOpen}
          onClose={function() {
            setIsModalOpen(false);
          }}
        />

        {selectedAstrologer && (
          <ChatBox
            astrologer={selectedAstrologer}
            onClose={function() {
              setSelectedAstrologer(null);
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Chat;