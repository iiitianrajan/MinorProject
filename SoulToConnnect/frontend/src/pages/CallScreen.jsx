import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Volume2, PhoneOff, Star, Sparkles, Shield, Clock } from "lucide-react";

export default function CallScreen() {
  const [status, setStatus] = useState("calling");
  const [seconds, setSeconds] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);

  // 🔥 Unlock audio
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
    };

    recognition.onend = () => {
      isListeningRef.current = false;
    };

    recognition.onerror = (e) => {
      console.error("Mic error:", e);
      isListeningRef.current = false;
    };

    recognition.onresult = async (event) => {
      const userText = event.results[0][0].transcript;

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userText }),
        });

        if (!res.ok) throw new Error("API failed");

        const data = await res.json();
        const reply = data?.reply || "🔮 Kuch clear nahi hai...";
        setTimeout(() => speak(reply), 800);
      } catch (err) {
        console.error("❌ API error:", err);
        speak("Server issue hai... thoda baad try karo.");
      }
    };

    recognitionRef.current = recognition;
  }, []);

  // 🔊 Speak function
  function speak(text) {
    if (!text) return;

    const processedText = text
      .replace(/\./g, "... ")
      .replace(/,/g, ", ")
      .replace(/\n/g, "... ")
      .replace(/\s+/g, " ");

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

  function endCall() {
    window.speechSynthesis.cancel();
    if (recognitionRef.current && isListeningRef.current) {
      recognitionRef.current.stop();
    }
    setStatus("ended");
    window.location.href = `${import.meta.env.VITE_API_URL}/chat`;
  }

  const statusColor =
    status === "calling"
      ? "bg-yellow-400"
      : status === "connected"
      ? "bg-green-400"
      : "bg-red-500";

  const statusLabel =
    status === "calling"
      ? "Connecting to your astrologer..."
      : status === "connected"
      ? "Connected"
      : "Call Ended";

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden"
      style={{ background: "var(--bg-soft)", perspective: "1200px" }}
    >
      {/* ── Background ambient glows ── */}
      <motion.div
        animate={{ scale: [1, 1.18, 1], opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-28 -right-28 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,98,0,0.1) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        animate={{ scale: [1, 1.22, 1], opacity: [0.45, 0.85, 0.45] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute -bottom-20 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,140,58,0.08) 0%, transparent 65%)",
          filter: "blur(55px)",
        }}
      />

      {/* ══════════════════════════════
          TOP BAR
      ══════════════════════════════ */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between">
          {/* Brand pill */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "var(--accent-bg)",
              border: "1px solid var(--accent-border)",
              color: "var(--primary)",
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-[var(--primary-light)] block"
            />
            Cosmic Connect
          </motion.div>

          {/* Session badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <div
              className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-soft)",
                color: "var(--text-muted)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <Shield size={11} className="text-green-500" />
              End-to-end encrypted
            </div>
            <div
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-soft)",
                color: "var(--text-muted)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <Clock size={11} className="text-[var(--primary)]" />
              45 min session
            </div>
          </motion.div>
        </div>
      </header>

      {/* ══════════════════════════════
          MAIN CONTENT
      ══════════════════════════════ */}
      <main className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">

        {/* ── LEFT: Astrologer Card ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[280px]"
        >
          <div
            className="card relative overflow-hidden"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            {/* Live badge */}
            <div className="absolute top-4 right-4 z-10">
              <motion.div
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold text-white"
                style={{ background: "var(--gradient-primary)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                LIVE
              </motion.div>
            </div>

            {/* Avatar */}
            <div className="relative mb-4">
              <div
                className="w-20 h-20 rounded-2xl mx-auto overflow-hidden"
                style={{
                  border: "2px solid var(--accent-border)",
                  boxShadow: "0 0 24px rgba(255,98,0,0.15)",
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center text-4xl"
                  style={{ background: "var(--gradient-soft)" }}
                >
                  🔮
                </div>
              </div>
              {/* Pulse ring when speaking */}
              <AnimatePresence>
                {speaking && (
                  <motion.div
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 rounded-full border-2 border-[var(--primary-light)] mx-auto my-auto"
                    style={{ width: 80, height: 80, top: 0, left: "50%", transform: "translateX(-50%)" }}
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="text-center">
              <h3
                className="font-bold text-lg mb-0.5"
                style={{ color: "var(--text-heading)", fontFamily: "Poppins, sans-serif" }}
              >
                Expert Astrologer
              </h3>
              <p className="text-xs font-semibold mb-3" style={{ color: "var(--primary)" }}>
                Senior Astrological Consultant
              </p>

              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} className="text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-xs ml-1" style={{ color: "var(--text-soft)" }}>5.0</span>
              </div>

              <div
                className="flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs"
                style={{
                  background: "var(--bg-soft)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border-soft)",
                }}
              >
                <Sparkles size={11} className="text-[var(--primary)]" />
                Natal Chart Synthesis
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── CENTER: Orb / Visualizer ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Orb */}
          <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
            {/* Ripple rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [0.85, 1.15], opacity: [0.6, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.9, ease: "easeOut" }}
                className="absolute rounded-full"
                style={{
                  width: 160 + i * 40,
                  height: 160 + i * 40,
                  border: "1.5px solid var(--accent-border)",
                }}
              />
            ))}

            {/* Glow blob */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 160,
                height: 160,
                background: "radial-gradient(circle, rgba(255,98,0,0.25) 0%, transparent 70%)",
                filter: "blur(24px)",
              }}
            />

            {/* Spinning gradient ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full"
              style={{
                width: 150,
                height: 150,
                background: "conic-gradient(from 0deg, var(--primary), var(--primary-light), var(--primary-dark), var(--primary))",
                padding: 2,
                borderRadius: "50%",
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{ background: "var(--bg-soft)" }}
              />
            </motion.div>

            {/* Core orb */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 flex items-center justify-center rounded-full text-4xl"
              style={{
                width: 130,
                height: 130,
                background: "var(--gradient-primary)",
                boxShadow: "0 0 40px rgba(255,98,0,0.4), 0 20px 40px rgba(165,61,0,0.3)",
              }}
            >
              🔮
            </motion.div>
          </div>

          {/* Sound bars visualizer */}
          <AnimatePresence>
            {speaking && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-end gap-1 h-8"
              >
                {[8, 16, 10, 20, 12, 18, 8, 14, 10].map((h, i) => (
                  <motion.span
                    key={i}
                    animate={{ scaleY: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.07,
                      ease: "easeInOut",
                    }}
                    className="block w-1 rounded-full"
                    style={{
                      height: h,
                      background: "var(--gradient-primary)",
                      transformOrigin: "bottom",
                    }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status */}
          <div className="text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-2"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-soft)",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <motion.span
                animate={status === "calling" ? { opacity: [1, 0.4, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
                className={`w-2 h-2 rounded-full block ${statusColor}`}
              />
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--text-heading)" }}
              >
                {statusLabel}
              </span>
            </div>

            {status === "connected" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold tracking-tight"
                style={{ color: "var(--primary)", fontFamily: "Poppins, sans-serif" }}
              >
                {formatTime()}
              </motion.p>
            )}

            {speaking && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xs font-medium mt-2"
                style={{ color: "var(--primary-light)" }}
              >
                ✦ Astro is speaking...
              </motion.p>
            )}
          </div>
        </motion.div>

        {/* ── RIGHT: Info Panel ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full max-w-[280px] flex flex-col gap-4"
        >
          {/* Session info card */}
          <div className="card" style={{ boxShadow: "var(--shadow-md)" }}>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "var(--primary)" }}
            >
              ✦ Session Info
            </p>
            {[
              { label: "Mode", value: "Voice Consultation" },
              { label: "Type", value: "Natal Chart Synthesis" },
              { label: "Duration", value: "45 min session" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2.5"
                style={{
                  borderBottom: i < 2 ? "1px solid var(--border-soft)" : "none",
                }}
              >
                <span className="text-xs" style={{ color: "var(--text-soft)" }}>
                  {item.label}
                </span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "var(--text-heading)" }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div
            className="card-soft"
            style={{ border: "1px solid var(--border-soft)" }}
          >
            {[
              { icon: Shield, text: "100% Private & Secure" },
              { icon: Star, text: "Verified Expert Astrologer" },
              { icon: Sparkles, text: "First consultation free" },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 320 }}
                className="flex items-center gap-2.5 py-2"
                style={{
                  borderBottom: i < 2 ? "1px solid var(--border-soft)" : "none",
                }}
              >
                <div
                  className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "var(--accent-bg)",
                    border: "1px solid var(--accent-border)",
                  }}
                >
                  <item.icon size={13} className="text-[var(--primary)]" />
                </div>
                <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* ══════════════════════════════
          CONTROL BAR
      ══════════════════════════════ */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4"
        >
          {/* Glass control bar */}
          <div
            className="glass flex items-center gap-3 sm:gap-5 px-6 py-4 rounded-[2rem]"
            style={{
              border: "1px solid var(--border-soft)",
              boxShadow: "var(--shadow-md)",
            }}
          >
            {/* Mic */}
            <div className="flex flex-col items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.93 }}
                onClick={startListening}
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <Mic size={18} style={{ color: "var(--text-heading)" }} />
              </motion.button>
              <span
                className="text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-soft)" }}
              >
                Mute
              </span>
            </div>

            {/* End Call — primary action */}
            <div className="flex flex-col items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.08, y: -3, boxShadow: "0 0 30px rgba(255,98,0,0.45)" }}
                whileTap={{ scale: 0.94 }}
                onClick={endCall}
                className="btn-primary w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)" }}
              >
                <PhoneOff size={20} color="white" />
              </motion.button>
              <span
                className="text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-soft)" }}
              >
                End Call
              </span>
            </div>

            {/* Speaker */}
            <div className="flex flex-col items-center gap-1">
              <motion.button
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.93 }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-soft)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <Volume2 size={18} style={{ color: "var(--text-heading)" }} />
              </motion.button>
              <span
                className="text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: "var(--text-soft)" }}
              >
                Speaker
              </span>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}