// controllers/studentController.js
const asyncHandler = require('express-async-handler');
const service = require('../services/studentService');

// ——— Öğrenci rolü self‐service endpoint’leri ——————————————————

// controllers/studentController.js
const asyncHandler = require('express-async-handler');
const service = require('../services/studentService');

// Öğrenci kendi profili
exports.getProfile = asyncHandler(async (req, res) => {
  const profile = await service.getProfile(req.user.id);
  // Bulunamazsa 404 yerine boş obje dön
  res.json({ success: true, data: profile || {} });
});

// Profil güncelle (upsert: yeni oluşturur)
exports.updateProfile = asyncHandler(async (req, res) => {
  const updated = await service.updateProfile(req.user.id, req.body);
  res.json({ success: true, data: updated });
});

// Tercihler
exports.getPreferences = asyncHandler(async (req, res) => {
  const prefs = await service.getPreferences(req.user.id);
  res.json({ success: true, data: prefs });
});

exports.setPreferences = asyncHandler(async (req, res) => {
  const updated = await service.setPreferences(req.user.id, req.body.preferences);
  res.json({ success: true, data: updated });
});

// Dönem başı
exports.getAssignments = asyncHandler(async (req, res) => {
  const assigns = await service.getAssignments(req.user.id);
  res.json({ success: true, data: assigns });
});

exports.updateAssignmentType = asyncHandler(async (req, res) => {
  const updated = await service.updateAssignmentType(req.params.aid, req.body.type);
  res.json({ success: true, data: updated });
});

// Günlük girişleri
exports.getLogs = asyncHandler(async (req, res) => {
  const logs = await service.getLogs(req.params.aid);
  res.json({ success: true, data: logs });
});

exports.addLog = asyncHandler(async (req, res) => {
  const log = await service.addLog(req.params.aid, req.body);
  res.status(201).json({ success: true, data: log });
});

// Devam bilgisi
exports.getAttendance = asyncHandler(async (req, res) => {
  const at = await service.getAttendance(req.user.id);
  res.json({ success: true, data: at });
});

// Dönem sonu not & rapor
exports.getGrades = asyncHandler(async (req, res) => {
  const grades = await service.getGrades(req.user.id);
  res.json({ success: true, data: grades });
});

// ——— Admin & Supervisor CRUD endpoint’leri ——————————————————

exports.getAllStudents = asyncHandler(async (req, res) => {
  const students = await service.getAllStudents();
  res.json({ success: true, data: students });
});

exports.getStudent = asyncHandler(async (req, res) => {
  const student = await service.getStudentById(req.params.id);
  if (!student) { res.status(404); throw new Error('Öğrenci bulunamadı.'); }
  res.json({ success: true, data: student });
});

exports.createStudent = asyncHandler(async (req, res) => {
  const student = await service.createStudent(req.body);
  res.status(201).json({ success: true, data: student });
});

exports.updateStudent = asyncHandler(async (req, res) => {
  const updated = await service.updateStudent(req.params.id, req.body);
  if (!updated) { res.status(404); throw new Error('Öğrenci bulunamadı.'); }
  res.json({ success: true, data: updated });
});

exports.deleteStudent = asyncHandler(async (req, res) => {
  await service.deleteStudent(req.params.id);
  res.json({ success: true, message: 'Öğrenci silindi.' });
});
