// pages/MyBookings.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Clock, MapPin, CheckCircle, XCircle,
  AlertCircle, ChevronRight, Loader2, Sparkles, History,
  CreditCard, Phone, MessageSquare,
} from 'lucide-react';

const API = import.meta.env.VITE_API_URL;

/* ─── helpers ─── */
const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
  });

const STATUS_CONFIG = {
  CONFIRMED: { icon: CheckCircle, color: 'text-green-500',  bg: 'bg-green-500/10',  label: 'Confirmed' },
  PENDING:   { icon: AlertCircle, color: 'text-yellow-500', bg: 'bg-yellow-500/10', label: 'Pending'   },
  CANCELLED: { icon: XCircle,     color: 'text-red-500',    bg: 'bg-red-500/10',    label: 'Cancelled' },
  COMPLETED: { icon: CheckCircle, color: 'text-blue-400',   bg: 'bg-blue-400/10',   label: 'Completed' },
};

/* ─── Expanded detail row ─── */
const DetailRow = ({ icon: Icon, label, value }) =>
  value ? (
    <div className="flex items-start gap-2.5">
      <Icon size={13} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
      <div className="text-xs">
        <span className="text-[var(--text-soft)] font-medium">{label}: </span>
        <span className="text-[var(--text)]">{value}</span>
      </div>
    </div>
  ) : null;

/* ─── BookingCard ─── */
const BookingCard = ({ booking, index, onCancel, isPast }) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const cfg        = STATUS_CONFIG[booking.status] || STATUS_CONFIG.PENDING;
  const StatusIcon = cfg.icon;

  /* Safely read nested fields — controller populates puja & user */
  const pujaName  = booking.puja?.name  || 'Puja Ritual';
  const pujaPrice = booking.puja?.price ?? '—';
  const pujaImg   = booking.puja?.image || 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&q=80';
  const pujaId    = booking.puja?._id;

  /* slot is stored as { slotId, date, startTime } in the Booking model */
  const slotDate  = booking.slot?.date;
  const slotTime  = booking.slot?.startTime;

  /* location snapshot stored directly on booking */
  const city    = booking.location?.city;
  const state   = booking.location?.state;
  const address = booking.location?.address;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`card transition-all duration-300 hover:shadow-lg ${isPast ? 'opacity-75' : ''}`}
    >
      {/* ── Main row ── */}
      <div className="flex gap-4">
        {/* Image */}
        <div
          className="flex-shrink-0 relative cursor-pointer"
          onClick={() => pujaId && navigate(`/book/${pujaId}`)}
        >
          <img
            src={pujaImg}
            alt={pujaName}
            className="w-16 h-16 rounded-2xl object-cover"
          />
          {isPast && (
            <div className="absolute inset-0 rounded-2xl bg-black/30 flex items-center justify-center">
              <History size={16} className="text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3
              className="font-semibold text-sm text-[var(--text-heading)] leading-snug truncate cursor-pointer hover:text-[var(--primary)] transition-colors"
              onClick={() => pujaId && navigate(`/book/${pujaId}`)}
            >
              {pujaName}
            </h3>
            {/* Status badge */}
            <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${cfg.color} ${cfg.bg}`}>
              <StatusIcon size={9} />
              {cfg.label}
            </span>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
            {slotDate && (
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-soft)]">
                <Calendar size={11} className="text-[var(--primary)]" />
                {formatDate(slotDate)}
              </div>
            )}
            {slotTime && (
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-soft)]">
                <Clock size={11} className="text-[var(--primary)]" />
                {slotTime}
              </div>
            )}
            {city && (
              <div className="flex items-center gap-1.5 text-xs text-[var(--text-soft)]">
                <MapPin size={11} className="text-[var(--primary)]" />
                {[city, state].filter(Boolean).join(', ')}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[var(--text-heading)]">
              ₹{pujaPrice}
            </span>

            <div className="flex items-center gap-2">
              {/* Cancel — only for upcoming + non-cancelled */}
              {!isPast && booking.status !== 'CANCELLED' && (
                <motion.button
                  whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
                  onClick={() => onCancel(booking._id)}
                  className="text-xs text-red-500 font-semibold border border-red-500/30 rounded-full px-3 py-1 hover:bg-red-500/10 transition-all cursor-pointer"
                >
                  Cancel
                </motion.button>
              )}

              {/* Expand toggle */}
              <motion.button
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }}
                onClick={() => setExpanded(e => !e)}
                className="text-xs text-[var(--text-soft)] font-medium flex items-center gap-1 hover:text-[var(--primary)] transition-colors cursor-pointer"
              >
                {expanded ? 'Less' : 'Details'}
                <ChevronRight
                  size={12}
                  className={`transition-transform ${expanded ? 'rotate-90' : ''}`}
                />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Expanded details panel ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-[var(--border-soft)] grid grid-cols-1 sm:grid-cols-2 gap-3">
              <DetailRow icon={Phone}         label="Phone"    value={booking.phone} />
              <DetailRow icon={CreditCard}    label="Payment"  value={booking.payment?.status} />
              <DetailRow icon={CreditCard}    label="Method"   value={booking.payment?.method} />
              {address && (
                <DetailRow icon={MapPin}      label="Address"  value={address} />
              )}
              {booking.specialRequest && (
                <div className="sm:col-span-2">
                  <DetailRow icon={MessageSquare} label="Request" value={booking.specialRequest} />
                </div>
              )}
              <div className="sm:col-span-2 flex items-center gap-2 text-[10px] text-[var(--text-soft)] font-mono">
                <span>Ref:</span>
                <span className="break-all">{booking._id}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Empty state ─── */
const EmptyState = ({ tab }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-center py-16 card"
  >
    <div className="text-5xl mb-4">{tab === 'upcoming' ? '🪔' : '📜'}</div>
    <h3 className="font-semibold text-base mb-1 text-[var(--text-heading)]">
      {tab === 'upcoming' ? 'No upcoming bookings' : 'No past bookings'}
    </h3>
    <p className="text-sm text-[var(--text-muted)]">
      {tab === 'upcoming'
        ? 'Browse our sacred rituals and book your first puja'
        : 'Your completed ceremonies will appear here'}
    </p>
  </motion.div>
);

/* ════════════════════════════
   MAIN COMPONENT
════════════════════════════ */
export default function MyBookings() {
  const navigate = useNavigate();

  const [upcoming,   setUpcoming]   = useState([]);
  const [past,       setPast]       = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [tab,        setTab]        = useState('upcoming');
  const [cancelling, setCancelling] = useState(null);
  const [fetchError, setFetchError] = useState('');

  /* ── fetch all bookings ──
     Route: GET /api/bookings/my
     Returns: { upcoming: [...], past: [...] }
     Each booking has: puja (populated), user (populated),
       slot: { slotId, date, startTime },
       location: { city, state, address },
       name, phone, specialRequest, status, payment  */
  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/login'); return; }

        const res = await fetch(`${API}/api/bookings/my`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const contentType = res.headers.get('content-type') || '';
        if (!res.ok || !contentType.includes('application/json')) {
          throw new Error(`Failed to load bookings (${res.status})`);
        }

        const data = await res.json();
        setUpcoming(data.upcoming || []);
        setPast(data.past || []);
      } catch (err) {
        console.error('MyBookings fetch error:', err);
        setFetchError(err.message || 'Could not load bookings.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [navigate]);

  /* ── cancel booking ──
     Route: PATCH /api/bookings/:id/cancel
     Controller re-opens the slot and sets status = 'CANCELLED'  */
  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    setCancelling(bookingId);

    try {
      const token = localStorage.getItem('token');
      const res   = await fetch(`${API}/api/bookings/${bookingId}/cancel`, {
        method:  'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });

      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json') ? await res.json() : {};

      if (!res.ok) throw new Error(data.message || 'Failed to cancel');

      // Move the booking from upcoming → past with updated status
      const target = upcoming.find(b => b._id === bookingId);
      setUpcoming(prev => prev.filter(b => b._id !== bookingId));
      if (target) {
        setPast(prev => [{ ...target, status: 'CANCELLED' }, ...prev]);
      }
    } catch (err) {
      alert(err.message || 'Failed to cancel booking');
    } finally {
      setCancelling(null);
    }
  };

  const displayed = tab === 'upcoming' ? upcoming : past;

  return (
    <div className="min-h-screen pt-2 ">
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">

        {/* ── Header ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-widest bg-[var(--accent-bg)] text-[var(--primary)] border border-[var(--accent-border)]">
            <Sparkles size={11} /> My Bookings
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-heading)] tracking-tight">
            Sacred Journey
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Your booked rituals and ceremonies
          </p>
        </motion.div>

        {/* ── Fetch error ── */}
        {fetchError && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mb-6 flex items-center gap-2 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-sm text-red-500"
          >
            <AlertCircle size={15} className="flex-shrink-0" />
            {fetchError}
          </motion.div>
        )}

        {/* ── Stats strip ── */}
        {!loading && !fetchError && (
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-3 gap-3 mb-6"
          >
            {[
              { label: 'Upcoming',  count: upcoming.length,                                          icon: Calendar,      color: 'var(--primary)' },
              { label: 'Completed', count: past.filter(b => b.status === 'COMPLETED').length,        icon: CheckCircle,   color: '#22c55e' },
              { label: 'Cancelled', count: [...upcoming, ...past].filter(b => b.status === 'CANCELLED').length, icon: XCircle, color: '#ef4444' },
            ].map((stat, i) => (
              <div key={i} className="card text-center py-4">
                <stat.icon size={18} className="mx-auto mb-1.5" style={{ color: stat.color }} />
                <p className="text-xl font-bold text-[var(--text-heading)]">{stat.count}</p>
                <p className="text-[10px] text-[var(--text-soft)] uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* ── Tabs ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="flex gap-2 mb-6 p-1 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-soft)]"
        >
          {[
            { key: 'upcoming', label: `Upcoming (${upcoming.length})` },
            { key: 'past',     label: `Past (${past.length})` },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                tab === t.key
                  ? 'text-white shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
              style={tab === t.key ? { background: 'var(--gradient-primary)' } : {}}
            >
              {t.label}
            </button>
          ))}
        </motion.div>

        {/* ── List ── */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-[var(--bg-high)]" />
                  <div className="flex-1 space-y-2.5">
                    <div className="h-4 rounded-full bg-[var(--bg-high)] w-3/4" />
                    <div className="h-3 rounded-full bg-[var(--bg-high)] w-1/2" />
                    <div className="h-3 rounded-full bg-[var(--bg-high)] w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : displayed.length === 0 ? (
          <EmptyState tab={tab} />
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {displayed.map((booking, i) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  index={i}
                  isPast={tab === 'past'}
                  onCancel={handleCancel}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* ── Browse CTA — only when no upcoming bookings ── */}
        {!loading && tab === 'upcoming' && upcoming.length === 0 && !fetchError && (
          <motion.button
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/pooja')}
            className="w-full btn-primary flex items-center justify-center gap-2.5 py-4 mt-6 cursor-pointer"
          >
            <Sparkles size={15} /> Browse Sacred Rituals
          </motion.button>
        )}

      </div>
    </div>
  );
}