import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpertForm = ({ isOpen, isClose }) => {
  const [formData, setFormData] = useState({
    specialties: [],
    languages: '',
    experienceYears: '',
    pricePerMinute: '',
    bio: '',
    profileImage: ''
  });

  const specialtiesList = ['Vedic', 'Tarot', 'Numerology', 'Palmistry'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecialty = (value) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(value)
        ? prev.specialties.filter(s => s !== value)
        : [...prev.specialties, value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      languages: formData.languages.split(',').map(l => l.trim())
    };
    const token = localStorage.getItem("token");
    try {
      const res = await fetch('http://localhost:5001/api/astrologer', {
        method: 'POST',
        headers: { 
        'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`
          },
        
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      // console.log("✅ Saved:", data);

      alert("Astrologer added 🎉");

      setFormData({
        specialties: [],
        languages: '',
        experienceYears: '',
        pricePerMinute: '',
        bio: '',
        profileImage: ''
      });

      isClose();

    } catch (error) {
      console.error(error);
      alert("Error saving astrologer");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0, y:20 }}
          animate={{ opacity: 1,y:0 }}
          exit={{ opacity: 0 }}
        >

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-[450px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 relative"
          >

            {/* Close */}
            <button
              onClick={isClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <X size={18} />
            </button>

            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Add Astrologer ✨
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Specialties */}
              <div>
                <label className="text-sm font-semibold">Specialties</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {specialtiesList.map((item) => (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      key={item}
                      onClick={() => handleSpecialty(item)}
                      className={`px-3 py-1 rounded-full text-xs ${
                        formData.specialties.includes(item)
                          ? 'bg-[#ffdb42] text-black'
                          : 'bg-gray-100'
                      }`}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Inputs */}
              {[
                { name: "languages", placeholder: "Languages (Hindi, English)" },
                { name: "experienceYears", placeholder: "Experience (years)", type: "number" },
                { name: "pricePerMinute", placeholder: "Price per minute (₹)", type: "number" },
                { name: "profileImage", placeholder: "Profile Image URL" }
              ].map((field, i) => (
                <motion.input
                  key={i}
                  whileFocus={{ scale: 1.02 }}
                  type={field.type || "text"}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-yellow-300 outline-none"
                />
              ))}

              {/* Bio */}
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                name="bio"
                rows="3"
                placeholder="Short bio..."
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-yellow-300 outline-none"
              />

              {/* Submit */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                type="submit"
                className="w-full py-2 bg-[#ffdb42] rounded-full font-bold shadow hover:shadow-md transition"
              >
                Submit
              </motion.button>

            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExpertForm;