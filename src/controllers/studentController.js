const asyncHandler = require('express-async-handler');
const studentService = require('../services/studentService');

exports.getAllStudents = asyncHandler(async (req, res) => {
  const students = await studentService.getAllStudents();
  res.json({ success: true, data: students });
});

exports.getStudent = asyncHandler(async (req, res) => {
  const student = await studentService.getStudentById(req.params.id);
  if (!student) { res.status(404); throw new Error('Öğrenci bulunamadı.'); }
  res.json({ success: true, data: student });
});

exports.createStudent = asyncHandler(async (req, res) => {
  const student = await studentService.createStudent(req.body);
  res.status(201).json({ success: true, data: student });
});

exports.updateStudent = asyncHandler(async (req, res) => {
  const updated = await studentService.updateStudent(req.params.id, req.body);
  if (!updated) { res.status(404); throw new Error('Öğrenci bulunamadı.'); }
  res.json({ success: true, data: updated });
});

exports.deleteStudent = asyncHandler(async (req, res) => {
  await studentService.deleteStudent(req.params.id);
  res.json({ success: true, message: 'Öğrenci silindi.' });
});
