const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
  isGraduated:  { type: Boolean, default: false },
  verificationCode: { type: String },
  isVerified:   { type: Boolean, default: false },
  createdAt:    { type: Date, default: Date.now }
});


userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
