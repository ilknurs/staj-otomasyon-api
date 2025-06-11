// src/models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user:                  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tcKimlikNo:            { type: String, required: true, unique: true },
  studentNumber:         { type: String, required: true, unique: true },
  faculty:               { type: String, required: true },
  department:            { type: String, required: true },
  internshipStartDate:   { type: Date, required: true },
  internshipEndDate:     { type: Date, required: true },
  company:               { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  companySupervisor:     { type: String, required: true },
  universitySupervisor:  { type: String, required: true },
  phone:                 { type: String, required: true },
  address: {
    city:     { type: String, required: true },
    district: { type: String, required: true },
    street:   { type: String, required: true }
  },
  emergencyContact: {
    name:  { type: String, required: true },
    phone: { type: String, required: true }
  },
  extraNotes:            { type: String },
  documentTypeCode:      { type: String },
  legalDocNo:            { type: String },
  newUnitCode:           { type: String },
  oldUnitCode:           { type: String },
  companyOrderNo:        { type: String },
  provinceCode:          { type: String },
  subcontractorNo:       { type: String },
  attendanceRecords:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Attendance' }],
  dailyLogs:             [{ type: mongoose.Schema.Types.ObjectId, ref: 'DailyLog' }],
  evaluations:           [{ type: mongoose.Schema.Types.ObjectId, ref: 'Evaluation' }]
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
