import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { User, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { Sparkle } from 'lucide-react';

/* ─── FIELD COMPONENT ─── */
const Field = ({ label, children, half }) => (
  <div className={half ? '' : 'col-span-2'}>
    <label
      style={{
        display: 'block',
        fontSize: '0.6rem',
        fontWeight: 900,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginBottom: '0.4rem',
        marginLeft: '0.25rem',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {label}
    </label>
    {children}
  </div>
);

const inputStyle = {
  width: '100%',
  background: 'var(--bg-soft)',
  border: '1px solid var(--border-soft)',
  borderRadius: '0.875rem',
  padding: '11px 16px',
  fontSize: '0.88rem',
  color: 'var(--text)',
  fontFamily: 'inherit',
  fontWeight: 500,
  outline: 'none',
  transition: 'border-color 0.25s, box-shadow 0.25s',
  display: 'block',
};

const InputField = ({ type = 'text', name, placeholder, onChange, ...rest }) => {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle,
        borderColor: focused ? 'rgba(165,61,0,0.4)' : 'var(--border-soft)',
        boxShadow: focused ? '0 0 0 3px rgba(255,98,0,0.08)' : 'none',
      }}
      {...rest}
    />
  );
};

const SelectField = ({ name, onChange, children }) => {
  const [focused, setFocused] = useState(false);
  return (
    <select
      name={name}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle,
        appearance: 'none',
        cursor: 'pointer',
        borderColor: focused ? 'rgba(165,61,0,0.4)' : 'var(--border-soft)',
        boxShadow: focused ? '0 0 0 3px rgba(255,98,0,0.08)' : 'none',
      }}
    >
      {children}
    </select>
  );
};

/* ─── MAIN COMPONENT ─── */
const AuthModal = ({ isOpen, onClose, defaultTab = 'login' }) => {
  const { loginWithGoogle, login } = useAuth();
  const [tab, setTab] = useState(defaultTab);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const timeoutRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    gender: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (loading) return;
    setError('');
    try {
      setLoading(true);
      const isLogin = tab === 'login';
      const url = isLogin
        ? `${import.meta.env.VITE_API_URL}/api/auth/login`
        : `${import.meta.env.VITE_API_URL}/api/auth/signup`;
      const payload = isLogin
        ? { phone: formData.phone, email: formData.email, password: formData.password }
        : { ...formData };
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      toast.success(isLogin ? 'Login successful!' : 'Signup successful!');
      login(data.user, data.token);
      onClose();
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTab(defaultTab);
  }, [defaultTab]);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  /* lock body scroll */
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const isLogin = tab === 'login';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── BACKDROP ── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(20, 8, 0, 0.55)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              zIndex: 9998,
            }}
          />

          {/* ── MODAL ── */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.45 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              pointerEvents: 'none',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                pointerEvents: 'auto',
                width: '100%',
                maxWidth: 460,
                maxHeight: '92vh',
                overflowY: 'auto',
                overflowX: 'hidden',
                borderRadius: '2rem',
                /* Glass card identical to Aetheria reference */
                background: 'rgba(255,255,255,0.48)',
                backdropFilter: 'blur(22px) saturate(160%)',
                WebkitBackdropFilter: 'blur(22px) saturate(160%)',
                border: '1px solid rgba(255,255,255,0.55)',
                boxShadow: '0 4px 24px -1px rgba(0,0,0,0.04), 0 30px 60px -12px rgba(165,61,0,0.15)',
                padding: '2rem 2rem 1.75rem',
                position: 'relative',
                scrollbarWidth: 'none',
              }}
            >
              {/* hide scrollbar */}
              <style>{`div::-webkit-scrollbar { display: none; }`}</style>

              {/* ── TOP GRADIENT BAR ── */}
              {/* <div
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: 3,
                  background: 'var(--gradient-primary)',
                  borderRadius: '2rem 2rem 0 0',
                }}
              /> */}

              {/* ── AMBIENT GLOW ── */}
              <div
                style={{
                  position: 'absolute',
                  top: -40, right: -40,
                  width: 220, height: 220,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,98,0,0.09) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  pointerEvents: 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: -20, left: -20,
                  width: 160, height: 160,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(165,61,0,0.05) 0%, transparent 70%)',
                  filter: 'blur(30px)',
                  pointerEvents: 'none',
                }}
              />

              {/* ── CLOSE ── */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '1.1rem',
                  right: '1.1rem',
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(255,255,255,0.5)',
                  border: '1px solid var(--border-soft)',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  transition: 'background 0.2s',
                }}
              >
                <X size={15} />
              </motion.button>

              {/* ── EDITORIAL HEADER ── */}
              <div style={{ textAlign: 'center', marginBottom: '1.4rem' }}>
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 260 }}
                  style={{ fontSize: '2rem', marginBottom: '0.4rem', lineHeight: 1 ,display:'flex',
                    justifyContent:'center'
                  }}
                  
                >
                  
                  {/* <User className='text-[var(--primary)]'/> */}
                </motion.div>
                <h1
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-heading)',
                    margin: 0,
                    lineHeight: 1.15,
                  }}
                >
                  {isLogin ? 'Welcome Back' : 'Create Sanctuary'}
                </h1>
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-muted)',
                    marginTop: '0.35rem',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                  }}
                >
                  {isLogin
                    ? 'Enter your sacred coordinates to continue.'
                    : 'Begin your celestial journey with us.'}
                </p>
              </div>

              {/* ── SEGMENTED TAB TOGGLE ── */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    padding: '4px',
                    background: 'rgba(255,255,255,0.35)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '1.25rem',
                    border: '1px solid rgba(0,0,0,0.04)',
                  }}
                >
                  {['login', 'signup'].map((t) => (
                    <motion.button
                      key={t}
                      onClick={() => { setTab(t); setError(''); }}
                      style={{
                        padding: '7px 22px',
                        borderRadius: '1rem',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        fontFamily: "'Poppins', sans-serif",
                        letterSpacing: '0.04em',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.25s',
                        background: tab === t ? '#fff' : 'transparent',
                        color: tab === t ? 'var(--text-heading)' : 'var(--text-muted)',
                        boxShadow: tab === t ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t === 'login' ? 'Sign In' : 'Sign Up'}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* ── ERROR ── */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{
                      background: 'rgba(186,26,26,0.07)',
                      border: '1px solid rgba(186,26,26,0.18)',
                      borderRadius: '0.875rem',
                      padding: '10px 14px',
                      marginBottom: '1rem',
                      fontSize: '0.82rem',
                      color: '#ba1a1a',
                      fontWeight: 600,
                      textAlign: 'center',
                    }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── FORM FIELDS ── */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                >
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.75rem',
                    }}
                  >

                    {/* ALWAYS VISIBLE */}
                    <Field label="Phone Number">
                      <InputField
                        type="text"
                        name="phone"
                        placeholder="+919876543210"
                        onChange={handleChange}
                      />
                    </Field>

                    <Field label="Email Address">
                      <InputField
                        type="email"
                        name="email"
                        placeholder="astro@gmail.com"
                        onChange={handleChange}
                      />
                    </Field>

                    <div
                      className="col-span-2"
                      style={{ gridColumn: '1 / -1' }}
                    >
                      <div style={{ position: 'relative' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '0.4rem',
                            marginLeft: '0.25rem',
                          }}
                        >
                          <label
                            style={{
                              fontSize: '0.6rem',
                              fontWeight: 900,
                              letterSpacing: '0.18em',
                              textTransform: 'uppercase',
                              color: 'var(--text-muted)',
                              fontFamily: "'Poppins', sans-serif",
                            }}
                          >
                            {isLogin ? 'Password' : 'Secret Key'}
                          </label>
                          {isLogin && (
                            <button
                              style={{
                                fontSize: '0.6rem',
                                fontWeight: 900,
                                letterSpacing: '0.14em',
                                textTransform: 'uppercase',
                                color: 'var(--primary-light)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontFamily: "'Poppins', sans-serif",
                              }}
                            >
                              Forgot?
                            </button>
                          )}
                        </div>
                        <InputField
                          type="password"
                          name="password"
                          placeholder="••••••••"
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {/* SIGNUP ONLY FIELDS */}
                    {!isLogin && (
                      <>
                        <Field label="Celestial Name" half>
                          <InputField
                            name="name"
                            placeholder="E.g. Arjun"
                            onChange={handleChange}
                          />
                        </Field>

                        <Field label="Essence" half>
                          <SelectField name="gender" onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="male">Solar </option>
                            <option value="female">Lunar </option>
                            <option value="other">Astral </option>
                          </SelectField>
                        </Field>

                        <Field label="Date of Emergence" half>
                          <InputField
                            type="date"
                            name="dateOfBirth"
                            onChange={handleChange}
                          />
                        </Field>

                        <Field label="Alignment Time" half>
                          <InputField
                            type="time"
                            name="timeOfBirth"
                            onChange={handleChange}
                          />
                        </Field>

                        <div style={{ gridColumn: '1 / -1' }}>
                          <Field label="Place of Birth">
                            <InputField
                              name="placeOfBirth"
                              placeholder="City of first light..."
                              onChange={handleChange}
                            />
                          </Field>
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* ── CTA BUTTON ── */}
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: '100%',
                  marginTop: '1.25rem',
                  padding: '13px',
                  background: loading
                    ? 'rgba(165,61,0,0.5)'
                    : 'var(--gradient-primary)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '9999px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: '0.02em',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  boxShadow: loading
                    ? 'none'
                    : '0 12px 28px -6px rgba(165,61,0,0.32)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                }}
              >
                {loading ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      style={{ display: 'inline-block', fontSize: '1rem' }}
                    >
                      ✦
                    </motion.span>
                    Please wait...
                  </>
                ) : isLogin ? (
                  'Enter Sanctuary →'
                ) : (
                  'Begin Journey →'
                )}
              </motion.button>

              {/* ── DIVIDER ── */}
              <div
                style={{
                  position: 'relative',
                  margin: '1.25rem 0 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div
                  style={{ flex: 1, height: 1, background: 'var(--border-soft)' }}
                />
                <span
                  style={{
                    fontSize: '0.58rem',
                    fontWeight: 900,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--text-soft)',
                    fontFamily: "'Poppins', sans-serif",
                    whiteSpace: 'nowrap',
                  }}
                >
                  Or align with
                </span>
                <div
                  style={{ flex: 1, height: 1, background: 'var(--border-soft)' }}
                />
              </div>

              {/* ── SOCIAL BUTTONS ── */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => { loginWithGoogle(); onClose(); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '10px 16px',
                    background: 'rgba(255,255,255,0.55)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: '0.875rem',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    fontFamily: "'Poppins', sans-serif",
                    color: 'var(--text)',
                    transition: 'all 0.2s',
                  }}
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZFhtxjgNoOQj6bkucc9_CcQzqGkNiV4LWuzCbiN6UtoNoxUdBG4cy5KzvoXXUL0kn6P8yTIx3aKITI3W0oaLt4GMOy6mu9UQ5HO3DTSub6IcVqTolicNIl8vtAlk9q1PvzCjPjkKuGgVL0tYRc4JR3Zqt2h12vwDnkbT0fS49wzBSRYzK4rdDQHsX8bR0MrAwfEmYwrNeVkLL16Y_77oAqfH4QmknWa0MTZ9UxTN5FncLT95dAVvlrtWSZE0X3YLHr7OqLzCRYU"
                    alt="Google"
                    style={{ width: 15, height: 15, opacity: 0.85 }}
                  />
                  Google
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '10px 16px',
                    background: 'rgba(255,255,255,0.55)',
                    border: '1px solid rgba(0,0,0,0.05)',
                    borderRadius: '0.875rem',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    fontFamily: "'Poppins', sans-serif",
                    color: 'var(--text)',
                    transition: 'all 0.2s',
                  }}
                >
                  <span style={{ fontSize: '1rem' }}></span>
                  Apple
                </motion.button>
              </div>

              {/* ── FOOTER NOTE ── */}
              <p
                style={{
                  marginTop: '1.1rem',
                  textAlign: 'center',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: 'var(--text-soft)',
                  lineHeight: 1.6,
                  fontFamily: "'Poppins', sans-serif",
                  letterSpacing: '0.01em',
                }}
              >
                By continuing, you agree to our{' '}
                <a
                  href="#"
                  style={{
                    color: 'var(--text)',
                    textDecoration: 'underline',
                    textDecorationColor: 'rgba(165,61,0,0.25)',
                    textUnderlineOffset: 2,
                    fontWeight: 900,
                  }}
                >
                  Mystic Terms
                </a>{' '}
                &{' '}
                <a
                  href="#"
                  style={{
                    color: 'var(--text)',
                    textDecoration: 'underline',
                    textDecorationColor: 'rgba(165,61,0,0.25)',
                    textUnderlineOffset: 2,
                    fontWeight: 900,
                  }}
                >
                  Privacy Sanctuary
                </a>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;