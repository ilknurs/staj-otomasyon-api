// src/middlewares/roleMiddleware.js
// Rol kontrolü middleware'i
const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    const role = req.userRole || (req.user && req.user.role);

    if (!role) {
      return res.status(401).json({ message: 'Kimlik doğrulaması gerekli' });
    }
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Yetkiniz yok' });
    }
    next();
  };
};

// JWT doğrulama middleware'i
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

// Rol yetkilendirme middleware'i
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

// Token doğrulama middleware'i (yalın versiyon)
const verifyToken = (req, res, next) => {
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

module.exports = { 
  roleMiddleware, 
  authMiddleware, 
  authorizeRoles, 
  verifyToken 
};
