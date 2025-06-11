// src/models/Supervisor.js
const mongoose = require('mongoose');

const supervisorSchema = new mongoose.Schema({
  user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tcKimlikNo:   { type: String, required: true, unique: true },
  phone:        { type: String, required: true },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Supervisor', supervisorSchema);
