// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/roleMiddleware');
const AuthController = require('../controllers/authController');

// Login endpoint'i
router.post('/login', AuthController.login);

// Register endpoint'i
router.post('/register', AuthController.register);

// Token doğrulama endpoint'i
router.get('/validate', authMiddleware, (req, res) => {
  try {
    // Eğer middleware'den geçtiyse token geçerli
    res.json({ 
      valid: true, 
      user: req.user 
    });
  } catch (error) {
    res.status(401).json({ 
      valid: false, 
      message: 'Token geçersiz' 
    });
  }
});

// Logout endpoint'i
router.post('/logout', authMiddleware, (req, res) => {
  try {
    res.json({ 
      message: 'Başarıyla çıkış yapıldı' 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Çıkış yapılırken hata oluştu' 
    });
  }
});

module.exports = router;