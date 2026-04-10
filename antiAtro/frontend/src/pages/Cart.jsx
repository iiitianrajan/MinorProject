import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Trash2, ShoppingCart, Plus, Minus, X,
  Zap, ShieldCheck, ArrowRight, Quote, Tag, ChevronRight
} from 'lucide-react';
import { usePayment } from '../contexts/PaymentContext';

/* ─── Section Label ─── */
const SLabel = ({ children }) => (
  <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-1" style={{ color: 'var(--primary)' }}>
    {children}
  </p>
);

/* ─── Suggested / Soul Match items (static) ─── */
const soulMatches = [
  { name: 'Sacred Palo Santo Set', price: 18, image: '🪵' },
  { name: 'Moonlight Incense', price: 24, image: '🌙' },
  { name: 'Crystal Singing Bowl', price: 55, image: '🎵' },
  { name: 'Amethyst Pendant', price: 32, image: '💜' },
];

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
    clearCart,
  } = useCart();

  const { startPayment } = usePayment();

  /* ── Empty state ── */
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--bg)' }}>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="card text-center"
          style={{ maxWidth: 380, padding: '3rem 2rem' }}
        >
          {/* Glow icon */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mx-auto mb-6"
            style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}
          >
            🛒
          </motion.div>
          <SLabel>Your Sanctuary</SLabel>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-heading)' }}>
            Your cart is empty
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Add some sacred products to get started ✨
          </p>
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="btn-primary flex items-center gap-2 mx-auto"
          >
            Start Exploring <ArrowRight size={14} />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const estimatedShipping = totalPrice > 500 ? 0 : 99;
  const taxes = Math.round(totalPrice * 0.08);
  const grandTotal = totalPrice + estimatedShipping + taxes;

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <section className="section" style={{ paddingTop: '3rem', paddingBottom: '4rem' }}>
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Page Header ── */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <SLabel>Your Sanctuary</SLabel>
            <div className="flex items-baseline gap-3">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: 'var(--text-heading)' }}>
                Your Celestial Cart
              </h1>
              <span
                className="text-base font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                ({cart.length} item{cart.length !== 1 ? 's' : ''})
              </span>
            </div>
          </motion.div>

          {/* ── Two-column layout ── */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ═══ LEFT COLUMN ═══ */}
            <div className="flex-1 min-w-0 space-y-6">

              {/* Cart Items */}
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <AnimatePresence>
                  {cart.map((item, i) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 32, scale: 0.96 }}
                      transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-start gap-4 p-5 group"
                      style={{
                        borderBottom: i < cart.length - 1 ? '1px solid var(--border-soft)' : 'none',
                      }}
                    >
                      {/* Image */}
                      <motion.div
                        whileHover={{ scale: 1.06, rotate: 3 }}
                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 overflow-hidden"
                        style={{ background: 'var(--bg-soft)', border: '1px solid var(--border-soft)' }}
                      >
                        <img src={item.image} alt="" />
                      </motion.div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3
                              className="font-semibold text-base leading-snug truncate"
                              style={{ color: 'var(--primary)' }}
                            >
                              {item.name}
                            </h3>
                            <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                              {item.description || 'A sacred artifact to elevate your spiritual journey.'}
                            </p>
                          </div>
                          <p className="text-base font-bold flex-shrink-0" style={{ color: 'var(--text-heading)' }}>
                            ₹{item.price * item.qty}
                          </p>
                        </div>

                        {/* Qty controls + Remove */}
                        <div className="flex items-center justify-between mt-3">
                          {/* Qty stepper */}
                          <div
                            className="flex items-center gap-0 rounded-full overflow-hidden"
                            style={{
                              background: 'var(--bg-soft)',
                              border: '1px solid var(--border-soft)',
                            }}
                          >
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => decreaseQty(item._id)}
                              className="w-8 h-8 flex items-center justify-center border-0 bg-transparent transition-all"
                              style={{ color: 'var(--text-muted)' }}
                            >
                              <Minus size={12} />
                            </motion.button>
                            <motion.span
                              key={item.qty}
                              initial={{ scale: 1.3, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="w-8 text-center text-sm font-bold"
                              style={{ color: 'var(--text-heading)' }}
                            >
                              {item.qty}
                            </motion.span>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => increaseQty(item._id)}
                              className="w-8 h-8 flex items-center justify-center border-0 bg-transparent transition-all"
                              style={{ color: 'var(--text-muted)' }}
                            >
                              <Plus size={12} />
                            </motion.button>
                          </div>

                          {/* Remove */}
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item._id)}
                            className="flex items-center gap-1.5 text-xs font-medium border-0 bg-transparent transition-all"
                            style={{ color: 'var(--text-soft)' }}
                          >
                            <Trash2 size={12} /> Remove
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Clear cart link */}
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={clearCart}
                  className="flex items-center gap-1.5 text-xs font-semibold border-0 bg-transparent"
                  style={{ color: 'var(--text-soft)' }}
                >
                  <Trash2 size={12} /> Clear all items
                </motion.button>
              </div>

              {/* ── Soul Matches ── */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap size={14} style={{ color: 'var(--primary)' }} />
                  <h3 className="text-base font-bold" style={{ color: 'var(--text-heading)' }}>
                    Soul Matches
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {soulMatches.map((match, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 + 0.2 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="card flex items-center gap-3 cursor-pointer"
                      style={{ padding: '0.875rem 1rem' }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                        style={{ background: 'var(--bg-soft)' }}
                      >
                        {match.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-heading)' }}>
                          {match.name}
                        </p>
                        <p className="text-xs font-bold mt-0.5" style={{ color: 'var(--primary)' }}>
                          ₹{match.price}
                        </p>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}
                      >
                        <Plus size={13} style={{ color: 'var(--primary)' }} />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* ── Celestial Wisdom Quote ── */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card-soft text-center relative overflow-hidden"
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(255,98,0,0.04) 0%, transparent 70%)',
                  }}
                />
                <Quote
                  size={28}
                  className="mx-auto mb-3"
                  style={{ color: 'var(--accent-border)' }}
                />
                <p
                  className="text-sm italic leading-relaxed max-w-sm mx-auto"
                  style={{ color: 'var(--text-muted)' }}
                >
                  "As you clear your physical space, you create a vessel for universal abundance to flow freely into your life."
                </p>
                <p
                  className="text-[10px] font-bold uppercase tracking-widest mt-4"
                  style={{ color: 'var(--text-soft)' }}
                >
                  Celestial Wisdom
                </p>
              </motion.div>
            </div>

            {/* ═══ RIGHT COLUMN — Order Summary ═══ */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-80 flex-shrink-0"
            >
              <div className="card sticky top-6" style={{ padding: '1.75rem' }}>

                {/* Summary heading */}
                <h3
                  className="text-xl font-bold mb-5"
                  style={{ color: 'var(--text-heading)' }}
                >
                  Order Summary
                </h3>

                {/* Line items */}
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                    <span className="font-semibold" style={{ color: 'var(--text-heading)' }}>₹{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--text-muted)' }}>Estimated Shipping</span>
                    {estimatedShipping === 0 ? (
                      <span className="font-semibold text-green-600">Free</span>
                    ) : (
                      <motion.button
                        whileHover={{ x: 2 }}
                        className="font-semibold border-0 bg-transparent text-sm"
                        style={{ color: 'var(--primary)' }}
                      >
                        Calculate
                      </motion.button>
                    )}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: 'var(--text-muted)' }}>Taxes</span>
                    <span className="font-semibold" style={{ color: 'var(--text-heading)' }}>₹{taxes}</span>
                  </div>
                </div>

                {/* Total */}
                <div
                  className="pt-4 mb-5"
                  style={{ borderTop: '1px solid var(--border-soft)' }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-widest mb-1"
                    style={{ color: 'var(--text-soft)' }}
                  >
                    Total Balance
                  </p>
                  <div className="flex items-baseline gap-2">
                    <p
                      className="text-3xl font-bold"
                      style={{ color: 'var(--text-heading)' }}
                    >
                      ₹{grandTotal}
                    </p>
                    <span className="text-xs font-semibold" style={{ color: 'var(--text-soft)' }}>INR</span>
                  </div>
                </div>

                {/* CTA */}
                
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-sm mb-2 cursor-pointer"
                  style={{ padding: '0.9rem 1.5rem', borderRadius: '1rem' }}
                  onClick={() =>
                    
                    startPayment(totalPrice)
                  }
                >
                  Proceed to Checkout <ArrowRight size={15} />
                </motion.button>

                <p
                  className="text-center text-[10px] leading-relaxed mb-5"
                  style={{ color: 'var(--text-soft)' }}
                >
                  Guaranteed secure celestial checkout · StellarNetworks
                </p>

                {/* Promo code */}
                <div
                  className="mb-5 pb-5"
                  style={{ borderBottom: '1px solid var(--border-soft)' }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Tag size={13} style={{ color: 'var(--primary)' }} />
                    <span className="text-xs font-semibold" style={{ color: 'var(--text-heading)' }}>
                      Apply Sacred Code
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 text-sm px-3 py-2 rounded-xl border-0 outline-none"
                      style={{
                        background: 'var(--bg-soft)',
                        color: 'var(--text)',
                        border: '1px solid var(--border-soft)',
                      }}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 rounded-xl text-sm font-bold border-0"
                      style={{
                        background: 'var(--text-heading)',
                        color: 'var(--bg-elevated)',
                      }}
                    >
                      Apply
                    </motion.button>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="space-y-2.5">
                  {[
                    { icon: ShieldCheck, label: 'Authenticity & Intention Guaranteed' },
                    { icon: Sparkles, label: 'Eco-Conscious Sacred Packaging' },
                  ].map(({ icon: Icon, label }, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'var(--accent-bg)' }}
                      >
                        <Icon size={13} style={{ color: 'var(--primary)' }} />
                      </div>
                      <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;