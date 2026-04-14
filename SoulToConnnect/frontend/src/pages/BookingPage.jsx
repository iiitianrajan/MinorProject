// pages/BookingPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Clock, MapPin, User, Phone, MessageSquare,
  CheckCircle, ArrowLeft, Sparkles, CreditCard, Loader2,
  ChevronDown, ChevronUp, AlertCircle,
} from 'lucide-react';

/* ─── helpers ─── */
const API = import.meta.env.VITE_API_URL;

const formatDateLabel = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

/*  Group future, unbooked slots by calendar date.
    FIX: compare date-only (midnight) so today's slots aren't excluded  */
const groupSlotsByDate = (slots = []) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // strip time component
  const map = {};

  slots
    .filter(s => !s.isBooked && new Date(s.date) >= today)
    .forEach(s => {
      const key = new Date(s.date).toDateString();
      if (!map[key]) map[key] = { label: formatDateLabel(s.date), slots: [] };
      map[key].slots.push(s);
    });

  return Object.values(map);
};

/* ─── sub-components ─── */
const PageContainer = ({ children, className = '' }) => (
  <div className={`w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const SlotButton = ({ slot, selected, onSelect }) => (
  <motion.button
    whileHover={{ scale: 1.06, y: -2 }}
    whileTap={{ scale: 0.96 }}
    onClick={() => onSelect(slot)}
    className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200 cursor-pointer ${
      selected
        ? 'text-white border-transparent shadow-[0_4px_14px_rgba(255,98,0,0.35)]'
        : 'bg-[var(--bg-elevated)] text-[var(--text)] border-[var(--border-soft)] hover:border-[var(--accent-border)]'
    }`}
    style={selected ? { background: 'var(--gradient-primary)' } : {}}
  >
    {slot.startTime}
  </motion.button>
);

const FormInput = ({ label, icon: Icon, error, ...props }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-soft)]">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <Icon size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-soft)]" />
      )}
      <input
        {...props}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 rounded-xl text-sm border bg-[var(--bg-elevated)] text-[var(--text)] placeholder:text-[var(--text-soft)] outline-none transition-all duration-200 ${
          error
            ? 'border-red-500 focus:border-red-500'
            : 'border-[var(--border-soft)] focus:border-[var(--accent-border)]'
        }`}
      />
    </div>
    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
  </div>
);

/* ════════════════════════════
   MAIN COMPONENT
════════════════════════════ */
export default function BookingPage() {
  const { id }   = useParams();
  const navigate = useNavigate();

  const [puja,         setPuja]         = useState(null);
  const [loading,      setLoading]      = useState(true);
  const [fetchError,   setFetchError]   = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [openDate,     setOpenDate]     = useState(null);
  const [submitting,   setSubmitting]   = useState(false);
  const [success,      setSuccess]      = useState(false);
  const [bookingRef,   setBookingRef]   = useState('');
  const [errors,       setErrors]       = useState({});

  const [form, setForm] = useState({ name: '', phone: '', specialRequest: '' });

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/login'); return; }

        const res = await fetch(`${API}/api/puja/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const contentType = res.headers.get('content-type') || '';
        if (!res.ok || !contentType.includes('application/json')) {
          throw new Error(`Failed to load puja (${res.status})`);
        }

        const data = await res.json();
        setPuja(data);

        const groups = groupSlotsByDate(data.availableSlots || []);
        if (groups.length) setOpenDate(groups[0].label);
      } catch (err) {
        console.error('BookingPage fetch error:', err);
        setFetchError(err.message || 'Could not load puja details.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, navigate]);

  const dateGroups = puja ? groupSlotsByDate(puja.availableSlots || []) : [];

  const validate = () => {
    const e = {};
    if (!selectedSlot)
      e.slot  = 'Please select a time slot';
    if (!form.name.trim())
      e.name  = 'Name is required';
    if (!/^\d{10}$/.test(form.phone.replace(/[\s\-]/g, '')))
      e.phone = 'Enter a valid 10-digit phone number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setErrors({});

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${API}/api/bookings`, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:  `Bearer ${token}`,
        },
        body: JSON.stringify({
          pujaId:         id,
          slotId:         selectedSlot._id,
          name:           form.name.trim(),
          phone:          form.phone.replace(/[\s\-]/g, '').trim(),
          specialRequest: form.specialRequest.trim(),
        }),
      });

      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await res.json()
        : { message: `Server error ${res.status}` };

      if (!res.ok) throw new Error(data.message || 'Booking failed');

      setBookingRef(data.booking._id);
      setSuccess(true);
    } catch (err) {
      console.error('handleSubmit error:', err);
      setErrors({ submit: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  /* ────────── SUCCESS SCREEN ────────── */
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: [0.16, 1, 0.3, 1] }}
          className="card text-center max-w-md w-full py-14"
        >
          <motion.div
            animate={{ scale: [0, 1.18, 1] }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <CheckCircle size={36} className="text-white" />
          </motion.div>

          <h2 className="text-2xl font-bold mb-2 text-[var(--text-heading)]">Booking Confirmed!</h2>
          <p className="text-sm text-[var(--text-muted)] mb-1">
            A notification has been sent to your phone.
          </p>
          <p className="text-xs text-[var(--text-soft)] mb-8 font-mono break-all">
            Ref: {bookingRef}
          </p>

          <div className="bg-[var(--bg-elevated)] rounded-2xl p-5 mb-8 text-left space-y-3">
            <div className="flex items-center gap-3">
              <Calendar size={15} className="text-[var(--primary)]" />
              <span className="text-sm text-[var(--text)]">{formatDateLabel(selectedSlot.date)}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock size={15} className="text-[var(--primary)]" />
              <span className="text-sm text-[var(--text)]">{selectedSlot.startTime}</span>
            </div>
            {puja?.location?.city && (
              <div className="flex items-center gap-3">
                <MapPin size={15} className="text-[var(--primary)]" />
                <span className="text-sm text-[var(--text)]">
                  {[puja.location.city, puja.location.state].filter(Boolean).join(', ')}
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/profile/bookings')}
              className="flex-1 btn-primary py-3 text-sm"
            >
              My Bookings
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/pooja')}
              className="flex-1 py-3 text-sm rounded-full border border-[var(--border-soft)] text-[var(--text-heading)] hover:bg-[var(--accent-bg)] hover:border-[var(--accent-border)] transition-all duration-200"
            >
              Browse More
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ────────── SKELETON ────────── */
  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-20">
        <PageContainer>
          <div className="grid md:grid-cols-[1fr_380px] gap-8 animate-pulse">
            <div className="space-y-4">
              <div className="h-6 rounded-full bg-[var(--bg-high)] w-1/3" />
              <div className="h-48 rounded-2xl bg-[var(--bg-high)]" />
              <div className="h-48 rounded-2xl bg-[var(--bg-high)]" />
            </div>
            <div className="h-80 rounded-2xl bg-[var(--bg-high)]" />
          </div>
        </PageContainer>
      </div>
    );
  }

  /* ────────── FETCH ERROR ────────── */
  if (fetchError || !puja) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <AlertCircle size={36} className="text-red-500" />
        <p className="text-[var(--text-muted)] text-center">{fetchError || 'Puja not found.'}</p>
        <motion.button
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          onClick={() => navigate(-1)}
          className="btn-primary px-6 py-2.5 text-sm flex items-center gap-2"
        >
          <ArrowLeft size={14} /> Go Back
        </motion.button>
      </div>
    );
  }

  /* ────────── MAIN VIEW ────────── */
  return (
    <div className="min-h-screen pt-24 pb-20 overflow-x-hidden">
      <PageContainer>

        <motion.button
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--primary)] mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft size={15} /> Back
        </motion.button>

        <div className="grid md:grid-cols-[1fr_380px] gap-8 items-start">

          {/* ══ LEFT COLUMN ══ */}
          <div className="space-y-6">

            {/* Puja summary card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="card !p-0 overflow-hidden"
            >
              <div className="flex gap-4 p-5">
                <img
                  src={puja.image || 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&q=80'}
                  alt={puja.name}
                  className="w-20 h-20 rounded-2xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span
                    className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-1.5 inline-block"
                    style={{ background: 'var(--gradient-primary)', color: '#fff' }}
                  >
                    {puja.category}
                  </span>
                  <h2 className="font-bold text-base text-[var(--text-heading)] mb-1 leading-snug">
                    {puja.name}
                  </h2>
                  <div className="flex items-center gap-3 text-xs text-[var(--text-soft)]">
                    <span className="flex items-center gap-1">
                      <Clock size={11} className="text-[var(--primary)]" /> {puja.duration} mins
                    </span>
                    <span className="font-bold text-[var(--text-heading)]">₹{puja.price}</span>
                  </div>
                </div>
              </div>

              {(puja.location?.city || puja.location?.address || puja.location?.state) && (
                <div className="px-5 pb-4 flex items-start gap-2 text-sm text-[var(--text-muted)] border-t border-[var(--border-soft)] pt-4">
                  <MapPin size={14} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                  <span>
                    {[puja.location.address, puja.location.city, puja.location.state]
                      .filter(Boolean)
                      .join(', ')}
                  </span>
                </div>
              )}

              {puja.description && (
                <div className="px-5 pb-5 text-sm text-[var(--text-muted)] leading-relaxed">
                  {puja.description}
                </div>
              )}
            </motion.div>

            {/* ── Slot selection ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 }}
              className="card"
            >
              <h3 className="font-semibold text-base mb-1 text-[var(--text-heading)] flex items-center gap-2">
                <Calendar size={16} className="text-[var(--primary)]" />
                Select Date & Time
              </h3>
              <p className="text-xs text-[var(--text-soft)] mb-4">
                {dateGroups.length > 0
                  ? `${dateGroups.reduce((a, g) => a + g.slots.length, 0)} slot${dateGroups.reduce((a, g) => a + g.slots.length, 0) !== 1 ? 's' : ''} available`
                  : 'No available slots at this time'}
              </p>

              {errors.slot && (
                <div className="flex items-center gap-2 text-xs text-red-500 mb-3 p-2.5 bg-red-500/10 rounded-xl">
                  <AlertCircle size={13} /> {errors.slot}
                </div>
              )}

              {dateGroups.length === 0 ? (
                <div className="text-center py-8 rounded-2xl border border-dashed border-[var(--border-soft)]">
                  <Calendar size={28} className="mx-auto mb-3 text-[var(--text-soft)]" />
                  <p className="text-sm text-[var(--text-muted)] font-medium">No available slots</p>
                  <p className="text-xs text-[var(--text-soft)] mt-1">
                    All slots are booked or in the past. Check back later.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {dateGroups.map((group) => (
                    <div key={group.label} className="rounded-2xl border border-[var(--border-soft)] overflow-hidden">
                      <button
                        onClick={() => setOpenDate(openDate === group.label ? null : group.label)}
                        className="w-full flex items-center justify-between p-3.5 bg-[var(--bg-elevated)] hover:bg-[var(--accent-bg)] transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Calendar size={13} className="text-[var(--primary)]" />
                          <span className="text-sm font-semibold text-[var(--text-heading)]">
                            {group.label}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--accent-bg)] text-[var(--primary)] border border-[var(--accent-border)]">
                            {group.slots.length} slot{group.slots.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                        {openDate === group.label
                          ? <ChevronUp size={14} className="text-[var(--text-soft)]" />
                          : <ChevronDown size={14} className="text-[var(--text-soft)]" />}
                      </button>

                      <AnimatePresence>
                        {openDate === group.label && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-wrap gap-2.5 p-4">
                              {group.slots.map(slot => (
                                <SlotButton
                                  key={slot._id}
                                  slot={slot}
                                  selected={selectedSlot?._id === slot._id}
                                  onSelect={setSelectedSlot}
                                />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              )}

              <AnimatePresence>
                {selectedSlot && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-4 flex items-center gap-3 p-3.5 rounded-xl border border-[var(--accent-border)] bg-[var(--accent-bg)]"
                  >
                    <CheckCircle size={15} className="text-[var(--primary)] flex-shrink-0" />
                    <div className="text-xs">
                      <span className="font-semibold text-[var(--primary)]">Selected: </span>
                      <span className="text-[var(--text-muted)]">
                        {formatDateLabel(selectedSlot.date)} at {selectedSlot.startTime}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ── Booker details form ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16 }}
              className="card space-y-4"
            >
              <h3 className="font-semibold text-base text-[var(--text-heading)] flex items-center gap-2">
                <User size={16} className="text-[var(--primary)]" />
                Your Details
              </h3>

              <FormInput
                label="Full Name"
                icon={User}
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                error={errors.name}
              />

              <FormInput
                label="Phone Number"
                icon={Phone}
                type="tel"
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                error={errors.phone}
              />

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[var(--text-soft)]">
                  Special Request (optional)
                </label>
                <div className="relative">
                  <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-[var(--text-soft)]" />
                  <textarea
                    rows={3}
                    placeholder="Any special requirements or intentions…"
                    value={form.specialRequest}
                    onChange={e => setForm({ ...form, specialRequest: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm border border-[var(--border-soft)] bg-[var(--bg-elevated)] text-[var(--text)] placeholder:text-[var(--text-soft)] outline-none focus:border-[var(--accent-border)] transition-all duration-200 resize-none"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="sticky top-24 space-y-4"
          >
            <div className="card space-y-4">
              <h3 className="font-semibold text-base text-[var(--text-heading)]">Order Summary</h3>

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Ritual</span>
                  <span className="text-[var(--text)] font-medium truncate max-w-[55%] text-right">
                    {puja.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Category</span>
                  <span className="text-[var(--text)]">{puja.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Duration</span>
                  <span className="text-[var(--text)]">{puja.duration} mins</span>
                </div>

                {selectedSlot ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">Date</span>
                      <span className="text-[var(--text)] text-right max-w-[60%]">
                        {new Date(selectedSlot.date).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--text-muted)]">Time</span>
                      <span className="text-[var(--text)]">{selectedSlot.startTime}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Slot</span>
                    <span className="text-[var(--text-soft)] italic text-xs">Not selected</span>
                  </div>
                )}

                {puja.location?.city && (
                  <div className="flex justify-between">
                    <span className="text-[var(--text-muted)]">Location</span>
                    <span className="text-[var(--text)]">
                      {[puja.location.city, puja.location.state].filter(Boolean).join(', ')}
                    </span>
                  </div>
                )}

                <div className="h-px bg-[var(--border-soft)]" />
                <div className="flex justify-between font-bold text-base">
                  <span className="text-[var(--text-heading)]">Total</span>
                  <span style={{ color: 'var(--primary)' }}>₹{puja.price}</span>
                </div>
              </div>
            </div>

            <div className="card space-y-3">
              <h3 className="font-semibold text-sm text-[var(--text-heading)] flex items-center gap-2">
                <CreditCard size={15} className="text-[var(--primary)]" />
                Payment
              </h3>
              <div className="rounded-xl border border-dashed border-[var(--border-soft)] p-4 text-center">
                <p className="text-xs text-[var(--text-soft)] mb-1">
                  Payment gateway integration coming soon
                </p>
                <p className="text-[10px] text-[var(--text-soft)] opacity-60">
                  Currently booking as Pay-at-Venue
                </p>
              </div>
            </div>

            {errors.submit && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20"
              >
                <AlertCircle size={13} className="text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-500 font-medium">{errors.submit}</p>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: submitting ? 1 : 1.03, y: submitting ? 0 : -2 }}
              whileTap={{ scale: submitting ? 1 : 0.97 }}
              onClick={handleSubmit}
              disabled={submitting || dateGroups.length === 0}
              className="w-full btn-primary flex items-center justify-center gap-2.5 py-4 text-base cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Confirming…
                </>
              ) : dateGroups.length === 0 ? (
                'No Slots Available'
              ) : (
                <>
                  <Sparkles size={16} /> Confirm Booking
                </>
              )}
            </motion.button>

            <p className="text-[10px] text-center text-[var(--text-soft)]">
              By booking you agree to our terms of service
            </p>
          </motion.div>
        </div>
      </PageContainer>
    </div>
  );
}