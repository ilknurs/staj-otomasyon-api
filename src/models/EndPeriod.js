const mongoose = require('mongoose');

const endPeriodSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  date: { type: Date, required: true },
  summary: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('EndPeriod', endPeriodSchema);
