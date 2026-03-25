import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./contexts/protectRoute";
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Call from './pages/Call';
import Kundli from './pages/Kundli';
import Astromall from './pages/Astromall';
import Pooja from './pages/Pooja';
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
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import About from "./pages/About";
import ScrollToTop from "./pages/ScrollToTop";
import Contact from "./pages/Contact";
import LoveBlogs from "./pages/LoveBlogs";
import CareerBlogs from "./pages/CareerBlogs";
import BlogDetail from "./pages/BlogDetail";
import HoroscopeDaily from "./pages/HoroscopeDaily";
import HoroscopeWeekly from "./pages/HoroscopeWeekly";
import HoroscopeResult from "./pages/HoroscopeResult";
import KundliResult from "./pages/KundliResult";
import KundliMatch from "./pages/KundliMatch";
import MatchResult from "./pages/MatchResult";
import LoveCalculator from "./pages/LoveCalculator";
import MoonSign from "./pages/MoonSign";
import AstrologerDetails from "./pages/AstrologerDetails";


function App() {

  // state for  modal
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [addExpert, setAddExpert] = useState(false);


  return (
    <AuthProvider>
      <SocketProvider>
        <WebRTCProvider>
          <CartProvider>
            <Router>

              {/* toastContainer used for flash messaging  */}
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
                bodyStyle={{
                  fontFamily: "inherit"
                }}
                style={{ zIndex: 10000 }}
              />

              <div className="flex flex-col min-h-screen bg-[var(--bg)] font-sans">

                {/*  pass click handler to model */}
                <Navbar onProfileClick={() => setIsProfileOpen(true)}
                  onAddExpertClick={() => setAddExpert(true)} />

                <main className="flex-grow">
                  <ScrollToTop />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/astrologer/:id" element={<AstrologerDetails/>} />

                    <Route path="/call" element={<Call />} />
                    <Route path="/astromall" element={<Astromall />} />
                    <Route path="/pooja" element={<Pooja />} />
                    <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute> } />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact/>} />
                    <Route path="/blog/love" element={<LoveBlogs/>} />
                    <Route path="/blog/career" element={<CareerBlogs/>} />
                    <Route path="/blog/:id" element={<BlogDetail/>} />
                    <Route path="/kundli" element={<ProtectedRoute><Kundli /></ProtectedRoute> } />
                    <Route path="/kundli-result" element={<ProtectedRoute><KundliResult/></ProtectedRoute> } />
                    <Route path="/kundli-matching" element={<ProtectedRoute><KundliMatch/></ProtectedRoute> } />
                    <Route path="/match-result" element={<ProtectedRoute><MatchResult/></ProtectedRoute> } />
                    <Route path="/love-calculator" element={<ProtectedRoute><LoveCalculator/></ProtectedRoute> } />
                    <Route path="/moon-sign" element={<ProtectedRoute><MoonSign/></ProtectedRoute> } />
                    <Route path="/horoscope/daily" element={<ProtectedRoute><HoroscopeDaily/></ProtectedRoute> } />
                    <Route path="/horoscope/weekly" element={<ProtectedRoute><HoroscopeWeekly/></ProtectedRoute> } />
                    <Route path="/horoscope/:type/:sign" element={<ProtectedRoute><HoroscopeResult/></ProtectedRoute> } />

                    {/* <Route path="/profile" element={<ProfileModal />} /> */}

                    {/* Fallback */}
                    <Route path="*" element={<GenericPage />} />
                  </Routes>
                </main>

                {/* 🔥 GLOBAL MODAL */}
                <ProfileModal
                  isOpen={isProfileOpen}
                  onClose={() => setIsProfileOpen(false)}
                />

                <ExpertForm
                  isOpen={addExpert}
                  isClose={() => setAddExpert(false)}
                />

                {/* Persistent AI Chat Agent widget */}
                <AIChatWidget />
                <Footer />
              </div>

            </Router>
          </CartProvider>
        </WebRTCProvider>
      </SocketProvider>
    </AuthProvider >
  );
}

export default App;