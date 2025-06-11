// src/models/Department.js
const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  departmentName: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
