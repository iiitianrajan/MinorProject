const { Server } = require('socket.io');
const Message = require('../models/Message');
const Consultation = require('../models/Consultation');
const User = require('../models/User');

const initSocketIO = (server) => {

  const allowedOrigins = [
    "https://minorproject-frontend.onrender.com",
    "http://localhost:5177"
  ];

  const io = new Server(server, {
    cors: {
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          console.log("❌ Blocked by CORS:", origin);
          callback(new Error("Not allowed by CORS"));
        }
      },
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on('connection', (socket) => {
    console.log('✅ Client connected:', socket.id);

    // ===============================
    // JOIN ROOM
    // ===============================
    socket.on('join_consultation', (consultationId) => {
      socket.join(consultationId);
      console.log(`Socket ${socket.id} joined consultation ${consultationId}`);
    });

    // ===============================
    // CHAT MESSAGE
    // ===============================
    socket.on('send_message', async (data) => {
      const { consultationId, senderId, text } = data;

      try {
        const message = await Message.create({
          consultationId,
          senderId,
          text
        });

        io.to(consultationId).emit('receive_message', message);

      } catch (err) {
        console.error('❌ Message send error:', err);
      }
    });

    // ===============================
    // WEBRTC CALLING
    // ===============================
    socket.on('call_user', (data) => {
      socket.to(data.userToCall).emit('call_made', {
        offer: data.offer,
        socket: socket.id
      });
    });

    socket.on('make_answer', (data) => {
      socket.to(data.to).emit('answer_made', {
        socket: socket.id,
        answer: data.answer
      });
    });

    socket.on('ice_candidate', (data) => {
      socket.to(data.to).emit('ice_candidate', data.candidate);
    });

    // ===============================
    // DISCONNECT
    // ===============================
    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });

  return io;
};

module.exports = initSocketIO;