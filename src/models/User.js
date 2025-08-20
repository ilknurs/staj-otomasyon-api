// src/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  surname:      { type: String, required: true },
  email: { 
  type: String, 
  required: true, 
  unique: true,
  lowercase: true,  
  trim: true,
  validate: {
    validator: function(v) {
      return v.toLowerCase().endsWith('@firat.edu.tr');
    },
    message: props => `${props.value} geçerli bir üniversite maili değil!`
  }
},

  passwordHash: { type: String, required: true },
  role:         { type: String, enum: ['admin','student','company','supervisor','department'], default: 'student' },
  isGraduated:  { type: Boolean, default: false }, // Mezuniyet kontrolü
  createdAt:    { type: Date, default: Date.now }
});

// Parola kontrolü
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

module.exports = mongoose.model('User', UserSchema);
