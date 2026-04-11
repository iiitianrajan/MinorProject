import React, { useState, useEffect } from 'react';
import { X, Wallet as WalletIcon, CheckCircle } from 'lucide-react';

const WalletModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Dynamically load Razorpay SDK
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); }
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    // Simulate backend call to create order
    try {
      /* 
      const res = await fetch('${import.meta.env.VITE_API_URL}/api/wallet/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      const order = await res.json();
      */
      
      // Mocking order for immediate frontend demonstration
      setTimeout(() => {
        const options = {
          key: "rzp_test_dummy_key_here", // Enter the Key ID generated from the Dashboard
          amount: amount * 100,
          currency: "INR",
          name: "AstroTalk Clone Wallet",
          description: "Wallet Recharge Transaction",
          image: "https://www.google.com/s2/favicons?domain=astrotalk.com&sz=128",
          // order_id: order.id, // Mocked
          handler: function (response) {
            // alert(response.razorpay_payment_id);
            setSuccess(true);
            setTimeout(() => {
              setSuccess(false);
              onClose();
            }, 2000);
          },
          prefill: {
            name: "Rohit User",
            email: "user@demo.com",
            contact: "9999999999",
          },
          theme: {
            color: "#ffdb42",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response){
           alert(response.error.description);
        });
        rzp1.open();
        setLoading(false);
      }, 500);

    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden relative shadow-2xl animate-fade-in-up">
        
        <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
          <h2 className="font-bold flex items-center gap-2"><WalletIcon className="text-[#ffdb42]" /> Add Money to Wallet</h2>
          <button onClick={onClose}><X size={20} className="text-gray-500 hover:text-black"/></button>
        </div>

        {success ? (
          <div className="p-12 flex flex-col items-center justify-center">
            <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
            <h3 className="text-xl font-bold">Payment Successful!</h3>
            <p className="text-gray-500 mt-2 text-center text-sm">₹{amount} has been added to your AstraTalk wallet.</p>
          </div>
        ) : (
          <div className="p-6">
            <p className="text-sm font-medium text-gray-600 mb-4">Current Balance: <span className="font-black text-black">₹150.00</span></p>
            
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[50, 100, 200, 500, 1000, 2000].map(val => (
                <button 
                  key={val}
                  onClick={() => setAmount(val)}
                  className={`py-2 rounded-lg border font-bold ${amount === val ? 'bg-[#ffdb42] border-[#ffdb42] text-black shadow-sm' : 'bg-white border-gray-200 text-gray-700 hover:border-[#ffdb42]'}`}
                >
                  ₹{val}
                </button>
              ))}
            </div>

            <div className="relative mb-6">
              <span className="absolute left-4 top-3 text-gray-500 font-bold">₹</span>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-[#ffdb42] font-bold"
              />
            </div>

            <button 
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-4 bg-black text-white font-black rounded-xl hover:shadow-lg transition-shadow"
            >
              {loading ? 'Processing...' : `Proceed to pay ₹${amount}`}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default WalletModal;
