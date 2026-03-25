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
  ShieldCheck
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const ProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, logout } = useAuth();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* this is prev class combo: className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4" */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          className="bg-white rounded-3xl w-full max-w-md p-6 relative shadow-2xl border border-yellow-200"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-black"
          >
            <X size={22} />
          </button>

          {/* 🔥 HEADER */}
          <div className="text-center mb-6">
            <div className="relative w-20 h-20 mx-auto">
              {currentUser?.profilePicture ? (
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="w-full h-full rounded-full object-cover border-4 border-yellow-400 shadow"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white flex items-center justify-center text-2xl font-bold shadow-lg">
                  {currentUser?.name?.charAt(0) || "U"}
                </div>
              )}

              {/* Verified Badge */}
              {currentUser?.isVerified && (
                <div className="absolute bottom-0 right-0 bg-green-500 p-1 rounded-full">
                  <ShieldCheck size={14} className="text-white" />
                </div>
              )}
            </div>

            <h2 className="text-xl font-bold mt-3 text-black">
              {currentUser?.name || "Guest"}
            </h2>

            {/* Role Badge */}
            <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full mt-1 inline-block capitalize">
              {currentUser?.role || "user"}
            </span>
          </div>

          {/* 🔥 WALLET */}
          <div className="bg-yellow-50 p-4 rounded-xl flex items-center justify-between mb-4 border">
            <div className="flex items-center gap-2 text-yellow-700">
              <Wallet size={18} />
              <span className="text-sm font-medium">Wallet Balance</span>
            </div>
            <span className="font-bold text-lg">
              ₹{currentUser?.walletBalance || 0}
            </span>
          </div>

          {/* 🔥 INFO */}
          {currentUser ? (
            <div className="space-y-3">

              {/* Email */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border">
                <Mail size={18} className="text-yellow-600" />
                <span className="text-sm text-gray-700">
                  {currentUser.email || "Not provided"}
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border">
                <Phone size={18} className="text-yellow-600" />
                <span className="text-sm text-gray-700">
                  {currentUser.phone || "Not provided"}
                </span>
              </div>

              {/* DOB */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border">
                <Calendar size={18} className="text-yellow-600" />
                <span className="text-sm text-gray-700">
                  {currentUser.dateOfBirth
                    ? new Date(currentUser.dateOfBirth).toLocaleDateString()
                    : "DOB not set"}
                </span>
              </div>

              {/* Birth Time */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border">
                <User size={18} className="text-yellow-600" />
                <span className="text-sm text-gray-700">
                  {currentUser.timeOfBirth || "Time not set"}
                </span>
              </div>

              {/* Birth Place */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border">
                <MapPin size={18} className="text-yellow-600" />
                <span className="text-sm text-gray-700">
                  {currentUser.placeOfBirth || "Place not set"}
                </span>
              </div>

              {/* Divider */}
              <div className="border-t my-4"></div>

              {/* ACTIONS */}
              <div className="space-y-2">

                <button className="w-full py-2 rounded-xl border font-medium hover:bg-yellow-50 transition">
                  Edit Profile
                </button>

                <button
                  onClick={() => {
                    logout();
                    onClose();
                  }}
                  className="w-full py-2 rounded-xl bg-black text-white flex items-center justify-center gap-2 hover:opacity-90 transition"
                >
                  <LogOut size={16} />
                  Logout
                </button>

              </div>

            </div>
          ) : (
            <p className="text-center text-gray-500">User not logged in</p>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProfileModal;