const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/roleMiddleware');
const AuthController = require('../controllers/authController');

// Login
router.post('/login', AuthController.login);

// Register (öğrenciler)
router.post('/register', AuthController.register);

// Verify (kod girişi)
router.post('/verify', AuthController.verify);

// Admin tarafından kullanıcı oluşturma
router.post('/admin/create-user', authMiddleware(['admin']), AuthController.createByAdmin);


// Token doğrulama
router.get('/validate', authMiddleware, (req, res) => {
  res.json({ valid: true, user: req.user });
});

// Logout
router.post('/logout', authMiddleware, (req, res) => {
  res.json({ message: 'Başarıyla çıkış yapıldı' });
});

module.exports = router;
