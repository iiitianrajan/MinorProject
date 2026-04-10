import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "./contexts/protectRoute";
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Call from './pages/Call';
import Kundli from './pages/Kundli';
import Astromall from './pages/Astromall';
// import Product from "../../backend/models/Product";
import Pooja from './pages/Pooja';
import AddPuja from "./pages/AddPuja";
import GenericPage from './pages/GenericPage';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import { WebRTCProvider } from './contexts/WebRTCContext';
import AIChatWidget from './components/chat/AIChatWidget';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileModal from './pages/ProfileModel';
import ExpertForm from "./pages/ExpertForm";
import Cart from "./pages/Cart";
import { CartProvider } from "./contexts/CartContext";


import About from "./pages/AboutUs";
import ScrollToTop from "./pages/ScrollToTop";
import Contact from "./pages/Contact";
import KundliResult from "./pages/KundliResult";
import KundliMatch from "./pages/KundliMatch";
import MatchResult from "./pages/MatchResult";
import LoveCalculator from "./pages/LoveCalculator";
import MoonSign from "./pages/MoonSign";
import AstrologerDetails from "./pages/AstrologerDetails";
import CallScreen from "./pages/CallScreen";
import AstrologyGuide from "./pages/AstrologyGuide";
import AstrologerList from "./pages/AstrologerList";
import ServiceDetail from "./pages/ServiceDetail";
import HoroscopePage from "./pages/Horoscopepage";
import BlogPage from "./pages/BlogPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";


import { PaymentProvider } from "./contexts/PaymentContext";
import AddProduct from "./pages/AddProduct";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/astrologer/:id" element={<AstrologerDetails />} />
        <Route path="/call" element={<Call />} />
        <Route path="/astromall" element={<Astromall />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/pooja" element={<Pooja />} />
        <Route path="/addpuja" element={<AddPuja/>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/callscreen" element={<CallScreen />} />
        <Route path="/astrology-guide" element={<AstrologyGuide />} />
        <Route path="/kundli" element={<ProtectedRoute><Kundli /></ProtectedRoute>} />
        <Route path="/kundli-result" element={<ProtectedRoute><KundliResult /></ProtectedRoute>} />
        <Route path="/kundli-matching" element={<ProtectedRoute><KundliMatch /></ProtectedRoute>} />
        <Route path="/match-result" element={<ProtectedRoute><MatchResult /></ProtectedRoute>} />
        <Route path="/love-calculator" element={<ProtectedRoute><LoveCalculator /></ProtectedRoute>} />
        <Route path="/moon-sign" element={<ProtectedRoute><MoonSign /></ProtectedRoute>} />
        <Route path="/horoscopepage" element={<ProtectedRoute><HoroscopePage /></ProtectedRoute>} />
        <Route path="/blog" element={<ProtectedRoute><BlogPage /></ProtectedRoute>} />
        <Route path="/blog/:id" element={<ProtectedRoute><ArticleDetailPage /></ProtectedRoute>} />


        <Route path="/astrologerList" element={<ProtectedRoute><AstrologerList /></ProtectedRoute>} />
        <Route path="/service/:id" element={<ProtectedRoute><ServiceDetail /></ProtectedRoute>} />

        <Route path="*" element={<GenericPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [addExpert, setAddExpert] = useState(false);

  return (
    <AuthProvider>
      <SocketProvider>
        <WebRTCProvider>
          <CartProvider>
            <PaymentProvider>
              <Router>
                <ToastContainer
                  position="top-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  pauseOnHover
                  draggable
                  theme="colored"
                  toastStyle={{
                    borderRadius: "12px",
                    fontSize: "14px",
                    fontWeight: "500",
                    padding: "12px 16px"
                  }}
                  bodyStyle={{ fontFamily: "inherit" }}
                  style={{ zIndex: 10000 }}
                />

                <div className="flex flex-col min-h-screen bg-[var(--bg)] font-sans">
                  <Navbar
                    onProfileClick={() => setIsProfileOpen(true)}
                    onAddExpertClick={() => setAddExpert(true)}
                  />

                  <main className="flex-grow">
                    <ScrollToTop />
                    <AnimatedRoutes />
                  </main>

                  <ProfileModal
                    isOpen={isProfileOpen}
                    onClose={() => setIsProfileOpen(false)}
                  />

                  <ExpertForm
                    isOpen={addExpert}
                    isClose={() => setAddExpert(false)}
                  />

                  <AIChatWidget />
                  <Footer />
                </div>
              </Router>
            </PaymentProvider>
          </CartProvider>
        </WebRTCProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;