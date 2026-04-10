import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const ZODIAC_SIGNS = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];

const METRICS = [
  {
    key: "emotional",
    label: "Emotional Harmony",
    icon: "♥",
    iconColor: "#e07a5f",
    getScore: (s) => Math.min(100, Math.round(s * 0.9 + 8)),
    getDesc: (s) =>
      s > 75
        ? "Your Moon placements form a Trine, suggesting a natural ebb and flow of feelings. Understanding comes without words."
        : s > 50
        ? "Your emotional wavelengths align well, with occasional storms that only deepen the bond."
        : "Different emotional languages — growth lies in learning to translate for each other.",
  },
  {
    key: "communication",
    label: "Communication Stars",
    icon: "✦",
    iconColor: "#b5a642",
    getScore: (s) => Math.min(100, Math.round(s * 0.85 + 12)),
    getDesc: (s) =>
      s > 75
        ? "Mercury sits in perfect alignment. Your intellectual connection is profound, sparking endless discovery and shared vision."
        : s > 50
        ? "Strong intellectual chemistry with a few blind spots that keep conversations interesting."
        : "You think differently — a challenge that can become your greatest creative strength.",
  },
];

export default function LoveCalculator() {
  const [form, setForm] = useState({
    name1: "", zodiac1: "Aries", birth1: "",
    name2: "", zodiac2: "Aries", birth2: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const calculate = () => {
    if (!form.name1.trim() || !form.name2.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const combined = (form.name1 + form.name2 + form.zodiac1 + form.zodiac2).toLowerCase();
      let score = 0;
      for (let i = 0; i < combined.length; i++) score += combined.charCodeAt(i);
      score = (score % 41) + 60;
      setResult(score);
      setLoading(false);
    }, 900);
  };

  const circumference = 2 * Math.PI * 52;
  const pct = result ?? 0;
  const offset = circumference - (circumference * pct) / 100;

  const inputStyle = {
    width: "100%",
    padding: "0.6rem 0.85rem",
    borderRadius: "0.6rem",
    border: "1px solid var(--border-soft)",
    background: "var(--bg-elevated)",
    color: "var(--text-heading)",
    fontSize: "0.875rem",
    fontWeight: 500,
    outline: "none",
    transition: "border 0.2s, box-shadow 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.62rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "var(--text-soft)",
    marginBottom: "0.4rem",
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: "var(--text)" }}>

      

      {/* ── HERO ── */}
      <section style={{
        background: "var(--bg-soft)",
        padding: "5rem 2rem 4rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <motion.div animate={{ scale:[1,1.2,1], opacity:[0.5,0.9,0.5] }} transition={{ duration:8, repeat:Infinity }}
          style={{ position:"absolute", top:"-80px", right:"-80px", width:340, height:340, borderRadius:"50%",
            background:"radial-gradient(circle,rgba(255,98,0,0.1) 0%,transparent 65%)", filter:"blur(60px)", pointerEvents:"none" }} />
        <motion.div animate={{ scale:[1,1.15,1], opacity:[0.4,0.8,0.4] }} transition={{ duration:10, repeat:Infinity, delay:2 }}
          style={{ position:"absolute", bottom:"-60px", left:"-60px", width:280, height:280, borderRadius:"50%",
            background:"radial-gradient(circle,rgba(255,140,58,0.08) 0%,transparent 65%)", filter:"blur(55px)", pointerEvents:"none" }} />

        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem", borderRadius:9999,
            padding:"0.35rem 1rem", marginBottom:"1.2rem", fontSize:"0.65rem", fontWeight:700,
            letterSpacing:"0.14em", textTransform:"uppercase",
            background:"var(--accent-bg)", color:"var(--primary)", border:"1px solid var(--accent-border)" }}>
          <Sparkles size={10} /> Spiritual Alignment
        </motion.div>

        <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
          style={{ fontFamily:"'Poppins',sans-serif", fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:800,
            lineHeight:1.08, letterSpacing:"-0.03em", color:"var(--text-heading)", marginBottom:"0.3rem" }}>
          Cosmic Connection
        </motion.h1>

        <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.28 }}
          style={{ fontFamily:"'Poppins',sans-serif", fontSize:"clamp(1.8rem,5vw,3.5rem)", fontWeight:800,
            fontStyle:"italic", lineHeight:1.1, letterSpacing:"-0.02em", marginBottom:"1.2rem" }}>
          <motion.span animate={{ backgroundPosition:["0% 50%","100% 50%","0% 50%"] }} transition={{ duration:5, repeat:Infinity }}
            style={{ background:"linear-gradient(90deg,var(--primary-dark),var(--primary),var(--primary-light),var(--primary))",
              backgroundSize:"220% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text", display:"inline-block" }}>
            Calculator
          </motion.span>
        </motion.h1>

        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.38 }}
          style={{ color:"var(--text-muted)", maxWidth:480, margin:"0 auto 3rem", fontSize:"0.9rem", lineHeight:1.7 }}>
          Peer into the celestial weave. Our synastry engine maps the precise intersection of your astral paths to reveal the destiny of your bond.
        </motion.p>

        {/* ── INPUT CARDS ── */}
        <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.45, ease:[0.16,1,0.3,1] }}
          style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:"1.2rem",
            maxWidth:780, margin:"0 auto", alignItems:"center" }}>

          {/* Partner 1 */}
          <div className="card" style={{ padding:"1.6rem", textAlign:"left" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"1.2rem" }}>
              <span style={{ fontSize:"1.1rem" }}>⭐</span>
              <span style={{ fontWeight:700, fontSize:"0.9rem", color:"var(--text-heading)" }}>Partner 1</span>
            </div>
            <div style={{ marginBottom:"0.9rem" }}>
              <label style={labelStyle}>Full Name</label>
              <input value={form.name1} placeholder="Arden Sky" onChange={set("name1")} style={inputStyle}
                onFocus={e=>{ e.target.style.border="1px solid var(--primary-light)"; e.target.style.boxShadow="0 0 0 3px rgba(255,98,0,0.08)"; }}
                onBlur={e=>{ e.target.style.border="1px solid var(--border-soft)"; e.target.style.boxShadow="none"; }} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.7rem" }}>
              <div>
                <label style={labelStyle}>Zodiac Sign</label>
                <select value={form.zodiac1} onChange={set("zodiac1")} style={{ ...inputStyle, appearance:"none", cursor:"pointer" }}>
                  {ZODIAC_SIGNS.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Birth Date</label>
                <input type="date" value={form.birth1} onChange={set("birth1")} style={inputStyle}
                  onFocus={e=>{ e.target.style.border="1px solid var(--primary-light)"; }}
                  onBlur={e=>{ e.target.style.border="1px solid var(--border-soft)"; }} />
              </div>
            </div>
          </div>

          {/* Center Calculate */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"0.5rem" }}>
            <motion.button onClick={calculate}
              whileHover={{ scale:1.08, boxShadow:"0 0 40px rgba(255,98,0,0.35)" }}
              whileTap={{ scale:0.94 }}
              className="btn-primary"
              style={{ width:72, height:72, borderRadius:"50%", display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"center", gap:4, fontSize:"0.52rem",
                letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", padding:0 }}>
              <motion.div animate={loading ? { rotate:360 } : { rotate:0 }}
                transition={{ duration:1, repeat:loading ? Infinity : 0, ease:"linear" }}>
                <Sparkles size={20} />
              </motion.div>
              <span>{loading ? "..." : "Calculate"}</span>
            </motion.button>
          </div>

          {/* Partner 2 */}
          <div className="card" style={{ padding:"1.6rem", textAlign:"left" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.5rem", marginBottom:"1.2rem" }}>
              <span style={{ fontSize:"1.1rem" }}>🌙</span>
              <span style={{ fontWeight:700, fontSize:"0.9rem", color:"var(--text-heading)" }}>Partner 2</span>
            </div>
            <div style={{ marginBottom:"0.9rem" }}>
              <label style={labelStyle}>Full Name</label>
              <input value={form.name2} placeholder="Luna Rivers" onChange={set("name2")} style={inputStyle}
                onFocus={e=>{ e.target.style.border="1px solid var(--primary-light)"; e.target.style.boxShadow="0 0 0 3px rgba(255,98,0,0.08)"; }}
                onBlur={e=>{ e.target.style.border="1px solid var(--border-soft)"; e.target.style.boxShadow="none"; }} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.7rem" }}>
              <div>
                <label style={labelStyle}>Zodiac Sign</label>
                <select value={form.zodiac2} onChange={set("zodiac2")} style={{ ...inputStyle, appearance:"none", cursor:"pointer" }}>
                  {ZODIAC_SIGNS.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Birth Date</label>
                <input type="date" value={form.birth2} onChange={set("birth2")} style={inputStyle}
                  onFocus={e=>{ e.target.style.border="1px solid var(--primary-light)"; }}
                  onBlur={e=>{ e.target.style.border="1px solid var(--border-soft)"; }} />
              </div>
            </div>
          </div>

        </motion.div>
      </section>

      {/* ── RESULTS ── */}
      <AnimatePresence>
        {result !== null && (
          <motion.section
            initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
            transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
            style={{ background:"var(--bg)", padding:"5rem 2rem" }}>

            <div style={{ maxWidth:780, margin:"0 auto" }}>
              <motion.h2 initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
                style={{ textAlign:"center", fontFamily:"'Poppins',sans-serif", fontSize:"clamp(1.6rem,4vw,2.5rem)",
                  fontWeight:800, color:"var(--text-heading)", marginBottom:"0.5rem", letterSpacing:"-0.03em" }}>
                Your Universal Resonance
              </motion.h2>
              <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.25, duration:0.5 }}
                style={{ width:48, height:3, background:"var(--primary)", borderRadius:9999, margin:"0 auto 3rem" }} />

              <div style={{ display:"grid", gridTemplateColumns:"180px 1fr", gap:"2.5rem", alignItems:"start" }}>

                {/* Soul Match Ring */}
                <motion.div initial={{ scale:0.7, opacity:0 }} animate={{ scale:1, opacity:1 }}
                  transition={{ delay:0.2, type:"spring", stiffness:140 }}
                  style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                  <div style={{ position:"relative", width:140, height:140 }}>
                    <svg width="140" height="140" style={{ transform:"rotate(-90deg)" }}>
                      <circle cx="70" cy="70" r="52" fill="none" stroke="rgba(255,98,0,0.12)" strokeWidth="10" />
                      <motion.circle cx="70" cy="70" r="52" fill="none"
                        stroke="var(--primary)" strokeWidth="10" strokeLinecap="round"
                        strokeDasharray={circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset: offset }}
                        transition={{ duration:1.4, ease:"easeOut", delay:0.35 }} />
                    </svg>
                    <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column",
                      alignItems:"center", justifyContent:"center" }}>
                      <motion.span initial={{ scale:0 }} animate={{ scale:1 }}
                        transition={{ delay:0.6, type:"spring", stiffness:200 }}
                        style={{ fontFamily:"'Poppins',sans-serif", fontSize:"2.4rem", fontWeight:800,
                          color:"var(--text-heading)", lineHeight:1 }}>
                        {result}
                      </motion.span>
                      <span style={{ fontSize:"0.75rem", color:"var(--primary)", fontWeight:700 }}>%</span>
                    </div>
                  </div>
                  <div style={{ marginTop:"0.8rem", fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.14em",
                    textTransform:"uppercase", color:"var(--text-soft)" }}>Soul Match</div>
                </motion.div>

                {/* Metric Bars */}
                <div style={{ display:"flex", flexDirection:"column", gap:"1.2rem" }}>
                  {METRICS.map((m, i) => {
                    const s = m.getScore(result);
                    return (
                      <motion.div key={m.key} initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }}
                        transition={{ delay:0.3 + i * 0.15 }}
                        style={{ background:"var(--bg-elevated)", borderRadius:"1rem", padding:"1.2rem 1.4rem",
                          border:"1px solid var(--border-soft)" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"0.55rem" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:"0.45rem" }}>
                            <span style={{ color:m.iconColor, fontSize:"0.95rem" }}>{m.icon}</span>
                            <span style={{ fontWeight:600, fontSize:"0.84rem", color:"var(--text-heading)" }}>{m.label}</span>
                          </div>
                          <span style={{ fontWeight:700, fontSize:"0.84rem", color:"var(--primary)" }}>{s}%</span>
                        </div>
                        <div style={{ height:6, borderRadius:9999, background:"var(--bg-high)", overflow:"hidden", marginBottom:"0.65rem" }}>
                          <motion.div initial={{ width:0 }} animate={{ width:`${s}%` }}
                            transition={{ duration:1.1, ease:"easeOut", delay:0.5 + i*0.15 }}
                            style={{ height:"100%", borderRadius:9999,
                              background:`linear-gradient(90deg, var(--primary-dark), ${m.iconColor})` }} />
                        </div>
                        <p style={{ fontSize:"0.78rem", color:"var(--text-muted)", lineHeight:1.6, margin:0 }}>
                          {m.getDesc(s)}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>

              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── DARK CTA ── */}
      <section style={{ padding:"2rem 2rem 3rem" }}>
        <div style={{ maxWidth:780, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:26 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            style={{ borderRadius:"2rem", overflow:"hidden", padding:"3.5rem 2rem",
              background:"linear-gradient(135deg,#1a0800 0%,#2d0e00 60%,#1a0800 100%)",
              textAlign:"center", position:"relative" }}>
            <motion.div animate={{ scale:[1,1.2,1], opacity:[0.5,1,0.5] }} transition={{ duration:6, repeat:Infinity }}
              style={{ position:"absolute", inset:0, pointerEvents:"none",
                background:"radial-gradient(ellipse 70% 80% at 50% 50%,rgba(255,98,0,0.22) 0%,transparent 65%)" }} />

            <div style={{ position:"relative", zIndex:1 }}>
              <h2 style={{ fontFamily:"'Poppins',sans-serif", fontSize:"clamp(1.4rem,3.5vw,2rem)",
                fontWeight:800, color:"#f5f5f5", marginBottom:"0.8rem", letterSpacing:"-0.02em", lineHeight:1.2 }}>
                Ready for a Deep Dive<br />Relationship Reading?
              </h2>
              <p style={{ color:"rgba(245,245,245,0.55)", fontSize:"0.88rem", lineHeight:1.7,
                maxWidth:420, margin:"0 auto 2rem" }}>
                Numbers only tell part of the story. Connect with our Master Astrologers to uncover the karmic threads binding your souls together.
              </p>

              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem", marginBottom:"1.5rem" }}>
                <div style={{ display:"flex" }}>
                  {["👩","👩‍🦱","👩‍🦰"].map((a,i)=>(
                    <div key={i} style={{ width:34, height:34, borderRadius:"50%",
                      background:"rgba(255,98,0,0.28)", border:"2px solid rgba(255,98,0,0.45)",
                      marginLeft:i===0?0:-10, display:"flex", alignItems:"center",
                      justifyContent:"center", fontSize:"1.1rem" }}>{a}</div>
                  ))}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"0.4rem" }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:"#4ade80", display:"inline-block" }} />
                  <span style={{ fontSize:"0.76rem", color:"rgba(245,245,245,0.7)", fontWeight:600 }}>12 Experts Online</span>
                </div>
              </div>

              <motion.button whileHover={{ scale:1.05, y:-3 }} whileTap={{ scale:0.96 }}
                style={{ background:"white", color:"var(--text-heading)", fontWeight:700,
                  fontSize:"0.88rem", padding:"0.85rem 2.2rem", borderRadius:9999, border:"none",
                  cursor:"pointer", boxShadow:"0 8px 28px rgba(0,0,0,0.25)" }}>
                Book a Reading Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

     

    </div>
  );
}