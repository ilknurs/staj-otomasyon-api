// services/userService.js
const User   = require('../models/User');
const bcrypt = require('bcryptjs');

exports.register = async ({ name, surname, email, password, role }) => {

  if (!password) {
    const err = new Error('Password alanı zorunlu');
    err.status = 400;
    throw err;
  }



  // 1) Aynı email var mı?
  const exists = await User.findOne({ email });
  if (exists) {
    const err = new Error('Bu email zaten kayıtlı');
    err.status = 400;
    throw err;
  }

  // 2) Şifreyi hash'le
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // 3) Kullanıcıyı oluştur
  const user = await User.create({
    name,
    surname,
    email,
    role,
    passwordHash
  });

  // 4) Döndürülecek basit obje
  return {
    _id: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role
  };
};

exports.login = async (email, password) => {
  // 1) Email ile çek (+passwordHash)
  const user = await User.findOne({ email }).select('+passwordHash');
  if (!user) {
    const err = new Error('Geçersiz kimlik bilgileri');
    err.status = 401;
    throw err;
  }

  // 2) Şifre karşılaştır
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    const err = new Error('Geçersiz kimlik bilgileri');
    err.status = 401;
    throw err;
  }

  // 3) Token üret
  const jwt = require('jsonwebtoken');
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // 4) Döndürülecek obje
  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role
    }
  };
};
