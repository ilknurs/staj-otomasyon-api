const asyncHandler = require('express-async-handler');
const userService = require('../services/userService');
const sendMail = require("../config/email");

// Normal öğrenci kaydı
exports.register = asyncHandler(async (req, res) => {
  const userData = await userService.register(req.body);

  // userData içinden mail ve kod al
  const { email, name, verificationCode } = userData;

  // Mail gönder
  await sendMail(
    email,
    "Hesap Doğrulama Kodu",
    `Merhaba ${name}, doğrulama kodunuz: ${verificationCode}`
  );

  res.status(201).json({
    success: true,
    message: "Kayıt başarılı, doğrulama kodu e-posta adresinize gönderildi.",
    user: {
      id: userData._id,
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      role: userData.role
    }
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

// ✅ Admin kullanıcı oluşturma (sadece supervisor, company, department)
exports.createByAdmin = asyncHandler(async (req, res) => {
  const { role } = req.body;

  if (!['supervisor', 'company', 'department'].includes(role)) {
    return res.status(400).json({ success: false, message: "Geçersiz rol" });
  }

  const userData = await userService.createByAdmin(req.body);

  res.status(201).json({
    success: true,
    message: `${role} başarıyla oluşturuldu`,
    user: {
      id: userData._id,
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      role: userData.role
    }
  });
});
