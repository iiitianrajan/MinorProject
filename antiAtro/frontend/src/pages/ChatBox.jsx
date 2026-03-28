import React, { useState, useRef, useEffect, useCallback } from 'react';

const ChatBox = ({ astrologer, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  // ── Drag state ──
  const [position, setPosition] = useState({ x: null, y: null }); // null = use CSS default (bottom-right)
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
        time: new Date()
      }
    ]);
  }, [astrologer]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // ── Drag handlers ──
  const onMouseDown = useCallback((e) => {
    // Only drag from header; ignore close button
    if (e.target.closest('.cb-close-btn')) return;
    e.preventDefault();

    const rect = rootRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setDragging(true);
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const onMouseMove = (e) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w = rootRef.current.offsetWidth;
      const h = rootRef.current.offsetHeight;

      let nx = e.clientX - dragOffset.current.x;
      let ny = e.clientY - dragOffset.current.y;

      // Keep within viewport
      nx = Math.max(0, Math.min(nx, vw - w));
      ny = Math.max(0, Math.min(ny, vh - h));

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

  // Touch drag support
  const onTouchStart = useCallback((e) => {
    if (e.target.closest('.cb-close-btn')) return;
    const touch = e.touches[0];
    const rect = rootRef.current.getBoundingClientRect();
    dragOffset.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
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

      let nx = touch.clientX - dragOffset.current.x;
      let ny = touch.clientY - dragOffset.current.y;

      nx = Math.max(0, Math.min(nx, vw - w));
      ny = Math.max(0, Math.min(ny, vh - h));

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

  // Build inline style for position
  const positionStyle = position.x !== null
    ? {
        bottom: 'auto',
        right: 'auto',
        left: position.x,
        top: position.y,
      }
    : {};

  // 🎤 Speech Recognition
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in your browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.start();

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setInput(text);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: 'user', text: input, time: new Date() };
    setMessages(prev => [...prev, userMessage]);

    const userInput = input;
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5001/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: data?.reply || "⚠️ No response from AI",
          time: new Date()
        }
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        { sender: 'ai', text: "⚠️ Server not responding", time: new Date() }
      ]);
    }

    setLoading(false);
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Raleway:wght@300;400;500;600&display=swap');

        .cb-root {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 380px;
          height: 560px;
          display: flex;
          flex-direction: column;
          border-radius: 24px;
          overflow: hidden;
          z-index: 9999;
          font-family: 'Raleway', sans-serif;
          background: rgba(12, 2, 24, 0.82);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(180, 60, 255, 0.25);
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.04) inset,
            0 32px 80px rgba(0, 0, 0, 0.7),
            0 0 60px rgba(180, 60, 255, 0.15),
            0 0 120px rgba(255, 120, 30, 0.08);
          animation: cbSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes cbSlideIn {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }

        .cb-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(50px);
          pointer-events: none;
          z-index: 0;
        }
        .cb-blob-1 {
          width: 160px; height: 160px;
          background: rgba(180, 60, 255, 0.18);
          top: -40px; right: -30px;
        }
        .cb-blob-2 {
          width: 120px; height: 120px;
          background: rgba(255, 120, 30, 0.14);
          bottom: 60px; left: -30px;
        }

        /* ── Header ── */
        .cb-header {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 18px;
          background: linear-gradient(135deg,
            rgba(180, 60, 255, 0.22) 0%,
            rgba(255, 120, 30, 0.15) 50%,
            rgba(255, 50, 120, 0.12) 100%
          );
          border-bottom: 1px solid rgba(255, 255, 255, 0.07);
          flex-shrink: 0;
          /* ✅ Drag cursor on header */
          cursor: grab;
          user-select: none;
          -webkit-user-select: none;
        }
        .cb-header:active { cursor: grabbing; }

        .cb-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
          pointer-events: none; /* let drag events pass through to header */
        }

        .cb-avatar {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2a005a, #6b1080);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
          box-shadow:
            0 0 0 2px rgba(180, 60, 255, 0.5),
            0 0 16px rgba(180, 60, 255, 0.4);
          animation: avatarPulse 3s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes avatarPulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(180,60,255,0.5), 0 0 14px rgba(180,60,255,0.35); }
          50%       { box-shadow: 0 0 0 2px rgba(255,120,30,0.6), 0 0 22px rgba(255,100,30,0.45); }
        }

        .cb-name-block {}
        .cb-name {
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          background: linear-gradient(90deg, #fff 0%, #d98cff 60%, #ff9050 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
        }
        .cb-online {
          display: flex; align-items: center; gap: 4px;
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.45);
          margin-top: 1px;
        }
        .cb-online-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #4eff91;
          box-shadow: 0 0 6px #4eff91;
          animation: dotBlink 2s ease-in-out infinite;
        }
        @keyframes dotBlink {
          0%,100% { opacity: 1; } 50% { opacity: 0.4; }
        }

        .cb-close-btn {
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.6);
          font-size: 0.85rem;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease;
          backdrop-filter: blur(8px);
          /* ✅ Allow close button to receive its own pointer events */
          pointer-events: all;
          position: relative;
          z-index: 3;
        }
        .cb-close-btn:hover {
          background: rgba(255, 60, 80, 0.3);
          border-color: rgba(255, 60, 80, 0.5);
          color: #fff;
          transform: scale(1.1);
        }

        /* ── Drag hint tooltip ── */
        .cb-drag-hint {
          position: absolute;
          top: -28px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.7);
          color: rgba(255,255,255,0.7);
          font-size: 0.6rem;
          letter-spacing: 0.06em;
          padding: 3px 8px;
          border-radius: 6px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .cb-header:hover .cb-drag-hint { opacity: 1; }

        /* ── Messages ── */
        .cb-messages {
          position: relative;
          z-index: 1;
          flex: 1;
          overflow-y: auto;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          scrollbar-width: thin;
          scrollbar-color: rgba(180,60,255,0.3) transparent;
        }
        .cb-messages::-webkit-scrollbar { width: 4px; }
        .cb-messages::-webkit-scrollbar-track { background: transparent; }
        .cb-messages::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, rgba(180,60,255,0.4), rgba(255,120,30,0.3));
          border-radius: 4px;
        }

        .cb-msg-row {
          display: flex;
          align-items: flex-end;
          gap: 8px;
          animation: msgAppear 0.3s cubic-bezier(0.34, 1.3, 0.64, 1) both;
        }
        @keyframes msgAppear {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        .cb-msg-row.user  { justify-content: flex-end; }
        .cb-msg-row.ai    { justify-content: flex-start; }

        .cb-msg-avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2a005a, #6b1080);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem;
          flex-shrink: 0;
          box-shadow: 0 0 10px rgba(180,60,255,0.35);
        }

        .cb-bubble-wrap { max-width: 72%; }

        .cb-bubble {
          padding: 10px 14px;
          border-radius: 18px;
          font-size: 0.82rem;
          line-height: 1.5;
          font-weight: 400;
          word-break: break-word;
        }
        .cb-bubble.ai {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.88);
          border-bottom-left-radius: 4px;
          backdrop-filter: blur(8px);
        }
        .cb-bubble.user {
          background: linear-gradient(135deg, #7c3aed, #a855f7, #ec4899);
          color: #fff;
          border-bottom-right-radius: 4px;
          box-shadow: 0 4px 16px rgba(124,58,237,0.4);
        }

        .cb-time {
          font-size: 0.6rem;
          color: rgba(255,255,255,0.3);
          margin-top: 4px;
          padding: 0 2px;
          letter-spacing: 0.04em;
        }
        .cb-msg-row.user .cb-time { text-align: right; }

        .cb-typing {
          display: flex;
          align-items: center;
          gap: 8px;
          animation: msgAppear 0.3s ease both;
        }
        .cb-typing-bubble {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          padding: 10px 16px;
          display: flex; gap: 4px; align-items: center;
        }
        .cb-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d98cff, #ff9050);
          animation: dotJump 1.2s ease-in-out infinite;
        }
        .cb-dot:nth-child(2) { animation-delay: 0.2s; }
        .cb-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes dotJump {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30%            { transform: translateY(-6px); opacity: 1; }
        }

        /* ── Input Bar ── */
        .cb-input-bar {
          position: relative;
          z-index: 2;
          padding: 12px 14px;
          border-top: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          display: flex;
          gap: 8px;
          align-items: center;
          flex-shrink: 0;
        }

        .cb-mic-btn {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.07);
          color: #fff;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }
        .cb-mic-btn:hover {
          background: rgba(180,60,255,0.2);
          border-color: rgba(180,60,255,0.5);
          box-shadow: 0 0 12px rgba(180,60,255,0.3);
        }
        .cb-mic-btn.active {
          background: linear-gradient(135deg, #cc1133, #ff2244);
          border-color: rgba(255,60,80,0.6);
          box-shadow: 0 0 18px rgba(255,40,68,0.5);
          animation: micPulse 1s ease-in-out infinite;
        }
        @keyframes micPulse {
          0%,100% { box-shadow: 0 0 14px rgba(255,40,68,0.5); }
          50%      { box-shadow: 0 0 26px rgba(255,40,68,0.8); }
        }

        .cb-input-wrap {
          flex: 1;
          position: relative;
        }
        .cb-input-wrap::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: 20px;
          background: linear-gradient(90deg, rgba(180,60,255,0.4), rgba(255,120,30,0.4), rgba(255,50,120,0.4));
          z-index: 0;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        .cb-input-wrap:focus-within::before { opacity: 1; }

        .cb-input {
          position: relative;
          z-index: 1;
          width: 100%;
          padding: 9px 16px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.06);
          color: #fff;
          font-size: 0.82rem;
          font-family: 'Raleway', sans-serif;
          outline: none;
          backdrop-filter: blur(8px);
          transition: border-color 0.2s ease, background 0.2s ease;
          box-sizing: border-box;
        }
        .cb-input::placeholder { color: rgba(255,255,255,0.3); }
        .cb-input:focus {
          border-color: transparent;
          background: rgba(255,255,255,0.09);
        }
        .cb-input:disabled { opacity: 0.5; }

        .cb-send-btn {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #7c3aed, #ec4899, #f97316);
          color: #fff;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 0.2s ease;
          box-shadow: 0 4px 16px rgba(124,58,237,0.45);
        }
        .cb-send-btn:hover:not(:disabled) {
          transform: scale(1.1);
          box-shadow: 0 6px 22px rgba(236,72,153,0.55);
        }
        .cb-send-btn:active:not(:disabled) { transform: scale(0.95); }
        .cb-send-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      <div
        className="cb-root"
        ref={rootRef}
        style={positionStyle}
      >
        {/* Ambient blobs */}
        <div className="cb-blob cb-blob-1" />
        <div className="cb-blob cb-blob-2" />

        {/* ── Header (drag handle) ── */}
        <div
          className="cb-header"
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
        >
          {/* Tooltip shown on hover */}
          <span className="cb-drag-hint">drag to move</span>

          <div className="cb-header-left">
            <div className="cb-avatar">🔮</div>
            <div className="cb-name-block">
              <div className="cb-name">{astrologer}</div>
              <div className="cb-online">
                <span className="cb-online-dot" />
                Online · Cosmic Guide
              </div>
            </div>
          </div>
          <button className="cb-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* ── Messages ── */}
        <div className="cb-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`cb-msg-row ${msg.sender}`}>
              {msg.sender === 'ai' && (
                <div className="cb-msg-avatar">🔮</div>
              )}
              <div className="cb-bubble-wrap">
                <div className={`cb-bubble ${msg.sender}`}>{msg.text}</div>
                <div className="cb-time">{formatTime(msg.time)}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="cb-typing">
              <div className="cb-msg-avatar">🔮</div>
              <div className="cb-typing-bubble">
                <div className="cb-dot" />
                <div className="cb-dot" />
                <div className="cb-dot" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Input Bar ── */}
        <div className="cb-input-bar">
          <button
            onClick={startListening}
            className={`cb-mic-btn ${listening ? 'active' : ''}`}
            title={listening ? "Listening..." : "Speak"}
          >
            🎤
          </button>

          <div className="cb-input-wrap">
            <input
              className="cb-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={listening ? "🎤 Listening..." : "Ask the cosmos..."}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={loading}
            />
          </div>

          <button
            className="cb-send-btn"
            onClick={sendMessage}
            disabled={loading}
            title="Send"
          >
            {loading ? "·" : "➤"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBox;