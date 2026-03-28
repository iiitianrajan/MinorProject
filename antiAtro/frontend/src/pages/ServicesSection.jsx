import { motion } from "framer-motion";


import {
  Flame,
  Sparkles,
  Baby,
  Music,
  Flower,
  Heart,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const services = [
  { id: "general-puja",title: "General Puja", desc: "General puja involves performing traditional Hindu rituals to honor deities and seek blessings.", icon: Sparkles },
  { id: "havan",title: "Havan", desc: "Book a pandit for Havan to conduct this sacred fire ritual with precision and reverence.", icon: Flame },
  {  id: "special-puja",title: "Special Puja", desc: "Experience the sacredness of special pujas and elevate your special occasion.", icon: Star },
  {id: "mundan-puja", title: "Mundan Puja", desc: "Book a pandit for Mundan Puja to conduct this essential ritual with tradition and care.", icon: Baby },
  { id: "sanskar-puja",title: "Sanskar Puja", desc: "Celebrate important life milestones and cultural rites with our expert pandit ji.", icon: Heart },
  {  id: "laxmi-puja",title: "Laxmi Puja", desc: "Celebrate Laxmi Puja with devotion and authentic rituals.", icon: Flower },
  { id: "wedding", title: "Wedding Ceremony", desc: "Ensure a sacred and seamless wedding ceremony with expert guidance.", icon: Music },
  { id: "festival-puja", title: "Festival Puja", desc: "Book a pandit for festival puja for a vibrant and traditional celebration.", icon: Sparkles }
];

export default function ServicesSection() {
  const navigate  = useNavigate()
  return (
    <section className="py-16 bg-gray-50 text-center overflow-hidden">
      
      {/* Heading */}
      <p className="text-orange-500 font-semibold tracking-widest mb-2">
        OUR SERVICES
      </p>

      <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-14">
        Bringing Tradition and Blessings to Your <br /> Doorstep in India.
      </h2>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 px-4">
        {services.map((item, i) => (
          <motion.div
         onClick={() => navigate(`/service/${item.id}`)}
            key={i}
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: i * 0.1,
              type: "spring",
              stiffness: 120,
              damping: 12
            }}
            viewport={{ once: true }}

            whileHover={{
              y: -12,
              scale: 1.05
            }}

            className="relative p-6 rounded-2xl cursor-pointer bg-white text-gray-700 shadow-md group overflow-hidden"
          >
            {/* 🔥 Gradient Glow Background */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-orange-100 via-transparent to-yellow-100 blur-xl"></div>

            {/* ✨ Border Glow */}
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-orange-300 transition duration-300"></div>

            {/* Icon */}
            <motion.div
              className="relative z-10 w-14 h-14 flex items-center justify-center mx-auto mb-4 rounded-xl bg-orange-100 text-orange-500"
              whileHover={{
                rotate: 10,
                scale: 1.2
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <item.icon size={26} />
            </motion.div>

            {/* Title */}
            <motion.h3
              className="relative z-10 text-lg font-semibold mb-2"
              whileHover={{ scale: 1.05 }}
            >
              {item.title}
            </motion.h3>

            {/* Description */}
            <motion.p
              className="relative z-10 text-sm leading-relaxed text-gray-600"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              {item.desc}
            </motion.p>

            {/* 💫 Bottom Shine Effect */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}