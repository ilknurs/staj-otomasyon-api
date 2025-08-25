const asyncHandler = require('express-async-handler');
const userService = require('../services/userService');

// Normal öğrenci kaydı
exports.register = asyncHandler(async (req, res) => {
  const userData = await userService.register(req.body);
  res.status(201).json({
    success: true,
    user: userData
  });
});

// Doğrulama kodu kontrolü
exports.verify = asyncHandler(async (req, res) => {
  const { email, code } = req.body;
  const result = await userService.verifyUser(email, code);
  if (!result) {
    return res.status(400).json({ success: false, message: "Kod hatalı" });
  }
  res.json({ success: true, message: "Hesabınız doğrulandı" });
});


// Login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { _id, name, surname, email: userEmail, role, token } = await userService.login(email, password);

  res.json({
    success: true,
    token,
    user: { id: _id, name, surname, email: userEmail, role }
  });
});

// Admin kullanıcı oluşturma
exports.createByAdmin = asyncHandler(async (req, res) => {
  const userData = await userService.createByAdmin(req.body);
  res.status(201).json({
    success: true,
    user: userData
  });
});
