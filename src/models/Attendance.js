// src/models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  internshipId: { type: mongoose.Schema.Types.ObjectId, ref: 'InternshipRecord', required: true },
  date:         { type: Date, required: true },
  status:       { type: String, enum: ['present','absent','permitted_absence'], default: 'present' },
  note:         { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
