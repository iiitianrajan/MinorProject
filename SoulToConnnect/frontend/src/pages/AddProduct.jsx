import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Upload, X, DollarSign,
  AlertCircle, Image, Package, BarChart2, CheckSquare,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE   = 'http://localhost:5001';
const CATEGORIES = ['Crystals', 'Herbs', 'Candles', 'Incense', 'Jewelry', 'Books', 'Ritual Tools', 'Other'];
const ENERGY_TAGS = ['Love', 'Prosperity', 'Clarity', 'Protection', 'Healing', 'Alignment'];

/* ─── primitives ─── */

function Field({ label, children, hint }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{
        fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em',
        textTransform: 'uppercase', color: 'var(--text-soft)',
      }}>
        {label}
      </label>
      {children}
      {hint && <p style={{ fontSize: '0.67rem', color: 'var(--text-soft)', marginTop: 1 }}>{hint}</p>}
    </div>
  );
}

function StyledInput({ icon, prefix, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '0 14px', height: 44, borderRadius: '0.85rem',
      background: 'var(--bg-soft)',
      border: `1.5px solid ${focused ? 'rgba(165,61,0,0.35)' : 'var(--border-soft)'}`,
      boxShadow: focused ? '0 0 0 3px rgba(165,61,0,0.07)' : 'none',
      transition: 'all 0.18s ease',
    }}>
      {icon   && <span style={{ color: 'var(--text-muted)', flexShrink: 0, display: 'flex' }}>{icon}</span>}
      {prefix && <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 700 }}>{prefix}</span>}
      <input
        {...props}
        onFocus={e => { setFocused(true);  props.onFocus?.(e); }}
        onBlur={e  => { setFocused(false); props.onBlur?.(e);  }}
        style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          fontSize: '0.875rem', color: 'var(--text)', fontFamily: 'inherit', fontWeight: 500,
        }}
      />
    </div>
  );
}

function StyledTextarea(props) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      display: 'flex', gap: 10, padding: '11px 14px', borderRadius: '0.85rem',
      background: 'var(--bg-soft)',
      border: `1.5px solid ${focused ? 'rgba(165,61,0,0.35)' : 'var(--border-soft)'}`,
      boxShadow: focused ? '0 0 0 3px rgba(165,61,0,0.07)' : 'none',
      transition: 'all 0.18s ease',
    }}>
      <textarea
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          resize: 'vertical', fontSize: '0.875rem', color: 'var(--text)',
          fontFamily: 'inherit', fontWeight: 500, lineHeight: 1.7, minHeight: 110,
        }}
      />
    </div>
  );
}

function StyledSelect({ icon, children, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '0 14px', height: 44, borderRadius: '0.85rem',
      background: 'var(--bg-soft)',
      border: `1.5px solid ${focused ? 'rgba(165,61,0,0.35)' : 'var(--border-soft)'}`,
      transition: 'all 0.18s ease',
    }}>
      {icon && <span style={{ color: 'var(--text-muted)', flexShrink: 0, display: 'flex' }}>{icon}</span>}
      <select
        {...props}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          fontSize: '0.875rem', color: 'var(--text)', fontFamily: 'inherit',
          fontWeight: 500, cursor: 'pointer', appearance: 'none',
        }}
      >
        {children}
      </select>
      <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', pointerEvents: 'none' }}>▾</span>
    </div>
  );
}

function SectionHeader({ icon, title }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      marginBottom: 22, paddingBottom: 16,
      borderBottom: '1px solid var(--border-soft)',
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: '0.65rem', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--accent-bg)', border: '1px solid var(--accent-border)',
      }}>
        {icon}
      </div>
      <span style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-heading)' }}>
        {title}
      </span>
    </div>
  );
}

/* ─── main ─── */

export default function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', description: '', category: 'Crystals',
    price: '', originalPrice: '', rating: '',
    energyTags: [], chargeTax: true,
  });

  const [imageFile,    setImageFile]    = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageError,   setImageError]   = useState('');
  const [submitting,   setSubmitting]   = useState(false);
  const [submitError,  setSubmitError]  = useState('');
  const [dragOver,     setDragOver]     = useState(false);

  const fileRef = useRef(null);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const toggleTag = tag =>
    setForm(p => ({
      ...p,
      energyTags: p.energyTags.includes(tag)
        ? p.energyTags.filter(t => t !== tag)
        : [...p.energyTags, tag],
    }));

  const handleFile = file => {
    setImageError('');
    if (!file) return;
    if (!file.type.startsWith('image/')) { setImageError('Please select a valid image (JPG, PNG, WEBP).'); return; }
    if (file.size > 10 * 1024 * 1024)   { setImageError('File size must be under 10 MB.'); return; }
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImageFile(null); setImagePreview(''); setImageError('');
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleDrop = e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); };

  const handleSubmit = async () => {
    setSubmitError('');
    if (!form.name.trim()) return setSubmitError('Product name is required.');
    if (!form.price)       return setSubmitError('Retail price is required.');

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const fd = new FormData();
      fd.append('name',          form.name.trim());
      fd.append('price',         form.price);
      fd.append('originalPrice', form.originalPrice || form.price);
      fd.append('category',      form.category);
      if (form.rating) fd.append('rating', form.rating);
      if (imageFile)   fd.append('image',  imageFile);

      const res = await fetch(`${API_BASE}/api/product`, {
        method:  'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body:    fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create product');
      navigate('/astromall');
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  /* ════════════ RENDER ════════════ */
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>

      {/* ambient glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'fixed', top: -80, right: -80, width: 380, height: 380, borderRadius: '50%', pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(circle, rgba(255,98,0,0.09) 0%, transparent 65%)', filter: 'blur(60px)' }}
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ position: 'fixed', bottom: -60, left: -60, width: 300, height: 300, borderRadius: '50%', pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(circle, rgba(255,140,58,0.07) 0%, transparent 65%)', filter: 'blur(50px)' }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 980, margin: '0 auto', padding: 'clamp(24px,5vw,48px) clamp(16px,4vw,32px)' }}>

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 36, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}
        >
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7, marginBottom: 12,
              fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase',
              padding: '5px 12px', borderRadius: 9999,
              background: 'var(--accent-bg)', color: 'var(--primary-light)', border: '1px solid var(--accent-border)',
            }}>
              <Sparkles size={10} /> Celestial Inventory
            </div>
            <h1 style={{ fontFamily: "'Poppins',sans-serif", fontSize: 'clamp(1.9rem,4.5vw,2.8rem)', fontWeight: 800, color: 'var(--text-heading)', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 10 }}>
              Manifest New Product
            </h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: 440, lineHeight: 1.65 }}>
              Infuse the AstroMall marketplace with new energy. Define the physical and metaphysical attributes of your latest discovery.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, alignSelf: 'flex-start', paddingTop: 6 }}>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              style={{ padding: '10px 22px', borderRadius: 9999, background: 'transparent', border: '1.5px solid var(--border-soft)', color: 'var(--text-muted)', fontFamily: 'inherit', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
              Save Draft
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: '0 0 28px rgba(255,98,0,0.28)' }} whileTap={{ scale: 0.97 }}
              onClick={handleSubmit} disabled={submitting}
              className="btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative', overflow: 'hidden', opacity: submitting ? 0.75 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}>
              {!submitting && (
                <motion.span
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'linear', repeatDelay: 1.2 }}
                  style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.18) 50%, transparent 80%)' }}
                />
              )}
              {submitting ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
                  Manifesting…
                </>
              ) : (
                <><Sparkles size={14} /> Publish Entity</>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* ── Two-column grid ── */}
        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 290px', gap: 22, alignItems: 'start' }}>

          {/* ═══ LEFT ═══ */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
          >

            {/* Product Identity */}
            <div className="card" style={{ padding: 28 }}>
              <SectionHeader icon={<Sparkles size={15} color="var(--primary-light)" />} title="Product Identity" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <Field label="Sacred Name">
                  <StyledInput
                    icon={<Sparkles size={13} />}
                    placeholder="e.g. Midnight Amethyst Geode"
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                  />
                </Field>
                <Field label="Spiritual Description">
                  <StyledTextarea
                    placeholder="Describe the soul of this product…"
                    value={form.description}
                    onChange={e => set('description', e.target.value)}
                  />
                </Field>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field label="Vessel Category">
                    <StyledSelect icon={<Package size={13} />} value={form.category} onChange={e => set('category', e.target.value)}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </StyledSelect>
                  </Field>
                  <Field label="Manifestation Energy">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, paddingTop: 4 }}>
                      {ENERGY_TAGS.map(tag => (
                        <motion.button key={tag} type="button"
                          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                          onClick={() => toggleTag(tag)}
                          style={{
                            padding: '5px 13px', borderRadius: 9999,
                            fontSize: '0.73rem', fontWeight: 700, cursor: 'pointer',
                            border: `1.5px solid ${form.energyTags.includes(tag) ? 'var(--accent-border)' : 'var(--border-soft)'}`,
                            background: form.energyTags.includes(tag) ? 'var(--accent-bg)' : 'transparent',
                            color: form.energyTags.includes(tag) ? 'var(--primary-light)' : 'var(--text-muted)',
                            transition: 'all 0.15s ease',
                          }}>
                          {tag}
                        </motion.button>
                      ))}
                    </div>
                  </Field>
                </div>
              </div>
            </div>

            {/* Economic Value */}
            <div className="card" style={{ padding: 28 }}>
              <SectionHeader icon={<DollarSign size={15} color="var(--primary-light)" />} title="Economic Value" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field label="Retail Price">
                    <StyledInput prefix="₹" type="number" placeholder="0.00" value={form.price} onChange={e => set('price', e.target.value)} />
                  </Field>
                  <Field label="Compare At">
                    <StyledInput prefix="₹" type="number" placeholder="0.00" value={form.originalPrice} onChange={e => set('originalPrice', e.target.value)} />
                  </Field>
                </div>
                <motion.div
                  onClick={() => set('chargeTax', !form.chargeTax)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                    padding: '12px 16px', borderRadius: '0.85rem',
                    background: form.chargeTax ? 'var(--accent-bg)' : 'var(--bg-soft)',
                    border: `1.5px solid ${form.chargeTax ? 'var(--accent-border)' : 'var(--border-soft)'}`,
                    transition: 'all 0.18s ease',
                  }}>
                  <motion.div
                    animate={{ background: form.chargeTax ? 'var(--gradient-primary)' : 'var(--bg-high)' }}
                    style={{ width: 18, height: 18, borderRadius: '0.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {form.chargeTax && <CheckSquare size={12} color="#fff" />}
                  </motion.div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>Charge tax on this item</span>
                </motion.div>
              </div>
            </div>

          </motion.div>

          {/* ═══ RIGHT ═══ */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 24 }}
          >

            {/* Visual Essence */}
            <div className="card" style={{ padding: 24 }}>
              <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-soft)', marginBottom: 14 }}>
                Visual Essence
              </p>

              {imagePreview ? (
                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ position: 'relative' }}>
                  <img src={imagePreview} alt="Product" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '0.85rem', display: 'block' }} />
                  <div style={{
                    position: 'absolute', bottom: 8, left: 8, right: 40,
                    background: 'rgba(0,0,0,0.55)', borderRadius: '0.5rem',
                    padding: '4px 8px', fontSize: '0.65rem', color: '#fff', fontWeight: 600,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {imageFile?.name}
                  </div>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={removeImage}
                    style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,0,0,0.55)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <X size={13} />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileRef.current?.click()}
                  animate={{
                    borderColor: dragOver ? 'rgba(165,61,0,0.5)' : 'rgba(227,191,177,0.4)',
                    background:  dragOver ? 'var(--accent-bg)' : 'var(--bg-soft)',
                  }}
                  style={{ aspectRatio: '4/3', borderRadius: '0.85rem', border: '2px dashed', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', transition: 'all 0.2s ease' }}
                >
                  <motion.div animate={{ y: dragOver ? -6 : 0 }}
                    style={{ width: 44, height: 44, borderRadius: '0.85rem', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Upload size={18} color="var(--primary-light)" />
                  </motion.div>
                  <div style={{ textAlign: 'center', padding: '0 12px' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-light)', marginBottom: 3 }}>Cloudinary Integration</p>
                    <p style={{ fontSize: '0.68rem', color: 'var(--text-soft)' }}>Drag high-res imagery here or <span style={{ textDecoration: 'underline' }}>browse</span></p>
                    <p style={{ fontSize: '0.63rem', color: 'var(--text-soft)', marginTop: 3 }}>WEBP, PNG, JPG · Max 10 MB</p>
                  </div>
                </motion.div>
              )}

              <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />

              {imageError && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 10, padding: '8px 12px', borderRadius: '0.65rem', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <AlertCircle size={13} style={{ color: '#ef4444', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.72rem', color: '#ef4444', fontWeight: 600 }}>{imageError}</span>
                </motion.div>
              )}

              {/* extra image placeholders */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 12 }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{ aspectRatio: '1', borderRadius: '0.6rem', background: 'var(--bg-soft)', border: '1px dashed var(--border-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image size={16} color="var(--bg-high)" />
                  </div>
                ))}
              </div>

              {!imagePreview && (
                <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => fileRef.current?.click()}
                  style={{ width: '100%', marginTop: 12, padding: '9px', borderRadius: 9999, background: 'transparent', border: '1px solid var(--accent-border)', color: 'var(--primary-light)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <Image size={13} /> Browse Files
                </motion.button>
              )}
            </div>

            {/* Rating */}
            <div className="card" style={{ padding: 24 }}>
              <SectionHeader icon={<BarChart2 size={15} color="var(--primary-light)" />} title="Initial Rating" />
              <Field label="Rating (0–5)" hint="Leave blank to skip initial rating">
                <StyledInput type="number" placeholder="e.g. 4.5" value={form.rating} onChange={e => set('rating', e.target.value)} />
              </Field>
            </div>

            {/* Submission summary */}
            <div className="card" style={{ padding: 24 }}>
              <p style={{ fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: 16 }}>
                Final Submission
              </p>

              {[
                { label: 'Category', value: form.category },
                { label: 'Price',    value: form.price ? `₹${form.price}` : '—' },
                { label: 'Tax',      value: form.chargeTax ? 'Charged' : 'Exempt' },
                { label: 'Image',    value: imageFile ? '✓ Ready' : 'None' },
                { label: 'Energy',   value: form.energyTags.length ? form.energyTags.join(', ') : 'None' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-soft)', fontWeight: 600 }}>{label}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: value === '✓ Ready' ? 'var(--primary-light)' : 'var(--text-heading)', maxWidth: 160, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {value}
                  </span>
                </div>
              ))}

              <AnimatePresence>
                {submitError && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 7, margin: '12px 0', padding: '10px 12px', borderRadius: '0.65rem', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)' }}>
                    <AlertCircle size={13} style={{ color: '#ef4444', flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: '0.72rem', color: '#ef4444', fontWeight: 600, lineHeight: 1.5 }}>{submitError}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={{ height: 1, background: 'var(--border-soft)', margin: '14px 0' }} />

              <motion.button
                whileHover={{ scale: 1.03, y: -2, boxShadow: '0 0 28px rgba(255,98,0,0.28)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit} disabled={submitting}
                className="btn-primary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, position: 'relative', overflow: 'hidden', opacity: submitting ? 0.75 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
              >
                {!submitting && (
                  <motion.span
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'linear', repeatDelay: 1.2 }}
                    style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.18) 50%, transparent 80%)' }}
                  />
                )}
                {submitting ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }} />
                    Manifesting…
                  </>
                ) : (
                  <><Sparkles size={14} /> Finalize Manifestation</>
                )}
              </motion.button>
            </div>

            {/* tip */}
            <motion.div whileHover={{ y: -3 }}
              style={{ padding: '14px 16px', borderRadius: '0.85rem', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <Sparkles size={13} style={{ color: 'var(--primary-light)', marginTop: 2, flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary-light)', marginBottom: 5 }}>Keeper's Guidance</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Products in the <strong>Crystals</strong> category are automatically featured in the weekly lunar newsletter to all Premium seekers.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .product-grid { grid-template-columns: 1fr !important; }
        }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
      `}</style>
    </div>
  );
}