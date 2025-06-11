// src/server.js
require('dotenv').config();
const express      = require('express');
const mongoose     = require('mongoose');
const authRoutes   = require('./routes/authRoutes');
const cors    = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',    // React’in çalıştığı adres
  credentials: true,
}));


// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

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
