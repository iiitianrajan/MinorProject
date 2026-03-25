const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        
        <h1 className="text-3xl font-black mb-4 text-gray-800">
          Privacy Policy
        </h1>

        <p className="text-sm text-gray-400 mb-6">
          Last updated: March 2026
        </p>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <p>
            We value your privacy and ensure your data is handled securely.
          </p>

          <h2 className="text-lg font-bold text-gray-800">
            1. Data Collection
          </h2>
          <p>
            We collect information such as name, email, and phone number for authentication.
          </p>

          <h2 className="text-lg font-bold text-gray-800">
            2. Data Usage
          </h2>
          <p>
            Your data is used only to provide and improve our services.
          </p>

          <h2 className="text-lg font-bold text-gray-800">
            3. Security
          </h2>
          <p>
            We implement security measures to protect your personal data.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Privacy;