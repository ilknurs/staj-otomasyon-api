// src/controllers/authController.js
const asyncHandler = require('express-async-handler');
const userService = require('../services/userService');

exports.register = asyncHandler(async (req, res) => {
  const userData = await userService.register(req.body);
  res.status(201).json({
    success: true,
    user: userData
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // userService.login artık direkt aşağıdaki yapıda dönecek:
  // { _id, name, surname, email, role, token }
  const { 
    _id, 
    name, 
    surname, 
    email: userEmail, 
    role, 
    token 
  } = await userService.login(email, password);

  res.json({
    success: true,
    token,
    user: {
      id:      _id,
      name,
      surname,
      email:   userEmail,
      role
    }
  });
});
