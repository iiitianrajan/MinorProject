import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin } from "lucide-react";

/* ─── Zodiac Data ─── */
const zodiacData = {
  Aries: {
    tagline: "The Trailblazing Pioneer",
    modality: "Cardinal Fire", house: "1st House Ruler",
    traits: [
      { icon: "⚡", title: "Bold Initiative", desc: "Acting before others have begun to think." },
      { icon: "🔥", title: "Raw Courage", desc: "Fearless in the face of new challenges." },
      { icon: "🏹", title: "Fierce Drive", desc: "Unstoppable momentum toward your goals." },
    ],
    essence: "Soul Spark",
    description: "Aries Moons are emotionally impulsive, passionate, and fiercely independent. You process feelings swiftly and need outlets for your inner fire. When hurt, you act—never stewing for long. Your emotional truth is always on the surface.",
    guidance: "Your emotional world moves at lightning speed. Give yourself permission to feel without immediately reacting. The pause between impulse and action is where your true power lives.",
    guidance2: "Channel your fire into creative pursuits that demand courage. Your restless spirit thrives when pioneering something new—let that be your north star.",
  },
  Taurus: {
    tagline: "The Nurturing Stabilizer",
    modality: "Fixed Earth", house: "2nd House Ruler",
    traits: [
      { icon: "🌿", title: "Steadfast Loyalty", desc: "You love with unwavering, enduring devotion." },
      { icon: "🌸", title: "Sensory Depth", desc: "Beauty, comfort, and pleasure ground your soul." },
      { icon: "🏔️", title: "Emotional Resilience", desc: "A mountain of calm in life's storms." },
    ],
    essence: "Soul Essence",
    description: "Taurus Moons crave security, beauty, and comfort above all. Your emotional world is rich and deep—you feel things slowly but profoundly. Home is your sanctuary, and stability your greatest need.",
    guidance: "Surround yourself with beauty and nature to replenish your spirit. Your sensitivity to the physical world is a gift—let it guide you to what truly nourishes your soul.",
    guidance2: "Be mindful of clinging too tightly to what feels safe. Growth lives just beyond the edge of your comfort zone—step there gently but boldly.",
  },
  Gemini: {
    tagline: "The Curious Communicator",
    modality: "Mutable Air", house: "3rd House Ruler",
    traits: [
      { icon: "💨", title: "Quicksilver Mind", desc: "Thoughts and feelings shift like the wind." },
      { icon: "🗣️", title: "Expressive Soul", desc: "You must articulate to understand yourself." },
      { icon: "🔗", title: "Social Connector", desc: "You feel alive through conversation and ideas." },
    ],
    essence: "Soul Voice",
    description: "Gemini Moons process emotions intellectually—you need to talk, write, or think feelings through. Your inner world is vivid and ever-shifting, sparking with curiosity and wit. Boredom is your real enemy.",
    guidance: "Journaling or speaking with a trusted friend helps you process what you feel. Your mind needs space to roam—don't cage it with routine.",
    guidance2: "Learn to sit with a feeling before analysing it. Not every emotion needs an explanation; some just need to be witnessed.",
  },
  Cancer: {
    tagline: "The Nurturing Guardian of the Inner World",
    modality: "Cardinal Water", house: "4th House Ruler",
    traits: [
      { icon: "🫀", title: "Empathic Intuition", desc: "Reading rooms and feelings comes naturally to you." },
      { icon: "👨‍👩‍👧", title: "Deep Nurturing", desc: "A fierce protector of loved ones and domestic bliss." },
      { icon: "🛡️", title: "Emotional Resilience", desc: "The ability to transform deep pain into healing energy." },
    ],
    essence: "Soul Essence",
    description: "Cancer Moons are deeply intuitive, nurturing, and find strength in their emotional depth. You experience feelings with incredible intensity, acting as an emotional sponge for those around you. Your home is your sanctuary.",
    guidance: "Because your moon is ruled by the Moon itself, your moods may wax and wane with the lunar cycles. Learning to distinguish between your own emotions and the energies you pick up from others is your primary spiritual task.",
    guidance2: "Seek out water—be it a bath or a walk by the sea—to cleanse your emotional field. Your greatest power lies in your vulnerability; do not mistake your softness for weakness.",
  },
  Leo: {
    tagline: "The Radiant Heart",
    modality: "Fixed Fire", house: "5th House Ruler",
    traits: [
      { icon: "👑", title: "Regal Warmth", desc: "You love grandly and expect the same in return." },
      { icon: "🎭", title: "Creative Expression", desc: "Life is your stage; feelings are your performance." },
      { icon: "☀️", title: "Generous Spirit", desc: "Your heart overflows—you give light to all." },
    ],
    essence: "Soul Radiance",
    description: "Leo Moons feel everything dramatically and beautifully. You need recognition, love, and creative outlets. Your emotional wellbeing is tied to being seen and celebrated. When you shine, everyone around you glows.",
    guidance: "Your emotional health depends on creative expression. Art, performance, or any act of creation feeds your soul in ways nothing else can.",
    guidance2: "Practice receiving as graciously as you give. Your pride can sometimes shield you from the very intimacy you crave—let people in.",
  },
  Virgo: {
    tagline: "The Thoughtful Healer",
    modality: "Mutable Earth", house: "6th House Ruler",
    traits: [
      { icon: "🔍", title: "Discerning Care", desc: "You show love through acts of precise service." },
      { icon: "🌿", title: "Quiet Strength", desc: "Steady, grounded, and endlessly capable." },
      { icon: "💊", title: "Healing Touch", desc: "Instinctively knowing what others need to mend." },
    ],
    essence: "Soul Purpose",
    description: "Virgo Moons feel most secure when life is ordered, useful, and purposeful. You process emotions analytically—sometimes overthinking what you feel. Service to others is both your gift and your spiritual practice.",
    guidance: "Be gentle with yourself. Your inner critic is louder than most—learn to speak to yourself with the same tender care you offer others.",
    guidance2: "Your body is your emotional barometer. When anxious, return to simple routines: clean, cook, tend a garden. Order soothes your inner world.",
  },
  Libra: {
    tagline: "The Harmonious Diplomat",
    modality: "Cardinal Air", house: "7th House Ruler",
    traits: [
      { icon: "⚖️", title: "Natural Balance", desc: "You instinctively seek harmony in all things." },
      { icon: "🤝", title: "Relational Soul", desc: "You come alive through meaningful partnerships." },
      { icon: "🎨", title: "Aesthetic Grace", desc: "Beauty and elegance are emotional necessities." },
    ],
    essence: "Soul Balance",
    description: "Libra Moons feel most themselves in relationship. You process emotions through others and need partnership to feel whole. Your deep sense of fairness makes injustice genuinely painful to experience.",
    guidance: "Practise making decisions from your gut, not just your head. Your need to weigh all sides can leave you emotionally paralysed—trust yourself more.",
    guidance2: "Beauty is medicine for your soul. Surround yourself with art, music, and elegance to restore your inner equilibrium.",
  },
  Scorpio: {
    tagline: "The Transformative Depth-Diver",
    modality: "Fixed Water", house: "8th House Ruler",
    traits: [
      { icon: "🌊", title: "Profound Depth", desc: "You feel everything at soul level—nothing is surface." },
      { icon: "🦅", title: "Phoenix Power", desc: "You rise transformed from every emotional trial." },
      { icon: "🔮", title: "Psychic Intuition", desc: "You sense what others cannot bring themselves to say." },
    ],
    essence: "Soul Transformation",
    description: "Scorpio Moons experience emotions at an intensity few can comprehend. You are drawn to depth, mystery, and transformation. Trust does not come easily, but once given, your loyalty is absolute and enduring.",
    guidance: "Your greatest challenge is releasing control over your emotional world. Surrender is not weakness—it is your most powerful spiritual practice.",
    guidance2: "Shadow work and depth psychology are your natural healing modalities. Do not fear your darkness; it holds the seeds of your greatest transformation.",
  },
  Sagittarius: {
    tagline: "The Philosophical Adventurer",
    modality: "Mutable Fire", house: "9th House Ruler",
    traits: [
      { icon: "🏹", title: "Boundless Optimism", desc: "You see possibility where others see walls." },
      { icon: "🌍", title: "Freedom Spirit", desc: "You wither without space to roam and explore." },
      { icon: "📚", title: "Wisdom Seeker", desc: "Meaning and truth are your deepest emotional needs." },
    ],
    essence: "Soul Freedom",
    description: "Sagittarius Moons need freedom, adventure, and meaning. You feel emotions expansively—highs are soaring, and you rarely dwell in lows. Philosophy, travel, and learning feed your emotional wellbeing.",
    guidance: "Your restlessness is sacred—honour it with real adventure, not just distraction. Your soul needs genuine horizons, not just the illusion of escape.",
    guidance2: "Practise being fully present in one place before seeking the next. Your deepest wisdom comes in stillness, not just in movement.",
  },
  Capricorn: {
    tagline: "The Disciplined Mountain Climber",
    modality: "Cardinal Earth", house: "10th House Ruler",
    traits: [
      { icon: "🏔️", title: "Quiet Mastery", desc: "You build emotional security through achievement." },
      { icon: "🎯", title: "Focused Resolve", desc: "Nothing shakes your determination once set." },
      { icon: "🌙", title: "Hidden Depth", desc: "Your emotional life is rich beneath the composed surface." },
    ],
    essence: "Soul Mastery",
    description: "Capricorn Moons feel most secure through accomplishment and structure. You may suppress emotions to maintain control, but your inner world is tender and deep. Responsibility is how you show love.",
    guidance: "Allow yourself to be cared for, not just the one who does the caring. Your emotional growth lives in receiving vulnerability, not just managing it.",
    guidance2: "Slowness is not failure. Saturn rules your emotional world—learn to value the wisdom of timing and the gift of patient endurance.",
  },
  Aquarius: {
    tagline: "The Visionary Individualist",
    modality: "Fixed Air", house: "11th House Ruler",
    traits: [
      { icon: "⚡", title: "Radical Originality", desc: "You feel most yourself when breaking the mould." },
      { icon: "🌐", title: "Collective Heart", desc: "You care deeply for humanity, sometimes more than individuals." },
      { icon: "🔭", title: "Future Vision", desc: "You see where the world is going before others can." },
    ],
    essence: "Soul Vision",
    description: "Aquarius Moons process emotions through the intellect and often feel like observers of their own inner world. You need freedom, individuality, and a sense that your life serves something larger than yourself.",
    guidance: "Your detachment is a coping mechanism, not a character flaw. Learn to bridge the gap between your ideas about feelings and the feelings themselves.",
    guidance2: "Community is your emotional nourishment. Find your tribe—people who celebrate your strangeness rather than asking you to diminish it.",
  },
  Pisces: {
    tagline: "The Mystical Dreamer",
    modality: "Mutable Water", house: "12th House Ruler",
    traits: [
      { icon: "🌊", title: "Boundless Empathy", desc: "You absorb the emotions of everyone around you." },
      { icon: "🎨", title: "Creative Vision", desc: "Art and imagination are your emotional language." },
      { icon: "✨", title: "Spiritual Depth", desc: "You sense the invisible threads connecting all beings." },
    ],
    essence: "Soul Dream",
    description: "Pisces Moons are the most emotionally sensitive of all. You feel everything—yours and everyone else's—and often cannot tell the difference. Your inner world is vast, mystical, and breathtakingly beautiful.",
    guidance: "Solitude is not isolation—it is your sacred recharging ritual. Build clear boundaries to protect your luminous sensitivity from being depleted.",
    guidance2: "Creative expression is your spiritual practice. When words fail, paint, dance, sing, or dream. Your soul speaks in symbols, not sentences.",
  },
};

function getMoonSign(day, month) {
  const d = parseInt(day), m = parseInt(month);
  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return "Aries";
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return "Taurus";
  if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return "Gemini";
  if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return "Cancer";
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return "Leo";
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return "Virgo";
  if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return "Libra";
  if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return "Scorpio";
  if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return "Sagittarius";
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return "Capricorn";
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return "Aquarius";
  return "Pisces";
}

/* ─── Shared input styles ─── */
const inp = {
  width: "100%",
  padding: "0.6rem 0.85rem",
  borderRadius: "0.6rem",
  border: "1px solid var(--border-soft)",
  background: "var(--bg-elevated)",
  color: "var(--text-heading)",
  fontSize: "0.85rem",
  fontWeight: 500,
  outline: "none",
  transition: "border 0.2s, box-shadow 0.2s",
  display: "block",
};
const lbl = {
  display: "block",
  fontSize: "0.58rem",
  fontWeight: 700,
  letterSpacing: "0.13em",
  textTransform: "uppercase",
  color: "var(--text-soft)",
  marginBottom: "0.35rem",
};
const fi = (e) => { e.target.style.border = "1px solid var(--primary-light)"; e.target.style.boxShadow = "0 0 0 3px rgba(255,98,0,0.08)"; };
const fo = (e) => { e.target.style.border = "1px solid var(--border-soft)"; e.target.style.boxShadow = "none"; };

export default function MoonSign() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [city, setCity] = useState("");
  const [sign, setSign] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    if (!date) return;
    setLoading(true);
    setTimeout(() => {
      const parts = date.split("-");
      const result = getMoonSign(parts[2], parts[1]);
      setSign(result);
      setLoading(false);
    }, 700);
  };

  const data = sign ? zodiacData[sign] : null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "'Inter',sans-serif", color: "var(--text)" }}>

      
      {/* ══ HERO — split layout ══ */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 320, marginLeft:"15px", background: "var(--bg-soft)", overflow: "hidden" }}>
        {/* Left: headline */}
        <div style={{ padding: "4rem 3.5rem 3rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--primary)", marginBottom: "1rem" }}>
            Ethereal Insights
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}
            style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(2.4rem,5vw,4rem)", fontWeight: 900,
              lineHeight: 1.04, letterSpacing: "-0.04em", color: "var(--text-heading)", margin: "0 0 1.2rem" }}>
            Moon Sign<br />Calculator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.26 }}
            style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.75, maxWidth: 360, margin: 0 }}>
            Discover the hidden currents of your emotional world. Your moon sign reveals your deepest needs, instincts, and the way you nurture yourself.
          </motion.p>
        </div>
        {/* Right: atmosphere */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ position: "relative", overflow: "hidden",
            background: "linear-gradient(135deg, var(--bg-high) 0%, rgba(165,61,0,0.07) 60%, rgba(255,98,0,0.12) 100%)" }}>
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(ellipse at 65% 40%, rgba(255,98,0,0.18) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "9rem", opacity: 0.12, userSelect: "none" }}>🌙</div>
        </motion.div>
      </section>

      {/* ══ FORM + RESULT — two column ══ */}
      <section style={{ background: "var(--bg-soft)", paddingBottom: "3rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 2rem",
          display: "grid", gridTemplateColumns: "380px 1fr", gap: "1.5rem", alignItems: "start" }}>

          {/* ── FORM CARD ── */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="card" style={{ padding: "1.8rem" }}>

            <h2 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "1.1rem",
              color: "var(--text-heading)", margin: "0 0 1.4rem", letterSpacing: "-0.02em" }}>
              Enter Your Birth Details
            </h2>

            {/* Full Name */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={lbl}>Full Name</label>
              <input value={name} placeholder="Aria Sterling" onChange={e => setName(e.target.value)}
                style={inp} onFocus={fi} onBlur={fo} />
            </div>

            {/* Date + Time */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
              <div>
                <label style={lbl}>Date of Birth</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)}
                  style={inp} onFocus={fi} onBlur={fo} />
              </div>
              <div>
                <label style={lbl}>Time of Birth</label>
                <input type="time" value={time} onChange={e => setTime(e.target.value)}
                  style={inp} onFocus={fi} onBlur={fo} />
              </div>
            </div>

            {/* City */}
            <div style={{ marginBottom: "1.6rem" }}>
              <label style={lbl}>Birth City / Location</label>
              <div style={{ position: "relative" }}>
                <MapPin size={12} style={{ position: "absolute", left: "0.75rem", top: "50%",
                  transform: "translateY(-50%)", color: "var(--primary)", pointerEvents: "none" }} />
                <input value={city} placeholder="London, United Kingdom"
                  onChange={e => setCity(e.target.value)}
                  style={{ ...inp, paddingLeft: "2rem" }} onFocus={fi} onBlur={fo} />
              </div>
            </div>

            {/* Button */}
            <motion.button onClick={handleCalculate}
              whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(255,98,0,0.3)" }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary"
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                gap: "0.5rem", padding: "0.85rem", fontSize: "0.85rem", fontWeight: 700,
                cursor: !date ? "not-allowed" : "pointer", opacity: !date ? 0.6 : 1, border: "none" }}>
              <motion.span animate={loading ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}>
                <Sparkles size={14} />
              </motion.span>
              {loading ? "Reading the Stars…" : "Calculate My Moon Sign ✦"}
            </motion.button>
          </motion.div>

          {/* ── RESULT CARD ── */}
          <AnimatePresence mode="wait">
            {data ? (
              <motion.div key={sign}
                initial={{ opacity: 0, x: 20, scale: 0.97 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="card" style={{ padding: "1.8rem", position: "relative", overflow: "hidden" }}>
                {/* Glow */}
                <motion.div animate={{ scale: [1,1.2,1], opacity: [0.35,0.7,0.35] }}
                  transition={{ duration: 7, repeat: Infinity }}
                  style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%",
                    background: "radial-gradient(circle,rgba(255,98,0,0.12) 0%,transparent 65%)",
                    filter: "blur(40px)", pointerEvents: "none" }} />

                {/* Sign header */}
                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem",
                  marginBottom: "1.3rem", position: "relative", zIndex: 1 }}>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                    style={{ width: 70, height: 70, borderRadius: "50%", flexShrink: 0,
                      background: "var(--gradient-primary)", display: "flex", alignItems: "center",
                      justifyContent: "center", fontSize: "2rem", position: "relative" }}>
                    🌙
                    <div style={{ position: "absolute", bottom: 3, right: 3, width: 14, height: 14,
                      borderRadius: "50%", background: "var(--primary-dark)",
                      border: "2px solid var(--bg-elevated)" }} />
                  </motion.div>
                  <div>
                    <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: "0 0 0.2rem" }}>Your Moon is in</p>
                    <h2 style={{ fontFamily: "'Poppins',sans-serif", fontSize: "1.55rem", fontWeight: 800,
                      letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 0.25rem" }}>
                      <span style={{ color: "var(--primary-light)" }}>{sign}</span>
                    </h2>
                    <p style={{ fontSize: "0.76rem", fontStyle: "italic", color: "var(--text-muted)", margin: 0 }}>
                      "{data.tagline}"
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div style={{ borderTop: "1px solid var(--border-soft)", paddingTop: "1.1rem", position: "relative", zIndex: 1 }}>
                  <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.13em",
                    textTransform: "uppercase", color: "var(--primary)", margin: "0 0 0.55rem" }}>
                    {data.essence}
                  </p>
                  <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", lineHeight: 1.75, margin: 0 }}>
                    {data.description}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="card-soft"
                style={{ padding: "2rem", display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", minHeight: 260, textAlign: "center" }}>
                <motion.div animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ fontSize: "4rem", marginBottom: "1rem", opacity: 0.35 }}>🌙</motion.div>
                <p style={{ color: "var(--text-soft)", fontSize: "0.84rem", margin: 0 }}>
                  Enter your birth details to reveal your moon sign
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ══ TRAIT CARDS ══ */}
      <AnimatePresence>
        {data && (
          <motion.section key="traits"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            style={{ background: "var(--bg-soft)", paddingBottom: "1rem" }}>
            <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
                {data.traits.map((t, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="card" style={{ padding: "1.3rem" }}>
                    <div style={{ fontSize: "1.3rem", marginBottom: "0.55rem" }}>{t.icon}</div>
                    <h4 style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 700, fontSize: "0.84rem",
                      color: "var(--text-heading)", margin: "0 0 0.3rem", letterSpacing: "-0.01em" }}>
                      {t.title}
                    </h4>
                    <p style={{ fontSize: "0.77rem", color: "var(--text-muted)", lineHeight: 1.65, margin: 0 }}>
                      {t.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ══ COSMIC GUIDANCE ══ */}
      <AnimatePresence>
        {data && (
          <motion.section key="guidance"
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            style={{ background: "var(--bg)", padding: "4rem 2rem 5rem" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              <motion.h3
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                style={{ fontFamily: "'Poppins',sans-serif", fontWeight: 800, fontSize: "1.55rem",
                  color: "var(--text-heading)", margin: "0 0 1.1rem", letterSpacing: "-0.03em" }}>
                Cosmic Guidance
              </motion.h3>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                style={{ fontSize: "0.86rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 620, margin: "0 0 0.9rem" }}>
                {data.guidance}
              </motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.52 }}
                style={{ fontSize: "0.86rem", color: "var(--text-muted)", lineHeight: 1.8, maxWidth: 620, margin: "0 0 1.5rem" }}>
                {data.guidance2}
              </motion.p>
              {/* Attribute tags */}
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                style={{ display: "flex", gap: "0.55rem", flexWrap: "wrap" }}>
                {[data.modality, data.house].map(tag => (
                  <span key={tag} style={{
                    fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase",
                    padding: "0.32rem 0.8rem", borderRadius: "0.4rem",
                    border: "1px solid var(--border-soft)", color: "var(--text-muted)",
                    background: "var(--bg-elevated)",
                  }}>{tag}</span>
                ))}
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ══ DARK CTA ══ */}
      <section style={{ padding: "0 2rem 4rem", background: "var(--bg)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ borderRadius: "2rem", overflow: "hidden", padding: "4.5rem 2.5rem",
              background: "linear-gradient(160deg,#0d0d0d 0%,#1c1010 50%,#0d0d0d 100%)",
              textAlign: "center", position: "relative" }}>

            {/* star dots */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5,
              backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.07) 1px,transparent 1px)",
              backgroundSize: "22px 22px" }} />

            {/* orange glow */}
            <motion.div animate={{ scale: [1,1.15,1], opacity: [0.4,0.85,0.4] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse 80% 65% at 50% 65%,rgba(165,61,0,0.4) 0%,transparent 65%)" }} />

            <div style={{ position: "relative", zIndex: 1 }}>
              <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ fontFamily: "'Poppins',sans-serif", fontSize: "clamp(1.8rem,4.5vw,2.9rem)",
                  fontWeight: 900, color: "#f5f5f5", margin: "0 0 0.9rem",
                  letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                Your Moon has more to tell you.
              </motion.h2>
              <p style={{ color: "rgba(245,245,245,0.5)", fontSize: "0.87rem", lineHeight: 1.75,
                maxWidth: 440, margin: "0 auto 2.2rem" }}>
                Connect with our master astrologers to dive deeper into your lunar aspects, including your Moon's house placement and aspects to other planets.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                <motion.button whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.96 }}
                  className="btn-primary"
                  style={{ padding: "0.85rem 2rem", fontSize: "0.87rem", fontWeight: 700, cursor: "pointer", border: "none" }}>
                  Book a Moon Reading
                </motion.button>
                <motion.button whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.96 }}
                  style={{ padding: "0.85rem 2rem", fontSize: "0.87rem", fontWeight: 600, cursor: "pointer",
                    borderRadius: 9999, border: "1px solid rgba(255,255,255,0.18)",
                    background: "rgba(255,255,255,0.05)", color: "rgba(245,245,245,0.8)" }}>
                  View Expert Astrologers
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
}