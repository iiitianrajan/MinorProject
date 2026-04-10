import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronDown, MessageSquare } from "lucide-react";
import panditImg from "./pandit.png";

const faqData = [
  {
    question: "Is there a free astrology consultation available?",
    answer:
      "Yes, you can try our astrology services free for 30 minutes. Our experts will guide you based on your birth chart.",
  },
  {
    question: "Can I change my astrology plan later?",
    answer:
      "Of course. Our plans are flexible. You can upgrade or downgrade anytime based on your needs.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "You can cancel your consultation anytime. Refunds are processed based on unused sessions.",
  },
  {
    question: "Can I add personal details to my report?",
    answer:
      "Yes, you can customize your astrology reports with additional personal or spiritual details.",
  },
];

const FaqSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="section" style={{ background: "var(--bg-soft)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── LEFT: FAQ ── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Label pill — identical to Home SLabel */}
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
              <Sparkles size={12} /> Support
            </motion.div>

            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight leading-tight"
              style={{
                color: "var(--text-heading)",
                fontFamily: "Poppins, sans-serif",
                letterSpacing: "-0.03em",
              }}
            >
              Frequently Asked
              <br />
              <span
                style={{
                  background: "var(--gradient-primary)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Questions
              </span>
            </h2>

            <p className="text-base leading-relaxed mb-10 max-w-md" style={{ color: "var(--text-muted)" }}>
              Everything you need to know about astrology readings and services.
              Can't find your answer? Chat with our spiritual guides.
            </p>

            {/* FAQ Items */}
            <div className="space-y-3">
              {faqData.map((item, index) => {
                const isOpen = activeIndex === index;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    onClick={() => toggleFAQ(index)}
                    className="rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden"
                    style={{
                      background: isOpen ? "var(--bg-elevated)" : "var(--bg-elevated)",
                      border: isOpen
                        ? "1px solid var(--accent-border)"
                        : "1px solid var(--border-soft)",
                      boxShadow: isOpen ? "var(--shadow-md)" : "var(--shadow-sm)",
                      transform: isOpen ? "translateY(-2px)" : "translateY(0)",
                    }}
                    onMouseEnter={e => {
                      if (!isOpen) e.currentTarget.style.borderColor = "var(--accent-border)";
                    }}
                    onMouseLeave={e => {
                      if (!isOpen) e.currentTarget.style.borderColor = "var(--border-soft)";
                    }}
                  >
                    {/* Question row */}
                    <div className="flex justify-between items-center gap-4 p-5">
                      <h3
                        className="font-semibold text-base leading-snug"
                        style={{
                          color: isOpen ? "var(--text-heading)" : "var(--text)",
                          fontFamily: "Poppins, sans-serif",
                        }}
                      >
                        {item.question}
                      </h3>

                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isOpen ? "var(--accent-bg)" : "var(--bg-soft)",
                          border: "1px solid var(--border-soft)",
                          color: isOpen ? "var(--primary-light)" : "var(--text-soft)",
                        }}
                      >
                        <ChevronDown size={14} />
                      </motion.div>
                    </div>

                    {/* Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                          style={{ overflow: "hidden" }}
                        >
                          <p
                            className="text-sm leading-relaxed px-5 pb-5"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA below FAQs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex items-center gap-3"
            >
              <a
                href="/chat"
                className="btn-primary flex items-center gap-2 text-sm"
                style={{ textDecoration: "none" }}
              >
                <MessageSquare size={15} /> Chat with a Guide
              </a>
              <span className="text-sm" style={{ color: "var(--text-soft)" }}>
                We typically reply in minutes.
              </span>
            </motion.div>
          </motion.div>

         <motion.div
  initial={{ opacity: 0, x: 32 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
  className="relative w-full"
>
  {/* Glow (linked ONLY to image hover) */}
  <div
    className="absolute -inset-6 rounded-3xl pointer-events-none opacity-0 transition-all duration-500 group-hover:opacity-100"
    style={{
      background:
        "radial-gradient(ellipse at center, rgba(255,98,0,0.12) 0%, transparent 70%)",
      filter: "blur(30px)",
    }}
  />

  <div
    className="relative w-full h-[420px] md:h-[520px] rounded-2xl overflow-hidden group"
    style={{
      border: "1px solid var(--border-soft)",
      boxShadow: "var(--shadow-lg)",
    }}
  >
    {/* ✅ IMAGE ONLY SCALE */}
    <img
      src={panditImg}
      alt="Astrology Expert"
      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
    />

    {/* Bottom chip (UNCHANGED) */}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.06, y: -4 }}
      className="absolute bottom-5 left-5 flex items-center gap-2 px-4 py-2.5 rounded-2xl"
      style={{
        background: "var(--bg-glass)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <span className="text-lg">🙏</span>
      <div>
        <div className="text-xs font-bold leading-tight" style={{ color: "var(--text-heading)" }}>
          10,000+ Pandits
        </div>
        <div className="text-[11px]" style={{ color: "var(--text-soft)" }}>
          Verified & Trusted
        </div>
      </div>
    </motion.div>

    {/* Top chip (UNCHANGED) */}
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.65, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.06, y: -4 }}
      className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2.5 rounded-2xl"
      style={{
        background: "var(--bg-glass)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid var(--glass-border)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <span className="text-lg">⭐</span>
      <div>
        <div className="text-xs font-bold leading-tight" style={{ color: "var(--text-heading)" }}>
          4.9 / 5 Rating
        </div>
        <div className="text-[11px]" style={{ color: "var(--text-soft)" }}>
          50k+ Reviews
        </div>
      </div>
    </motion.div>
  </div>
</motion.div>

        </div>
      </div>
    </section>
  );
};

export default FaqSection;