require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const supervisorRoutes = require('./routes/supervisorRoutes'); // ✅ ekle

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'https://staj-otomasyon-frontend.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy hatası: İzin verilmeyen origin'));
    }
  },
  credentials: true,
}));

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/supervisor', supervisorRoutes); // ✅ bunu ekle

// Hata yakalama middleware’leri vs.
// ...

// MongoDB’ye bağlan ve çalıştır
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB bağlı');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Sunucu çalışıyor: http://localhost:${process.env.PORT || 5000}`);
    });
  })
  .catch(err => console.error(err));
