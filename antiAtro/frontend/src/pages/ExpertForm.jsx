import React, { useState } from 'react';
import { X, Sparkles, User, Clock, DollarSign, Image, FileText, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpertForm = ({ isOpen, isClose }) => {
  const [formData, setFormData] = useState({
    specialties: [],
    languages: '',
    experienceYears: '',
    pricePerMinute: '',
    bio: '',
    profileImage: ''
  });

  const specialtiesList = [
    { label: 'Vedic', emoji: '🪐' },
    { label: 'Tarot', emoji: '🃏' },
    { label: 'Numerology', emoji: '🔢' },
    { label: 'Palmistry', emoji: '✋' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecialty = (value) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(value)
        ? prev.specialties.filter(s => s !== value)
        : [...prev.specialties, value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      languages: formData.languages.split(',').map(l => l.trim())
    };
    const token = localStorage.getItem("token");
    try {
      const res = await fetch('http://localhost:5001/api/astrologer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      alert("Astrologer added 🎉");
      setFormData({
        specialties: [],
        languages: '',
        experienceYears: '',
        pricePerMinute: '',
        bio: '',
        profileImage: ''
      });
      isClose();
    } catch (error) {
      console.error(error);
      alert("Error saving astrologer");
    }
  };

  const inputFields = [
    { name: "languages",      placeholder: "Languages (Hindi, English)", icon: <User size={14} /> },
    { name: "experienceYears", placeholder: "Experience (years)",        icon: <Clock size={14} />, type: "number" },
    { name: "pricePerMinute",  placeholder: "Price per minute (₹)",      icon: <Zap size={14} />,  type: "number" },
    { name: "profileImage",    placeholder: "Profile Image URL",          icon: <Image size={14} /> },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            className="fixed inset-0 z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'radial-gradient(ellipse at 60% 40%, rgba(251,191,36,0.18) 0%, rgba(168,85,247,0.14) 45%, rgba(236,72,153,0.12) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
            onClick={isClose}
          />

          {/* ── Modal ── */}
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.82, y: 60, opacity: 0 }}
              animate={{ scale: 1,    y: 0,  opacity: 1 }}
              exit={{   scale: 0.82, y: 60, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={e => e.stopPropagation()}
              className="pointer-events-auto relative w-full max-w-[460px] max-h-[92vh] overflow-y-auto rounded-3xl p-[2px]"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #a855f7 45%, #ec4899 80%, #f97316 100%)',
                boxShadow: '0 0 60px rgba(251,191,36,0.35), 0 0 120px rgba(168,85,247,0.25), 0 25px 60px rgba(0,0,0,0.3)',
              }}
            >
              {/* Inner glass card */}
              <div
                className="rounded-[22px] px-7 py-7"
                style={{
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                }}
              >

                {/* ── Header ── */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    {/* Glowing logo dot */}
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                      style={{
                        background: 'linear-gradient(135deg,#fbbf24,#a855f7)',
                        boxShadow: '0 0 14px rgba(168,85,247,0.6)',
                      }}
                    >
                      <Sparkles size={14} color="#fff" />
                    </motion.div>
                    <div>
                      <h2
                        className="text-lg font-extrabold leading-tight"
                        style={{
                          background: 'linear-gradient(90deg,#f59e0b,#a855f7,#ec4899)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          fontFamily: "'Playfair Display', Georgia, serif",
                        }}
                      >
                        Add Astrologer
                      </h2>
                      <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Expert Profile Setup</p>
                    </div>
                  </div>

                  {/* Close button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={isClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-200"
                    style={{ background: 'rgba(0,0,0,0.07)' }}
                  >
                    <X size={15} />
                  </motion.button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* ── Specialties ── */}
                  <div>
                    <label
                      className="text-xs font-bold tracking-widest uppercase mb-3 block"
                      style={{ color: '#a855f7' }}
                    >
                      Specialties
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {specialtiesList.map(({ label, emoji }) => {
                        const active = formData.specialties.includes(label);
                        return (
                          <motion.button
                            whileTap={{ scale: 0.88 }}
                            whileHover={{ scale: 1.05 }}
                            type="button"
                            key={label}
                            onClick={() => handleSpecialty(label)}
                            className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 select-none"
                            style={
                              active
                                ? {
                                    background: 'linear-gradient(135deg,#fbbf24,#f97316)',
                                    color: '#fff',
                                    boxShadow: '0 4px 14px rgba(251,191,36,0.45)',
                                    border: '1.5px solid transparent',
                                  }
                                : {
                                    background: 'rgba(168,85,247,0.07)',
                                    color: '#7c3aed',
                                    border: '1.5px solid rgba(168,85,247,0.2)',
                                  }
                            }
                          >
                            {emoji} {label}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ── Input Fields ── */}
                  {inputFields.map((field, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.07 * i }}
                      className="relative group"
                    >
                      {/* Gradient border wrapper */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg,#fbbf24,#a855f7,#ec4899)',
                          padding: '1.5px',
                          borderRadius: '12px',
                          zIndex: 0,
                        }}
                      />
                      <div
                        className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl border transition-all duration-200 group-focus-within:border-transparent"
                        style={{
                          background: 'rgba(255,255,255,0.95)',
                          border: '1.5px solid rgba(0,0,0,0.08)',
                          zIndex: 1,
                        }}
                      >
                        <span className="text-gray-400 flex-shrink-0">{field.icon}</span>
                        <input
                          type={field.type || 'text'}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={formData[field.name]}
                          onChange={handleChange}
                          className="w-full text-sm bg-transparent outline-none placeholder-gray-300 text-gray-700"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}
                        />
                      </div>
                    </motion.div>
                  ))}

                  {/* ── Bio textarea ── */}
                  <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.32 }}
                    className="relative group"
                  >
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg,#fbbf24,#a855f7,#ec4899)',
                        padding: '1.5px',
                        borderRadius: '12px',
                        zIndex: 0,
                      }}
                    />
                    <div
                      className="relative flex gap-2 px-3.5 py-2.5 rounded-xl border transition-all duration-200 group-focus-within:border-transparent"
                      style={{
                        background: 'rgba(255,255,255,0.95)',
                        border: '1.5px solid rgba(0,0,0,0.08)',
                        zIndex: 1,
                      }}
                    >
                      <FileText size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                      <textarea
                        name="bio"
                        rows="3"
                        placeholder="Short bio..."
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full text-sm bg-transparent outline-none placeholder-gray-300 text-gray-700 resize-none"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      />
                    </div>
                  </motion.div>

                  {/* ── Divider ── */}
                  <div
                    className="h-px w-full rounded-full"
                    style={{ background: 'linear-gradient(90deg,transparent,rgba(168,85,247,0.25),transparent)' }}
                  />

                  {/* ── Submit ── */}
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.02 }}
                    type="submit"
                    className="relative w-full py-3 rounded-2xl font-bold text-sm tracking-wide text-white overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg,#fbbf24 0%,#f97316 40%,#ec4899 80%,#a855f7 100%)',
                      boxShadow: '0 8px 24px rgba(251,191,36,0.4), 0 4px 12px rgba(168,85,247,0.3)',
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {/* Shimmer overlay */}
                    <motion.span
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ repeat: Infinity, duration: 2.2, ease: 'linear', repeatDelay: 1 }}
                      className="absolute inset-0 opacity-30"
                      style={{
                        background: 'linear-gradient(90deg,transparent 20%,rgba(255,255,255,0.6) 50%,transparent 80%)',
                        pointerEvents: 'none',
                      }}
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      <Sparkles size={15} />
                      Submit Expert Profile
                    </span>
                  </motion.button>

                </form>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExpertForm;