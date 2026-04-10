import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, MapPin, Globe, Tag, CheckCircle, ChevronDown, X, Phone, MessageCircle, Star, Users, Award, Zap } from "lucide-react";

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

const TABS = ["benefits", "procedure", "includes", "faqs"];

const tabLabels = {
  benefits: "Benefits",
  procedure: "Procedure",
  includes: "What's Included",
  faqs: "FAQs",
};

const stats = [
  { icon: Award, value: "2,000+", label: "Pujas Done" },
  { icon: Star, value: "4.9★", label: "Rating" },
  { icon: Users, value: "500+", label: "Families" },
  { icon: Zap, value: "15+", label: "Years Exp." },
];

export default function ServiceDetail() {
  const { id } = useParams();
  const service = servicesData[id];
  const [activeTab, setActiveTab] = useState("benefits");
  const [openFaq, setOpenFaq] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); setImgIdx(0); }, [id]);

  if (!service) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}
      className="flex-col gap-4">
      <p style={{ color: "var(--text-muted)" }}>Service not found.</p>
      <Link to="/services" className="btn-primary text-sm">← Back to Services</Link>
    </div>
  );

  const imgs = service.images;

  return (
    <div style={{ background: "var(--bg-soft)", minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── STICKY NAV ── */}
      <div
        className="glass"
        style={{
          position: "sticky", top: 0, zIndex: 100,
          borderRadius: 0,
          borderBottom: "1px solid var(--border-soft)",
          padding: "0 2rem",
          height: 60,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <Link
          to="/services"
          className="flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
          style={{ color: "var(--text-muted)", textDecoration: "none" }}
        >
          <ArrowLeft size={15} style={{ color: "var(--primary-light)" }} />
          All Services
        </Link>

        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          style={{
            background: "var(--accent-bg)",
            border: "1px solid var(--accent-border)",
            color: "var(--primary-light)",
          }}
        >
          {service.badge}
        </motion.span>

        <motion.button
          whileHover={{ scale: 1.04, y: -1 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowBooking(true)}
          className="btn-primary text-sm cursor-pointer"
          style={{ border: "none" }}
        >
          Book Now
        </motion.button>
      </div>

      {/* ── HERO ── */}
      <div style={{ position: "relative", height: "clamp(280px, 48vw, 520px)", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={imgIdx}
            src={imgs[imgIdx]}
            alt={service.title}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            onError={e => { e.target.src = imgs[0]; }}
          />
        </AnimatePresence>

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(68,17,17,0.82) 0%, rgba(26,12,6,0.2) 55%, transparent 80%)"
        }} />

        {/* Ambient glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", top: "10%", right: "8%",
            width: "35%", height: "60%", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,98,0,0.18) 0%, transparent 70%)",
            filter: "blur(50px)", pointerEvents: "none",
          }}
        />

        {/* Title overlay */}
        <div style={{ position: "absolute", bottom: 48, left: "clamp(1rem, 4vw, 3rem)", right: "clamp(1rem, 28vw, 260px)" }}>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-xs font-semibold uppercase tracking-widest block mb-2"
            style={{ color: "rgba(255,200,150,0.8)" }}
          >
            {service.categoryLabel}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-bold leading-tight"
            style={{
              fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)",
              color: "#fff",
              fontFamily: "Poppins, sans-serif",
              letterSpacing: "-0.03em",
              textShadow: "0 2px 24px rgba(0,0,0,0.35)",
              margin: 0,
            }}
          >
            {service.title}
          </motion.h1>
        </div>

        {/* Price badge */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute", bottom: 52, right: "clamp(1rem, 3vw, 2.5rem)",
            background: "var(--gradient-primary)",
            borderRadius: "1.5rem",
            padding: "14px 24px",
            textAlign: "center",
            boxShadow: "0 12px 40px rgba(165,61,0,0.4)",
          }}
        >
          <span className="text-xs font-semibold uppercase tracking-wider block mb-1" style={{ color: "rgba(255,255,255,0.75)" }}>
            Starting at
          </span>
          <span className="font-bold block" style={{ fontSize: "1.4rem", color: "#fff" }}>
            {service.price}
          </span>
        </motion.div>

        {/* Image dots */}
        <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6 }}>
          {imgs.map((_, i) => (
            <button
              key={i}
              onClick={() => setImgIdx(i)}
              style={{
                width: i === imgIdx ? 24 : 8, height: 8,
                borderRadius: 4,
                background: i === imgIdx ? "#fff" : "rgba(255,255,255,0.35)",
                border: "none", cursor: "pointer",
                transition: "all 0.3s", padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* ── THUMBNAIL STRIP ── */}
      <div
        style={{
          display: "flex", gap: 8,
          padding: "12px clamp(1rem,4vw,2rem)",
          background: "var(--bg-elevated)",
          borderBottom: "1px solid var(--border-soft)",
          overflowX: "auto",
        }}
      >
        {imgs.map((img, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setImgIdx(i)}
            style={{
              flexShrink: 0, width: 88, height: 60, overflow: "hidden",
              border: i === imgIdx ? "2.5px solid var(--primary-light)" : "2.5px solid transparent",
              borderRadius: 10, padding: 0, cursor: "pointer",
              background: "none", transition: "border-color 0.2s",
            }}
          >
            <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </motion.button>
        ))}
      </div>

      {/* ── STATS BAR ── */}
      <div
        style={{
          background: "var(--gradient-primary)",
          padding: "20px clamp(1rem, 4vw, 2rem)",
          display: "flex", justifyContent: "center",
          gap: "clamp(1.5rem, 5vw, 4rem)",
          flexWrap: "wrap",
        }}
      >
        {stats.map(({ icon: Icon, value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-3"
          >
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Icon size={16} color="rgba(255,255,255,0.9)" />
            </div>
            <div style={{ textAlign: "left" }}>
              <span style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", display: "block", lineHeight: 1 }}>{value}</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginTop: 3 }}>{label}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── MAIN GRID ── */}
      <div
        className="max-w-7xl mx-auto"
        style={{ padding: "3rem clamp(1rem,4vw,2rem) 5rem", display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem" }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: "2.5rem" }}
          className="lg:grid-cols-[1fr_360px]"
        >

          {/* ── LEFT: Article Body ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { icon: Clock, label: service.duration },
                { icon: MapPin, label: "At Your Home" },
                { icon: Globe, label: "Hindi & English" },
                { icon: Tag, label: service.categoryLabel },
              ].map(({ icon: Icon, label }) => (
                <motion.span
                  key={label}
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold cursor-default"
                  style={{
                    background: "var(--accent-bg)",
                    border: "1px solid var(--accent-border)",
                    color: "var(--primary-light)",
                  }}
                >
                  <Icon size={12} /> {label}
                </motion.span>
              ))}
            </div>

            {/* Lede */}
            <p
              className="mb-6 leading-relaxed"
              style={{
                fontSize: "1.05rem",
                color: "var(--text)",
                borderLeft: "3px solid var(--primary)",
                paddingLeft: "1.25rem",
              }}
            >
              {service.description}
            </p>

            <p className="mb-10 leading-relaxed" style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}>
              {service.longDescription}
            </p>

            {/* Divider */}
            <div style={{ height: 1, background: "var(--border-soft)", marginBottom: "2rem" }} />

            {/* ── TABS ── */}
            <div
              className="flex overflow-x-auto"
              style={{ borderBottom: "1px solid var(--border-soft)", marginBottom: "1.75rem", gap: 4 }}
            >
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative text-xs font-semibold uppercase tracking-widest cursor-pointer transition-all duration-200 whitespace-nowrap"
                  style={{
                    background: "none", border: "none",
                    padding: "12px 18px",
                    color: tab === activeTab ? "var(--primary-light)" : "var(--text-soft)",
                    fontFamily: "inherit",
                    paddingBottom: 13,
                  }}
                >
                  {tabLabels[tab]}
                  {tab === activeTab && (
                    <motion.div
                      layoutId="tab-underline"
                      style={{
                        position: "absolute", bottom: -1, left: 0, right: 0, height: 2,
                        background: "var(--gradient-primary)",
                        borderRadius: 2,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">

              {/* Benefits */}
              {activeTab === "benefits" && (
                <motion.div key="ben" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex flex-col gap-3">
                  {service.benefits.map((b, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="card flex items-start gap-4"
                      style={{ padding: "1rem 1.25rem" }}
                    >
                      <div style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: "var(--gradient-primary)",
                        flexShrink: 0, marginTop: 6,
                      }} />
                      <span style={{ fontSize: "0.93rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{b}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Procedure */}
              {activeTab === "procedure" && (
                <motion.div key="proc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <motion.blockquote
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="card-soft px-6 py-5 rounded-2xl"
                    style={{ borderLeft: "4px solid var(--primary)" }}
                  >
                    <p style={{ fontSize: "0.96rem", color: "var(--text-muted)", lineHeight: 1.85, margin: 0 }}>
                      {service.procedure}
                    </p>
                  </motion.blockquote>
                  {service.when && (
                    <div className="card mt-4" style={{ padding: "1.25rem 1.5rem" }}>
                      <span className="text-xs font-semibold uppercase tracking-widest block mb-2" style={{ color: "var(--primary-light)" }}>
                        📅 Best Performed
                      </span>
                      <p style={{ fontSize: "0.93rem", color: "var(--text-muted)", lineHeight: 1.75, margin: 0 }}>{service.when}</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* Includes */}
              {activeTab === "includes" && (
                <motion.div key="inc" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex flex-col gap-3">
                  {service.includes.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="card flex items-center gap-4"
                      style={{ padding: "1rem 1.25rem" }}
                    >
                      <div style={{
                        width: 28, height: 28, borderRadius: 9,
                        background: "var(--gradient-primary)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <CheckCircle size={14} color="#fff" />
                      </div>
                      <span style={{ fontSize: "0.93rem", color: "var(--text-muted)" }}>{item}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* FAQs */}
              {activeTab === "faqs" && (
                <motion.div key="faq" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex flex-col">
                  {service.faqs.map((faq, i) => (
                    <div
                      key={i}
                      style={{ borderBottom: "1px solid var(--border-soft)" }}
                    >
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex justify-between items-center gap-4 cursor-pointer"
                        style={{
                          background: "none", border: "none",
                          padding: "1.1rem 0",
                          fontFamily: "inherit",
                          fontSize: "0.96rem",
                          fontWeight: 600,
                          color: "var(--text-heading)",
                          textAlign: "left",
                        }}
                      >
                        <span>{faq.q}</span>
                        <motion.div
                          animate={{ rotate: openFaq === i ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          style={{ flexShrink: 0 }}
                        >
                          <ChevronDown size={18} style={{ color: "var(--primary-light)" }} />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: "hidden" }}
                          >
                            <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.8, paddingBottom: "1rem", margin: 0 }}>
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: Sticky Sidebar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "sticky", top: 72, alignSelf: "start" }}
          >

            {/* Booking Card */}
            <div
              className="card mb-4 relative overflow-hidden"
              style={{ boxShadow: "var(--shadow-md)" }}
            >
              {/* Subtle gradient top accent */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: "var(--gradient-primary)", borderRadius: "1.5rem 1.5rem 0 0",
              }} />

              <span className="text-xs font-semibold uppercase tracking-widest block mb-1 mt-1" style={{ color: "var(--primary-light)" }}>
                Starting Price
              </span>
              <span className="font-bold block mb-5" style={{ fontSize: "2rem", color: "var(--text-heading)", lineHeight: 1 }}>
                {service.price}
              </span>

              <div style={{ height: 1, background: "var(--border-soft)", marginBottom: "1.25rem" }} />

              {[
                ["Duration", service.duration],
                ["Type", service.categoryLabel],
                ["Location", "At your home"],
                ["Language", "Hindi / English"],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between items-center mb-3">
                  <span className="text-xs" style={{ color: "var(--text-soft)" }}>{l}</span>
                  <span className="text-xs font-semibold" style={{ color: "var(--text-heading)" }}>{v}</span>
                </div>
              ))}

              <div style={{ height: "1.25rem" }} />

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowBooking(true)}
                className="btn-primary w-full text-sm font-semibold cursor-pointer mb-3"
                style={{ border: "none" }}
              >
                🙏 Book This Puja
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.02, y: -1 }}
                href="https://wa.me/919999999999"
                className="flex items-center justify-center gap-2 w-full text-sm font-semibold rounded-full py-3 transition-all duration-300"
                style={{
                  border: "1.5px solid var(--accent-border)",
                  background: "var(--accent-bg)",
                  color: "var(--primary-light)",
                  textDecoration: "none",
                }}
              >
                <MessageCircle size={14} /> WhatsApp Us
              </motion.a>
            </div>

            {/* When box */}
            <div className="card-soft mb-4" style={{ borderLeft: "3px solid var(--primary)" }}>
              <span className="text-xs font-semibold uppercase tracking-widest block mb-2" style={{ color: "var(--primary-light)" }}>
                📅 Best Performed
              </span>
              <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", lineHeight: 1.75, margin: 0 }}>{service.when}</p>
            </div>

            {/* Trust signals */}
            <div className="card" style={{ padding: "1rem 1.25rem" }}>
              {[
                ["✅", "Experienced Vedic Pandits"],
                ["📦", "All Samagri Included"],
                ["⏰", "Punctual & On Time"],
                ["⭐", "500+ Happy Families"],
              ].map(([icon, label]) => (
                <div
                  key={label}
                  className="flex items-center gap-3 py-2.5"
                  style={{ borderBottom: "1px solid var(--border-soft)", fontSize: "0.85rem", color: "var(--text-muted)" }}
                >
                  <span>{icon}</span> {label}
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>

      {/* ── BOOKING MODAL ── */}
      <AnimatePresence>
        {showBooking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBooking(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(68,17,17,0.55)",
              backdropFilter: "blur(8px)",
              zIndex: 200,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "1.5rem",
            }}
          >
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
              className="card relative w-full"
              style={{
                maxWidth: 480,
                boxShadow: "var(--shadow-lg)",
                padding: "2.5rem",
              }}
            >
              {/* Top gradient bar */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: "var(--gradient-primary)", borderRadius: "1.5rem 1.5rem 0 0",
              }} />

              <button
                onClick={() => setShowBooking(false)}
                className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-all duration-200"
                style={{ background: "var(--bg-soft)", border: "none", color: "var(--text-muted)" }}
              >
                <X size={16} />
              </button>

              <span className="text-xs font-semibold uppercase tracking-widest block mb-2" style={{ color: "var(--primary-light)" }}>
                Book Your Puja
              </span>
              <h2
                className="font-bold mb-6"
                style={{ fontSize: "1.6rem", color: "var(--text-heading)", fontFamily: "Poppins, sans-serif", letterSpacing: "-0.03em", margin: "0 0 1.5rem" }}
              >
                {service.title}
              </h2>

              {["Your Name", "Phone Number"].map((ph, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={ph}
                  className="w-full mb-3 text-sm rounded-2xl outline-none transition-all duration-300"
                  style={{
                    padding: "13px 18px",
                    background: "var(--bg-soft)",
                    border: "1px solid var(--border-soft)",
                    color: "var(--text)",
                    fontFamily: "inherit",
                    display: "block",
                  }}
                />
              ))}

              <input
                type="date"
                className="w-full mb-3 text-sm rounded-2xl outline-none transition-all duration-300"
                style={{
                  padding: "13px 18px",
                  background: "var(--bg-soft)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--text)",
                  fontFamily: "inherit",
                  display: "block",
                }}
              />

              <textarea
                placeholder="Any special requirements..."
                rows={3}
                className="w-full mb-5 text-sm rounded-2xl outline-none transition-all duration-300"
                style={{
                  padding: "13px 18px",
                  background: "var(--bg-soft)",
                  border: "1px solid var(--border-soft)",
                  color: "var(--text)",
                  fontFamily: "inherit",
                  resize: "vertical",
                  display: "block",
                }}
              />

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { alert("Thank you! We'll contact you shortly."); setShowBooking(false); }}
                  className="btn-primary flex-1 text-sm cursor-pointer"
                  style={{ border: "none" }}
                >
                  Confirm Booking
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  href="tel:+919999999999"
                  className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold rounded-full transition-all duration-200"
                  style={{
                    background: "var(--accent-bg)",
                    border: "1.5px solid var(--accent-border)",
                    color: "var(--primary-light)",
                    textDecoration: "none",
                  }}
                >
                  <Phone size={14} /> Call Us
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}