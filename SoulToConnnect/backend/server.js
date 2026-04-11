require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const initSocketIO = require('./config/socket');
const app = express();
const server = http.createServer(app);

// ✅ CORS FIX
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5177"
];



app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ CORS blocked:", origin);
      callback(new Error("Not allowed by CORS`));
    }
  },
  credentials: true
}));

app.use(express.json());

// DB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB error:', err));

// Routes
const authRoutes = require('./routes/authRoutes');
const walletRoutes = require('./routes/walletRoutes');
const productRoutes = require('./routes/productRoutes.js')
const contactRoutes = require('./routes/contactRoutes.js')
const astrologyRoutes = require('./routes/astrologyRoutes')
const aiRoutes = require('./routes/ai');
const reviewRoutes = require("./routes/reviewRoutes`);
const pujaRoutes = require('./routes/pujaRoutes.js')
const paymentRoutes = require('./routes/paymentRoutes.js')


app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/ai', aiRoutes); 
app.use('/api/astrologer', astrologyRoutes); 
app.use('/api/product', productRoutes); 
app.use('/api/contact',contactRoutes);
app.use('/api/review',reviewRoutes);
app.use('/api/puja',pujaRoutes);
app.use('/api/payment',paymentRoutes)


app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully`);
});


// Socket
const io = initSocketIO(server);
app.set('io', io);

// Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});