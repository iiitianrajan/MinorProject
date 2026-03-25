import React, { useState, useRef, useEffect } from 'react';

const ChatBox = ({ astrologer, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false); // 🎤 state

  const messagesEndRef = useRef(null);

  // Greeting
  useEffect(() => {
    setMessages([
      {
        sender: 'ai',
        text: `Hello! I am ${astrologer}. Ask me anything ✨`,
        time: new Date()
      }
    ]);
  }, [astrologer]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // 🎤 Speech Recognition
  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in your browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = false;

    recognition.start();

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setInput(text); // ✅ fill input box
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      sender: 'user',
      text: input,
      time: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    const userInput = input;
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5001/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput })
      });

      const data = await res.json();

      const aiMessage = {
        sender: 'ai',
        text: data?.reply || "⚠️ No response from AI",
        time: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: "⚠️ Server not responding",
          time: new Date()
        }
      ]);
    }

    setLoading(false);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed bottom-5 right-5 w-96 h-[500px] bg-white rounded-2xl shadow-xl border flex flex-col overflow-hidden z-50">

      {/* Header */}
      <div className="bg-[#ffdb42] px-4 py-3 flex justify-between items-center">
        <h3 className="font-bold text-gray-800">{astrologer}</h3>
        <button onClick={onClose} className="text-lg font-bold">✕</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f9fa]">

        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>

            {msg.sender === 'ai' && (
              <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center text-xs">
                🔮
              </div>
            )}

            <div className="max-w-[70%]">
              <div
                className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-green-500 text-white rounded-br-none'
                    : 'bg-white border rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>

              <div className="text-[10px] text-gray-400 mt-1 px-1">
                {formatTime(msg.time)}
              </div>
            </div>
          </div>
        ))}

        {/* Typing */}
        {loading && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center text-xs">
              🔮
            </div>
            <div className="bg-white px-3 py-2 rounded-2xl text-sm border animate-pulse">
              Typing...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2 bg-white">

        {/* 🎤 Mic Button */}
        <button
          onClick={startListening}
          className={`px-3 py-2 rounded-full ${
            listening ? "bg-red-500 text-white" : "bg-gray-100"
          }`}
        >
          🎤
        </button>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={listening ? "Listening..." : "Ask something..."}
          className="flex-1 px-4 py-2 border rounded-full text-sm outline-none focus:ring-2 focus:ring-yellow-300"
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          disabled={loading}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-5 py-2 bg-[#ffdb42] rounded-full text-sm font-bold hover:scale-105 transition disabled:opacity-50"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;