const InternshipRecord = require('../models/InternshipRecord');
async function createInternship(data) { return await InternshipRecord.create(data); }
async function getAllInternships() { return await InternshipRecord.find(); }
async function getInternshipById(id) { return await InternshipRecord.findById(id); }
async function updateInternship(id, data) { return await InternshipRecord.findByIdAndUpdate(id, data, { new: true }); }
async function deleteInternship(id) { return await InternshipRecord.findByIdAndDelete(id); }
module.exports = { createInternship, getAllInternships, getInternshipById, updateInternship, deleteInternship };
