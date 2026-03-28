import React from "react";
import { motion } from "framer-motion";

const AstrologyGuide = () => {
    // 🔥 Page animation
  const pageVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 }
  };
  return (
    <motion.div
      variants={pageVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.4 }}
      className="bg-[#f8f9fa] min-h-screen py-8 font-sans"
    >
    <div className="bg-white text-gray-800">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-yellow-200 to-yellow-50 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Why Astrology Matters
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600">
          Discover how astrology helps you understand life, destiny, and divine guidance.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 leading-7">

        <section>
          <h2 className="text-2xl font-bold mb-3">Why Astrology?</h2>
          <p>
            Astrology reveals how divine energy flows through our lives, helping us understand
            our purpose and make better decisions. Many people feel guided by unseen forces,
            and astrology helps interpret those signals through planets and stars.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">How Online Astrology Works</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Provide your birth details (date, time, place)</li>
            <li>Astrologers create your birth chart</li>
            <li>They analyze planetary positions</li>
            <li>You get predictions about life, career, love</li>
            <li>Consult via chat, call, or video</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            Why Choose Online Astrologers?
          </h2>
          <p>
            Online astrology services are convenient, affordable, and accessible anytime.
            You can connect with experts from anywhere and even try free sessions before committing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            Daily Horoscope & Zodiac Signs
          </h2>
          <p>
            Daily horoscope readings help you understand how planetary movements affect your
            zodiac sign. There are 12 zodiac signs like Aries, Taurus, Gemini, and more,
            each influenced differently by cosmic energy.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">
            Why Choose Our Experts?
          </h2>
          <p>
            Our astrologers combine ancient Vedic knowledge with modern understanding.
            They provide accurate predictions, personalized advice, and spiritual guidance.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Conclusion</h2>
          <p>
            Astrology helps you align with the universe and make better life decisions.
            It doesn’t control your life—it empowers you with knowledge to act wisely.
          </p>
        </section>

      </div>
    </div>
    </motion.div>
  );
};

export default AstrologyGuide;