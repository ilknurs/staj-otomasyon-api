// src/models/DailyLog.js
const mongoose = require('mongoose');

const dailyLogSchema = new mongoose.Schema({
  internshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'InternshipRecord', required: true },
  date:         { type: Date, required: true },
  description:  { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('DailyLog', dailyLogSchema);
