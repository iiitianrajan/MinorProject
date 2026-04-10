import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const GenericPage = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(p => p);
  
  // Create a friendly title based on the URL path
  const title = pathParts.length > 0 
    ? pathParts.map(word => word.charAt(0).toUpperCase() + word.slice(1).replace('-', ' ')).join(' / ')
    : 'Page Not Found';

  return (
    <div className="min-h-[70vh] bg-[#f8f9fa] flex flex-col items-center justify-center font-sans px-4">
      <div className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 text-center max-w-lg w-full">
        <div className="text-[80px] mb-4">🔮</div>
        <h1 className="text-3xl font-black text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-500 mb-8">
          The celestial charts are currently aligning to bring you this feature. This specific section of the AstroTalk Clone is under active development.
        </p>
        <Link to="/" className="inline-block px-8 py-3 bg-[#ffdb42] text-black font-bold rounded-full shadow hover:shadow-lg transition-all hover:-translate-y-0.5">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default GenericPage;
