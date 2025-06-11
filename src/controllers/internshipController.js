const asyncHandler = require('express-async-handler');
const internshipService = require('../services/internshipService');
const { withInternshipDetails } = require('../utils/populate');

exports.getAllInternships = asyncHandler(async (req, res) => {
  let query = internshipService.getAllInternships();
  query = withInternshipDetails(query);
  const list = await query;
  res.json({ success: true, data: list });
});

exports.getInternship = asyncHandler(async (req, res) => {
  let query = internshipService.getInternshipById(req.params.id);
  query = withInternshipDetails(query);
  const item = await query;
  if (!item) { res.status(404); throw new Error('Staj bulunamadı.'); }
  res.json({ success: true, data: item });
});

exports.createInternship = asyncHandler(async (req, res) => {
  const record = await internshipService.createInternship(req.body);
  res.status(201).json({ success: true, data: record });
});

exports.updateInternship = asyncHandler(async (req, res) => {
  const updated = await internshipService.updateInternship(req.params.id, req.body);
  if (!updated) { res.status(404); throw new Error('Staj bulunamadı.'); }
  res.json({ success: true, data: updated });
});

exports.deleteInternship = asyncHandler(async (req, res) => {
  await internshipService.deleteInternship(req.params.id);
  res.json({ success: true, message: 'Staj silindi.' });
});