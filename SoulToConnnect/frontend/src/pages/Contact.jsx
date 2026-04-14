import { useState } from 'react';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, User, MessageSquare, Sparkles, ArrowRight,
  HelpCircle, Phone, MapPin, Globe, Star, Users
} from 'lucide-react';
import { HashLink } from "react-router-hash-link";
import { Link } from 'react-router-dom';


/* ─── Section Label — mirrors Home.jsx SLabel ─── */
const SLabel = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest bg-[var(--accent-bg)] text-[var(--primary)] border border-[var(--accent-border)]"
  >
    {children}
  </motion.div>
);

/* ─── Focused input wrapper ─── */
function StyledInput({ icon, as: Tag = 'input', ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      display: 'flex', alignItems: Tag === 'textarea' ? 'flex-start' : 'center',
      gap: 10, padding: Tag === 'textarea' ? '12px 14px' : '11px 14px',
      borderRadius: '0.9rem',
      background: 'var(--bg-elevated)',
      border: `1px solid ${focused ? 'rgba(255,98,0,0.45)' : 'var(--border-soft)'}`,
      boxShadow: focused ? '0 0 0 3px rgba(255,98,0,0.07)' : 'none',
      transition: 'all 0.2s ease',
    }}>
      {icon && (
        <span style={{ color: focused ? 'var(--primary)' : 'var(--text-soft)', flexShrink: 0, marginTop: Tag === 'textarea' ? 2 : 0, transition: 'color 0.2s' }}>
          {icon}
        </span>
      )}
      <Tag
        {...props}
        onFocus={e => { setFocused(true); props.onFocus?.(e); }}
        onBlur={e => { setFocused(false); props.onBlur?.(e); }}
        style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          fontSize: '0.875rem', color: 'var(--text)', fontFamily: 'inherit',
          fontWeight: 500, resize: 'none', lineHeight: 1.65,
        }}
      />
    </div>
  );
}

/* ─── Field label ─── */
function Field({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <label style={{
        fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: 'var(--text-soft)',
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

const SUBJECTS = [
  'Birth Chart Inquiry',
  'Kundli Matching',
  'Career Guidance',
  'Partnership / Business',
  'Technical Support',
  'Other',
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' });
  const [loading, setLoading] = useState(false);
  const [selectOpen, setSelectOpen] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error('All fields required');
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed');
      toast.success('Message sent successfully 🚀');
      setForm({ name: '', email: '', subject: SUBJECTS[0], message: '' });
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" style={{ background: 'var(--bg-soft)', minHeight: '100vh' }}>

      {/* Ambient blobs — mirrors Hero section */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'fixed', top: -100, right: -100, width: 500, height: 500,
          borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle, rgba(255,98,0,0.08) 0%, transparent 65%)',
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.22, 1], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        style={{
          position: 'fixed', bottom: -80, left: -80, width: 420, height: 420,
          borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle, rgba(255,140,58,0.07) 0%, transparent 65%)',
          filter: 'blur(55px)',
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Page heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
          style={{ marginBottom: 48 }}
        >
          <SLabel><Sparkles size={12} /> Contact Guidance</SLabel>
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontWeight: 800, letterSpacing: '-0.03em',
              color: 'var(--text-heading)', lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            Get in{' '}
            <span style={{
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Touch
            </span>
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 520 }}>
            Whether you're seeking clarity on your birth chart or need assistance with your celestial tools,
            our guides are here to navigate the constellations with you.
          </p>
        </motion.div>

        {/* ── 2-column grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)',
          gap: 24,
          alignItems: 'start',
        }}
          className="contact-grid"
        >

          {/* LEFT — Form card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16,1,0.3,1], delay: 0.1 }}
            className="card"
            style={{ boxShadow: 'var(--shadow-md)' }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Name + Email row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
                className="form-row"
              >
                <Field label="Full Name">
                  <StyledInput
                    icon={<User size={14} />}
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </Field>
                <Field label="Email Address">
                  <StyledInput
                    icon={<Mail size={14} />}
                    name="email"
                    type="email"
                    placeholder="astro@gmail.com"
                    value={form.email}
                    onChange={handleChange}
                  />
                </Field>
              </div>

              {/* Subject dropdown */}
              <Field label="Subject of Inquiry">
                <div style={{ position: 'relative' }}>
                  <div
                    onClick={() => setSelectOpen(o => !o)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '11px 14px', borderRadius: '0.9rem',
                      background: 'var(--bg-elevated)',
                      border: `1px solid ${selectOpen ? 'rgba(255,98,0,0.45)' : 'var(--border-soft)'}`,
                      boxShadow: selectOpen ? '0 0 0 3px rgba(255,98,0,0.07)' : 'none',
                      cursor: 'pointer', transition: 'all 0.2s ease',
                    }}
                  >
                    <span style={{ fontSize: '0.875rem', color: 'var(--text)', fontWeight: 500 }}>{form.subject}</span>
                    <motion.span animate={{ rotate: selectOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ArrowRight size={14} style={{ color: 'var(--text-soft)', transform: 'rotate(90deg)' }} />
                    </motion.span>
                  </div>
                  <AnimatePresence>
                    {selectOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        style={{
                          position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
                          zIndex: 50, borderRadius: '0.9rem', overflow: 'hidden',
                          background: 'var(--bg-elevated)', boxShadow: 'var(--shadow-md)',
                          border: '1px solid var(--border-soft)',
                        }}
                      >
                        {SUBJECTS.map(s => (
                          <div
                            key={s}
                            onClick={() => { setForm(f => ({ ...f, subject: s })); setSelectOpen(false); }}
                            style={{
                              padding: '10px 14px', fontSize: '0.875rem', fontWeight: 500,
                              color: form.subject === s ? 'var(--primary)' : 'var(--text)',
                              background: form.subject === s ? 'var(--accent-bg)' : 'transparent',
                              cursor: 'pointer', transition: 'all 0.15s ease',
                            }}
                            onMouseEnter={e => { if (form.subject !== s) e.currentTarget.style.background = 'var(--bg-soft)'; }}
                            onMouseLeave={e => { if (form.subject !== s) e.currentTarget.style.background = 'transparent'; }}
                          >
                            {s}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Field>

              {/* Message */}
              <Field label="Your Message">
                <StyledInput
                  as="textarea"
                  icon={<MessageSquare size={14} />}
                  name="message"
                  rows={5}
                  placeholder="Tell us how the stars brought you here..."
                  value={form.message}
                  onChange={handleChange}
                />
              </Field>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.03, y: -2, boxShadow: '0 0 28px rgba(255,98,0,0.28)' } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
                className="btn-primary"
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  width: 'fit-content', fontSize: '0.9rem',
                  opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Shimmer — matches Home.jsx CTA */}
                {!loading && (
                  <motion.span
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'linear', repeatDelay: 1.2 }}
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.18) 50%, transparent 80%)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
                {loading ? 'Sending…' : <><span>Send Message</span> <ArrowRight size={15} /></>}
              </motion.button>

            </form>
          </motion.div>

          {/* RIGHT — Info sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16,1,0.3,1], delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >

            {/* Celestial Support header */}
            <div className="card" style={{ boxShadow: 'var(--shadow-sm)', padding: '20px 22px' }}>
              <h3 style={{
                fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '1rem',
                color: 'var(--text-heading)', marginBottom: 16, letterSpacing: '-0.02em',
              }}>
                Celestial Support
              </h3>

              {/* FAQ row */}
              <HashLink smooth to="/#faq">
              <motion.div
                whileHover={{ x: 4, backgroundColor: 'var(--bg-soft)' }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 14px', borderRadius: '0.85rem',
                  border: '1px solid var(--border-soft)', cursor: 'pointer',
                  transition: 'all 0.2s ease', marginBottom: 12,
                }}
              >
                <div  style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <HelpCircle size={15} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-heading)' }}>
                
                    FAQ & Help Center
               
                  </span>
                </div>
                <ArrowRight size={14} style={{ color: 'var(--text-soft)' }} />
              </motion.div>
              </HashLink>

              {/* Discovery Call — dark card, matches Home.jsx dark CTA banner */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  borderRadius: '1rem', overflow: 'hidden', position: 'relative',
                  background: 'linear-gradient(135deg, #0f0f0f 0%, #1c1c1c 50%, #111 100%)',
                  padding: '18px 18px 14px',
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.22, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse 80% 80% at 80% 50%, rgba(255,98,0,0.22) 0%, transparent 65%)',
                  }}
                />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <p style={{
                    fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
                    textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: 6,
                  }}>
                    Discovery Call
                  </p>
                  <p style={{ fontSize: '0.78rem', color: 'rgba(245,245,245,0.55)', lineHeight: 1.55, marginBottom: 14 }}>
                    Explore premium natal chart readings with our lead astrologers.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      width: '100%', padding: '9px 0', borderRadius: 9999,
                      background: 'var(--bg-elevated)', border: 'none',
                      color: 'var(--text-heading)', fontSize: '0.82rem', fontWeight: 700,
                      cursor: 'pointer', transition: 'all 0.2s ease',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.22)',
                    }}
                  >
                    Book a Call
                  </motion.button>
                </div>
              </motion.div>
            </div>

            {/* Direct Lines */}
            <div className="card-soft" style={{ padding: '20px 22px' }}>
              <p style={{
                fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'var(--text-soft)', marginBottom: 14,
              }}>
                Direct Lines
              </p>

              {[
                { icon: <Mail size={14} />,    label: 'hello@celestialprism.com' },
                { icon: <Phone size={14} />,   label: '+91 98765 43210' },
                { icon: <MapPin size={14} />,  label: 'India' },
              ].map(({ icon, label }, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 4 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 0',
                    borderBottom: i < 2 ? '1px solid var(--border-soft)' : 'none',
                  }}
                >
                  <span style={{ color: 'var(--primary)', flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-muted)' }}>{label}</span>
                </motion.div>
              ))}

              {/* Social icons */}
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                {[
                  { icon: <Globe size={14} />,    label: 'Web' },
                  { icon: <Mail size={14} />,     label: '@' },
                  { icon: <Star size={14} />,     label: '★' },
                ].map(({ icon, label }, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.12, y: -2, backgroundColor: 'var(--accent-bg)' }}
                    whileTap={{ scale: 0.93 }}
                    style={{
                      width: 36, height: 36, borderRadius: '50%',
                      border: '1px solid var(--border-soft)',
                      background: 'var(--bg-elevated)',
                      color: 'var(--text-muted)', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {icon}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Community card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="card"
              style={{ boxShadow: 'var(--shadow-sm)', display: 'flex', alignItems: 'center', gap: 14 }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: '0.85rem', flexShrink: 0,
                background: 'var(--gradient-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(255,98,0,0.28)',
              }}>
                <Users size={18} color="#fff" />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{
                  fontSize: '0.875rem', fontWeight: 700,
                  color: 'var(--text-heading)', marginBottom: 2,
                  fontFamily: "'Poppins', sans-serif",
                }}>
                  Visit our Community
                </h4>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-soft)', marginBottom: 6 }}>
                  Connect with 12k+ cosmic souls.
                </p>
                <a href="https://discord.com/">
                <motion.span
                  whileHover={{ x: 3 }}
                  style={{
                    fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)',
                    display: 'inline-flex', alignItems: 'center', gap: 4, cursor: 'pointer',
                  }}
                >
                  Join Discord <ArrowRight size={11} />
                </motion.span>
                </a>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* Responsive grid fix */}
      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;