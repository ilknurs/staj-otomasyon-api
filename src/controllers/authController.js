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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔍 LOGIN REQUEST:', { email, password });
    
    const result = await userService.login(email, password);
    console.log('✅ LOGIN SUCCESS:', result);
    
    res.json(result);
  } catch (error) {
    console.log('❌ LOGIN ERROR:', error.message);
    res.status(error.status || 500).json({
      success: false,
      message: error.message
    });
  }
};