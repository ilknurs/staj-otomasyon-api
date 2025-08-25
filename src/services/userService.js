const User   = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

// --------------------
// 1. Öğrenci Kaydı
// --------------------
exports.register = async ({ name, surname, email, password }) => {
  if (!password) {
    const err = new Error('Şifre alanı zorunlu');
    err.statusCode = 400;
    throw err;
  }

  // Aynı email var mı kontrol et
  const exists = await User.findOne({ email });
  if (exists) {
    const err = new Error('Bu email zaten kayıtlı');
    err.statusCode = 400;
    throw err;
  }

  // Şifre hashle
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Kullanıcı oluştur (student default)
  const user = await User.create({
    name,
    surname,
    email,
    passwordHash,
    role: "student",
    isVerified: false
  });

  // Doğrulama kodu üret
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  user.verificationCode = code;
  await user.save();

  // Şimdilik sadece log atalım (mail servisi eklenebilir)
  console.log(`📧 ${email} için doğrulama kodu: ${code}`);

  return {
    _id:   user._id,
    name:  user.name,
    surname: user.surname,
    email: user.email,
    role:  user.role,
    message: "Mailinize doğrulama kodu gönderildi"
  };
};

// --------------------
// 2. Kullanıcı Doğrulama
// --------------------
exports.verifyUser = async (email, code) => {
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error('Kullanıcı bulunamadı');
    err.statusCode = 404;
    throw err;
  }

  if (user.verificationCode !== code) {
    return false; // Kod hatalı
  }

  // Kod doğru → hesabı doğrula
  user.isVerified = true;
  user.verificationCode = null;
  await user.save();

  return true;
};

// --------------------
// 3. Login
// --------------------
exports.login = async (email, password) => {
  const cleanEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: cleanEmail }).select('+passwordHash');

  if (!user) {
    const err = new Error('Geçersiz kimlik bilgileri');
    err.statusCode = 401;
    throw err;
  }

  if (!user.isVerified) {
    const err = new Error('Hesap doğrulanmamış. Lütfen mailinizi kontrol edin.');
    err.statusCode = 401;
    throw err;
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    const err = new Error('Geçersiz kimlik bilgileri');
    err.statusCode = 401;
    throw err;
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return {
    _id:      user._id,
    name:     user.name,
    surname:  user.surname,
    email:    user.email,
    role:     user.role,
    token
  };
};

// --------------------
// 4. Admin Kullanıcı Oluşturma
// --------------------
exports.createByAdmin = async ({ name, surname, email, password, role }) => {
  if (!["supervisor", "department", "company"].includes(role)) {
    const err = new Error("Geçersiz rol");
    err.statusCode = 400;
    throw err;
  }

  const exists = await User.findOne({ email });
  if (exists) {
    const err = new Error('Bu email zaten kayıtlı');
    err.statusCode = 400;
    throw err;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    surname,
    email,
    passwordHash,
    role,
    isVerified: true // admin eklediği için mail doğrulama gerekmez
  });

  return {
    _id:   user._id,
    name:  user.name,
    surname: user.surname,
    email: user.email,
    role:  user.role,
    message: "Admin tarafından kullanıcı oluşturuldu"
  };
};
