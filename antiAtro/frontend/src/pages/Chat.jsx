import React, { useState, useEffect } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import ChatBox from './ChatBox';
import AuthModal from '../components/auth/AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";



const Chat = () => {
  const {currentUser} = useAuth();
  const [isModalOpen ,setIsModalOpen] = useState(false);
  const [selectedAstrologer, setSelectedAstrologer] = useState(null);
  const [astrologers, setAstrologers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch from backend
  useEffect(() => {
    const fetchAstrologers = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/astrologer');
        const data = await res.json();

        // console.log("📦 Astrologers:", data);

        setAstrologers(data);
      } catch (error) {
        console.error("❌ Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAstrologers();
  }, []);

  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-800">Chat with Astrologer</h1>
            <p className="text-gray-500 text-sm mt-1">Connect instantly with verified experts</p>
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search name or skill..."
                className="pl-10 pr-4 py-2 border rounded-full text-sm outline-none w-64"
              />
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full text-sm font-bold">
              <Filter size={16} /> Filter
            </button>
          </div>
        </div>

        {/* Loading */}
        {loading && <p className="text-center text-gray-500">Loading astrologers...</p>}

        {/* Astrologers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {astrologers.map((astro) => (
            <div key={astro._id}  className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md cursor-pointer">
              <div className="flex items-start gap-4">

                {/* Profile */}
                <div className="relative">
                  <img
                    src={astro.profileImage || "https://via.placeholder.com/80"}
                    alt="astro"
                    className="w-20 h-20 rounded-full border-2 border-[#ffdb42] object-cover"
                  />

                  {astro.isOnline && (
                    <div className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800 text-lg">
                      {astro.userId?.name || "Astrologer"}
                    </h3>

                    <div className="flex items-center gap-1 text-xs font-bold bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded">
                      <Star size={12} className="fill-[#ffdb42]" />
                      {astro.rating || 0}
                    </div>
                  </div>

                  {/* Specialties */}
                  <p className="text-xs text-gray-500 mt-1">
                    {astro.specialties?.join(', ')}
                  </p>

                  {/* Languages */}
                  <p className="text-xs text-gray-500">
                    {astro.languages?.join(', ')}
                  </p>

                  {/* Experience */}
                  <p className="text-xs font-semibold">
                    Exp: {astro.experienceYears} Years
                  </p>

                  {/* Price */}
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-red-500">
                        ₹{astro.pricePerMinute}/min
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if(currentUser){
                        setSelectedAstrologer(astro.userId?.name || "Astrologer")
                        }else{
                          if(!currentUser){
                          setIsModalOpen(true);
                          }
                        }
                      }}
                      className="px-5 py-2 border border-green-500 text-green-600 rounded-full text-xs font-bold hover:bg-green-50"
                    >
                      Chat
                    </button>
                    
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        <AuthModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}/>

        {/* ChatBox */}
        {selectedAstrologer && (
          <ChatBox
            astrologer={selectedAstrologer}
            onClose={() => setSelectedAstrologer(null)}
          />
        )}

      </div>
    </div>
  );
};

export default Chat;