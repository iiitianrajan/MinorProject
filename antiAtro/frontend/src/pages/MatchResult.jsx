import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/* ─── Zodiac Logic ─── */
function getZodiac(day, month) {
  day = Number(day); month = Number(month);
  if ((month==3&&day>=21)||(month==4&&day<=19)) return "Aries";
  if ((month==4&&day>=20)||(month==5&&day<=20)) return "Taurus";
  if ((month==5&&day>=21)||(month==6&&day<=20)) return "Gemini";
  if ((month==6&&day>=21)||(month==7&&day<=22)) return "Cancer";
  if ((month==7&&day>=23)||(month==8&&day<=22)) return "Leo";
  if ((month==8&&day>=23)||(month==9&&day<=22)) return "Virgo";
  if ((month==9&&day>=23)||(month==10&&day<=22)) return "Libra";
  if ((month==10&&day>=23)||(month==11&&day<=21)) return "Scorpio";
  if ((month==11&&day>=22)||(month==12&&day<=21)) return "Sagittarius";
  if ((month==12&&day>=22)||(month==1&&day<=19)) return "Capricorn";
  if ((month==1&&day>=20)||(month==2&&day<=18)) return "Aquarius";
  return "Pisces";
}
function getScore(z1, z2) {
  if (z1 === z2) return 30 + Math.floor(Math.random() * 6);
  return 15 + Math.floor(Math.random() * 15);
}
function generateBreakdown(score) {
  return {
    love: score > 25 ? "Strong emotional bonding ❤️" : "Needs understanding 🙂",
    career: score > 20 ? "Supportive growth 💼" : "Different career paths ⚠️",
    health: score > 18 ? "Balanced energy 🧘" : "Requires attention ⚠️",
  };
}

const GUNAS = [
  { name: "Varna (Ego)",              max: 1 },
  { name: "Vashya (Attraction)",      max: 2 },
  { name: "Tara (Destiny)",           max: 3 },
  { name: "Yoni (Nature)",            max: 4 },
  { name: "Graha Maitri (Friendship)",max: 5 },
  { name: "Gana (Temperament)",       max: 6 },
  { name: "Bhakoot (Construct)",      max: 7 },
  { name: "Nadi (Health)",            max: 8 },
];

function gunaScore(max, totalScore) {
  const ratio = totalScore / 36;
  if (max === 8) return Math.round(ratio * max * 10) / 10;
  return Math.min(max, Math.round(ratio * max));
}

/* ─── Animated counter ─── */
function Counter({ to, duration = 1000 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * to));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [to, duration]);
  return <>{val}</>;
}

/* ─── Cosmic Orb ─── */
function CosmicOrb() {
  return (
    <div style={{
      width:"100%", height:340,
      background:"radial-gradient(ellipse at 50% 50%, #0a1628 0%, #030810 70%)",
      borderRadius:16, display:"flex", alignItems:"center", justifyContent:"center",
      overflow:"hidden", position:"relative",
    }}>
      {Array.from({length:50}).map((_,i)=>(
        <div key={i} style={{
          position:"absolute",
          width: Math.random()*2+0.5, height: Math.random()*2+0.5,
          borderRadius:"50%", background:"white",
          top:`${Math.random()*100}%`, left:`${Math.random()*100}%`,
          opacity: Math.random()*0.5+0.15,
        }}/>
      ))}
      <div style={{position:"absolute",width:280,height:280,borderRadius:"50%",border:"1px solid rgba(0,200,255,0.08)"}}/>
      <div style={{position:"absolute",width:210,height:210,borderRadius:"50%",border:"1px solid rgba(0,200,255,0.12)"}}/>
      <div style={{position:"absolute",width:150,height:150,borderRadius:"50%",border:"1px solid rgba(0,200,255,0.18)"}}/>
      <div style={{
        width:115, height:115, borderRadius:"50%",
        background:"radial-gradient(circle at 36% 36%, rgba(255,255,255,0.97) 0%, rgba(130,225,255,0.85) 22%, rgba(0,165,230,0.65) 50%, rgba(0,60,130,0.45) 78%, transparent 100%)",
        boxShadow:"0 0 55px rgba(0,200,255,0.55), 0 0 110px rgba(0,150,220,0.25), inset 0 0 28px rgba(255,255,255,0.18)",
        position:"relative", zIndex:2,
      }}>
        <div style={{
          position:"absolute",top:8,left:8,right:8,bottom:8,
          borderRadius:"50%", border:"2px solid rgba(255,255,255,0.28)",
          borderTopColor:"transparent", transform:"rotate(45deg)",
        }}/>
      </div>
    </div>
  );
}

export default function MatchResult() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  useEffect(()=>{ setMounted(true); },[]);

  if (!state) return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#f9f8f6"}}>
      <button onClick={() => navigate("/match")} style={s.btnPrimary}>← Go Back</button>
    </div>
  );

  const boyZodiac  = getZodiac(state.boy.day,  state.boy.month);
  const girlZodiac = getZodiac(state.girl.day, state.girl.month);
  const score      = getScore(boyZodiac, girlZodiac);
  const resultLabel = score>28 ? "Highly Compatible" : score>18 ? "Good Match" : "Average Match";
  const resultSub   = score>28
    ? "A harmonious alignment suggesting a strong foundation for a life together."
    : score>18
    ? "A promising connection with room for growth and understanding."
    : "Different paths, but with shared effort this relationship can flourish.";

  return (
    <div style={{ fontFamily:"'Inter',-apple-system,sans-serif", background:"#f9f8f6", minHeight:"100vh" }}>

      

      {/* ── HERO ── */}
      <section style={{ padding:"3.5rem 0 3rem", borderBottom:"1px solid #e5e7eb", background:"#fff" }}>
        <div style={s.wrap}>
          <div style={s.heroGrid}>
            {/* Left */}
            <div>
              <p style={s.eyebrow}>ASHTAKOOTA MILAN REPORT</p>
              <h1 style={s.heroH1}>
                A Union Written<br/>
                in the <span style={{color:"#c2410c"}}>Starlight.</span>
              </h1>
              <p style={s.heroP}>
                Our Vedic algorithms have analyzed the celestial alignment of{" "}
                <strong style={{color:"#1f2937"}}>{state.boy.name}</strong> and{" "}
                <strong style={{color:"#1f2937"}}>{state.girl.name}</strong>.
                The cosmic vibrations indicate a journey of profound spiritual growth and mutual understanding.
              </p>
              <div style={{display:"flex",gap:"1rem",marginTop:"1.5rem",flexWrap:"wrap"}}>
                {[state.boy.name, state.girl.name].map((n,i)=>(
                  <div key={i} style={s.namePill}>
                    <span style={{opacity:0.5,marginRight:4}}>👤</span>{n}
                  </div>
                ))}
              </div>
            </div>
            {/* Right: Score card */}
            <div style={s.scoreCard}>
              <p style={s.scoreEyebrow}>COSMIC UNION SCORE</p>
              <div style={{display:"flex",alignItems:"flex-end",gap:"0.3rem",margin:"0.5rem 0 0.2rem"}}>
                <span style={s.scoreNum}>{mounted ? <Counter to={score}/> : 0}</span>
                <span style={s.scoreDen}>/ 36</span>
              </div>
              <p style={s.scoreLabel}>{resultLabel}</p>
              <p style={s.scoreSub}>{resultSub}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DOSHA + GUNA ── */}
      <section style={{padding:"2.5rem 0", background:"#fff", borderTop:"1px solid #f3f4f6"}}>
        <div style={s.wrap}>
          <div style={s.midGrid}>
            {/* Left col */}
            <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
              {/* Manglik */}
              <div style={s.doshaBox}>
                <div style={{display:"flex",alignItems:"center",gap:"0.5rem",marginBottom:"1.25rem"}}>
                  <span style={{color:"#c2410c",fontSize:"1rem"}}>🛡</span>
                  <span style={{fontWeight:700,fontSize:"0.92rem",color:"#1f2937"}}>Manglik Dosha Check</span>
                </div>
                {[state.boy.name, state.girl.name].map((n,i)=>(
                  <React.Fragment key={i}>
                    {i>0 && <div style={{height:1,background:"#f3f4f6",margin:"0.15rem 0"}}/>}
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.55rem 0"}}>
                      <span style={{fontSize:"0.88rem",fontWeight:500,color:"#374151"}}>{n}</span>
                      <span style={s.noBadge}>NO DOSHA</span>
                    </div>
                  </React.Fragment>
                ))}
                <p style={{color:"#9ca3af",fontSize:"0.77rem",fontStyle:"italic",lineHeight:1.55,marginTop:"0.9rem"}}>
                  "The absence of Kuja Dosha in both charts ensures a balanced temperament in the domestic sphere."
                </p>
              </div>
              {/* Vedic CTA */}
              <div style={s.vedicBox}>
                <p style={{fontWeight:700,fontSize:"1rem",marginBottom:"0.4rem"}}>Vedic Expert Guidance</p>
                <p style={{fontSize:"0.82rem",opacity:0.85,lineHeight:1.55,marginBottom:"1.25rem"}}>
                  Gain deeper clarity on your compatibility with a 1-on-1 session with our senior astrologers.
                </p>
                <button style={s.bookBtn}>Book Session</button>
              </div>
            </div>

            {/* Guna Breakdown */}
            <div style={s.gunaBox}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem"}}>
                <h3 style={{fontFamily:"'Poppins',sans-serif",fontWeight:700,fontSize:"1.05rem",color:"#111827"}}>
                  The 8 Guna Breakdown
                </h3>
                <span style={{fontSize:"0.72rem",fontWeight:700,color:"#c2410c",letterSpacing:"0.02em"}}>Ashtakoota Analysis</span>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.1rem 2.5rem"}}>
                {GUNAS.map((g,i)=>{
                  const sc  = gunaScore(g.max, score);
                  const pct = (sc / g.max) * 100;
                  const low = pct < 50;
                  return (
                    <div key={i}>
                      <div style={{display:"flex",justifyContent:"space-between",marginBottom:"0.3rem"}}>
                        <span style={{fontSize:"0.8rem",color:"#6b7280",fontWeight:500}}>{g.name}</span>
                        <span style={{fontSize:"0.8rem",fontWeight:700,color: low?"#c2410c":"#374151"}}>
                          {sc} / {g.max}
                        </span>
                      </div>
                      <div style={{height:3,background:"#e5e7eb",borderRadius:9999,overflow:"hidden"}}>
                        <div style={{
                          height:"100%", borderRadius:9999, width:`${pct}%`,
                          background: low
                            ? "linear-gradient(90deg,#c2410c,#ea580c)"
                            : "linear-gradient(90deg,#374151,#9ca3af)",
                          transition:"width 1.2s ease",
                        }}/>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOUL INSIGHTS ── */}
      <section style={{padding:"4rem 0",background:"#f9f8f6"}}>
        <div style={s.wrap}>
          <h2 style={{...s.secH2,textAlign:"center",marginBottom:"2.5rem"}}>Soul Insights</h2>
          <div style={s.soulGrid}>
            <div style={{display:"flex",flexDirection:"column",gap:"2.25rem"}}>
              {[
                {
                  title:"Emotional Harmony",
                  body:"With a high score in Gana and Bhakoot, your emotional resonance is exceptional. There is a natural rhythm in how you process feelings, allowing for a deep intuitive connection that transcends verbal communication.",
                },
                {
                  title:"Wealth and Destiny",
                  body:"The alignment of planets in your 2nd and 11th houses suggests that this union will be financially auspicious. Together, you are likely to build a stable and prosperous legacy, with opportunities for shared growth in professional spheres.",
                },
              ].map((item,i)=>(
                <div key={i} style={{display:"flex",gap:"0.9rem",alignItems:"flex-start"}}>
                  <div style={{width:4,minWidth:4,height:50,borderRadius:9999,background:"linear-gradient(180deg,#c2410c,#ea580c)",marginTop:3}}/>
                  <div>
                    <h4 style={{fontWeight:700,fontSize:"0.97rem",color:"#111827",marginBottom:"0.45rem"}}>{item.title}</h4>
                    <p style={{color:"#6b7280",fontSize:"0.87rem",lineHeight:1.7,margin:0}}>{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{borderRadius:16,overflow:"hidden"}}>
              <CosmicOrb/>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPLETE YOUR JOURNEY ── */}
      <section style={{padding:"4rem 0",background:"#fff",borderTop:"1px solid #e5e7eb",borderBottom:"1px solid #e5e7eb"}}>
        <div style={{...s.wrap,textAlign:"center"}}>
          <h2 style={{...s.secH2,marginBottom:"0.75rem"}}>Complete Your Journey</h2>
          <p style={{color:"#6b7280",fontSize:"0.88rem",lineHeight:1.65,maxWidth:480,margin:"0 auto 2rem"}}>
            Get the full 45-page astrological compatibility breakdown, including detailed planetary
            transit analysis and remedial measures for a blissful union.
          </p>
          <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
            <button style={s.btnPrimary}>⬇ Download Full PDF Report</button>
            <button style={s.btnOutline} onClick={()=>navigate("/match")}>Share Results</button>
          </div>
        </div>
      </section>

   
      
    </div>
  );
}

/* ────────────────────────────── STYLE TOKENS ────────────────────────────── */
const s = {
  wrap:      { maxWidth:1100, margin:"0 auto", padding:"0 1.5rem" },
  nav:       { background:"#fff", borderBottom:"1px solid #e5e7eb", position:"sticky", top:0, zIndex:100 },
  navInner:  { maxWidth:1100, margin:"0 auto", padding:"0 1.5rem", height:58, display:"flex", alignItems:"center", justifyContent:"space-between" },
  logo:      { fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:"1rem", color:"#1f2937", letterSpacing:"-0.02em" },
  navLinks:  { display:"flex", gap:"2rem", alignItems:"center" },
  navLink:   { textDecoration:"none", fontSize:"0.875rem", fontWeight:500, paddingBottom:2 },

  btnPrimary:{ background:"linear-gradient(135deg,#c2410c,#ea580c)", color:"#fff", border:"none", borderRadius:9999, padding:"0.58rem 1.35rem", fontWeight:600, fontSize:"0.875rem", cursor:"pointer" },
  btnOutline:{ background:"transparent", color:"#374151", border:"1.5px solid #d1d5db", borderRadius:9999, padding:"0.58rem 1.35rem", fontWeight:600, fontSize:"0.875rem", cursor:"pointer" },

  heroGrid:  { display:"grid", gridTemplateColumns:"1fr 320px", gap:"3rem", alignItems:"start" },
  eyebrow:   { fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.12em", color:"#9ca3af", textTransform:"uppercase", marginBottom:"0.65rem" },
  heroH1:    { fontFamily:"'Poppins',sans-serif", fontWeight:800, fontSize:"clamp(2.1rem,4vw,2.9rem)", lineHeight:1.08, color:"#111827", letterSpacing:"-0.03em", margin:"0 0 1rem" },
  heroP:     { color:"#6b7280", fontSize:"0.92rem", lineHeight:1.7, margin:0, maxWidth:420 },
  namePill:  { display:"inline-flex", alignItems:"center", background:"#f3f4f6", borderRadius:9999, padding:"0.38rem 1rem", fontSize:"0.84rem", fontWeight:500, color:"#374151" },

  scoreCard: { background:"#f9f8f6", border:"1px solid #e5e7eb", borderRadius:16, padding:"1.75rem 2rem", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" },
  scoreEyebrow:{ fontSize:"0.7rem", fontWeight:700, letterSpacing:"0.1em", color:"#9ca3af", textTransform:"uppercase" },
  scoreNum:  { fontFamily:"'Poppins',sans-serif", fontSize:"4.2rem", fontWeight:800, color:"#c2410c", lineHeight:1 },
  scoreDen:  { fontSize:"1.4rem", fontWeight:600, color:"#9ca3af", marginBottom:6 },
  scoreLabel:{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:"1.05rem", color:"#111827", margin:"0.3rem 0 0.25rem" },
  scoreSub:  { color:"#9ca3af", fontSize:"0.8rem", lineHeight:1.5 },

  midGrid:   { display:"grid", gridTemplateColumns:"260px 1fr", gap:"1.5rem", alignItems:"start" },
  doshaBox:  { background:"#f9f8f6", borderRadius:14, border:"1px solid #e5e7eb", padding:"1.4rem" },
  noBadge:   { background:"#dcfce7", color:"#16a34a", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.05em", padding:"0.2rem 0.65rem", borderRadius:9999 },
  vedicBox:  { background:"linear-gradient(135deg,#c2410c,#ea580c)", borderRadius:14, padding:"1.4rem", color:"#fff" },
  bookBtn:   { background:"#fff", color:"#c2410c", border:"none", borderRadius:9999, padding:"0.5rem 1.3rem", fontWeight:700, fontSize:"0.85rem", cursor:"pointer", width:"100%" },
  gunaBox:   { background:"#f9f8f6", borderRadius:14, border:"1px solid #e5e7eb", padding:"1.75rem" },

  secH2:     { fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:"clamp(1.5rem,3vw,1.9rem)", color:"#111827" },
  soulGrid:  { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"3rem", alignItems:"center" },
};