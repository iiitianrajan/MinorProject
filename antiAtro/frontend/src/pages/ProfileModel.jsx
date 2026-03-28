import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Phone,
  LogOut,
  Wallet,
  Calendar,
  MapPin,
  User,
  ShieldCheck,
  Star,
  Sparkles
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const ProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

          /* ── Overlay ── */
          .pm-overlay {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 16px;
            background: rgba(10, 5, 0, 0.78);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }

          /* ── Card ── */
          .pm-card {
            position: relative;
            width: 100%;
            max-width: 420px;
            max-height: 92vh;
            overflow-y: auto;
            border-radius: 28px;
            padding: 0 0 24px 0;
            font-family: 'DM Sans', sans-serif;

            background: linear-gradient(
              170deg,
              rgba(28, 12, 2, 0.97) 0%,
              rgba(40, 18, 5, 0.97) 40%,
              rgba(20, 8, 30, 0.97) 100%
            );
            backdrop-filter: blur(32px);
            -webkit-backdrop-filter: blur(32px);
            border: 1px solid rgba(255, 160, 40, 0.22);
            box-shadow:
              0 0 0 1px rgba(255, 200, 80, 0.06) inset,
              0 32px 80px rgba(0, 0, 0, 0.75),
              0 0 60px rgba(255, 120, 20, 0.14),
              0 0 120px rgba(220, 80, 0, 0.08);

            scrollbar-width: thin;
            scrollbar-color: rgba(255, 140, 30, 0.3) transparent;
          }
          .pm-card::-webkit-scrollbar { width: 4px; }
          .pm-card::-webkit-scrollbar-track { background: transparent; }
          .pm-card::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, rgba(255,140,30,0.5), rgba(255,60,100,0.3));
            border-radius: 4px;
          }

          /* ── Hero banner at top ── */
          .pm-hero {
            position: relative;
            width: 100%;
            height: 110px;
            border-radius: 28px 28px 0 0;
            overflow: hidden;
            background: linear-gradient(
              135deg,
              #ff6a00 0%,
              #ee0979 40%,
              #7c1fa8 75%,
              #1a0536 100%
            );
          }

          .pm-hero-stars {
            position: absolute;
            inset: 0;
            background-image:
              radial-gradient(circle, rgba(255,255,200,0.9) 1px, transparent 1px),
              radial-gradient(circle, rgba(255,255,200,0.6) 1px, transparent 1px),
              radial-gradient(circle, rgba(255,255,200,0.4) 1px, transparent 1px);
            background-size: 60px 60px, 90px 90px, 130px 130px;
            background-position: 10px 10px, 45px 30px, 80px 15px;
            animation: twinkle 4s ease-in-out infinite alternate;
          }
          @keyframes twinkle {
            0%   { opacity: 0.6; }
            100% { opacity: 1; }
          }

          .pm-hero-mandala {
            position: absolute;
            right: -20px;
            top: -20px;
            width: 130px;
            height: 130px;
            opacity: 0.15;
            border: 2px solid rgba(255,220,100,0.8);
            border-radius: 50%;
            box-shadow:
              0 0 0 12px rgba(255,180,50,0.08),
              0 0 0 26px rgba(255,140,30,0.05),
              0 0 0 44px rgba(255,100,20,0.03);
            animation: rotateSlow 20s linear infinite;
          }
          @keyframes rotateSlow {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }

          .pm-hero-mandala::before {
            content: '';
            position: absolute;
            inset: 8px;
            border: 1px dashed rgba(255,220,100,0.5);
            border-radius: 50%;
          }
          .pm-hero-mandala::after {
            content: '';
            position: absolute;
            inset: 18px;
            border: 1px solid rgba(255,200,80,0.3);
            border-radius: 50%;
          }

          /* Ambient blobs */
          .pm-blob {
            position: absolute;
            border-radius: 50%;
            filter: blur(55px);
            pointer-events: none;
            z-index: 0;
          }
          .pm-blob-1 {
            width: 200px; height: 200px;
            background: rgba(255, 120, 20, 0.13);
            top: 60px; right: -60px;
          }
          .pm-blob-2 {
            width: 150px; height: 150px;
            background: rgba(220, 30, 100, 0.1);
            bottom: 60px; left: -50px;
          }
          .pm-blob-3 {
            width: 120px; height: 120px;
            background: rgba(140, 30, 200, 0.08);
            top: 50%; left: 50%;
            transform: translate(-50%, -50%);
          }

          /* ── Close btn ── */
          .pm-close {
            position: absolute;
            top: 14px; right: 14px;
            z-index: 10;
            width: 32px; height: 32px;
            border-radius: 50%;
            border: 1px solid rgba(255,255,255,0.18);
            background: rgba(0,0,0,0.35);
            color: rgba(255,255,255,0.7);
            display: flex; align-items: center; justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            backdrop-filter: blur(8px);
          }
          .pm-close:hover {
            background: rgba(220, 30, 60, 0.35);
            border-color: rgba(255, 80, 80, 0.5);
            color: #fff;
            transform: scale(1.1) rotate(90deg);
          }

          /* ── Inner content ── */
          .pm-inner {
            position: relative;
            z-index: 2;
            padding: 0 22px;
          }

          /* ── Avatar section ── */
          .pm-avatar-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: -44px;
            margin-bottom: 22px;
          }

          .pm-avatar-ring {
            position: relative;
            width: 88px; height: 88px;
            border-radius: 50%;
            padding: 3px;
            background: linear-gradient(135deg, #ff9500, #ff3c78, #9b2dca);
            box-shadow:
              0 0 24px rgba(255, 130, 20, 0.55),
              0 0 50px rgba(255, 60, 100, 0.25),
              0 8px 32px rgba(0,0,0,0.5);
            animation: ringPulse 3.5s ease-in-out infinite;
          }
          @keyframes ringPulse {
            0%,100% { box-shadow: 0 0 20px rgba(255,130,20,0.5), 0 0 44px rgba(255,60,100,0.2), 0 8px 32px rgba(0,0,0,0.5); }
            50%      { box-shadow: 0 0 32px rgba(255,60,100,0.55), 0 0 64px rgba(255,130,20,0.25), 0 8px 32px rgba(0,0,0,0.5); }
          }

          .pm-avatar-img {
            width: 100%; height: 100%;
            border-radius: 50%;
            object-fit: cover;
            display: block;
            background: linear-gradient(135deg, #3a0010, #7c1020);
          }

          .pm-avatar-fallback {
            width: 100%; height: 100%;
            border-radius: 50%;
            background: linear-gradient(135deg, #4a1500, #c44a00, #8b1a4a);
            display: flex; align-items: center; justify-content: center;
            font-size: 1.9rem;
            font-weight: 700;
            color: #fff;
            font-family: 'Playfair Display', serif;
            text-shadow: 0 2px 8px rgba(0,0,0,0.5);
          }

          .pm-verified-badge {
            position: absolute;
            bottom: 2px; right: 2px;
            width: 24px; height: 24px;
            background: linear-gradient(135deg, #ff9500, #ff5e00);
            border-radius: 50%;
            border: 2px solid rgba(28,12,2,0.95);
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 0 10px rgba(255,140,20,0.7);
          }

          .pm-name {
            margin-top: 14px;
            font-family: 'Playfair Display', serif;
            font-size: 1.18rem;
            font-weight: 700;
            letter-spacing: 0.02em;
            background: linear-gradient(90deg, #fff5e0 0%, #ffd080 45%, #ff8c40 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-align: center;
          }

          .pm-role-badge {
            margin-top: 7px;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 0.62rem;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            padding: 4px 14px;
            border-radius: 20px;
            background: linear-gradient(135deg, rgba(255,140,20,0.18), rgba(220,50,80,0.14));
            border: 1px solid rgba(255,160,40,0.3);
            color: rgba(255, 210, 130, 0.85);
            font-weight: 600;
          }

          /* ── Zodiac strip ── */
          .pm-zodiac-strip {
            display: flex;
            gap: 6px;
            justify-content: center;
            margin-top: 10px;
            margin-bottom: 2px;
          }
          .pm-zodiac-dot {
            width: 5px; height: 5px;
            border-radius: 50%;
            background: rgba(255,180,60,0.35);
          }
          .pm-zodiac-dot.active {
            background: rgba(255,150,30,0.85);
            box-shadow: 0 0 5px rgba(255,140,20,0.6);
          }

          /* ── Wallet card ── */
          .pm-wallet {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px 18px;
            border-radius: 18px;
            margin-bottom: 14px;
            background: linear-gradient(
              135deg,
              rgba(255, 160, 20, 0.15) 0%,
              rgba(220, 60, 0, 0.12) 100%
            );
            border: 1px solid rgba(255, 150, 30, 0.28);
            box-shadow:
              0 0 24px rgba(255, 130, 20, 0.1),
              inset 0 1px 0 rgba(255, 220, 100, 0.08);
            position: relative;
            overflow: hidden;
          }

          .pm-wallet::before {
            content: '₹';
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 4rem;
            font-family: 'Playfair Display', serif;
            color: rgba(255,160,30,0.05);
            pointer-events: none;
            line-height: 1;
          }

          .pm-wallet-left {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #ffb040;
          }

          .pm-wallet-icon-wrap {
            width: 36px; height: 36px;
            border-radius: 10px;
            background: rgba(255,140,20,0.18);
            border: 1px solid rgba(255,160,40,0.25);
            display: flex; align-items: center; justify-content: center;
          }

          .pm-wallet-texts { display: flex; flex-direction: column; gap: 1px; }

          .pm-wallet-label {
            font-size: 0.72rem;
            font-weight: 500;
            letter-spacing: 0.05em;
            color: rgba(255, 190, 80, 0.7);
            text-transform: uppercase;
          }

          .pm-wallet-amount {
            font-family: 'Playfair Display', serif;
            font-size: 1.25rem;
            font-weight: 700;
            background: linear-gradient(90deg, #ffe066, #ff9030);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }

          .pm-recharge-btn {
            font-size: 0.7rem;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            padding: 6px 14px;
            border-radius: 10px;
            border: 1px solid rgba(255,140,30,0.45);
            background: rgba(255,120,20,0.12);
            color: rgba(255,200,80,0.9);
            cursor: pointer;
            transition: all 0.2s;
            font-family: 'DM Sans', sans-serif;
          }
          .pm-recharge-btn:hover {
            background: rgba(255,120,20,0.25);
            border-color: rgba(255,160,40,0.7);
            box-shadow: 0 0 12px rgba(255,130,20,0.25);
            color: #fff;
          }

          /* ── Section label ── */
          .pm-section-label {
            font-size: 0.65rem;
            font-weight: 600;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: rgba(255, 160, 60, 0.55);
            margin-bottom: 8px;
            margin-left: 4px;
          }

          /* ── Info rows ── */
          .pm-info-row {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 11px 14px;
            border-radius: 14px;
            margin-bottom: 7px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 160, 40, 0.1);
            transition: background 0.2s ease, border-color 0.2s ease;
          }
          .pm-info-row:hover {
            background: rgba(255, 120, 20, 0.09);
            border-color: rgba(255, 150, 40, 0.25);
          }

          .pm-info-icon {
            color: #ff9040;
            flex-shrink: 0;
            opacity: 0.8;
          }

          .pm-info-content { display: flex; flex-direction: column; gap: 1px; }

          .pm-info-label {
            font-size: 0.62rem;
            font-weight: 500;
            letter-spacing: 0.07em;
            text-transform: uppercase;
            color: rgba(255, 160, 60, 0.5);
          }

          .pm-info-text {
            font-size: 0.83rem;
            color: rgba(255, 240, 210, 0.78);
            font-weight: 400;
          }

          /* ── Divider ── */
          .pm-divider {
            height: 1px;
            margin: 18px 0;
            background: linear-gradient(90deg,
              transparent 0%,
              rgba(255, 140, 30, 0.3) 25%,
              rgba(255, 60, 80, 0.25) 75%,
              transparent 100%
            );
            position: relative;
          }
          .pm-divider::after {
            content: '✦';
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 0.6rem;
            color: rgba(255,160,40,0.5);
            background: rgba(28,12,2,0.97);
            padding: 0 6px;
          }

          /* ── Action buttons ── */
          .pm-actions { display: flex; flex-direction: column; gap: 10px; }

          .pm-btn-edit {
            width: 100%;
            padding: 12px;
            border-radius: 14px;
            border: 1px solid rgba(255, 150, 40, 0.3);
            background: rgba(255, 120, 20, 0.08);
            color: rgba(255, 220, 150, 0.88);
            font-size: 0.84rem;
            font-weight: 600;
            font-family: 'DM Sans', sans-serif;
            letter-spacing: 0.05em;
            cursor: pointer;
            transition: all 0.22s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }
          .pm-btn-edit:hover {
            background: rgba(255, 130, 20, 0.16);
            border-color: rgba(255, 160, 50, 0.55);
            box-shadow: 0 0 18px rgba(255, 120, 20, 0.2);
            color: #fff;
          }

          .pm-btn-logout {
            width: 100%;
            padding: 12px;
            border-radius: 14px;
            border: none;
            background: linear-gradient(135deg, #ff6a00 0%, #ee0979 55%, #9b2dca 100%);
            color: #fff;
            font-size: 0.84rem;
            font-weight: 600;
            font-family: 'DM Sans', sans-serif;
            letter-spacing: 0.05em;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.22s ease;
            box-shadow: 0 4px 22px rgba(255,100,0,0.35);
          }
          .pm-btn-logout:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 28px rgba(238,9,121,0.45);
            opacity: 0.92;
          }
          .pm-btn-logout:active { transform: scale(0.98); }

          .pm-not-logged {
            text-align: center;
            color: rgba(255, 220, 150, 0.35);
            font-size: 0.85rem;
            padding: 24px 0;
          }

          /* ── Astro tagline at bottom ── */
          .pm-tagline {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            margin-top: 18px;
            font-size: 0.65rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: rgba(255, 180, 80, 0.3);
            font-weight: 500;
          }
        `}</style>

        {/* ── Overlay ── */}
        <div className="pm-overlay" onClick={onClose}>

          {/* ── Card ── */}
          <motion.div
            className="pm-card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 50, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          >
            {/* Ambient blobs */}
            <div className="pm-blob pm-blob-1" />
            <div className="pm-blob pm-blob-2" />
            <div className="pm-blob pm-blob-3" />

            {/* ── Hero banner ── */}
            <div className="pm-hero">
              <div className="pm-hero-stars" />
              <div className="pm-hero-mandala" />
            </div>

            {/* Close */}
            <button className="pm-close" onClick={onClose}>
              <X size={15} />
            </button>

            {/* ── Inner content ── */}
            <div className="pm-inner">

              {/* Avatar + Name */}
              <div className="pm-avatar-wrap">
                <div className="pm-avatar-ring">
                  {currentUser?.profilePicture ? (
                    <img
                      src={currentUser.profilePicture}
                      alt="profile"
                      className="pm-avatar-img"
                    />
                  ) : (
                    <div className="pm-avatar-fallback">
                      {currentUser?.name?.charAt(0) || "U"}
                    </div>
                  )}

                  {currentUser?.isVerified && (
                    <div className="pm-verified-badge">
                      <ShieldCheck size={12} color="#fff" />
                    </div>
                  )}
                </div>

                <div className="pm-name">
                  {currentUser?.name || "Guest"}
                </div>

                <span className="pm-role-badge">
                  <Star size={9} fill="currentColor" />
                  {currentUser?.role || "user"}
                </span>

                {/* Decorative zodiac dots */}
                <div className="pm-zodiac-strip">
                  {[...Array(7)].map((_, i) => (
                    <div
                      key={i}
                      className={`pm-zodiac-dot${i === 3 ? " active" : ""}`}
                    />
                  ))}
                </div>
              </div>

              {/* Wallet */}
              <div className="pm-wallet">
                <div className="pm-wallet-left">
                  <div className="pm-wallet-icon-wrap">
                    <Wallet size={17} color="#ffaa30" />
                  </div>
                  <div className="pm-wallet-texts">
                    <span className="pm-wallet-label">Wallet Balance</span>
                    <span className="pm-wallet-amount">
                      ₹{currentUser?.walletBalance || 0}
                    </span>
                  </div>
                </div>
                <button className="pm-recharge-btn">+ Recharge</button>
              </div>

              {/* Info rows */}
              {currentUser ? (
                <>
                  <div className="pm-section-label">Account Details</div>

                  <div className="pm-info-row">
                    <Mail size={16} className="pm-info-icon" />
                    <div className="pm-info-content">
                      <span className="pm-info-label">Email</span>
                      <span className="pm-info-text">
                        {currentUser.email || "Not provided"}
                      </span>
                    </div>
                  </div>

                  <div className="pm-info-row">
                    <Phone size={16} className="pm-info-icon" />
                    <div className="pm-info-content">
                      <span className="pm-info-label">Phone</span>
                      <span className="pm-info-text">
                        {currentUser.phone || "Not provided"}
                      </span>
                    </div>
                  </div>

                  <div className="pm-section-label" style={{ marginTop: '14px' }}>Birth Details</div>

                  <div className="pm-info-row">
                    <Calendar size={16} className="pm-info-icon" />
                    <div className="pm-info-content">
                      <span className="pm-info-label">Date of Birth</span>
                      <span className="pm-info-text">
                        {currentUser.dateOfBirth
                          ? new Date(currentUser.dateOfBirth).toLocaleDateString()
                          : "Not set"}
                      </span>
                    </div>
                  </div>

                  <div className="pm-info-row">
                    <User size={16} className="pm-info-icon" />
                    <div className="pm-info-content">
                      <span className="pm-info-label">Time of Birth</span>
                      <span className="pm-info-text">
                        {currentUser.timeOfBirth || "Not set"}
                      </span>
                    </div>
                  </div>

                  <div className="pm-info-row">
                    <MapPin size={16} className="pm-info-icon" />
                    <div className="pm-info-content">
                      <span className="pm-info-label">Place of Birth</span>
                      <span className="pm-info-text">
                        {currentUser.placeOfBirth || "Not set"}
                      </span>
                    </div>
                  </div>

                  <div className="pm-divider" />

                  {/* Actions */}
                  <div className="pm-actions">
                    <button className="pm-btn-edit">
                      <Sparkles size={14} />
                      Edit Profile
                    </button>

                    <button
                      className="pm-btn-logout"
                      onClick={() => { logout(); onClose(); }}
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <p className="pm-not-logged">User not logged in</p>
              )}

              {/* Astro footer tagline */}
              <div className="pm-tagline">
                <Star size={8} fill="currentColor" />
                Soul Telescope • Your Cosmic Guide
                <Star size={8} fill="currentColor" />
              </div>

            </div>
          </motion.div>

        </div>
      </>
    </AnimatePresence>
  );
};

export default ProfileModal;