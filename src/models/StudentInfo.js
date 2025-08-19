const mongoose = require('mongoose');

const studentInfoSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  address: { type: String },
  phone: { type: String },
  emergencyContact: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('StudentInfo', studentInfoSchema);
