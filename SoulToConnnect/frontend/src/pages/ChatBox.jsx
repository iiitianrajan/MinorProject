import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Send, Video, MoreVertical, Sparkles } from 'lucide-react';

const ChatBox = ({ astrologer, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  // ── Drag state ──
  const [position, setPosition] = useState({ x: null, y: null });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const rootRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Greeting
  useEffect(() => {
    setMessages([
      {
        sender: 'ai',
        text: `Hello! I am ${astrologer}. Ask me anything ✨`,
        time: new Date(),
      },
    ]);
  }, [astrologer]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // ── Drag handlers ──
  const onMouseDown = useCallback((e) => {
    if (e.target.closest('.cb-close-btn')) return;
    e.preventDefault();
    const rect = rootRef.current.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setDragging(true);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMouseMove = (e) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w = rootRef.current.offsetWidth;
      const h = rootRef.current.offsetHeight;
      let nx = Math.max(0, Math.min(e.clientX - dragOffset.current.x, vw - w));
      let ny = Math.max(0, Math.min(e.clientY - dragOffset.current.y, vh - h));
      setPosition({ x: nx, y: ny });
    };
    const onMouseUp = () => setDragging(false);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging]);

  const onTouchStart = useCallback((e) => {
    if (e.target.closest('.cb-close-btn')) return;
    const touch = e.touches[0];
    const rect = rootRef.current.getBoundingClientRect();
    dragOffset.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    setDragging(true);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onTouchMove = (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w = rootRef.current.offsetWidth;
      const h = rootRef.current.offsetHeight;
      let nx = Math.max(0, Math.min(touch.clientX - dragOffset.current.x, vw - w));
      let ny = Math.max(0, Math.min(touch.clientY - dragOffset.current.y, vh - h));
      setPosition({ x: nx, y: ny });
    };
    const onTouchEnd = () => setDragging(false);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [dragging]);

  const positionStyle =
    position.x !== null
      ? { bottom: 'auto', right: 'auto', left: position.x, top: position.y }
      : {};

  // 🎤 Speech Recognition
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { alert('Speech recognition not supported in your browser'); return; }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.start();
    recognition.onstart = () => setListening(true);
    recognition.onresult = (event) => setInput(event.results[0][0].transcript);
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { sender: 'user', text: input, time: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5001/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: data?.reply || '⚠️ No response from AI', time: new Date() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: '⚠️ Server not responding', time: new Date() },
      ]);
    }
    setLoading(false);
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div
      ref={rootRef}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 280, damping: 26 }}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 400,
        height: 580,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '1.75rem',
        overflow: 'hidden',
        cursor: dragging ? 'grabbing' : 'default',
        ...positionStyle,
      }}
      className="glass"
    >
      {/* Subtle background glow blobs — matches Hero section style */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,98,0,0.12) 0%, transparent 65%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.22, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute',
          bottom: 60,
          left: -30,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,140,58,0.09) 0%, transparent 65%)',
          filter: 'blur(35px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── HEADER ── */}
      <div
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 18px',
          borderBottom: '1px solid var(--border-soft)',
          background: 'var(--bg-elevated)',
          cursor: 'grab',
          userSelect: 'none',
          flexShrink: 0,
        }}
      >
        {/* Left: avatar + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, pointerEvents: 'none' }}>
          {/* Avatar with gradient ring — mirrors Home.jsx stat icon style */}
          <motion.div
            animate={{ boxShadow: ['0 0 0 2px rgba(255,98,0,0.3), 0 0 14px rgba(255,98,0,0.2)', '0 0 0 2px rgba(255,98,0,0.6), 0 0 22px rgba(255,98,0,0.35)', '0 0 0 2px rgba(255,98,0,0.3), 0 0 14px rgba(255,98,0,0.2)'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Sparkles size={18} color="#fff" />
          </motion.div>

          <div>
            <div
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: '0.88rem',
                letterSpacing: '-0.02em',
                color: 'var(--text-heading)',
                lineHeight: 1.2,
              }}
            >
              {astrologer}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 6px #22c55e',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-soft)', letterSpacing: '0.06em', fontWeight: 500 }}>
                SESSION ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Right: action icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'var(--accent-bg)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              border: '1px solid var(--border-soft)',
              background: 'transparent',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            <Video size={15} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'var(--accent-bg)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              border: '1px solid var(--border-soft)',
              background: 'transparent',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            <MoreVertical size={15} />
          </motion.button>
          <motion.button
            className="cb-close-btn"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.3)', color: 'rgb(239,68,68)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              border: '1px solid var(--border-soft)',
              background: 'transparent',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
            }}
          >
            <X size={15} />
          </motion.button>
        </div>
      </div>

      {/* ── MESSAGES ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          overflowY: 'auto',
          padding: '16px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          background: 'var(--bg-soft)',
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(165,61,0,0.2) transparent',
        }}
      >
        <AnimatePresence initial={false}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 8,
                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {msg.sender === 'ai' && (
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: 'var(--gradient-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(255,98,0,0.25)',
                  }}
                >
                  <Sparkles size={13} color="#fff" />
                </div>
              )}

              <div style={{ maxWidth: '72%' }}>
                <div
                  style={
                    msg.sender === 'ai'
                      ? {
                          padding: '10px 14px',
                          borderRadius: '18px',
                          borderBottomLeftRadius: 4,
                          fontSize: '0.82rem',
                          lineHeight: 1.55,
                          fontWeight: 500,
                          background: 'var(--bg-elevated)',
                          color: 'var(--text)',
                          border: '1px solid var(--border-soft)',
                          boxShadow: 'var(--shadow-sm)',
                        }
                      : {
                          padding: '10px 14px',
                          borderRadius: '18px',
                          borderBottomRightRadius: 4,
                          fontSize: '0.82rem',
                          lineHeight: 1.55,
                          fontWeight: 500,
                          background: 'var(--gradient-primary)',
                          color: '#fff',
                          boxShadow: '0 6px 20px rgba(255,98,0,0.3)',
                        }
                  }
                >
                  {msg.text}
                </div>
                <div
                  style={{
                    fontSize: '0.6rem',
                    color: 'var(--text-soft)',
                    marginTop: 4,
                    padding: '0 2px',
                    letterSpacing: '0.04em',
                    textAlign: msg.sender === 'user' ? 'right' : 'left',
                  }}
                >
                  {formatTime(msg.time)}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <div
              style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'var(--gradient-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Sparkles size={13} color="#fff" />
            </div>
            <div
              style={{
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-soft)',
                borderRadius: '18px',
                borderBottomLeftRadius: 4,
                padding: '10px 16px',
                display: 'flex',
                gap: 4,
                alignItems: 'center',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                  style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'var(--gradient-primary)',
                    display: 'inline-block',
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── INPUT BAR ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '12px 14px',
          borderTop: '1px solid var(--border-soft)',
          background: 'var(--bg-elevated)',
          display: 'flex',
          gap: 8,
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        {/* Mic button */}
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: 'var(--accent-bg)' }}
          whileTap={{ scale: 0.95 }}
          onClick={startListening}
          animate={listening ? { boxShadow: ['0 0 0 2px rgba(255,98,0,0.3)', '0 0 0 4px rgba(255,98,0,0.15)', '0 0 0 2px rgba(255,98,0,0.3)'] } : {}}
          transition={listening ? { duration: 1, repeat: Infinity } : {}}
          title={listening ? 'Listening…' : 'Speak'}
          style={{
            width: 38, height: 38, borderRadius: '50%',
            border: '1px solid var(--border-soft)',
            background: listening ? 'var(--accent-bg)' : 'transparent',
            color: listening ? 'var(--primary)' : 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s ease',
            flexShrink: 0,
          }}
        >
          <Mic size={15} />
        </motion.button>

        {/* Input field */}
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={listening ? '🎤 Listening...' : 'Ask the stars...'}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            disabled={loading}
            style={{
              width: '100%',
              padding: '9px 16px',
              borderRadius: '9999px',
              border: '1px solid var(--border-soft)',
              background: 'var(--bg-soft)',
              color: 'var(--text)',
              fontSize: '0.82rem',
              fontFamily: 'inherit',
              fontWeight: 500,
              outline: 'none',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(255,98,0,0.4)';
              e.target.style.boxShadow = '0 0 0 3px rgba(255,98,0,0.08)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-soft)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* Send button — mirrors btn-primary */}
        <motion.button
          whileHover={{ scale: 1.1, boxShadow: '0 0 24px rgba(255,98,0,0.3)', y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={sendMessage}
          disabled={loading}
          className="btn-primary"
          style={{
            width: 38, height: 38,
            borderRadius: '50%',
            padding: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1,
          }}
        >
          <Send size={15} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ChatBox;