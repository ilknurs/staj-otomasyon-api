const asyncHandler = require('express-async-handler');
const attendanceService = require('../services/attendanceService');
const { withInternshipDetails } = require('../utils/populate');

// GET /api/attendances
exports.getAllAttendances = asyncHandler(async (req, res) => {
  let query = attendanceService.getAllAttendances();
  query = withInternshipDetails(query);
  const attendances = await query;
  res.json({ success: true, data: attendances });
});

// GET /api/attendances/:id
exports.getAttendanceById = asyncHandler(async (req, res) => {
  let query = attendanceService.getAttendanceById(req.params.id);
  query = withInternshipDetails(query);
  const attendance = await query;
  if (!attendance) {
    res.status(404);
    throw new Error('Katılım bulunamadı.');
  }
  res.json({ success: true, data: attendance });
});

// POST /api/attendances
exports.createAttendance = asyncHandler(async (req, res) => {
  const newAttendance = await attendanceService.createAttendance(req.body);
  res.status(201).json({ success: true, data: newAttendance });
});

// PUT /api/attendances/:id
exports.updateAttendance = asyncHandler(async (req, res) => {
  const updated = await attendanceService.updateAttendance(req.params.id, req.body);
  if (!updated) {
    res.status(404);
    throw new Error('Katılım bulunamadı.');
  }
  res.json({ success: true, data: updated });
});

// DELETE /api/attendances/:id
exports.deleteAttendance = asyncHandler(async (req, res) => {
  const deleted = await attendanceService.deleteAttendance(req.params.id);
  if (!deleted) {
    res.status(404);
    throw new Error('Katılım bulunamadı.');
  }
  res.json({ success: true, message: 'Katılım silindi.' });
});
