import React, { useState, useEffect } from 'react';
import { X, Wallet as WalletIcon, CheckCircle, Lock, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePayment } from '../../contexts/PaymentContext';

const AMOUNTS = [50, 100, 200, 500, 1000, 2000];

const WalletModal = ({ isOpen, onClose }) => {
   const { startPayment } = usePayment();
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

 

  const activeAmount = customAmount ? Number(customAmount) : amount;



  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: 'rgba(26,28,26,0.5)', backdropFilter: 'blur(12px)' }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 24 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
          className="w-full max-w-md overflow-hidden relative"
          style={{
            background: 'var(--bg-elevated)',
            borderRadius: '1.75rem',
            border: '1px solid var(--border-soft)',
            boxShadow: '0 40px 80px rgba(26,28,26,0.12)',
          }}
        >
          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-10 cursor-pointer"
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--bg-soft)',
              border: '1px solid var(--border-soft)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={14} style={{ color: 'var(--text-muted)' }} />
          </motion.button>

          <AnimatePresence mode="wait">
            {success ? (
              /* ── SUCCESS STATE ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 px-8 text-center"
              >
                <motion.div
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                  style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}
                >
                  <CheckCircle size={36} color="white" />
                </motion.div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: 'var(--text-heading)', fontFamily: 'Poppins, sans-serif' }}
                >
                  Payment Successful!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                  ₹{activeAmount} has been added to your AstraTalk wallet.
                </p>
              </motion.div>
            ) : (
              /* ── MAIN STATE ── */
              <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Header */}
                <div className="text-center pt-8 pb-5 px-6">
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 320 }}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'var(--accent-bg)', border: '1px solid var(--accent-border)' }}
                  >
                    <WalletIcon size={22} style={{ color: 'var(--primary)' }} />
                  </motion.div>
                  <h2
                    className="font-bold mb-1"
                    style={{
                      color: 'var(--text-heading)',
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 20,
                      letterSpacing: '-0.03em',
                    }}
                  >
                    Add Money
                  </h2>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    Current Balance:{' '}
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>₹150.00</span>
                  </p>
                </div>

                <div className="px-6 pb-2">
                  {/* Amount grid */}
                  <div className="grid grid-cols-3 gap-2.5 mb-5">
                    {AMOUNTS.map((val) => (
                      <motion.button
                        key={val}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => { setAmount(val); setCustomAmount(''); }}
                        className="cursor-pointer font-bold"
                        style={{
                          padding: '11px 8px',
                          borderRadius: 14,
                          fontSize: 14,
                          fontFamily: 'Poppins, sans-serif',
                          transition: 'all 0.15s',
                          border: amount === val && !customAmount
                            ? '1.5px solid transparent'
                            : '1.5px solid var(--border-soft)',
                          background: amount === val && !customAmount
                            ? 'var(--gradient-primary)'
                            : 'var(--bg-soft)',
                          color: amount === val && !customAmount
                            ? 'white'
                            : 'var(--text-heading)',
                          boxShadow: amount === val && !customAmount
                            ? '0 6px 18px rgba(255,98,0,0.28)'
                            : 'none',
                        }}
                      >
                        ₹{val}
                      </motion.button>
                    ))}
                  </div>

                  {/* Custom input */}
                  <div className="mb-5">
                    <label
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--text-soft)',
                        display: 'block',
                        marginBottom: 8,
                      }}
                    >
                      Custom Amount
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span
                        style={{
                          position: 'absolute', left: 14, top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: 15, color: 'var(--text-soft)', fontWeight: 600,
                          pointerEvents: 'none',
                        }}
                      >
                        ₹
                      </span>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '13px 14px 13px 30px',
                          borderRadius: 14,
                          border: customAmount
                            ? '1.5px solid var(--primary-light)'
                            : '1.5px solid var(--border-soft)',
                          background: 'var(--bg-soft)',
                          fontSize: 15,
                          fontWeight: 600,
                          color: 'var(--text-heading)',
                          outline: 'none',
                          transition: 'all 0.2s',
                          fontFamily: 'inherit',
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = 'var(--primary-light)';
                          e.target.style.background = 'var(--bg-elevated)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'var(--border-soft)';
                          e.target.style.background = 'var(--bg-soft)';
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'var(--border-soft)', margin: '0 1.5rem' }} />

                {/* CTA */}
                <div className="px-6 pt-5 pb-4">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2, boxShadow: '0 18px 44px rgba(255,98,0,0.32)' }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() =>  startPayment(activeAmount)}
                    disabled={loading || (!customAmount && !amount)}
                    className="btn-primary w-full flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    style={{
                      padding: '15px',
                      fontSize: 15,
                      fontWeight: 700,
                      fontFamily: 'Poppins, sans-serif',
                      letterSpacing: '-0.01em',
                      borderRadius: 9999,
                    }}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          style={{
                            width: 16, height: 16, border: '2.5px solid rgba(255,255,255,0.3)',
                            borderTopColor: 'white', borderRadius: '50%',
                          }}
                        />
                        Processing…
                      </>
                    ) : (
                      < >
                      
                        Proceed to Pay ₹{activeAmount}
                        <ArrowRight size={16} />
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Security note */}
                <div
                  className="flex items-center justify-center gap-1.5 pb-5"
                  style={{ color: 'var(--text-soft)' }}
                >
                  <Lock size={11} />
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Secure Bank Encryption
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WalletModal;