// src/models/admin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Ad zorunludur"]
  },
  surname: {
    type: String,
    required: [true, "Soyad zorunludur"]
  },
  email: {
    type: String,
    required: [true, "Email zorunludur"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Şifre zorunludur"]
  },
  role: {
    type: String,
    default: "admin"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Şifre hashleme (save öncesi)
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("Admin", adminSchema);
