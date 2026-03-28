import React, { useState } from "react";
import panditImg from './pandit.png'

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
    <section className="w-full bg-[#f8fafc] text-gray-900 py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <p className="text-purple-600 text-sm mb-2 font-medium">Support</p>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Frequently asked questions
          </h2>

          <p className="text-gray-600 mb-8">
            Everything you need to know about astrology readings and services.
            Can't find your answer? Chat with our spiritual guides.
          </p>

          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div
                key={index}
                onClick={() => toggleFAQ(index)}
                className={`rounded-xl p-5 cursor-pointer transition-all duration-300 border ${
                  activeIndex === index
                    ? "border-purple-500 bg-white shadow-md"
                    : "border-gray-200 bg-white hover:shadow-sm"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.question}
                  </h3>

                  <span className="text-purple-600 text-xl font-bold">
                    {activeIndex === index ? "−" : "+"}
                  </span>
                </div>

                {activeIndex === index && (
                  <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm flex items-center justify-center">
          
          {/* Replace with your pandit image */}
          <img
            src={panditImg}
            alt="Astrology"
            className="w-full h-full object-cover"
          />

        </div>
      </div>
    </section>
  );
};

export default FaqSection;