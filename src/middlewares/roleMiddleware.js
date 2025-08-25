// src/middlewares/roleMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Header'dan token çek
const getTokenFromHeaders = (req) => {
  if (!req || !req.headers) return null;
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader) return null;
  return authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
};

// Token doğrulama + opsiyonel rol kontrolü
const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = getTokenFromHeaders(req);
      if (!token) {
        return res.status(401).json({ message: 'Token bulunamadı' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(401).json({ message: 'Kullanıcı bulunamadı' });
      }

      // Eğer rol kısıtlaması varsa
      if (roles.length > 0 && !roles.includes(user.role)) {
        return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401).json({ message: 'Geçersiz veya süresi dolmuş token' });
    }
  };
};

// Daha sade bir rol kontrol middleware'i
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(401).json({ message: 'Kimlik doğrulaması gerekli' });
    }

    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    next();
  };
};

// Yalın token doğrulama (rol kontrolsüz)
const verifyToken = (req, res, next) => {
  try {
    const token = getTokenFromHeaders(req);
    if (!token) {
      return res.status(401).json({ message: 'Token bulunamadı' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Geçersiz veya süresi dolmuş token' });
  }
};

module.exports = {
  authMiddleware,
  authorizeRoles,
  verifyToken,
};
