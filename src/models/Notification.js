// src/models/Notification.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  studentId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  date:           { type: Date, default: Date.now },
  subject:        { type: String, required: true },
  message:        { type: String, required: true },
  filePath:       { type: String },
  status:         { type: String, enum: ['pending','read','closed'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
