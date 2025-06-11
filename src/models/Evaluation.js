// src/models/Evaluation.js
const mongoose = require('mongoose');

const evaluationSchema = new mongoose.Schema({
  internshipId:  { type: mongoose.Schema.Types.ObjectId, ref: 'InternshipRecord', required: true },
  supervisorId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Supervisor' },
  departmentId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  evaluatorRole: { type: String, enum: ['supervisor','department'], required: true },
  score:         { type: Number, min: 0, max: 100 },
  comments:      { type: String },
  date:          { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Evaluation', evaluationSchema);
