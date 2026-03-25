const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        
        <h1 className="text-3xl font-black mb-4 text-gray-800">
          Terms of Use
        </h1>

        <p className="text-sm text-gray-400 mb-6">
          Last updated: March 2026
        </p>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>
            Welcome to our platform. By accessing or using our services, you agree
            to be bound by these Terms of Use.
          </p>

          <h2 className="text-lg font-bold text-gray-800">
            1. User Responsibilities
          </h2>
          <p>
            You agree to provide accurate information and use the platform
            responsibly.
          </p>

          <h2 className="text-lg font-bold text-gray-800">
            2. Services
          </h2>
          <p>
            We provide astrology-based consultation services for guidance purposes only.
          </p>

          <h2 className="text-lg font-bold text-gray-800">
            3. Limitation of Liability
          </h2>
          <p>
            We are not responsible for decisions made based on consultations.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Terms;