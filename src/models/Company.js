// src/models/Company.js
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:           { type: String, required: true, unique: true },
  address: {
    city:     { type: String },
    district: { type: String },
    street:   { type: String }
  },
  contactPerson:  { type: String, required: true },
  contactPhone:   { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);

