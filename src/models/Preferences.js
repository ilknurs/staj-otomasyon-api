const mongoose = require('mongoose');

const preferencesSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  company: { type: String },  // tercih edilen şirket
  field: { type: String }     // tercih edilen alan
}, { timestamps: true });

module.exports = mongoose.model('Preferences', preferencesSchema);
