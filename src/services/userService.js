// src/services/userService.js
const User   = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

exports.register = async ({ name, surname, email, password, role }) => {
  if (!password) {
    const err = new Error('Password alanı zorunlu');
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

  const user = await User.create({ name, surname, email, role, passwordHash });

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return {
    _id:      user._id,
    name:     user.name,
    surname:  user.surname,
    email:    user.email,
    role:     user.role,
    token     // string
  };
};

exports.login = async (email, password) => {
  const cleanEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: cleanEmail }).select('+passwordHash');

  if (!user) {
    const err = new Error('Geçersiz kimlik bilgileri');
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
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  return {
    _id:      user._id,
    name:     user.name,
    surname:  user.surname,
    email:    user.email,
    role:     user.role,
    token     // string
  };
};
