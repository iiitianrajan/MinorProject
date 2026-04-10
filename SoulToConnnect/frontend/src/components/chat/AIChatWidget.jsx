import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Namaste! I am your AI Astro Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const { currentUser } = useAuth();

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Mock AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { id: Date.now(), sender: 'ai', text: 'I am analyzing your stars... This feature will soon connect to a powerful AI model!' }
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Persistent Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[9990] w-14 h-14 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform"
      >
        <Bot size={28} />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 left-6 z-[9999] w-[340px] h-[480px] bg-white rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Divine AI Agent</h3>
                  <p className="text-[10px] opacity-80">Always Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 bg-gray-50 overflow-y-auto space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-[var(--primary)] text-white rounded-br-sm' 
                      : 'bg-white border border-[var(--border)] text-[var(--text)] rounded-bl-sm shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-[var(--border)]">
              <form onSubmit={handleSend} className="flex gap-2 relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..." 
                  className="flex-1 bg-gray-100 rounded-full pl-4 pr-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-purple-500/20"
                />
                <button type="submit" className="absolute right-1 cursor-pointer top-1 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition-colors">
                  <Send size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;
