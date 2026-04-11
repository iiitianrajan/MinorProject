import React, { createContext, useContext } from "react";

const PaymentContext = createContext();

export const usePayment = () => useContext(PaymentContext);

export const PaymentProvider = ({ children }) => {

  const startPayment = async (amount) => {
    if (!amount || amount <= 0) {
      alert("Invalid amount");
      return;
    }

    // ✅ Check if Razorpay is loaded
    if (!window.Razorpay) {
      alert("Razorpay not loaded");
      return;
    }

    try {
      // 1. Create order
      const token = localStorage.getItem('token')
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ amount: Number(amount) }),
      });

      const data = await res.json();



      // 2. Razorpay options
      const options = {
        key: data.key_id, 
        amount: data.amount,
        currency: data.currency,
        name: "SoulToConnect",
        description: "Payment",
        order_id: data.id,

         prefill: {
    name: "Test User",
    email: "test@example.com",
    contact: "9999999999",
  },
  method: {
    upi: true,          // ✅ UPI
    card: true,
    netbanking: true,
    wallet: true,
  },

        handler: async function (response) {
            const token = localStorage.getItem('token')
          await fetch(`${import.meta.env.VITE_API_URL}/api/payment/verify-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              ...response, 
              amount: Number(amount),
            }),
          });

          alert("✅ Payment Successful");
        },

        theme: {
          color:" #a53d00"
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <PaymentContext.Provider value={{ startPayment }}>
      {children}
    </PaymentContext.Provider>
  );
};