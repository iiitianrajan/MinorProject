import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Star, Phone, MessageCircle } from "lucide-react";

const AstrologerDetails = () => {
  const { id } = useParams();
  const [astro, setAstro] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/api/astrologer/${id}`)
      .then(res => res.json())
      .then(data => setAstro(data));
  }, [id]);

  if (!astro) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-500">
        Loading expert details...
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-10">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          
          {/* Profile Image */}
          <img
            src={astro.image || "https://via.placeholder.com/150"}
            alt="astro"
            className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400 shadow"
          />

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">
              {astro.userId?.name}
            </h1>

            <p className="text-gray-500 mt-1">
              {astro.specialization}
            </p>

            <p className="text-sm text-gray-400 mt-1">
              {astro.experience} Years Experience
            </p>

            {/* Rating */}
            <div className="flex justify-center md:justify-start items-center gap-1 mt-2 text-yellow-500">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} />
              <span className="text-gray-600 text-sm ml-1">(4.0)</span>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="text-center md:text-right">
            <p className="text-lg font-bold text-green-600">₹20/min</p>

            <div className="flex gap-2 mt-3 justify-center md:justify-end">
              <button className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">
                <Phone size={14} />
                Call
              </button>

              <button className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
                <MessageCircle size={14} />
                Chat
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t"></div>

        {/* About Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            About Astrologer
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {astro.about || "This astrologer has great experience in astrology and has helped many clients with accurate predictions and guidance."}
          </p>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            Skills & Expertise
          </h2>

          <div className="flex flex-wrap gap-2">
            {(astro.skills || ["Vedic Astrology", "Numerology", "Tarot"]).map((skill, i) => (
              <span
                key={i}
                className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AstrologerDetails;