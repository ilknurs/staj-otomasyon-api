// src/models/InternshipRecord.js
const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  studentId:         { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  companyId:         { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  startDate:         { type: Date, required: true },
  endDate:           { type: Date, required: true },
  status:            { type: String, enum: ['ongoing','completed','cancelled'], default: 'ongoing' },
  evaluationScore:   { type: Number, min: 0, max: 100 },
  evaluationNotes:   { type: String },
  attendanceRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }],
  dailyLogs:         [{ type: mongoose.Schema.Types.ObjectId, ref: 'DailyLog' }],
  evaluations:       [{ type: mongoose.Schema.Types.ObjectId, ref: 'Evaluation' }]
}, { timestamps: true });

module.exports = mongoose.model('InternshipRecord', internshipSchema);
