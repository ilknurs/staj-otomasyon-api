// controllers/authController.js
const asyncHandler  = require('express-async-handler');
const userService   = require('../services/userService');

exports.register = asyncHandler(async (req, res) => {
  // body: { name, surname, email, password, role }
  const userData = await userService.register(req.body);
  res.status(201).json({
    success: true,
    user: userData
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log('LOGIN ATTEMPT:', { email, password }); // Debug
  
  const user = await userService.getUserByEmail(email);
  console.log('USER FOUND:', user ? 'YES' : 'NO'); // Debug
  
  if (!user) {
    res.status(401);
    throw new Error('Kullanıcı bulunamadı');
  }
  
  console.log('PASSWORD HASH:', user.passwordHash); // Debug
  const isMatch = await bcrypt.compare(password, user.passwordHash);
  console.log('PASSWORD MATCH:', isMatch); // Debug
  
  if (!isMatch) {
    res.status(401);
    throw new Error('Şifre yanlış');
  }
  });
