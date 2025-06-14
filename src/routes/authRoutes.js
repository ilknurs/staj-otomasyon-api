// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

console.log('register handler type is:', typeof authController.register);
console.log('login    handler type is:', typeof authController.login);

router.post('/register', authController.register);
router.post('/login', authController.login);

// Token validation endpoint
router.get('/validate', verifyToken, (req, res) => {
  // Eğer middleware'dan geçtiyse token geçerli
  res.status(200).json({
    success: true,
    message: 'Token geçerli',
    user: req.user
  });
});

// Logout endpoint
router.post('/logout', verifyToken, (req, res) => {
  // İsterseniz burada token'ı blacklist'e ekleyebilirsiniz
  res.status(200).json({
    success: true,
    message: 'Başarıyla çıkış yapıldı'
  });
});

module.exports = router;