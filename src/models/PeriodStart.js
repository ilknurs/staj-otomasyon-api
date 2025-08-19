const mongoose = require('mongoose');

const periodStartSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  date: { type: Date, required: true },
  note: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('PeriodStart', periodStartSchema);
