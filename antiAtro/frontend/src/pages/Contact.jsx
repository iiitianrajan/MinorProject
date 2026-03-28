import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare } from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return toast.error("All fields required");
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) throw new Error("Failed");

      toast.success("Message sent successfully 🚀");
      setForm({ name: "", email: "", message: "" });

    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center px-6 py-10">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden max-w-5xl w-full border border-gray-100"
      >

        {/* 🔥 LEFT SIDE (INFO PANEL) */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-10 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Let’s Talk 👋</h2>
            <p className="text-sm opacity-90">
              Have questions or need guidance? Our team is here to help you anytime.
            </p>
          </div>

          <div className="space-y-4 mt-8 text-sm">
            <div>📧 support@astro.com</div>
            <div>📞 +91 98765 43210</div>
            <div>📍 India</div>
          </div>

          <div className="text-xs opacity-70 mt-10">
            We usually reply within 24 hours.
          </div>
        </div>

        {/* 🔥 RIGHT SIDE (FORM) */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">

          <h1 className="text-2xl font-bold text-gray-800">Contact Us</h1>

          {/* NAME */}
          <div className="relative">
            <User size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full pl-10 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full pl-10 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* MESSAGE */}
          <div className="relative">
            <MessageSquare size={18} className="absolute left-3 top-3 text-gray-400" />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full pl-10 p-3 border rounded-lg h-32 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg font-bold shadow-lg"
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>

        </form>
      </motion.div>

    </div>
  );
};

export default Contact;