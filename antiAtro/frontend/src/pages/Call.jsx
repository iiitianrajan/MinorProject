import React from 'react';
import { Search, Filter, Star, Phone } from 'lucide-react';

const Call = () => {
  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-800">Talk to Astrologer</h1>
            <p className="text-gray-500 text-sm mt-1">Get immediate voice or video consultation</p>
          </div>
          
          <div className="flex gap-4">
             <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-bold hover:bg-gray-50">
              <Filter size={16} /> Sort by Rating
            </button>
          </div>
        </div>

        {/* Astrologers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-50 to-teal-200 rounded-full border-2 border-teal-400 overflow-hidden">
                    <div className="w-full h-full flex flex-col items-center justify-end">
                       <span className="text-4xl">👩‍🦰</span>
                    </div>
                  </div>
                  <div className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                </div>
                
                <div className="flex-1">
                 <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800 text-lg hover:text-[#ffdb42] cursor-pointer">Astro {['Neha', 'Rohit', 'Simran', 'Kavita', 'Ravi', 'Ramesh'][item-1]}</h3>
                    <div className="flex items-center gap-1 text-xs font-bold bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded">
                      <Star size={12} className="fill-[#ffdb42] text-[#ffdb42]" /> 4.8
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">Nadi, KP, Vastu</p>
                  <p className="text-xs text-gray-500 mt-0.5">Eng, Hindi, Marathi</p>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-gray-800">₹{15 + (item*2)}/min</p>
                    </div>
                    <button className="flex items-center gap-1 px-5 py-2 bg-white border border-teal-500 text-teal-600 rounded-full text-xs font-bold hover:bg-teal-50 transition-colors">
                      <Phone size={14} /> Call
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Call;
