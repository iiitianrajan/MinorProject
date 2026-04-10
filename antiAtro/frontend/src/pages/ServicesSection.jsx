import { motion } from "framer-motion";
import { Flame, Sparkles, Baby, Music, Flower, Heart, Star, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const services = [
  { id: "general-puja",   title: "General Puja",      desc: "Traditional Hindu rituals to honor deities and seek divine blessings.",                    icon: Sparkles },
  { id: "havan",          title: "Havan",             desc: "Sacred fire ritual performed with precision, reverence and authentic Vedic mantras.",       icon: Flame    },
  { id: "special-puja",   title: "Special Puja",      desc: "Elevate your special occasion with deeply sacred and personalised puja ceremonies.",        icon: Star     },
  { id: "mundan-puja",    title: "Mundan Puja",       desc: "Essential Mundan ritual conducted with tradition, care and expert pandits.",                icon: Baby     },
  { id: "sanskar-puja",   title: "Sanskar Puja",      desc: "Celebrate important life milestones and cultural rites with expert pandit ji.",             icon: Heart    },
  { id: "laxmi-puja",     title: "Laxmi Puja",        desc: "Invoke Goddess Lakshmi's blessings with devotion and authentic Vedic rituals.",            icon: Flower   },
  { id: "wedding",        title: "Wedding Ceremony",  desc: "Ensure a sacred and seamless wedding ceremony with comprehensive expert guidance.",         icon: Music    },
  { id: "festival-puja",  title: "Festival Puja",     desc: "Book a pandit for a vibrant, joyful and traditionally authentic festival celebration.",    icon: Sparkles },
];

export default function ServicesSection() {
  const navigate = useNavigate();

  return (
    <section className="section" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          {/* Label pill — identical to Home.jsx SLabel */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5 text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "var(--accent-bg)",
              border: "1px solid var(--accent-border)",
              color: "var(--primary-light)",
            }}
          >
            <Sparkles size={12} /> Our Services
          </motion.div>

          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight leading-tight"
            style={{ color: "var(--text-heading)", fontFamily: "Poppins, sans-serif", letterSpacing: "-0.03em" }}
          >
            Bringing Tradition &amp; Blessings
            <br className="hidden md:block" />
            <span
              style={{
                background: "var(--gradient-primary)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {" "}to Your Doorstep
            </span>
          </h2>

          <p
            className="text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Choose from a wide range of authentic Vedic rituals performed by verified,
            experienced pandits — right at your home.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {services.map((item, i) => (
            <motion.div
              key={item.id}
              onClick={() => navigate(`/service/${item.id}`)}
              initial={{ opacity: 0, y: 44, scale: 0.93 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, type: "spring", stiffness: 140, damping: 14 }}
              whileHover={{ y: -10, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="card group cursor-pointer relative overflow-hidden"
              style={{ background: "var(--bg-elevated)" }}
            >
              {/* Hover glow overlay — same pattern as Home service cards */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[1.5rem]"
                style={{
                  background: "linear-gradient(135deg, rgba(255,98,0,0.05) 0%, transparent 60%)",
                }}
              />

              {/* Bottom shine bar — kept from original */}
              <div
                className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-[1.5rem]"
                style={{ background: "var(--gradient-primary)" }}
              />

              {/* Icon — same icon box style as Home's feature cards */}
              <motion.div
                whileHover={{ rotate: 10, scale: 1.18 }}
                transition={{ type: "spring", stiffness: 320 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 relative z-10"
                style={{
                  background: "var(--accent-bg)",
                  border: "1px solid var(--accent-border)",
                }}
              >
                <item.icon size={24} style={{ color: "var(--primary-light)" }} />
              </motion.div>

              {/* Title */}
              <h3
                className="font-semibold text-base mb-2 relative z-10"
                style={{ color: "var(--text-heading)", fontFamily: "Poppins, sans-serif" }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm leading-relaxed mb-4 relative z-10"
                style={{ color: "var(--text-muted)" }}
              >
                {item.desc}
              </p>

              {/* Explore arrow — identical to Home service card CTA */}
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center gap-1 text-xs font-semibold relative z-10"
                style={{ color: "var(--primary-light)" }}
              >
                Book Now <ChevronRight size={13} />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}