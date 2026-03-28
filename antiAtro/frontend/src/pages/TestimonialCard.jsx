import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Karan Patel",
      location: "Ahmedabad, India",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      rating: 5,
      text: "Accurate and insightful readings. Highly recommended."
    },
    {
      name: "Riya Sharma",
      location: "Delhi, India",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      text: "This platform completely changed my life! The astrologer gave me clarity about my career and relationship."
    },
    {
      name: "Aman Verma",
      location: "Mumbai, India",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4,
      text: "Very accurate predictions. I was surprised how detailed my kundli analysis was."
    },
    {
      name: "Sneha Kapoor",
      location: "Bangalore, India",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      text: "The love compatibility feature helped me understand my relationship better."
    },
    {
      name: "Rahul Mehta",
      location: "Pune, India",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      rating: 5,
      text: "Career guidance was spot on. Helped me take the right decision!"
    },
    {
      name: "Priya Singh",
      location: "Jaipur, India",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      rating: 4,
      text: "Very smooth UI and quick response from experts. Loved it!"
    },
    {
      name: "Aman Verma",
      location: "Mumbai, India",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4,
      text: "Very accurate predictions. I was surprised how detailed my kundli analysis was."
    },
    {
      name: "Karan Patel",
      location: "Ahmedabad, India",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      rating: 5,
      text: "Accurate and insightful readings. Highly recommended."
    },
    {
      name: "Aman Verma",
      location: "Mumbai, India",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4,
      text: "Very accurate predictions. I was surprised how detailed my kundli analysis was."
    },{
      name: "Aman Verma",
      location: "Mumbai, India",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4,
      text: "Very accurate predictions. I was surprised how detailed my kundli analysis was."
    }
  ];

  const [index, setIndex] = useState(0);
  const visibleCards = 3;
  const cardWidthPercent = 100 / visibleCards;

  const next = () => {
    if (index < testimonials.length - visibleCards) {
      setIndex(index + 1);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-orange-400 mb-3">
            ✦ Trusted by thousands
          </p>
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-gray-900 via-orange-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Real stories from real people who found clarity and guidance
          </p>
        </div>

        {/* Slider Wrapper */}
        <div className="relative">

          {/* Overflow Container */}
          <div className="overflow-hidden mx-12">
            <motion.div
              animate={{ x: `-${index * cardWidthPercent}%` }}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="flex"
              style={{ gap: "1.5rem" }}
            >
              {testimonials.map((test, i) => (
                <motion.div
                  key={i}
                  style={{ minWidth: `calc(${cardWidthPercent}% - 1rem)` }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 h-full shadow-md hover:shadow-xl border border-orange-100 relative overflow-hidden group"
                  >
                    {/* Subtle background glow on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-pink-50/0 group-hover:from-orange-50/60 group-hover:to-pink-50/60 transition-all duration-500 rounded-3xl pointer-events-none" />

                    {/* Quote Icon */}
                    <Quote
                      className="absolute top-5 right-5 text-orange-100 group-hover:text-orange-200 transition-colors duration-300"
                      size={44}
                    />

                    {/* User Info */}
                    <div className="flex items-center gap-4 mb-5 relative z-10">
                      <div className="relative">
                        <img
                          src={test.avatar}
                          alt={test.name}
                          className="w-14 h-14 rounded-full border-[3px] border-orange-200 shadow object-cover"
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-base leading-tight">{test.name}</h4>
                        <p className="text-xs text-gray-400 mt-0.5">{test.location}</p>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-4 relative z-10">
                      {[...Array(5)].map((_, si) => (
                        <Star
                          key={si}
                          size={16}
                          className={si < test.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}
                        />
                      ))}
                      <span className="ml-1 text-xs text-gray-400 self-center">{test.rating}.0</span>
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-600 text-sm leading-relaxed italic relative z-10">
                      "{test.text}"
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons — outside overflow, perfectly centered */}
          <button
            onClick={prev}
            disabled={index === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg border border-gray-100 hover:bg-orange-50 hover:border-orange-200 hover:scale-110 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>

          <button
            onClick={next}
            disabled={index >= testimonials.length - visibleCards}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg border border-gray-100 hover:bg-orange-50 hover:border-orange-200 hover:scale-110 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white"
          >
            <ChevronRight size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: testimonials.length - visibleCards + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-orange-400"
                  : "w-2 bg-orange-200 hover:bg-orange-300"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;