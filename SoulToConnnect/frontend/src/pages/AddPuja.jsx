import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Upload, X, Calendar, Clock, DollarSign,
  Tag, User, FileText, CheckCircle, Image,
  Plus, Trash2, AlertCircle, Zap,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API_BASE   = import.meta.env.VITE_API_URL;
const CATEGORIES = ['PROSPERITY', 'PROTECTION', 'ALIGNMENT', 'HEALING', 'LOVE', 'OTHER'];

/* ═══════════════════════════════════════
   REUSABLE SUB-COMPONENTS
═══════════════════════════════════════ */

function Field({ label, children, hint }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <label style={{
        fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
        textTransform: 'uppercase', color: 'var(--text-soft)',
      }}>
        {label}
      </label>
      {children}
      {hint && <p style={{ fontSize: '0.68rem', color: 'var(--text-soft)', marginTop: 2 }}>{hint}</p>}
    </div>
  );
}

function StyledInput({ icon, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '11px 14px', borderRadius: '0.85rem',
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

function StyledSelect({ icon, children, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '11px 14px', borderRadius: '0.85rem',
      background: 'var(--bg-soft)',
      border: `1px solid ${focused ? 'rgba(255,98,0,0.45)' : 'var(--border-soft)'}`,
      boxShadow: focused ? '0 0 0 3px rgba(255,98,0,0.07)' : 'none',
      transition: 'all 0.2s ease',
    }}>
      {icon && <span style={{ color: 'var(--text-soft)', flexShrink: 0 }}>{icon}</span>}
      <select
        {...props}
        onFocus={e => { setFocused(true); props.onFocus?.(e); }}
        onBlur={e => { setFocused(false); props.onBlur?.(e); }}
        style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          fontSize: '0.875rem', color: 'var(--text)', fontFamily: 'inherit',
          fontWeight: 500, cursor: 'pointer', appearance: 'none',
        }}
      >
        {children}
      </select>
    </div>
  );
}

function TextArea({ name, placeholder, value, onChange, rows = 4 }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      display: 'flex', gap: 10, padding: '11px 14px', borderRadius: '0.85rem',
      background: 'var(--bg-soft)',
      border: `1px solid ${focused ? 'rgba(255,98,0,0.45)' : 'var(--border-soft)'}`,
      boxShadow: focused ? '0 0 0 3px rgba(255,98,0,0.07)' : 'none',
      transition: 'all 0.2s ease',
    }}>
      <FileText size={14} style={{ color: 'var(--text-soft)', marginTop: 2, flexShrink: 0 }} />
      <textarea
        name={name} rows={rows} placeholder={placeholder} value={value} onChange={onChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          flex: 1, background: 'transparent', border: 'none', outline: 'none',
          resize: 'none', fontSize: '0.875rem', color: 'var(--text)',
          fontFamily: 'inherit', fontWeight: 500, lineHeight: 1.65,
        }}
      />
    </div>
  );
}

function Toggle({ checked, onChange }) {
  return (
    <motion.div
      onClick={() => onChange(!checked)}
      animate={{ background: checked ? 'var(--gradient-primary)' : 'var(--bg-high)' }}
      style={{ width: 46, height: 26, borderRadius: 9999, position: 'relative', cursor: 'pointer', flexShrink: 0 }}
    >
      <motion.div
        animate={{ x: checked ? 22 : 3 }}
        style={{
          width: 20, height: 20, borderRadius: '50%', background: '#fff',
          position: 'absolute', top: 3, boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
        }}
      />
    </motion.div>
  );
}

function SectionHeader({ icon, title, gradient, noMargin }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      marginBottom: noMargin ? 0 : 24,
      paddingBottom: noMargin ? 0 : 18,
      borderBottom: noMargin ? 'none' : '1px solid var(--border-soft)',
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: '0.65rem', flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        ...(gradient
          ? { background: 'var(--gradient-primary)' }
          : { background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }),
      }}>
        {icon}
      </div>
      <span style={{
        fontFamily: "'Poppins', sans-serif", fontWeight: 700,
        fontSize: '0.9rem', color: 'var(--text-heading)',
      }}>
        {title}
      </span>
    </div>
  );
}

function TagInput({ tags, onAdd, onRemove, placeholder }) {
  const [val, setVal]         = useState('');
  const [focused, setFocused] = useState(false);
  const add = () => {
    const trimmed = val.trim().toUpperCase();
    if (trimmed && !tags.includes(trimmed)) { onAdd(trimmed); setVal(''); }
  };
  return (
    <div style={{
      padding: '10px 12px', borderRadius: '0.85rem', background: 'var(--bg-soft)',
      border: `1px solid ${focused ? 'rgba(255,98,0,0.45)' : 'var(--border-soft)'}`,
      boxShadow: focused ? '0 0 0 3px rgba(255,98,0,0.07)' : 'none', transition: 'all 0.2s ease',
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: tags.length ? 8 : 0 }}>
        <AnimatePresence>
          {tags.map(tag => (
            <motion.span key={tag}
              initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em',
                padding: '4px 10px', borderRadius: 9999,
                background: 'var(--accent-bg)', color: 'var(--primary)', border: '1px solid var(--accent-border)',
              }}
            >
              {tag}
              <button type="button" onClick={() => onRemove(tag)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--primary)', padding: 0, lineHeight: 1, display: 'flex', alignItems: 'center',
              }}>
                <X size={10} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Tag size={13} style={{ color: 'var(--text-soft)', flexShrink: 0 }} />
        <input
          value={val} onChange={e => setVal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={placeholder}
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            fontSize: '0.82rem', color: 'var(--text)', fontFamily: 'inherit', fontWeight: 500,
          }}
        />
        <motion.button type="button" onClick={add}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }}
          style={{
            width: 26, height: 26, borderRadius: '50%', background: 'var(--gradient-primary)',
            border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}
        >
          <Plus size={12} color="#fff" />
        </motion.button>
      </div>
    </div>
  );
}

function SlotRow({ slot, onChange, onRemove }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8, alignItems: 'center' }}
    >
      <StyledInput
        icon={<Calendar size={13} />} type="datetime-local"
        value={slot.datetime} onChange={e => onChange({ ...slot, datetime: e.target.value })}
      />
      <motion.div
        onClick={() => onChange({ ...slot, isBooked: !slot.isBooked })}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '11px 14px', borderRadius: '0.85rem',
          background: 'var(--bg-soft)', border: '1px solid var(--border-soft)', cursor: 'pointer',
        }}
      >
        <motion.div
          animate={{ background: slot.isBooked ? 'var(--gradient-primary)' : 'var(--bg-high)' }}
          style={{ width: 36, height: 20, borderRadius: 9999, position: 'relative', flexShrink: 0 }}
        >
          <motion.div
            animate={{ x: slot.isBooked ? 18 : 2 }}
            style={{
              width: 16, height: 16, borderRadius: '50%', background: '#fff',
              position: 'absolute', top: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
            }}
          />
        </motion.div>
        <span style={{ fontSize: '0.78rem', fontWeight: 600, color: slot.isBooked ? 'var(--primary)' : 'var(--text-muted)' }}>
          {slot.isBooked ? 'Booked' : 'Available'}
        </span>
      </motion.div>
      <motion.button type="button" onClick={onRemove}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        style={{
          width: 36, height: 36, borderRadius: '0.7rem',
          border: '1px solid var(--border-soft)', background: 'transparent',
          color: 'var(--text-muted)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Trash2 size={14} />
      </motion.button>
    </motion.div>
  );
}


export default function AddPuja() {
    const navigate = useNavigate();

  const [pandits, setPandits] = useState([]);
  const [panditsLoading, setPanditsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE}/api/astrologer`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const data = await res.json();
          // Handle both shapes: plain array OR { data: [...] }
          setPandits(Array.isArray(data) ? data : (data.data ?? []));
        }
      } catch (err) {
        console.error('Failed to load pandits:', err);
      } finally {
        setPanditsLoading(false);
      }
    };
    load();
  }, []);

  const [formData, setFormData] = useState({
    name:           '',
    description:    '',
    category:       'PROSPERITY',
    pandit:         '',   // holds a real MongoDB _id once user selects
    price:          '',
    duration:       '60',
    isActive:       true,
    includes:       [],
    availableSlots: [],
  });

  const [imageFile,    setImageFile]    = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageError,   setImageError]   = useState('');
  const [submitting,   setSubmitting]   = useState(false);
  const [submitError,  setSubmitError]  = useState('');
  const [submitted,    setSubmitted]    = useState(false);
  const [dragOver,     setDragOver]     = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileSelect = file => {
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
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = e => { e.preventDefault(); setDragOver(false); handleFileSelect(e.dataTransfer.files[0]); };

  const addSlot    = ()           => setFormData(p => ({ ...p, availableSlots: [...p.availableSlots, { datetime: '', isBooked: false, id: Date.now() }] }));
  const updateSlot = (i, updated) => setFormData(p => ({ ...p, availableSlots: p.availableSlots.map((s, idx) => idx === i ? updated : s) }));
  const removeSlot = i            => setFormData(p => ({ ...p, availableSlots: p.availableSlots.filter((_, idx) => idx !== i) }));

  const handleSubmit = async () => {
    setSubmitError('');
    if (!formData.name.trim())        return setSubmitError('Puja name is required.');
    if (!formData.description.trim()) return setSubmitError('Description is required.');
    if (!formData.price)              return setSubmitError('Price is required.');

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const fd = new FormData();

      fd.append('name',        formData.name.trim());
      fd.append('description', formData.description.trim());
      fd.append('category',    formData.category);
      fd.append('price',       formData.price);
      fd.append('duration',    formData.duration);
      fd.append('isActive',    String(formData.isActive));

      // ✅ Only append pandit when a real ObjectId is selected
      // Empty string → MongoDB ObjectId CastError
      if (formData.pandit) fd.append('pandit', formData.pandit);

      fd.append('includes',       JSON.stringify(formData.includes));
      fd.append('availableSlots', JSON.stringify(
        formData.availableSlots
          .filter(s => s.datetime)
          .map(s => ({
            date:      new Date(s.datetime).toISOString(),
            startTime: new Date(s.datetime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            isBooked:  s.isBooked,
          }))
      ));

      if (imageFile) fd.append('image', imageFile);

   
      const res = await fetch(`${API_BASE}/api/puja`, {
        method:  'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body:    fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create puja');
      setSubmitted(true);
    } catch (err) {
      console.error('createPuja error:', err);
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', category: 'PROSPERITY', pandit: '', price: '', duration: '60', isActive: true, includes: [], availableSlots: [] });
    removeImage();
    setSubmitError('');
    setSubmitted(false);
  };

  const complexity = () => {
    const d = parseInt(formData.duration) || 0;
    if (d <= 30) return 'Simple';
    if (d <= 90) return 'Standard';
    return 'Complex';
  };

  const selectedPanditName = pandits.find(p => p._id === formData.pandit)?.fullName
                          ?? pandits.find(p => p._id === formData.pandit)?.name
                          ?? 'Unassigned';

  /* ════════════════════ SUCCESS ════════════════════ */
{submitted && navigate('/pooja')}

  /* ════════════════════ FORM ════════════════════ */
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <motion.div animate={{ scale: [1,1.2,1], opacity: [0.3,0.6,0.3] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'fixed', top: -80, right: -80, width: 380, height: 380, borderRadius: '50%', pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(circle, rgba(255,98,0,0.09) 0%, transparent 65%)', filter: 'blur(60px)' }}
      />
      <motion.div animate={{ scale: [1,1.15,1], opacity: [0.25,0.5,0.25] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ position: 'fixed', bottom: -60, left: -60, width: 300, height: 300, borderRadius: '50%', pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(circle, rgba(255,140,58,0.07) 0%, transparent 65%)', filter: 'blur(50px)' }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto', padding: 'clamp(24px, 5vw, 48px) clamp(16px, 4vw, 32px)' }}>

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16,1,0.3,1] }} style={{ marginBottom: 36 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 9999, background: 'var(--accent-bg)', color: 'var(--primary)', border: '1px solid var(--accent-border)', marginBottom: 14 }}>
            <Sparkles size={10} /> Ritual Management
          </div>
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--text-heading)', lineHeight: 1.1, marginBottom: 10 }}>
            Add New Puja
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', maxWidth: 480, lineHeight: 1.65 }}>
            Craft a new divine manifestation path. Ensure all liturgical details are precise for the celestial alignment of the user.
          </p>
        </motion.div>

        <div className="puja-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 280px', gap: 24, alignItems: 'start' }}>

          {/* ══ LEFT ══ */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16,1,0.3,1] }} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            <div className="card" style={{ padding: '28px' }}>
              <SectionHeader icon={<FileText size={14} color="#fff" />} title="Basic Information" gradient />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <Field label="Puja Name">
                  <StyledInput icon={<Sparkles size={14} />} name="name" placeholder="e.g. Maha Lakshmi Abhishekam" value={formData.name} onChange={handleChange} />
                </Field>
                <Field label="Divine Description">
                  <TextArea name="description" placeholder="Describe the spiritual essence and benefits of this ritual..." value={formData.description} onChange={handleChange} rows={4} />
                </Field>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field label="Category Alignment">
                    <StyledSelect icon={<Zap size={14} />} name="category" value={formData.category} onChange={handleChange}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </StyledSelect>
                  </Field>
                  {/* ✅ Pandits from real DB — option values are genuine MongoDB ObjectIds */}
                  <Field label="Assigned Pandit">
                    <StyledSelect icon={<User size={14} />} name="pandit" value={formData.pandit} onChange={handleChange}>
                      <option value="">{panditsLoading ? 'Loading…' : 'Select Pandit'}</option>
                      {pandits.map(p => (
                        <option key={p._id} value={p._id}>
                          {p.fullName || p.name}
                        </option>
                      ))}
                    </StyledSelect>
                  </Field>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '28px' }}>
              <SectionHeader icon={<Zap size={14} style={{ color: 'var(--primary)' }} />} title="Ritual Parameters" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <Field label="Energy Exchange (Price ₹)">
                    <StyledInput icon={<DollarSign size={14} />} name="price" type="number" placeholder="0.00" value={formData.price} onChange={handleChange} />
                  </Field>
                  <Field label="Temporal Flow (Minutes)">
                    <StyledInput icon={<Clock size={14} />} name="duration" type="number" placeholder="60" value={formData.duration} onChange={handleChange} />
                  </Field>
                </div>
                <Field label="Sacred Inclusions (Tags)" hint="Type an item and press Enter">
                  <TagInput
                    tags={formData.includes}
                    onAdd={tag    => setFormData(p => ({ ...p, includes: [...p.includes, tag] }))}
                    onRemove={tag => setFormData(p => ({ ...p, includes: p.includes.filter(t => t !== tag) }))}
                    placeholder="e.g. FRESH FLOWERS"
                  />
                </Field>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '0.85rem', background: 'var(--bg-soft)', border: '1px solid var(--border-soft)' }}>
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-heading)' }}>Visibility State</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-soft)', marginTop: 2 }}>
                      {formData.isActive ? 'Live — visible to all seekers' : 'Draft — hidden from seekers'}
                    </div>
                  </div>
                  <Toggle checked={formData.isActive} onChange={v => setFormData(p => ({ ...p, isActive: v }))} />
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 18, borderBottom: '1px solid var(--border-soft)' }}>
                <SectionHeader icon={<Calendar size={14} style={{ color: 'var(--primary)' }} />} title="Auspicious Slots" noMargin />
                <motion.button type="button" onClick={addSlot} whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 9999, background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  <Plus size={12} /> Add Slot
                </motion.button>
              </div>
              {formData.availableSlots.length === 0 ? (
                <div style={{ padding: '28px', textAlign: 'center', borderRadius: '0.85rem', background: 'var(--bg-soft)', border: '1px dashed var(--border-soft)' }}>
                  <Calendar size={24} style={{ color: 'var(--text-soft)', margin: '0 auto 10px', display: 'block' }} />
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-soft)' }}>No slots yet. Add auspicious timing for this ritual.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <AnimatePresence>
                    {formData.availableSlots.map((slot, i) => (
                      <SlotRow key={slot.id} slot={slot} onChange={updated => updateSlot(i, updated)} onRemove={() => removeSlot(i)} />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

          </motion.div>

          {/* ══ RIGHT ══ */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.16,1,0.3,1] }} style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 24 }}>

            <div className="card" style={{ padding: '24px' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-soft)', marginBottom: 14 }}>
                Celestial Visual
              </p>
              {imagePreview ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ position: 'relative' }}>
                  <img src={imagePreview} alt="Puja preview" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '0.85rem', display: 'block' }} />
                  <div style={{ position: 'absolute', bottom: 8, left: 8, right: 40, background: 'rgba(0,0,0,0.6)', borderRadius: '0.5rem', padding: '4px 8px', fontSize: '0.65rem', color: '#fff', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {imageFile?.name}
                  </div>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={removeImage}
                    style={{ position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <X size={13} />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  animate={{ borderColor: dragOver ? 'rgba(255,98,0,0.55)' : 'rgba(200,180,170,0.3)', background: dragOver ? 'var(--accent-bg)' : 'var(--bg-soft)' }}
                  style={{ aspectRatio: '4/3', borderRadius: '0.85rem', border: '2px dashed', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer', transition: 'all 0.2s ease' }}
                >
                  <motion.div animate={{ y: dragOver ? -6 : 0 }} style={{ width: 44, height: 44, borderRadius: '0.85rem', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Upload size={18} style={{ color: 'var(--primary)' }} />
                  </motion.div>
                  <div style={{ textAlign: 'center', padding: '0 12px' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>Drop sacred imagery here</p>
                    <p style={{ fontSize: '0.68rem', color: 'var(--text-soft)' }}>Sent to backend → Cloudinary</p>
                    <p style={{ fontSize: '0.65rem', color: 'var(--text-soft)', marginTop: 3 }}>JPG, PNG, WEBP · Max 10 MB</p>
                  </div>
                </motion.div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFileSelect(e.target.files[0])} />
              {imageError && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 10, padding: '8px 12px', borderRadius: '0.65rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <AlertCircle size={13} style={{ color: '#ef4444', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.72rem', color: '#ef4444', fontWeight: 600 }}>{imageError}</span>
                </motion.div>
              )}
              {!imagePreview && (
                <motion.button type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => fileInputRef.current?.click()}
                  style={{ width: '100%', marginTop: 12, padding: '9px', borderRadius: '0.75rem', background: 'transparent', border: '1px solid var(--accent-border)', color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                >
                  <Image size={13} /> Browse Files
                </motion.button>
              )}
            </div>

            <div className="card" style={{ padding: '24px' }}>
              <p style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: 14 }}>
                Final Submission
              </p>
              {[
                { label: 'Complexity', value: complexity() },
                { label: 'Pandit',     value: formData.pandit ? selectedPanditName : 'Unassigned' },
                { label: 'Visibility', value: formData.isActive ? 'Active' : 'Draft' },
                { label: 'Image',      value: imageFile ? '✓ Ready' : 'None' },
                { label: 'Slots',      value: formData.availableSlots.length > 0 ? `${formData.availableSlots.length} added` : 'None' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-soft)', fontWeight: 600 }}>{label}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: value === '✓ Ready' ? 'var(--primary)' : 'var(--text-heading)' }}>{value}</span>
                </div>
              ))}
              <AnimatePresence>
                {submitError && (
                  <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 7, margin: '12px 0', padding: '10px 12px', borderRadius: '0.65rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                  >
                    <AlertCircle size={13} style={{ color: '#ef4444', flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: '0.72rem', color: '#ef4444', fontWeight: 600, lineHeight: 1.5 }}>{submitError}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div style={{ height: 1, background: 'var(--border-soft)', margin: '14px 0' }} />
              <motion.button
                whileHover={{ scale: 1.03, y: -2, boxShadow: '0 0 28px rgba(255,98,0,0.28)' }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                disabled={submitting}
                className="btn-primary"
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, position: 'relative', overflow: 'hidden', opacity: submitting ? 0.75 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}
              >
                {!submitting && (
                  <motion.span
                    animate={{ x: ['-100%','200%'] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'linear', repeatDelay: 1.2 }}
                    style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.18) 50%, transparent 80%)' }}
                  />
                )}
                {submitting ? (
                  <>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff' }}
                    />
                    Manifesting...
                  </>
                ) : (
                  <><Sparkles size={14} /> Finalize Manifestation</>
                )}
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={resetForm}
                style={{ width: '100%', marginTop: 8, padding: '9px', borderRadius: 9999, background: 'transparent', border: '1px solid var(--border-soft)', color: 'var(--text-muted)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
              >
                Reset Form
              </motion.button>
            </div>

            <motion.div whileHover={{ y: -3 }} style={{ padding: '14px 16px', borderRadius: '0.85rem', background: 'var(--accent-bg)', border: '1px solid var(--accent-border)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <Sparkles size={13} style={{ color: 'var(--primary)', marginTop: 2, flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: 5 }}>Editor Guidance</p>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  Pujas categorized as 'Prosperity' automatically generate a lunar-synced notification for all Premium tier users.
                </p>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .puja-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}