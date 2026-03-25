import React from 'react';
import { Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';

const Pooja = () => {
  return (
    <div className="bg-[#f8f9fa] min-h-screen py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 md:p-12 text-white mb-10 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-black mb-4">Book E-Pooja</h1>
            <p className="text-orange-50 text-lg mb-8">
              Perform Vedic Poojas from the comfort of your home with live streaming and sankalp by experienced Pandits.
            </p>
            <button className="px-8 py-3 bg-white text-orange-600 font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
              View Upcoming Poojas
            </button>
          </div>
          <div className="absolute -right-20 -top-20 text-[250px] opacity-20 rotate-12">🛕</div>
        </div>

        <h2 className="text-2xl font-black text-gray-800 mb-6">Upcoming Poojas</h2>

        {/* Pooja Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all">
              
              <div className="h-48 bg-orange-100 relative items-center justify-center flex overflow-hidden">
                <div className="text-[80px]">
                  {['🔥', '🌺', '🕉️'][item-1]}
                </div>
                <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  Fills Fast
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-gray-800 text-xl mb-3">
                  {['Maha Navratri Chandi Homa', 'Kaal Sarp Dosh Nivaran', 'Mangal Dosh Shanti Pooja'][item-1]}
                </h3>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarIcon size={16} className="text-orange-500" />
                    <span className="font-medium">2{item} Oct, 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock size={16} className="text-orange-500" />
                    <span className="font-medium">10:00 AM onwards</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin size={16} className="text-orange-500" />
                    <span className="font-medium">Kashi Vishwanath Temple</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-0.5">Starting At</p>
                    <p className="text-xl font-black text-gray-800">₹{1100 + (item*500)}</p>
                  </div>
                  <button className="px-6 py-2.5 bg-orange-500 text-white font-bold rounded-lg shadow-md hover:bg-orange-600 transition-colors">
                    Join Now
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Pooja;
