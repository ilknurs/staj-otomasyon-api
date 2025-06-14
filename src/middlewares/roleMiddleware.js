// 1. roleMiddleware.js - Rol kontrolü
const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const user = req.user; // JWT middleware'den gelen user
      
      if (!user) {
        return res.status(401).json({ message: 'Kimlik doğrulaması gerekli' });
      }
      
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
      }
      
      next();
    } catch (error) {
      console.error('Role middleware error:', error);
      res.status(500).json({ message: 'Sunucu hatası' });
    }
  };
};

// 2. Token doğrulama endpoint'i - authRoutes.js
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

// 3. Student routes için rol kontrolü - studentRoutes.js
router.use(roleMiddleware(['student'])); // Sadece öğrenciler erişebilir

// Tüm student endpoint'leri
router.get('/info', async (req, res) => {
  // Öğrenci bilgileri
});

router.get('/attendance', async (req, res) => {
  // Devam bilgileri
});

// 4. JWT Middleware kontrol önerisi
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Token bulunamadı' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Geçersiz token' });
  }
};

module.exports = { roleMiddleware, authMiddleware };