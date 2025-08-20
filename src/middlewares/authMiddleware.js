// src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Student = require('../models/Student');

// Basit kimlik doğrulama
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token gerekli' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Geçersiz token' });
  }
};

// Token doğrulama + ekstra kontrol
exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token bulunamadı.' });
  }
  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId   = decoded.userId;
    req.userRole = decoded.role;

    // 🔹 Kullanıcıyı DB’den çekiyoruz
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(401).json({ message: 'Kullanıcı bulunamadı.' });
    }

    // 🔹 Mezun öğrenciler giriş yapamasın
    if (user.role === "student" && user.isGraduated) {
      return res.status(403).json({ message: "Mezun öğrenciler giriş yapamaz" });
    }

    // 🔹 Staj tarihleri dışında giriş yapamasın
    if (user.role === "student") {
      const student = await Student.findOne({ user: user._id });
      if (student) {
        const now = new Date();
        if (student.internshipStartDate && student.internshipEndDate) {
          if (now < student.internshipStartDate || now > student.internshipEndDate) {
            return res.status(403).json({ message: "Staj tarihleriniz dışında giriş yapamazsınız" });
          }
        }
        if (!student.isActive) {
          return res.status(403).json({ message: "Öğrenci hesabınız pasif durumda" });
        }
      }
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Geçersiz token.' });
  }
};
