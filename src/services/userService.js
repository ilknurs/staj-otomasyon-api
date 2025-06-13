// services/userService.js
const User   = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

   return {
    _id: user._id,
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    token               
  };
};

exports.login = async (email, password) => {
  try {
    console.log('LOGIN ATTEMPT:', { email, password });
    
    const cleanEmail = email.toLowerCase().trim();
    console.log('CLEAN EMAIL:', cleanEmail);
    
    const user = await User.findOne({ email: cleanEmail }).select('+passwordHash');
    console.log('USER FOUND:', user ? 'YES' : 'NO');
    
    if (!user) {
      console.log('USER NOT FOUND IN DB');
      const error = new Error('Geçersiz kimlik bilgileri');
      error.status = 401;
      throw error;
    }
    
    console.log('PASSWORD HASH FROM DB:', user.passwordHash);
    
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    console.log('PASSWORD VALID:', isPasswordValid);
    
    if (!isPasswordValid) {
      const error = new Error('Geçersiz kimlik bilgileri');
      error.status = 401;
      throw error;
    }
    
    // ✅ BURADA EKSİK OLAN KISIM - TOKEN OLUŞTUR VE KULLANICI BİLGİLERİNİ DÖNDÜR
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    console.log('TOKEN CREATED:', token);
    
    // Başarılı login response'u döndür
    return {
      success: true,
      _id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      role: user.role,
      token
    };
    
  } catch (error) {
    console.log('LOGIN ERROR:', error.message);
    throw error;
  }
};