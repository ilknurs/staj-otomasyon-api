const asyncHandler = require('express-async-handler');
const departmentService = require('../services/departmentService');

exports.getAllDepartments = asyncHandler(async (req, res) => {
  const deps = await departmentService.getAllDepartments();
  res.json({ success: true, data: deps });
});

exports.getDepartment = asyncHandler(async (req, res) => {
  const dep = await departmentService.getDepartmentById(req.params.id);
  if (!dep) { res.status(404); throw new Error('Bölüm bulunamadı.'); }
  res.json({ success: true, data: dep });
});

exports.createDepartment = asyncHandler(async (req, res) => {
  const dpt = await departmentService.createDepartment(req.body);
  res.status(201).json({ success: true, data: dpt });
});

exports.updateDepartment = asyncHandler(async (req, res) => {
  const updated = await departmentService.updateDepartment(req.params.id, req.body);
  if (!updated) { res.status(404); throw new Error('Bölüm bulunamadı.'); }
  res.json({ success: true, data: updated });
});

exports.deleteDepartment = asyncHandler(async (req, res) => {
  await departmentService.deleteDepartment(req.params.id);
  res.json({ success: true, message: 'Bölüm silindi.' });
});