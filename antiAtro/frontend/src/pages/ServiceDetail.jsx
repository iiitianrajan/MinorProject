import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── DATA ─── */
const servicesData = {
  "general-puja": {
    title: "General Puja",
    categoryLabel: "Ritual",
    duration: "1.5 – 2 Hours",
    price: "₹2,100 onwards",
    badge: "Most Popular",
    images: [
      "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=1200&q=80",
      "https://images.unsplash.com/photo-1598714805247-5dd7768cbf7c?w=800&q=80",
      "https://images.unsplash.com/photo-1519817565319-60c96b1e4f5c?w=800&q=80",
      "https://images.unsplash.com/photo-1571907483086-3c0ea41b4ae4?w=800&q=80",
      "https://images.unsplash.com/photo-1580196969807-cc6de06c05be?w=800&q=80",
    ],
    description: "General Puja is a sacred Hindu ritual performed to seek blessings from deities, remove negativity, and bring peace and prosperity into life. This timeless practice forms the cornerstone of Hindu worship — connecting the devotee to the divine through offerings, mantras, and heartfelt prayer.",
    longDescription: "Rooted in ancient Vedic tradition, General Puja involves a sequence of sacred steps — from the invocation of Ganesha to the final aarti. The pandit guides the family through each offering with precise mantra chanting, ensuring that the divine energy is properly awakened and blessings are bestowed. Whether performed at home or in a sacred space, this puja creates a sanctified environment that elevates the spiritual vibration of the entire household.",
    benefits: ["Removes negative energy and purifies surroundings", "Brings peace, prosperity, and happiness to the family", "Improves mental clarity and sharpens focus", "Strengthens spiritual growth and devotion", "Creates a positive atmosphere for new beginnings"],
    procedure: "The ritual begins with Ganesh Vandana to remove obstacles, followed by Kalash Sthapana, invocation of the chosen deity, mantra chanting, offering of flowers, dhoop, deep, naivedyam (prasad), and concludes with Aarti and distribution of prasad to all present.",
    when: "Can be performed on any auspicious day, during festivals, or at personal milestones like moving into a new home, beginning a new venture, or simply to restore peace and positive energy.",
    includes: ["All puja samagri (flowers, incense, ghee, prasad)", "Kalash and ritual items", "Experienced pandit with Sanskrit knowledge", "Prasad distribution at end", "Puja vidhi explanation in Hindi/English"],
    faqs: [
      { q: "Do I need to arrange anything?", a: "No — our pandit brings all puja samagri. You only need a clean space and, if possible, a small puja table." },
      { q: "How long does it take?", a: "Typically 1.5 to 2 hours depending on the elaborateness of the puja requested." },
      { q: "Can it be done at home?", a: "Absolutely. Most families prefer home puja for the intimate and personal divine connection it creates." },
    ],
  },
  havan: {
    title: "Havan (Yagya)",
    categoryLabel: "Fire Ritual",
    duration: "2 – 3 Hours",
    price: "₹5,100 onwards",
    badge: "Highly Effective",
    images: [
      "https://images.unsplash.com/photo-1519817565319-60c96b1e4f5c?w=1200&q=80",
      "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&q=80",
      "https://images.unsplash.com/photo-1605106702734-205df224ecce?w=800&q=80",
      "https://images.unsplash.com/photo-1580196969807-cc6de06c05be?w=800&q=80",
      "https://images.unsplash.com/photo-1571543771953-a3c85c9cde3f?w=800&q=80",
    ],
    description: "Havan is a powerful Vedic fire ritual where offerings are made into the sacred Agni (fire) while chanting mantras to purify the environment, the mind, and the soul. The fragrant smoke of herbs and ghee carries prayers directly to the heavens.",
    longDescription: "Scientifically, the burning of medicinal herbs like guggul, camphor, and sandalwood in a havan creates air-purifying compounds that benefit health. Spiritually, the fire — Agni — is the divine witness and messenger who carries the offerings to the gods. Every oblation accompanied by 'Swaha' is an act of surrender and devotion.",
    benefits: ["Purifies the air with fragrant medicinal smoke", "Removes doshas and negative planetary effects", "Brings positivity and divine blessings to the space", "Improves health and overall mental wellbeing", "Creates powerful spiritual energy in the home"],
    procedure: "A sacred havan kund is set up and consecrated. The fire is lit using specific wood and camphor. Offerings of ghee, samagri herbs, sesame, and grains are made into the fire while chanting the designated mantras. The number of ahutis (oblations) is determined by the purpose of the havan.",
    when: "Performed during Griha Pravesh (housewarming), weddings, for removing planetary doshas, Navratri, or any time deep purification and divine blessings are needed.",
    includes: ["Havan kund setup and samagri", "Ghee, herbs, and ritual wood", "Mantra chanting by experienced pandit", "Havan post-prasad and vibhuti", "Space purification with dhoop and camphor"],
    faqs: [
      { q: "Is havan safe indoors?", a: "Yes, with proper ventilation. We recommend keeping windows open. Our pandit uses controlled, clean-burning materials." },
      { q: "What is havan samagri?", a: "A mix of dried herbs, roots, seeds, and resins like guggul — each with specific spiritual and medicinal properties." },
      { q: "Can I do it on a terrace or garden?", a: "Absolutely, outdoor havan is ideal and fully manageable. We arrange everything on-site." },
    ],
  },
  "special-puja": {
    title: "Special Puja",
    categoryLabel: "Customised",
    duration: "2 – 4 Hours",
    price: "₹3,500 onwards",
    badge: "Personalised",
    images: [
      "https://images.unsplash.com/photo-1598714805247-5dd7768cbf7c?w=1200&q=80",
      "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&q=80",
      "https://images.unsplash.com/photo-1519817565319-60c96b1e4f5c?w=800&q=80",
      "https://images.unsplash.com/photo-1571543771953-a3c85c9cde3f?w=800&q=80",
      "https://images.unsplash.com/photo-1605106702734-205df224ecce?w=800&q=80",
    ],
    description: "Special Puja is performed for specific desires — success in business, health recovery, relief from stress, or overcoming personal challenges — using customised rituals aligned with the appropriate deity and your unique sankalp.",
    longDescription: "Unlike a standard puja, a Special Puja begins with a detailed consultation to understand your specific purpose and current planetary influences. The pandit then designs a puja sequence — selecting the appropriate deity, mantras, number of chants, and offerings — to channel divine energy toward your intended goal.",
    benefits: ["Addresses specific goals and life challenges", "Removes obstacles from career, health, and relationships", "Customised mantras and rituals for your purpose", "Brings targeted divine blessings", "Can include remedies for planetary doshas"],
    procedure: "Begins with a consultation and sankalp (declaration of intent). Customized rituals are performed including appropriate mantra chanting, deity invocation, and specific offerings based on your need.",
    when: "Whenever you face a significant challenge, need divine intervention, or wish to channel spiritual energy toward a specific life goal.",
    includes: ["Pre-puja consultation to understand your need", "Custom sankalp and deity selection", "All puja samagri for the specific ritual", "Mantra recitation count as per purpose", "Guidance on post-puja practices"],
    faqs: [
      { q: "Can I request a puja for a specific problem?", a: "Yes, that is the very purpose of Special Puja. Please share your situation and we will design the right ritual." },
      { q: "Which deities are invoked?", a: "Depends on your goal — Durga for protection, Shiva for health, Kubera for wealth, Surya for career success, and more." },
      { q: "Is kundali required?", a: "For planetary dosha-related pujas, a brief birth detail helps. For general goal-based pujas, it is not necessary." },
    ],
  },
  "mundan-puja": {
    title: "Mundan Ceremony",
    categoryLabel: "Life Event",
    duration: "1 – 1.5 Hours",
    price: "₹2,500 onwards",
    badge: "Sacred Rite",
    images: [
      "https://images.unsplash.com/photo-1571907483086-3c0ea41b4ae4?w=1200&q=80",
      "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&q=80",
      "https://images.unsplash.com/photo-1605106702734-205df224ecce?w=800&q=80",
      "https://images.unsplash.com/photo-1580196969807-cc6de06c05be?w=800&q=80",
      "https://images.unsplash.com/photo-1598714805247-5dd7768cbf7c?w=800&q=80",
    ],
    description: "Mundan Puja is a sacred Hindu rite of passage — the Chudakarana Sanskar — where a child's first hair is shaved, symbolising the removal of past-life karma and the beginning of a pure, blessed life in this world.",
    longDescription: "According to Vedic tradition, the hair a child is born with carries the impurities of previous births. By removing it during an auspicious ceremony accompanied by mantras, the child is spiritually cleansed and blessed for a long, healthy, and prosperous life. The ritual also has scientific backing — the first shave stimulates healthy hair regrowth.",
    benefits: ["Symbolically purifies the child of past-life karma", "Promotes thick and healthy hair regrowth", "Brings blessings for a long and healthy life", "Marks a joyful family milestone", "Connects the child to Vedic tradition from early life"],
    procedure: "Begins with Ganesh puja, followed by the child's ritual bath, mantra chanting by the pandit, the ceremonial shaving by a barber (naai), blessings from elders, and a post-ritual bath for the child.",
    when: "Traditionally performed in the first, third, or fifth odd year of the child's life on an auspicious date determined by the Panchang.",
    includes: ["Puja samagri and kalash", "Coordination with ceremony schedule", "Mantra chanting throughout", "Ritual bath setup guidance", "Blessings ceremony for the child"],
    faqs: [
      { q: "Does the child need to be present for the full puja?", a: "Yes, the child is central to the ceremony — we make it calm and comfortable with minimal disruption." },
      { q: "Who performs the actual shaving?", a: "A barber (naai) does the shaving; the pandit performs the accompanying rituals and mantras." },
      { q: "What to do with the shaved hair?", a: "It is traditionally offered at a temple or holy river — we guide you on the appropriate practice for your tradition." },
    ],
  },
  "laxmi-puja": {
    title: "Laxmi Puja",
    categoryLabel: "Festival",
    duration: "1.5 – 2 Hours",
    price: "₹2,500 onwards",
    badge: "Diwali Special",
    images: [
      "https://images.unsplash.com/photo-1571543771953-a3c85c9cde3f?w=1200&q=80",
      "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&q=80",
      "https://images.unsplash.com/photo-1605106702734-205df224ecce?w=800&q=80",
      "https://images.unsplash.com/photo-1519817565319-60c96b1e4f5c?w=800&q=80",
      "https://images.unsplash.com/photo-1580196969807-cc6de06c05be?w=800&q=80",
    ],
    description: "Laxmi Puja is performed to welcome Goddess Lakshmi — the divine bestower of wealth, abundance, and prosperity — into your home. This ritual invites her blessings for financial growth, domestic harmony, and spiritual richness.",
    longDescription: "Goddess Lakshmi resides where there is cleanliness, devotion, and gratitude. The puja ritual prepares your home and heart as a worthy abode for her grace. With the chanting of Shri Suktam, Lakshmi Ashtakam, and the ceremonial lighting of diyas, the home is transformed into a temple of abundance.",
    benefits: ["Attracts wealth and financial prosperity", "Brings success in business and career endeavours", "Removes financial obstacles and debt", "Creates peace, harmony, and positivity in the home", "Invites divine feminine energy of abundance"],
    procedure: "Begins with thorough cleaning and decoration of the puja space with rangoli and flowers. The pandit consecrates a Lakshmi idol or image, chants Shri Suktam and Lakshmi Ashtakam, performs aarti with diyas, offers lotus flowers, sweets, and coconut, and concludes with prasad distribution.",
    when: "Most auspicious on Diwali (Amavasya), Fridays, Sharad Purnima (Kojagiri), or any time you wish to invite prosperity and remove financial obstacles.",
    includes: ["Lakshmi idol consecration samagri", "Lotus flowers and sweets (naivedyam)", "Diyas, camphor, and rangoli guidance", "Shri Suktam and Lakshmi Ashtakam chanting", "Prasad for the family"],
    faqs: [
      { q: "Can this be done at a shop or office?", a: "Absolutely — Laxmi Puja at a workplace is very auspicious and commonly done before new ventures or on Diwali." },
      { q: "Is Ganesh Puja done alongside?", a: "Yes — Ganesha is always invoked first to remove obstacles before Lakshmi is welcomed." },
      { q: "What should I prepare at home?", a: "Simply clean the space thoroughly. We bring all the rest — rangoli, flowers, prasad, and samagri." },
    ],
  },
  wedding: {
    title: "Wedding Ceremony",
    categoryLabel: "Life Event",
    duration: "3 – 5 Hours",
    price: "₹11,000 onwards",
    badge: "Premium",
    images: [
      "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=1200&q=80",
      "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&q=80",
      "https://images.unsplash.com/photo-1519817565319-60c96b1e4f5c?w=800&q=80",
      "https://images.unsplash.com/photo-1598714805247-5dd7768cbf7c?w=800&q=80",
      "https://images.unsplash.com/photo-1571543771953-a3c85c9cde3f?w=800&q=80",
    ],
    description: "A Hindu wedding ceremony is the most sacred union of two souls — solemnised through Vedic fire rites, sacred vows, and ancient traditions passed down for thousands of years, witnessed by family, the divine, and the eternal flame of Agni.",
    longDescription: "The Vivah Sanskar is one of the most important of all sixteen Samskaras. Every ritual within the wedding — from the Kanyadaan to the Saptapadi — carries profound spiritual symbolism. Our pandits explain each ritual as it unfolds, allowing the couple and their families to participate consciously in one of life's most transformative ceremonies.",
    benefits: ["Sanctifies the marital union with Vedic blessings", "Ensures all traditional rituals are performed correctly", "Brings blessings for a long and happy married life", "Creates a spiritually charged beginning to new life together", "Supports regional customs and family traditions"],
    procedure: "Includes Ganesh Puja, Kanyadaan, Varmala, Madhuparka, Mangal Pheras (seven rounds around the fire), Saptapadi (seven vows), Sindoor Daan, and blessings from elders — all performed according to the correct muhurat.",
    when: "On an auspicious Vivah Muhurat as determined by the Panchang based on the couple's kundali and birth details.",
    includes: ["Complete havan kund and wedding samagri", "Muhurat and kundali consultation", "All fire ritual materials", "Step-by-step ritual explanation for guests", "Pre-wedding consultation for customisation"],
    faqs: [
      { q: "Do you support inter-caste or inter-regional weddings?", a: "Yes — we accommodate diverse traditions and can blend elements from different regional customs respectfully." },
      { q: "How early should we book?", a: "At least 2–4 weeks in advance for weddings to allow proper muhurat selection and preparation." },
      { q: "Can the ceremony be explained in English for guests?", a: "Yes — our pandit can provide bilingual narration so all guests can follow and appreciate each ritual." },
    ],
  },
  "festival-puja": {
    title: "Festival Puja",
    categoryLabel: "Festival",
    duration: "1.5 – 2.5 Hours",
    price: "₹2,100 onwards",
    badge: "Seasonal",
    images: [
      "https://images.unsplash.com/photo-1605106702734-205df224ecce?w=1200&q=80",
      "https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?w=800&q=80",
      "https://images.unsplash.com/photo-1571543771953-a3c85c9cde3f?w=800&q=80",
      "https://images.unsplash.com/photo-1519817565319-60c96b1e4f5c?w=800&q=80",
      "https://images.unsplash.com/photo-1580196969807-cc6de06c05be?w=800&q=80",
    ],
    description: "Festival Puja is performed during major Hindu festivals to celebrate sacred traditions, honour the presiding deity of that occasion, and invite divine blessings into your home during the most auspicious times of the year.",
    longDescription: "Hindu festivals are not merely cultural celebrations — they are windows in the year when specific divine energies are most accessible. Performing a proper puja during these windows, guided by a knowledgeable pandit, maximises the spiritual benefit of each occasion.",
    benefits: ["Maximises the spiritual benefit of each festival", "Brings divine blessings for the year ahead", "Strengthens family and community bonding", "Ensures rituals are performed with correct mantras", "Creates joyful and sacred memories for the family"],
    procedure: "Each festival puja follows the specific vidhi for that deity and occasion: idol installation, mantra chanting, offerings, aarti, and prasad distribution — all in alignment with the festival's traditional customs.",
    when: "During Diwali, Navratri (Durga Puja), Ganesh Chaturthi, Janmashtami, Ram Navami, Chhath Puja, Makar Sankranti, and all other major Hindu festivals.",
    includes: ["Festival-specific deity idol or image setup", "All samagri for the festival puja", "Mantra chanting per festival tradition", "Aarti with diyas and camphor", "Prasad preparation and distribution"],
    faqs: [
      { q: "Which festivals do you cover?", a: "All major Hindu festivals — Diwali, Navratri, Ganesh Chaturthi, Janmashtami, Chhath, Ram Navami, and more." },
      { q: "How far in advance should I book for Diwali?", a: "For Diwali and Navratri, we recommend booking at least 2 weeks in advance as slots fill quickly." },
      { q: "Can the puja be done for a housing society or group?", a: "Yes — community and society-level festival pujas are very auspicious and we have experience managing large gatherings." },
    ],
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.45, ease: "easeOut" } }),
};
const TABS = ["benefits", "procedure", "includes", "faqs"];

export default function ServiceDetail() {
  const { id } = useParams();
  const service = servicesData[id];
  const [activeTab, setActiveTab] = useState("benefits");
  const [openFaq, setOpenFaq] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); setImgIdx(0); }, [id]);

  if (!service) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      Service not found. <Link to="/services" style={{ color: "#6b4eff", marginLeft: 8 }}>Go back</Link>
    </div>
  );

  const imgs = service.images;

  return (
    <div style={{ background: "#fff", minHeight: "100vh", fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif", color: "#1a1a2e" }}>

      {/* ── NAV ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", borderBottom: "1px solid #ede8fb", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/services" style={{ display: "flex", alignItems: "center", gap: 6, textDecoration: "none", color: "#6b4eff", fontSize: 14, fontWeight: 600 }}>
          ← All Services
        </Link>
        <span style={{ fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", background: "linear-gradient(135deg,#6b4eff,#a855f7)", color: "#fff", padding: "4px 14px", borderRadius: 20, fontWeight: 700 }}>
          {service.badge}
        </span>
        <button onClick={() => setShowBooking(true)} style={{ background: "linear-gradient(135deg,#6b4eff,#a855f7)", color: "#fff", border: "none", padding: "9px 24px", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          Book Now
        </button>
      </div>

      {/* ── HERO ── */}
      <div style={{ position: "relative", height: "clamp(300px,52vw,540px)", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.img key={imgIdx} src={imgs[imgIdx]} alt={service.title}
            initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={e => { e.target.src = imgs[0]; }}
          />
        </AnimatePresence>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,5,40,0.75) 0%, rgba(10,5,40,0.1) 55%, transparent 80%)" }} />

        {/* Title overlay */}
        <div style={{ position: "absolute", bottom: 40, left: 48, right: 220 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: 8, display: "block" }}>{service.categoryLabel}</span>
          <h1 style={{ fontSize: "clamp(28px,5vw,54px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, textShadow: "0 2px 24px rgba(0,0,0,0.4)", margin: 0 }}>{service.title}</h1>
        </div>

        {/* Price badge */}
        <div style={{ position: "absolute", bottom: 44, right: 36, background: "linear-gradient(135deg,#6b4eff,#a855f7)", color: "#fff", padding: "12px 22px", borderRadius: 14, textAlign: "center", boxShadow: "0 8px 32px rgba(107,78,255,0.4)" }}>
          <span style={{ fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", opacity: 0.8, display: "block", marginBottom: 3 }}>Starting at</span>
          <span style={{ fontSize: 22, fontWeight: 800, display: "block" }}>{service.price}</span>
        </div>

        {/* Dots */}
        <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
          {imgs.map((_, i) => (
            <button key={i} onClick={() => setImgIdx(i)}
              style={{ width: i === imgIdx ? 24 : 8, height: 8, borderRadius: 4, background: i === imgIdx ? "#fff" : "rgba(255,255,255,0.4)", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }}
            />
          ))}
        </div>
      </div>

      {/* ── THUMBNAIL STRIP ── */}
      <div style={{ display: "flex", gap: 8, padding: "12px 32px", background: "#f8f4ff", borderBottom: "1px solid #ede8fb", overflowX: "auto" }}>
        {imgs.map((img, i) => (
          <button key={i} onClick={() => setImgIdx(i)}
            style={{ flexShrink: 0, width: 88, height: 60, overflow: "hidden", border: i === imgIdx ? "2.5px solid #6b4eff" : "2.5px solid transparent", borderRadius: 8, padding: 0, cursor: "pointer", background: "none", transition: "border-color 0.2s" }}>
            <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </button>
        ))}
      </div>

      {/* ── STATS BAR ── */}
      <div style={{ background: "linear-gradient(135deg,#6b4eff 0%,#a855f7 100%)", padding: "22px 32px", display: "flex", justifyContent: "center", gap: 60, flexWrap: "wrap" }}>
        {[["2,000+", "Pujas Done"], ["15+", "Years Exp."], ["500+", "Families"], ["4.9★", "Rating"]].map(([n, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <span style={{ fontSize: 26, fontWeight: 800, color: "#fff", display: "block", lineHeight: 1 }}>{n}</span>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginTop: 4 }}>{l}</span>
          </div>
        ))}
      </div>

      {/* ── MAIN GRID ── */}
      <div style={{ maxWidth: 1140, margin: "0 auto", padding: "44px 32px 80px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 52, alignItems: "start" }}>

        {/* LEFT */}
        <div>
          {/* Pills */}
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
            style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
            {[["⏱", service.duration], ["📍", "At Your Home"], ["🌐", "Hindi & English"], ["✨", service.categoryLabel]].map(([icon, label]) => (
              <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#f8f4ff", border: "1.5px solid #ddd6fe", borderRadius: 24, padding: "6px 16px", fontSize: 13, color: "#6b4eff", fontWeight: 600 }}>
                {icon} {label}
              </span>
            ))}
          </motion.div>

          {/* Description */}
          <motion.p custom={1} variants={fadeUp} initial="hidden" animate="visible"
            style={{ fontSize: 18, color: "#334155", lineHeight: 1.8, marginBottom: 16, fontWeight: 400 }}>
            {service.description}
          </motion.p>
          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
            style={{ fontSize: 16, color: "#64748b", lineHeight: 1.85, marginBottom: 36 }}>
            {service.longDescription}
          </motion.p>

          <div style={{ height: 1, background: "linear-gradient(90deg,#ede8fb,transparent)", marginBottom: 32 }} />

          {/* TABS */}
          <div style={{ display: "flex", borderBottom: "2px solid #ede8fb", marginBottom: 28 }}>
            {TABS.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                background: "none", border: "none",
                borderBottom: tab === activeTab ? "2.5px solid #6b4eff" : "2.5px solid transparent",
                padding: "11px 22px", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
                color: tab === activeTab ? "#6b4eff" : "#94a3b8",
                cursor: "pointer", fontFamily: "inherit",
                fontWeight: tab === activeTab ? 700 : 500,
                transition: "color 0.2s", marginBottom: -2,
              }}>
                {tab === "faqs" ? "FAQs" : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "benefits" && (
              <motion.div key="ben" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {service.benefits.map((b, i) => (
                  <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" animate="visible"
                    style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 18px", borderRadius: 12, background: "#f8f4ff", border: "1px solid #ede8fb", marginBottom: 10 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "linear-gradient(135deg,#6b4eff,#a855f7)", flexShrink: 0, marginTop: 7 }} />
                    <span style={{ fontSize: 15, color: "#334155", lineHeight: 1.6 }}>{b}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
            {activeTab === "procedure" && (
              <motion.div key="proc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div style={{ background: "#f8f4ff", border: "1px solid #ede8fb", borderRadius: 14, padding: "28px" }}>
                  <p style={{ fontSize: 16, color: "#334155", lineHeight: 1.85, margin: 0 }}>{service.procedure}</p>
                </div>
              </motion.div>
            )}
            {activeTab === "includes" && (
              <motion.div key="inc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {service.includes.map((item, i) => (
                  <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" animate="visible"
                    style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 12, background: "#f8f4ff", border: "1px solid #ede8fb", marginBottom: 10 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 7, background: "linear-gradient(135deg,#6b4eff,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>✓</div>
                    <span style={{ fontSize: 15, color: "#334155" }}>{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
            {activeTab === "faqs" && (
              <motion.div key="faq" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {service.faqs.map((faq, i) => (
                  <div key={i} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{ width: "100%", background: "none", border: "none", padding: "17px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: "inherit", fontSize: 16, color: "#1a1a2e", fontWeight: 600, textAlign: "left", gap: 12 }}>
                      <span>{faq.q}</span>
                      <span style={{ color: "#6b4eff", fontSize: 22, lineHeight: 1, transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.25s", flexShrink: 0 }}>+</span>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
                          <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.75, paddingBottom: 16, margin: 0 }}>{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── SIDEBAR ── */}
        <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" style={{ position: "sticky", top: 72 }}>

          {/* Booking card */}
          <div style={{ background: "#fff", border: "1.5px solid #ede8fb", borderRadius: 16, padding: "28px", boxShadow: "0 4px 32px rgba(107,78,255,0.09)" }}>
            <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#a855f7", display: "block", marginBottom: 4, fontWeight: 700 }}>Starting Price</span>
            <span style={{ fontSize: 34, fontWeight: 800, color: "#1a1a2e", display: "block", marginBottom: 20 }}>{service.price}</span>
            <div style={{ height: 1, background: "#ede8fb", marginBottom: 20 }} />
            {[["Duration", service.duration], ["Type", service.categoryLabel], ["Location", "At your home"], ["Language", "Hindi / English"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 14, marginBottom: 12 }}>
                <span style={{ color: "#94a3b8" }}>{l}</span>
                <span style={{ color: "#1a1a2e", fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div style={{ height: 20 }} />
            <button onClick={() => setShowBooking(true)}
              style={{ width: "100%", background: "linear-gradient(135deg,#6b4eff,#a855f7)", color: "#fff", border: "none", padding: "14px", borderRadius: 10, fontFamily: "inherit", fontSize: 16, fontWeight: 700, cursor: "pointer", marginBottom: 10, letterSpacing: "0.02em" }}>
              🙏 Book This Puja
            </button>
            <a href="https://wa.me/919999999999"
              style={{ display: "block", width: "100%", textAlign: "center", border: "2px solid #6b4eff", color: "#6b4eff", padding: "12px", borderRadius: 10, fontFamily: "inherit", fontSize: 15, fontWeight: 700, textDecoration: "none", boxSizing: "border-box" }}>
              💬 WhatsApp Us
            </a>
          </div>

          {/* When box */}
          <div style={{ background: "linear-gradient(135deg,#f8f4ff,#fdf4ff)", border: "1px solid #ddd6fe", borderRadius: 12, padding: "20px", marginTop: 14 }}>
            <span style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#a855f7", fontWeight: 700, display: "block", marginBottom: 8 }}>📅 Best Performed</span>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, margin: 0 }}>{service.when}</p>
          </div>

          {/* Trust signals */}
          <div style={{ marginTop: 14 }}>
            {[["✅", "Experienced Vedic Pandits"], ["📦", "All Samagri Included"], ["⏰", "Punctual & On Time"], ["⭐", "500+ Happy Families"]].map(([icon, label]) => (
              <div key={label} style={{ fontSize: 13, color: "#64748b", padding: "10px 0", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 10 }}>
                <span>{icon}</span> {label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── BOOKING MODAL ── */}
      <AnimatePresence>
        {showBooking && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowBooking(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(10,5,40,0.6)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              style={{ background: "#fff", maxWidth: 500, width: "100%", borderRadius: 20, padding: "40px", position: "relative", boxShadow: "0 20px 80px rgba(107,78,255,0.2)" }}>
              <button onClick={() => setShowBooking(false)} style={{ position: "absolute", top: 16, right: 20, background: "none", border: "none", fontSize: 28, color: "#94a3b8", cursor: "pointer", lineHeight: 1 }}>×</button>
              <span style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#6b4eff", marginBottom: 8, display: "block", fontWeight: 700 }}>Book Your Puja</span>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e", marginBottom: 24, marginTop: 0 }}>{service.title}</h2>
              {["Your Name", "Phone Number"].map((ph, i) => (
                <input key={i} type="text" placeholder={ph}
                  style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #ede8fb", borderRadius: 10, fontFamily: "inherit", fontSize: 15, color: "#1a1a2e", outline: "none", boxSizing: "border-box", background: "#f8f4ff", marginBottom: 12 }}
                />
              ))}
              <input type="date"
                style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #ede8fb", borderRadius: 10, fontFamily: "inherit", fontSize: 15, color: "#1a1a2e", outline: "none", boxSizing: "border-box", background: "#f8f4ff", marginBottom: 12 }}
              />
              <textarea placeholder="Any special requirements..." rows={3}
                style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #ede8fb", borderRadius: 10, fontFamily: "inherit", fontSize: 15, color: "#1a1a2e", resize: "vertical", outline: "none", boxSizing: "border-box", background: "#f8f4ff", marginBottom: 12 }}
              />
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={() => { alert("Thank you! We'll contact you shortly."); setShowBooking(false); }}
                  style={{ flex: 1, background: "linear-gradient(135deg,#6b4eff,#a855f7)", color: "#fff", border: "none", padding: "13px", borderRadius: 10, fontFamily: "inherit", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
                  Confirm Booking
                </button>
                <a href="tel:+919999999999"
                  style={{ flex: 1, textAlign: "center", border: "2px solid #ede8fb", color: "#6b4eff", padding: "13px", borderRadius: 10, fontFamily: "inherit", fontSize: 15, fontWeight: 700, textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  📞 Call
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}