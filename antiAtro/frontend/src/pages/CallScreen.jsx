import { useEffect, useRef, useState } from "react";

export default function CallScreen() {
  const [status, setStatus] = useState("calling");
  const [seconds, setSeconds] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);

  // 🔥 Unlock audio (VERY IMPORTANT for Chrome)
  useEffect(() => {
    const unlockAudio = () => {
      const dummy = new SpeechSynthesisUtterance(" ");
      window.speechSynthesis.speak(dummy);
      document.removeEventListener("click", unlockAudio);
    };
    document.addEventListener("click", unlockAudio);
  }, []);

  // 🎤 Setup Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      isListeningRef.current = true;
      console.log("🎤 Listening...");
    };

    recognition.onend = () => {
      isListeningRef.current = false;
      console.log("⛔ Stopped listening");
    };

    recognition.onerror = (e) => {
      console.error("Mic error:", e);
      isListeningRef.current = false;
    };

    recognition.onresult = async (event) => {
      const userText = event.results[0][0].transcript;
      console.log("🧑 User:", userText);

      try {
        const res = await fetch("http://localhost:5001/api/ai/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userText }),
        });

        if (!res.ok) throw new Error("API failed");

        const data = await res.json();
        const reply = data?.reply || "🔮 Kuch clear nahi hai...";

        console.log("🤖 AI Reply:", reply);
        setTimeout(() => speak(reply), 800);
      } catch (err) {
        console.error("❌ API error:", err);
        speak("Server issue hai... thoda baad try karo.");
      }
    };

    recognitionRef.current = recognition;
  }, []);

  // 🔊 Speak function (FIXED)
  function speak(text) {
    if (!text) return;

    const processedText = text
      .replace(/\./g, "... ")
      .replace(/,/g, ", ")
      .replace(/\n/g, "... ")
      .replace(/\s+/g, " ");

    console.log("🔊 Speaking:", processedText);

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(processedText);
    speech.lang = "en-IN";
    speech.rate = 0.75;
    speech.pitch = 1;
    speech.volume = 1;

    speech.onstart = () => setSpeaking(true);
    speech.onend = () => {
      setSpeaking(false);
      startListening();
    };
    speech.onerror = () => {
      setSpeaking(false);
      startListening();
    };

    setTimeout(() => {
      window.speechSynthesis.speak(speech);
    }, 200);
  }

  // 🎤 Safe mic start
  function startListening() {
    if (!recognitionRef.current) return;
    if (!isListeningRef.current) {
      try {
        recognitionRef.current.start();
      } catch {
        console.log("Already listening");
      }
    }
  }

  // 📞 Simulate call connect
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("connected");
      startListening();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // ⏱️ Timer
  useEffect(() => {
    let interval;
    if (status === "connected") {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [status]);

  const formatTime = () => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // ❌ End call
  function endCall() {
    window.speechSynthesis.cancel();
    if (recognitionRef.current && isListeningRef.current) {
      recognitionRef.current.stop();
    }
    setStatus("ended");
    window.location.href = 'http://localhost:5173/chat'
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Raleway:wght@300;400;500&display=swap');

        .call-root {
          font-family: 'Raleway', sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          background: #0a0010;
          color: white;
          padding: 0 1rem;
        }

        /* ── Layered gradient mesh background ── */
        .call-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(180,60,255,0.28) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 90%, rgba(255,120,30,0.22) 0%, transparent 55%),
            radial-gradient(ellipse 70% 60% at 60% 40%, rgba(255,50,120,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 10% 80%, rgba(100,40,200,0.20) 0%, transparent 55%);
          pointer-events: none;
          z-index: 0;
        }

        /* Floating orbs */
        .orb {
          position: fixed;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
          z-index: 0;
          animation: floatOrb 8s ease-in-out infinite;
        }
        .orb-1 {
          width: 320px; height: 320px;
          background: radial-gradient(circle, rgba(180,60,255,0.35), transparent 70%);
          top: -80px; left: -80px;
          animation-delay: 0s;
        }
        .orb-2 {
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(255,100,30,0.30), transparent 70%);
          bottom: -60px; right: -60px;
          animation-delay: -3s;
        }
        .orb-3 {
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(255,50,130,0.25), transparent 70%);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -5s;
        }

        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.08); }
        }

        /* ── Noise grain overlay ── */
        .grain {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.045;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
        }

        /* ── Top section ── */
        .top-section {
          position: relative;
          z-index: 10;
          margin-top: 4.5rem;
          text-align: center;
        }

        .brand-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(180,60,255,0.35);
          border-radius: 999px;
          padding: 0.3rem 1rem;
          margin-bottom: 1rem;
          backdrop-filter: blur(12px);
          box-shadow: 0 0 20px rgba(180,60,255,0.2), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .brand-pill-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: linear-gradient(135deg, #b43cff, #ff7820);
          box-shadow: 0 0 8px rgba(180,60,255,0.8);
          animation: pulseDot 2s ease-in-out infinite;
        }
        @keyframes pulseDot {
          0%, 100% { box-shadow: 0 0 6px rgba(180,60,255,0.8); transform: scale(1); }
          50% { box-shadow: 0 0 14px rgba(255,120,30,0.9); transform: scale(1.25); }
        }
        .brand-text {
          font-family: 'Cinzel', serif;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          background: linear-gradient(90deg, #d98cff, #ff9050, #ff5090);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .call-title {
          font-family: 'Cinzel', serif;
          font-size: 1.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          background: linear-gradient(135deg, #ffffff 0%, #d98cff 50%, #ff9050 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
          text-shadow: none;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          padding: 0.25rem 0.85rem;
          backdrop-filter: blur(8px);
        }
        .status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
        }
        .status-dot.calling { background: #ffb830; animation: pulseDot 1.2s infinite; }
        .status-dot.connected { background: #4eff91; box-shadow: 0 0 8px #4eff91; }
        .status-dot.ended { background: #ff4060; }

        .timer-display {
          font-family: 'Cinzel', serif;
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          margin-top: 0.5rem;
          background: linear-gradient(90deg, #a78bff, #fbbf6a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .speaking-indicator {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.6rem;
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: #d98cff;
          animation: pulseText 1.5s ease-in-out infinite;
          background: rgba(180,60,255,0.1);
          border: 1px solid rgba(180,60,255,0.3);
          border-radius: 999px;
          padding: 0.2rem 0.75rem;
        }
        @keyframes pulseText {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .sound-bars {
          display: flex; gap: 2px; align-items: flex-end;
        }
        .sound-bars span {
          display: block;
          width: 3px;
          background: linear-gradient(180deg, #ff9050, #b43cff);
          border-radius: 2px;
          animation: barBounce 0.6s ease-in-out infinite alternate;
        }
        .sound-bars span:nth-child(1) { height: 8px; animation-delay: 0s; }
        .sound-bars span:nth-child(2) { height: 14px; animation-delay: 0.1s; }
        .sound-bars span:nth-child(3) { height: 10px; animation-delay: 0.2s; }
        .sound-bars span:nth-child(4) { height: 16px; animation-delay: 0.15s; }
        .sound-bars span:nth-child(5) { height: 7px; animation-delay: 0.05s; }
        @keyframes barBounce {
          from { transform: scaleY(0.4); opacity: 0.6; }
          to { transform: scaleY(1); opacity: 1; }
        }

        /* ── Avatar section ── */
        .avatar-section {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Ripple rings */
        .ripple-ring {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid rgba(180,60,255,0.25);
          animation: rippleExpand 3s ease-out infinite;
        }
        .ripple-ring:nth-child(1) { width: 220px; height: 220px; animation-delay: 0s; }
        .ripple-ring:nth-child(2) { width: 290px; height: 290px; animation-delay: 0.9s; border-color: rgba(255,120,30,0.18); }
        .ripple-ring:nth-child(3) { width: 360px; height: 360px; animation-delay: 1.8s; border-color: rgba(255,50,120,0.12); }
        @keyframes rippleExpand {
          0% { opacity: 0.8; transform: scale(0.85); }
          100% { opacity: 0; transform: scale(1.15); }
        }

        /* Glow blob behind avatar */
        .avatar-glow {
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(180,60,255,0.5) 0%, rgba(255,80,30,0.3) 50%, transparent 75%);
          filter: blur(30px);
          animation: glowPulse 3s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.2); opacity: 1; }
        }

        /* Avatar orb */
        .avatar-orb {
          position: relative;
          width: 150px; height: 150px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          background: linear-gradient(135deg, #2a005a 0%, #6b1080 40%, #3a0050 70%, #1a0030 100%);
          box-shadow:
            0 0 0 1px rgba(180,60,255,0.4),
            0 0 0 2px rgba(255,120,30,0.15),
            0 0 40px rgba(180,60,255,0.5),
            0 0 80px rgba(255,80,30,0.25),
            inset 0 1px 0 rgba(255,255,255,0.1);
          animation: orbFloat 4s ease-in-out infinite;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .avatar-orb:hover {
          transform: scale(1.06);
        }
        @keyframes orbFloat {
          0%, 100% { transform: translateY(0px); box-shadow: 0 0 0 1px rgba(180,60,255,0.4), 0 0 40px rgba(180,60,255,0.5), 0 20px 40px rgba(0,0,0,0.4); }
          50% { transform: translateY(-12px); box-shadow: 0 0 0 1px rgba(255,120,30,0.5), 0 0 50px rgba(255,80,30,0.4), 0 30px 50px rgba(0,0,0,0.5); }
        }

        /* Glassmorphism ring around orb */
        .avatar-ring {
          position: absolute;
          width: 174px; height: 174px;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            rgba(180,60,255,0.7) 0%,
            rgba(255,120,30,0.7) 25%,
            rgba(255,50,120,0.7) 50%,
            rgba(100,40,200,0.7) 75%,
            rgba(180,60,255,0.7) 100%
          );
          padding: 1.5px;
          animation: spinRing 6s linear infinite;
        }
        .avatar-ring-inner {
          width: 100%; height: 100%;
          border-radius: 50%;
          background: #0a0010;
        }
        @keyframes spinRing {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* ── Controls ── */
        .controls-section {
          position: relative;
          z-index: 10;
          margin-bottom: 4rem;
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .ctrl-btn {
          position: relative;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          backdrop-filter: blur(16px);
        }
        .ctrl-btn:hover { transform: scale(1.12); }
        .ctrl-btn:active { transform: scale(0.95); }

        .ctrl-btn-sm {
          width: 58px; height: 58px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow:
            0 8px 24px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.1);
        }
        .ctrl-btn-sm:hover {
          background: rgba(255,255,255,0.14);
          box-shadow: 0 0 20px rgba(180,60,255,0.4), inset 0 1px 0 rgba(255,255,255,0.12);
        }

        .ctrl-btn-end {
          width: 72px; height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff2244, #cc1133);
          border: 1px solid rgba(255,50,80,0.5);
          box-shadow:
            0 0 0 4px rgba(255,30,60,0.15),
            0 12px 32px rgba(255,30,60,0.45),
            inset 0 1px 0 rgba(255,255,255,0.15);
        }
        .ctrl-btn-end:hover {
          box-shadow:
            0 0 0 6px rgba(255,30,60,0.25),
            0 16px 40px rgba(255,30,60,0.6),
            inset 0 1px 0 rgba(255,255,255,0.2);
        }

        /* Tooltip on hover */
        .ctrl-wrap {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }
        .ctrl-label {
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          font-weight: 500;
          color: rgba(255,255,255,0.4);
          text-transform: uppercase;
        }

        /* ── Bottom glass bar ── */
        .bottom-glass-bar {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          height: 5rem;
          background: linear-gradient(0deg, rgba(10,0,16,0.95) 0%, transparent 100%);
          pointer-events: none;
          z-index: 5;
        }

        /* ── Particles ── */
        .particle {
          position: fixed;
          width: 3px; height: 3px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 2;
          animation: particleDrift linear infinite;
          opacity: 0;
        }
        @keyframes particleDrift {
          0% { transform: translateY(100vh) scale(0); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-10vh) scale(1); opacity: 0; }
        }
      `}</style>

      <div className="call-root">
        {/* Grain */}
        <div className="grain" />

        {/* Floating orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${10 + i * 12}%`,
              background: i % 2 === 0
                ? "radial-gradient(circle, #d98cff, transparent)"
                : "radial-gradient(circle, #ff9050, transparent)",
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              animationDuration: `${6 + i * 1.4}s`,
              animationDelay: `${i * 0.9}s`,
            }}
          />
        ))}

        {/* ── Top Section ── */}
        <div className="top-section">
          <div className="brand-pill">
            <div className="brand-pill-dot" />
            <span className="brand-text">✦ Cosmic Connect ✦</span>
          </div>

          <h2 className="call-title">🔮 Astro Call</h2>

          <div>
            <span className="status-badge">
              <span
                className={`status-dot ${
                  status === "calling"
                    ? "calling"
                    : status === "connected"
                    ? "connected"
                    : "ended"
                }`}
              />
              {status === "calling"
                ? "Calling astrologer..."
                : status === "connected"
                ? "Connected"
                : "Call Ended"}
            </span>
          </div>

          {status === "connected" && (
            <p className="timer-display">{formatTime()}</p>
          )}

          {speaking && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "0.5rem" }}>
              <span className="speaking-indicator">
                <div className="sound-bars">
                  <span /><span /><span /><span /><span />
                </div>
                Astro bol raha hai...
              </span>
            </div>
          )}
        </div>

        {/* ── Avatar Section ── */}
        <div className="avatar-section">
          <div className="avatar-glow" />
          <div className="ripple-ring" />
          <div className="ripple-ring" />
          <div className="ripple-ring" />

          <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Spinning gradient ring */}
            <div className="avatar-ring" style={{ position: "absolute" }}>
              <div className="avatar-ring-inner" />
            </div>
            <div className="avatar-orb">🔮</div>
          </div>
        </div>

        {/* ── Controls ── */}
        <div className="controls-section">
          <div className="ctrl-wrap">
            <button
              onClick={startListening}
              className="ctrl-btn ctrl-btn-sm"
              title="Start Mic"
            >
              🎤
            </button>
            <span className="ctrl-label">Mic</span>
          </div>

          <div className="ctrl-wrap">
            <button
              onClick={endCall}
              className="ctrl-btn ctrl-btn-end"
              title="End Call"
            >
              ✕
            </button>
            <span className="ctrl-label">End</span>
          </div>

          <div className="ctrl-wrap">
            <button className="ctrl-btn ctrl-btn-sm" title="Speaker">
              🔊
            </button>
            <span className="ctrl-label">Speaker</span>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="bottom-glass-bar" />
      </div>
    </>
  );
}