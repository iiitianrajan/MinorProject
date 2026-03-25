import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { X } from 'lucide-react';
import { toast } from "react-toastify";


const AuthModal = ({ isOpen, onClose, defaultTab = 'login' }) => {
  const { loginWithGoogle,login } = useAuth();
  const [tab, setTab] = React.useState(defaultTab);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  

  const timeoutRef = useRef(null); // ✅ prevent memory leak

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: ""
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // API Submit
  const handleSubmit = async () => {
    if (loading) return; // ✅ prevent double click

    setError("");

    try {
      setLoading(true);

      const isLogin = tab === "login";

      const url = isLogin
        ? "http://localhost:5001/api/auth/login"
        : "http://localhost:5001/api/auth/signup";

      const payload = isLogin
        ? {
            phone: formData.phone,
            email: formData.email,
            password: formData.password
          }
        : { ...formData };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // ✅ Success toast
      toast.success(
        isLogin ? "Login successful!" : "Signup successful!"
      );

      login(data.user, data.token);

      // Save token
      // localStorage.setItem("token", data.token);

      // console.log("Auth Success:", data);

      // ✅ Safe timeout
      // timeoutRef.current = setTimeout(() => {
      //   onClose();
      // }, 1500);
      onClose();

    } catch (err) {
      setError(err.message);
      toast.error(err.message); // ✅ show error toast
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🕉️</div>
            <h2 className="text-2xl font-bold">
              Welcome to Divya
              <span className="text-[var(--primary)]">Darshan</span>
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex border rounded-lg overflow-hidden mb-6">
            <button
              className={`flex-1 py-2 ${
                tab === "login" ? "bg-[var(--primary)] text-white" : ""
              }`}
              onClick={() => setTab("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 ${
                tab === "signup" ? "bg-[var(--primary)] text-white" : ""
              }`}
              onClick={() => setTab("signup")}
            >
              Sign Up
            </button>
          </div>

          <div className="space-y-4">

            {/* Error */}
            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}

            {/* Phone */}
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              placeholder="Enter mobile number"
              className="w-full px-4 py-2.5 border rounded-lg"
            />
            
            <div className='flex gap-2'>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-4 py-2.5 border rounded-lg"
              />

              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-2.5 border rounded-lg"
              />
            </div>

            {/* Signup Fields */}
            {tab === "signup" && (
              <>
                <div className='flex gap-2'>
                  <input
                    name="name"
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full px-4 py-2.5 border rounded-lg"
                  />

                  <select
                    name="gender"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border rounded-lg"
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className='flex gap-2'>
                  <input
                    type="date"
                    name="dateOfBirth"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border rounded-lg"
                  />

                  <input
                    type="time"
                    name="timeOfBirth"
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border rounded-lg"
                  />
                </div>

                <input
                  name="placeOfBirth"
                  onChange={handleChange}
                  placeholder="Place of Birth"
                  className="w-full px-4 py-2.5 border rounded-lg"
                />
              </>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 bg-[var(--primary)] text-white rounded-lg disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : tab === "login"
                ? "Login"
                : "Sign Up"}
            </button>

            {/* Google */}
            <button
              onClick={() => {
                loginWithGoogle();
                onClose();
              }}
              className="w-full py-2 border rounded-lg"
            >
              Continue with Google
            </button>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;