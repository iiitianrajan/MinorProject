const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-10 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-800">
            About Us
          </h1>
          <p className="text-gray-500 mt-2">
            Connecting you with trusted astrologers
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8 mb-8">
          <p className="text-gray-600 leading-relaxed">
            This platform is a college major project designed to connect users
            with professional astrologers for guidance and consultation.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-lg mb-2">🔮 Trusted Experts</h3>
            <p className="text-sm text-gray-500">
              Verified astrologers with real experience.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-lg mb-2">⚡ Instant Chat</h3>
            <p className="text-sm text-gray-500">
              Connect instantly with astrologers anytime.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-lg mb-2">💰 Affordable</h3>
            <p className="text-sm text-gray-500">
              Budget-friendly consultation services.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default About;