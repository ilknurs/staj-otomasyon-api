exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({ message: 'Bu işlemi yapmaya yetkiniz yok.' });
    }
    next();
  };
};
