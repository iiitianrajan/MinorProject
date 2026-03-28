import { useCart } from '../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trash2, ShoppingCart, Plus, Minus, X, Zap, Tag, ShieldCheck } from 'lucide-react';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    totalPrice,
    clearCart
  } = useCart();

  // ── Empty Cart ──
  if (cart.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(251,191,36,0.13) 0%, rgba(168,85,247,0.10) 50%, rgba(236,72,153,0.09) 100%), #f9f7ff',
        }}
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Glow ring around cart icon */}
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center text-5xl"
            style={{
              background: 'linear-gradient(135deg,rgba(251,191,36,0.18),rgba(168,85,247,0.18))',
              boxShadow: '0 0 40px rgba(168,85,247,0.2), 0 0 80px rgba(251,191,36,0.12)',
            }}
          >
            🛒
          </div>
          <h2
            className="text-2xl font-extrabold"
            style={{
              background: 'linear-gradient(90deg,#f59e0b,#a855f7,#ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            Your cart is empty
          </h2>
          <p className="text-gray-400 text-sm tracking-wide">Add some products to get started ✨</p>
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            className="mt-2 px-6 py-2 rounded-full text-xs font-bold text-white"
            style={{ background: 'linear-gradient(135deg,#fbbf24,#a855f7)' }}
          >
            Start Exploring
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-10"
      style={{
        background: 'radial-gradient(ellipse at 20% 10%, rgba(251,191,36,0.12) 0%, rgba(168,85,247,0.09) 50%, rgba(236,72,153,0.08) 100%), #f9f7ff',
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">

        {/* ── Page Header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center gap-3">
            {/* Pulsing glow dot */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg,#fbbf24,#a855f7)',
                boxShadow: '0 0 16px rgba(168,85,247,0.55)',
              }}
            >
              <ShoppingCart size={16} color="#fff" />
            </motion.div>
            <div>
              <h2
                className="text-2xl font-extrabold leading-none"
                style={{
                  background: 'linear-gradient(90deg,#f59e0b,#a855f7,#ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                Your Cart
              </h2>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mt-0.5">
                {cart.length} item{cart.length !== 1 ? 's' : ''} added
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearCart}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-red-500 border border-red-200 hover:bg-red-50 transition-colors duration-200"
          >
            <Trash2 size={13} /> Clear Cart
          </motion.button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">

          {/* ── LEFT: Cart Items ── */}
          <div className="md:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item, i) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40, scale: 0.95 }}
                  transition={{ delay: i * 0.06 }}
                  className="relative rounded-2xl p-[1.5px] overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg,rgba(251,191,36,0.4),rgba(168,85,247,0.3),rgba(236,72,153,0.25))',
                  }}
                >
                  {/* Inner card */}
                  <div
                    className="rounded-[14px] p-4 flex items-center gap-4"
                    style={{
                      background: 'rgba(255,255,255,0.94)',
                      backdropFilter: 'blur(16px)',
                    }}
                  >
                    {/* Product image / emoji */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg,rgba(251,191,36,0.15),rgba(168,85,247,0.15))',
                        boxShadow: '0 4px 14px rgba(168,85,247,0.18)',
                      }}
                    >
                      {item.image || '🔮'}
                    </motion.div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 truncate">{item.name}</h3>
                      <p
                        className="text-sm font-semibold mt-0.5"
                        style={{ color: '#a855f7' }}
                      >
                        ₹{item.price}
                        <span className="text-gray-400 font-normal text-xs"> / item</span>
                      </p>

                      {/* Qty controls */}
                      <div className="flex items-center gap-2 mt-2.5">
                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => decreaseQty(item._id)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-all"
                          style={{ background: 'linear-gradient(135deg,#f59e0b,#f97316)' }}
                        >
                          <Minus size={12} />
                        </motion.button>

                        <motion.span
                          key={item.qty}
                          initial={{ scale: 1.3, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="w-7 text-center font-extrabold text-gray-800 text-sm"
                        >
                          {item.qty}
                        </motion.span>

                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => increaseQty(item._id)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-all"
                          style={{ background: 'linear-gradient(135deg,#a855f7,#ec4899)' }}
                        >
                          <Plus size={12} />
                        </motion.button>
                      </div>
                    </div>

                    {/* Price + Remove */}
                    <div className="text-right flex-shrink-0">
                      <p
                        className="font-extrabold text-lg"
                        style={{
                          background: 'linear-gradient(135deg,#f59e0b,#ec4899)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        ₹{item.price * item.qty}
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item._id)}
                        className="mt-2 w-7 h-7 rounded-full flex items-center justify-center ml-auto"
                        style={{
                          background: 'rgba(239,68,68,0.1)',
                          color: '#ef4444',
                        }}
                      >
                        <X size={13} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* ── RIGHT: Summary ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="h-fit rounded-2xl p-[1.5px]"
            style={{
              background: 'linear-gradient(135deg,#fbbf24,#a855f7,#ec4899,#f97316)',
              boxShadow: '0 8px 40px rgba(168,85,247,0.2), 0 0 60px rgba(251,191,36,0.15)',
            }}
          >
            <div
              className="rounded-[14px] p-6"
              style={{
                background: 'rgba(255,255,255,0.96)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Summary header */}
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg,#fbbf24,#f97316)' }}
                >
                  <Tag size={13} color="#fff" />
                </div>
                <h3
                  className="font-extrabold text-base"
                  style={{
                    background: 'linear-gradient(90deg,#f59e0b,#a855f7)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  Price Details
                </h3>
              </div>

              {/* Rows */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total Items</span>
                  <span className="font-bold text-gray-800">{cart.length}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-800">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm text-green-600">
                  <span className="flex items-center gap-1"><Zap size={12} /> Discount</span>
                  <span className="font-bold">—</span>
                </div>
              </div>

              {/* Divider */}
              <div
                className="my-4 h-px rounded-full"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(168,85,247,0.3),transparent)' }}
              />

              <div className="flex justify-between items-center">
                <span className="font-extrabold text-gray-800">Total</span>
                <span
                  className="font-extrabold text-xl"
                  style={{
                    background: 'linear-gradient(135deg,#f59e0b,#ec4899)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  ₹{totalPrice}
                </span>
              </div>

              {/* Trust badge */}
              <div
                className="flex items-center gap-2 mt-4 px-3 py-2 rounded-xl text-xs text-green-700 font-semibold"
                style={{ background: 'rgba(34,197,94,0.08)' }}
              >
                <ShieldCheck size={14} className="text-green-500" />
                Secure & encrypted checkout
              </div>

              {/* CTA */}
              <motion.button
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                className="relative w-full mt-5 py-3 rounded-2xl font-bold text-sm tracking-wide text-white overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg,#fbbf24 0%,#f97316 40%,#ec4899 80%,#a855f7 100%)',
                  boxShadow: '0 8px 24px rgba(251,191,36,0.4), 0 4px 12px rgba(168,85,247,0.3)',
                }}
              >
                {/* Shimmer */}
                <motion.span
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: 'linear', repeatDelay: 1 }}
                  className="absolute inset-0 opacity-30 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg,transparent 20%,rgba(255,255,255,0.65) 50%,transparent 80%)',
                  }}
                />
                <span className="relative flex items-center justify-center gap-2">
                  <Sparkles size={15} />
                  Proceed to Checkout
                </span>
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Cart;