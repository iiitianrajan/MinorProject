import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Sparkles, User, Clock, Zap, FileText, Image,
  ArrowRight, ArrowLeft, Star, CheckCircle, Globe,
  Award, Shield
} from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Your Cosmic Identity',   sub: 'Tell us about the light you bring to the universe. Your identity helps seekers find the right guidance for their journey.' },
  { id: 2, label: 'Define Your Expertise',  sub: 'Your specializations help seekers find the perfect match for their spiritual questions.' },
  { id: 3, label: 'Availability & Pricing', sub: 'Set your schedule and rates. Transparency builds trust with seekers.' },
  { id: 4, label: 'Review & Launch',        sub: 'Your profile is ready. Review everything before going live.' },
];

const SPECIALTIES = [
  { label: 'Vedic Astrology', emoji: '🪐' },
  { label: 'Tarot',           emoji: '🃏' },
  { label: 'Numerology',      emoji: '🔢' },
  { label: 'Palmistry',       emoji: '✋' },
  { label: 'Vastu',           emoji: '🏛️' },
  { label: 'Face Reading',    emoji: '👤' },
];

const LANGUAGES = ['Hindi', 'English', 'Tamil', 'Telugu', 'Bengali', 'Marathi'];

function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <label style={{
        fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: 'var(--text-soft)',
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function StyledInput({ icon, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 14px', borderRadius: '0.85rem',
      background: 'var(--bg-soft)',
      border: `1px solid ${focused ? 'rgba(255,98,0,0.45)' : 'var(--border-soft)'}`,
      boxShadow: focused ? '0 0 0 3px rgba(255,98,0,0.07)' : 'none',
      transition: 'all 0.2s ease',
    }}>
      {icon && <span style={{ color: 'var(--text-soft)', flexShrink: 0 }}>{icon}</span>}
      <input
        {...props}
        onFocus={e => { setFocused(true); props.onFocus?.(e); }}
        onBlur={e => { setFocused(false); props.onBlur?.(e); }}
        style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          fontSize: '0.875rem', color: 'var(--text)', fontFamily: 'inherit', fontWeight: 500,
        }}
      />
    </div>
  );
}

function PreviewCard({ data }) {
  return (
    <motion.div layout className="card" style={{
      position: 'sticky', top: 0,
      background: 'var(--bg-elevated)',
      boxShadow: 'var(--shadow-md)',
      overflow: 'hidden', padding: 0,
    }}>
      <div style={{
        padding: '10px 16px', borderBottom: '1px solid var(--border-soft)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'var(--bg-soft)',
      }}>
        <span style={{
          fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--text-soft)',
        }}>Preview Mode</span>
        <div style={{ display: 'flex', gap: 5 }}>
          {['#f87171','#fbbf24','#4ade80'].map((c,i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.65 }} />
          ))}
        </div>
      </div>

      <div style={{ padding: '24px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <motion.div whileHover={{ scale: 1.05 }} style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'var(--gradient-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(255,98,0,0.25)',
            overflow: 'hidden', flexShrink: 0,
          }}>
            {data.profileImage ? (
              <img src={data.profileImage} alt="preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <User size={30} color="rgba(255,255,255,0.7)" />
            )}
          </motion.div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 14 }}>
          <h3 style={{
            fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.02em',
            color: 'var(--text-heading)', marginBottom: 4,
            fontFamily: "'Poppins', sans-serif",
          }}>
            {data.fullName || 'Your Name'}
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>
            {data.headline || 'Profile Headline'}
          </p>
        </div>

        {data.specialties.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', marginBottom: 14 }}>
            {data.specialties.slice(0, 3).map(s => (
              <span key={s} style={{
                fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', padding: '3px 9px', borderRadius: 9999,
                background: 'var(--accent-bg)', color: 'var(--primary)',
                border: '1px solid var(--accent-border)',
              }}>{s}</span>
            ))}
          </div>
        )}

        {data.bio && (
          <p style={{
            fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6,
            fontStyle: 'italic', textAlign: 'center', marginBottom: 16,
            display: '-webkit-box', WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            "{data.bio}"
          </p>
        )}

        <div style={{ height: 1, background: 'var(--border-soft)', marginBottom: 14 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={{ display: 'flex', gap: 2, marginBottom: 3 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} style={{ fill: '#f59e0b', color: '#f59e0b' }} />
              ))}
            </div>
            <span style={{ fontSize: '0.63rem', color: 'var(--text-soft)', fontWeight: 600 }}>
              4.9 (124 reviews)
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '0.58rem', color: 'var(--text-soft)', fontWeight: 700,
              textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2,
            }}>Starting at</div>
            <div style={{
              fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-heading)',
              fontFamily: "'Poppins', sans-serif",
            }}>
              {data.pricePerMinute ? `₹${data.pricePerMinute}/min` : '—'}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StepProgress({ current, total }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
      <span style={{
        fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
        color: 'var(--primary)', textTransform: 'uppercase',
      }}>
        Step {String(current).padStart(2,'0')} / {String(total).padStart(2,'0')}
      </span>
      <div style={{ display: 'flex', gap: 4, marginLeft: 6 }}>
        {[...Array(total)].map((_, i) => (
          <motion.div key={i}
            animate={{ width: i + 1 === current ? 22 : 6, opacity: i + 1 <= current ? 1 : 0.22 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            style={{ height: 4, borderRadius: 9999, background: 'var(--gradient-primary)' }}
          />
        ))}
      </div>
    </div>
  );
}

const ExpertForm = ({ isOpen, isClose }) => {
  const [step, setStep] = useState(1);
  const [dir,  setDir]  = useState(1);

  // ← CHANGE 1: added profileImageFile: null to initial state
  const [formData, setFormData] = useState({
    fullName: '',
    headline: '',
    bio: '',
    profileImage: '',
    profileImageFile: null,
    specialties: [],
    languages: [],
    experienceYears: '',
    pricePerMinute: '',
    availability: 'full-time',
  });

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleSpecialty = (val) => setFormData(prev => ({
    ...prev,
    specialties: prev.specialties.includes(val)
      ? prev.specialties.filter(s => s !== val)
      : [...prev.specialties, val],
  }));

  const toggleLanguage = (val) => setFormData(prev => ({
    ...prev,
    languages: prev.languages.includes(val)
      ? prev.languages.filter(l => l !== val)
      : [...prev.languages, val],
  }));

  // ← CHANGE 2: store actual File object for upload + base64 for preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // store File object for FormData upload
    setFormData(prev => ({ ...prev, profileImageFile: file }));

    // base64 only for live preview in UI
    const reader = new FileReader();
    reader.onload = (ev) => setFormData(prev => ({ ...prev, profileImage: ev.target.result }));
    reader.readAsDataURL(file);
  };

  // ← CHANGE 3: send FormData instead of JSON so multer/cloudinary can receive the image
  const handleSubmit = async () => {
      if (!formData.pricePerMinute) {
    alert('Please set your price per minute in Step 3');
    setStep(3);
    return;
  }
  if (formData.specialties.length === 0) {
    alert('Please select at least one specialty in Step 2');
    setStep(2);
    return;
  }
    const token = localStorage.getItem('token');
    try {
      const fd = new FormData();

      fd.append('fullName',        formData.fullName);
      fd.append('headline',        formData.headline);
      fd.append('bio',             formData.bio);
      fd.append('experienceYears', formData.experienceYears);
      fd.append('pricePerMinute',  formData.pricePerMinute);
      fd.append('availability',    formData.availability);

      // arrays sent as comma-separated — backend splits them back
      fd.append('specialties', formData.specialties.join(','));
      fd.append('languages',   formData.languages.join(','));

      // 'image' matches upload.single('image') in your router
      if (formData.profileImageFile) {
        fd.append('image', formData.profileImageFile);
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/astrologer`, {
        method: 'POST',
        // DO NOT set Content-Type — browser sets it automatically with correct boundary
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      await res.json();
      alert('Astrologer added 🎉');

      // reset everything including profileImageFile
      setFormData({
        fullName: '', headline: '', bio: '',
        profileImage: '', profileImageFile: null,
        specialties: [], languages: [],
        experienceYears: '', pricePerMinute: '', availability: 'full-time',
      });
      setStep(1);
      isClose();
    } catch (err) {
      console.error(err);
      alert('Error saving astrologer');
    }
  };

  const next = () => { setDir(1);  setStep(s => Math.min(s + 1, 4)); };
  const prev = () => { setDir(-1); setStep(s => Math.max(s - 1, 1)); };

  const stepVariants = {
    enter:  (d) => ({ opacity: 0, x: d > 0 ? 36 : -36 }),
    center: { opacity: 1, x: 0 },
    exit:   (d) => ({ opacity: 0, x: d > 0 ? -36 : 36 }),
  };

  const taFocus = (e) => {
    e.currentTarget.style.borderColor = 'rgba(255,98,0,0.45)';
    e.currentTarget.style.boxShadow   = '0 0 0 3px rgba(255,98,0,0.07)';
  };
  const taBlur = (e) => {
    e.currentTarget.style.borderColor = 'var(--border-soft)';
    e.currentTarget.style.boxShadow   = 'none';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[9998]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ background: 'rgba(26,28,26,0.52)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
            onClick={isClose}
          />

          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ pointerEvents: 'none' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={e => e.stopPropagation()}
              style={{
                pointerEvents: 'auto',
                width: '100%', maxWidth: 940,
                maxHeight: '94vh', overflowY: 'auto',
                borderRadius: '1.75rem',
                background: 'var(--bg)',
                boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-soft)',
                position: 'relative',
              }}
            >
              <motion.div
                animate={{ scale:[1,1.2,1], opacity:[0.3,0.6,0.3] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: -80, right: -80, width: 320, height: 320,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,98,0,0.08) 0%, transparent 65%)',
                  filter: 'blur(55px)', pointerEvents: 'none', zIndex: 0,
                }}
              />
              <motion.div
                animate={{ scale:[1,1.15,1], opacity:[0.25,0.5,0.25] }}
                transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                style={{
                  position: 'absolute', bottom: -60, left: -60, width: 260, height: 260,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,140,58,0.07) 0%, transparent 65%)',
                  filter: 'blur(45px)', pointerEvents: 'none', zIndex: 0,
                }}
              />

              <div style={{ position: 'relative', zIndex: 1 }}>

                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '20px 28px 0',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <motion.div
                      animate={{ boxShadow: [
                        '0 0 0 2px rgba(255,98,0,0.3), 0 0 14px rgba(255,98,0,0.18)',
                        '0 0 0 2px rgba(255,98,0,0.6), 0 0 22px rgba(255,98,0,0.3)',
                        '0 0 0 2px rgba(255,98,0,0.3), 0 0 14px rgba(255,98,0,0.18)',
                      ]}}
                      transition={{ duration: 3, repeat: Infinity }}
                      style={{
                        width: 36, height: 36, borderRadius: '0.75rem',
                        background: 'var(--gradient-primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <Sparkles size={16} color="#fff" />
                    </motion.div>
                    <span style={{
                      fontFamily: "'Poppins', sans-serif", fontWeight: 700,
                      fontSize: '0.95rem', color: 'var(--text-heading)', letterSpacing: '-0.02em',
                    }}>
                      Expert Onboarding
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={isClose}
                    style={{
                      width: 34, height: 34, borderRadius: '50%',
                      border: '1px solid var(--border-soft)', background: 'transparent',
                      color: 'var(--text-muted)', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <X size={15} />
                  </motion.button>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 280px',
                  gap: 0,
                  padding: '24px 28px 28px',
                }}>

                  {/* LEFT — form */}
                  <div style={{ paddingRight: 28, borderRight: '1px solid var(--border-soft)' }}>

                    <StepProgress current={step} total={4} />

                    <div style={{ marginBottom: 28 }}>
                      <h2 style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                        fontWeight: 800, letterSpacing: '-0.03em',
                        color: 'var(--text-heading)', marginBottom: 8, lineHeight: 1.15,
                      }}>
                        {STEPS[step-1].label}
                      </h2>
                      <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: 420 }}>
                        {STEPS[step-1].sub}
                      </p>
                    </div>

                    <AnimatePresence mode="wait" custom={dir}>
                      <motion.div
                        key={step}
                        custom={dir}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.26, ease: [0.16,1,0.3,1] }}
                      >

                        {/* STEP 1 */}
                        {step === 1 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                            <Field label="Profile Portrait">
                              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                                <motion.div
                                  whileHover={{ scale: 1.04 }}
                                  onClick={() => fileInputRef.current?.click()}
                                  style={{
                                    width: 78, height: 78, borderRadius: '50%',
                                    overflow: 'hidden', flexShrink: 0, cursor: 'pointer',
                                    background: 'var(--bg-high)',
                                    border: '2px solid var(--border-soft)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: 'var(--shadow-sm)',
                                  }}
                                >
                                  {formData.profileImage ? (
                                    <img src={formData.profileImage} alt="profile"
                                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                  ) : (
                                    <User size={26} style={{ color: 'var(--text-soft)' }} />
                                  )}
                                </motion.div>

                                <div>
                                  <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    style={{
                                      display: 'flex', alignItems: 'center', gap: 5,
                                      fontSize: '0.82rem', fontWeight: 700,
                                      color: 'var(--primary)', background: 'none', border: 'none',
                                      cursor: 'pointer', padding: 0, marginBottom: 5,
                                    }}
                                  >
                                    <Image size={13} /> Change Image ↗
                                  </button>
                                  <p style={{ fontSize: '0.7rem', color: 'var(--text-soft)', lineHeight: 1.5 }}>
                                    Recommended: 800×800px High-res portrait
                                  </p>
                                </div>

                                {/* hidden file input */}
                                <input
                                  ref={fileInputRef}
                                  type="file"
                                  accept="image/*"
                                  style={{ display: 'none' }}
                                  onChange={handleImageChange}
                                />
                              </div>
                            </Field>

                            <Field label="Full Name">
                              <StyledInput
                                icon={<User size={14} />}
                                name="fullName"
                                placeholder="Elara Vance"
                                value={formData.fullName}
                                onChange={handleChange}
                              />
                            </Field>

                            <Field label="Profile Headline">
                              <StyledInput
                                icon={<Award size={14} />}
                                name="headline"
                                placeholder="e.g., Master Vedic Astrologer"
                                value={formData.headline}
                                onChange={handleChange}
                              />
                            </Field>

                            <Field label="Short Bio">
                              <div
                                style={{
                                  display: 'flex', gap: 10, padding: '10px 14px',
                                  borderRadius: '0.85rem', background: 'var(--bg-soft)',
                                  border: '1px solid var(--border-soft)',
                                  transition: 'all 0.2s ease',
                                }}
                                onFocusCapture={taFocus}
                                onBlurCapture={taBlur}
                              >
                                <FileText size={14} style={{ color: 'var(--text-soft)', marginTop: 2, flexShrink: 0 }} />
                                <textarea
                                  name="bio" rows={3}
                                  placeholder="Briefly describe your journey and spiritual approach..."
                                  value={formData.bio}
                                  onChange={handleChange}
                                  style={{
                                    flex: 1, background: 'transparent', border: 'none',
                                    outline: 'none', resize: 'none', fontSize: '0.875rem',
                                    color: 'var(--text)', fontFamily: 'inherit', fontWeight: 500, lineHeight: 1.65,
                                  }}
                                />
                              </div>
                            </Field>
                          </div>
                        )}

                        {/* STEP 2 */}
                        {step === 2 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                            <Field label="Specializations">
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {SPECIALTIES.map(({ label, emoji }) => {
                                  const active = formData.specialties.includes(label);
                                  return (
                                    <motion.button
                                      key={label} type="button"
                                      whileHover={{ scale: 1.05, y: -2 }}
                                      whileTap={{ scale: 0.92 }}
                                      onClick={() => toggleSpecialty(label)}
                                      style={{
                                        padding: '8px 16px', borderRadius: 9999,
                                        fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        background: active ? 'var(--gradient-primary)' : 'var(--accent-bg)',
                                        color: active ? '#fff' : 'var(--primary)',
                                        border: active ? '1.5px solid transparent' : '1.5px solid var(--accent-border)',
                                        boxShadow: active ? '0 4px 16px rgba(255,98,0,0.28)' : 'none',
                                      }}
                                    >
                                      {emoji} {label}
                                    </motion.button>
                                  );
                                })}
                              </div>
                            </Field>

                            <Field label="Languages">
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {LANGUAGES.map(lang => {
                                  const active = formData.languages.includes(lang);
                                  return (
                                    <motion.button
                                      key={lang} type="button"
                                      whileHover={{ scale: 1.05, y: -2 }}
                                      whileTap={{ scale: 0.92 }}
                                      onClick={() => toggleLanguage(lang)}
                                      style={{
                                        padding: '7px 14px', borderRadius: 9999,
                                        fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                        background: active ? 'var(--accent-bg)' : 'var(--bg-soft)',
                                        color: active ? 'var(--primary)' : 'var(--text-muted)',
                                        border: `1.5px solid ${active ? 'rgba(255,98,0,0.35)' : 'var(--border-soft)'}`,
                                        boxShadow: active ? '0 0 0 3px rgba(255,98,0,0.07)' : 'none',
                                      }}
                                    >
                                      <Globe size={11} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />
                                      {lang}
                                    </motion.button>
                                  );
                                })}
                              </div>
                            </Field>

                            <Field label="Years of Experience">
                              <StyledInput
                                icon={<Clock size={14} />}
                                name="experienceYears"
                                type="number"
                                placeholder="e.g., 8"
                                value={formData.experienceYears}
                                onChange={handleChange}
                              />
                            </Field>
                          </div>
                        )}

                        {/* STEP 3 */}
                        {step === 3 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            <Field label="Price per Minute (₹)">
                              <StyledInput
                                icon={<Zap size={14} />}
                                name="pricePerMinute"
                                type="number"
                                placeholder="e.g., 25"
                                value={formData.pricePerMinute}
                                onChange={handleChange}
                              />
                            </Field>

                            <Field label="Availability">
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {[
                                  { value: 'full-time', label: 'Full Time',     desc: 'Available 8+ hours/day' },
                                  { value: 'part-time', label: 'Part Time',     desc: 'Available 3–7 hours/day' },
                                  { value: 'weekends',  label: 'Weekends Only', desc: 'Available Sat & Sun' },
                                ].map(opt => {
                                  const active = formData.availability === opt.value;
                                  return (
                                    <motion.div
                                      key={opt.value}
                                      whileHover={{ x: 4 }}
                                      onClick={() => setFormData(p => ({ ...p, availability: opt.value }))}
                                      style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                        padding: '12px 16px', borderRadius: '0.85rem', cursor: 'pointer',
                                        background: active ? 'var(--accent-bg)' : 'var(--bg-soft)',
                                        border: `1px solid ${active ? 'rgba(255,98,0,0.35)' : 'var(--border-soft)'}`,
                                        transition: 'all 0.2s ease',
                                      }}
                                    >
                                      <div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-heading)' }}>{opt.label}</div>
                                        <div style={{ fontSize: '0.72rem', color: 'var(--text-soft)', marginTop: 2 }}>{opt.desc}</div>
                                      </div>
                                      <motion.div
                                        animate={{ scale: active ? 1 : 0.6, opacity: active ? 1 : 0 }}
                                        style={{
                                          width: 22, height: 22, borderRadius: '50%',
                                          background: 'var(--gradient-primary)',
                                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                                          flexShrink: 0,
                                        }}
                                      >
                                        <CheckCircle size={13} color="#fff" />
                                      </motion.div>
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </Field>
                          </div>
                        )}

                        {/* STEP 4 */}
                        {step === 4 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {[
                              { label: 'Full Name',    value: formData.fullName },
                              { label: 'Headline',     value: formData.headline },
                              { label: 'Experience',   value: formData.experienceYears ? `${formData.experienceYears} years` : '—' },
                              { label: 'Price / min',  value: formData.pricePerMinute  ? `₹${formData.pricePerMinute}` : '—' },
                              { label: 'Availability', value: formData.availability },
                              { label: 'Specialties',  value: formData.specialties.join(', ') || '—' },
                              { label: 'Languages',    value: formData.languages.join(', ')   || '—' },
                            ].map(({ label, value }) => (
                              <div key={label} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                                padding: '10px 14px', borderRadius: '0.85rem',
                                background: 'var(--bg-soft)', border: '1px solid var(--border-soft)',
                              }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-soft)', flexShrink: 0 }}>{label}</span>
                                <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-heading)', textAlign: 'right', marginLeft: 12 }}>{value}</span>
                              </div>
                            ))}

                            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                              {[
                                { icon: Shield, label: 'Verified Profile' },
                                { icon: Star,   label: 'Top Expert Badge' },
                              ].map(({ icon: Icon, label }) => (
                                <div key={label} style={{
                                  flex: 1, display: 'flex', alignItems: 'center', gap: 7,
                                  padding: '10px 12px', borderRadius: '0.85rem',
                                  background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
                                }}>
                                  <Icon size={13} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)' }}>{label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      </motion.div>
                    </AnimatePresence>

                    {/* Nav buttons */}
                    <div style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--border-soft)',
                    }}>
                      {step > 1 ? (
                        <motion.button
                          whileHover={{ scale: 1.04, x: -3 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={prev}
                          style={{
                            display: 'flex', alignItems: 'center', gap: 6,
                            padding: '10px 20px', borderRadius: 9999,
                            border: '1px solid var(--border-soft)',
                            background: 'transparent', color: 'var(--text-muted)',
                            fontSize: '0.84rem', fontWeight: 600, cursor: 'pointer',
                          }}
                        >
                          <ArrowLeft size={14} /> Back
                        </motion.button>
                      ) : <div />}

                      {step < 4 ? (
                        <motion.button
                          whileHover={{ scale: 1.04, y: -2, boxShadow: '0 0 28px rgba(255,98,0,0.28)' }}
                          whileTap={{ scale: 0.96 }}
                          onClick={next}
                          className="btn-primary"
                          style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative', overflow: 'hidden' }}
                        >
                          <motion.span
                            animate={{ x: ['-100%','200%'] }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: 'linear', repeatDelay: 1.2 }}
                            style={{
                              position: 'absolute', inset: 0,
                              background: 'linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.18) 50%, transparent 80%)',
                              pointerEvents: 'none',
                            }}
                          />
                          Next: {STEPS[step].label} <ArrowRight size={14} />
                        </motion.button>
                      ) : (
                        <motion.button
                          whileHover={{ scale: 1.04, y: -2, boxShadow: '0 0 28px rgba(255,98,0,0.28)' }}
                          whileTap={{ scale: 0.96 }}
                          onClick={handleSubmit}
                          className="btn-primary"
                          style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative', overflow: 'hidden' }}
                        >
                          <motion.span
                            animate={{ x: ['-100%','200%'] }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: 'linear', repeatDelay: 1.2 }}
                            style={{
                              position: 'absolute', inset: 0,
                              background: 'linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.18) 50%, transparent 80%)',
                              pointerEvents: 'none',
                            }}
                          />
                          <Sparkles size={14} /> Launch My Profile
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* RIGHT — Live Preview */}
                  <div style={{ paddingLeft: 24 }}>
                    <p style={{
                      fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', color: 'var(--text-soft)', marginBottom: 12,
                    }}>
                      Live Preview
                    </p>
                    <PreviewCard data={formData} />
                  </div>

                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExpertForm;