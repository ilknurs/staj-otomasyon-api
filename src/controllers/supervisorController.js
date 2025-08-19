const asyncHandler = require('express-async-handler');
const supervisorService = require('../services/supervisorService');

exports.getAllSupervisors = asyncHandler(async (req, res) => {
  const sups = await supervisorService.getAllSupervisors();
  res.json({ success: true, data: sups });
});

exports.getSupervisor = asyncHandler(async (req, res) => {
  const sup = await supervisorService.getSupervisorById(req.params.id);
  if (!sup) { res.status(404); throw new Error('Danışman bulunamadı.'); }
  res.json({ success: true, data: sup });
});

exports.createSupervisor = asyncHandler(async (req, res) => {
  const sup = await supervisorService.createSupervisor(req.body);
  res.status(201).json({ success: true, data: sup });
});

exports.updateSupervisor = asyncHandler(async (req, res) => {
  const updated = await supervisorService.updateSupervisor(req.params.id, req.body);
  if (!updated) { res.status(404); throw new Error('Danışman bulunamadı.'); }
  res.json({ success: true, data: updated });
});

exports.deleteSupervisor = asyncHandler(async (req, res) => {
  await supervisorService.deleteSupervisor(req.params.id);
  res.json({ success: true, message: 'Danışman silindi.' });
});

const Student = require('../models/Student');

// Danışmanın öğrencilerini getir
exports.getMyStudents = async (req, res) => {
  try {
    // req.user.id = giriş yapan supervisor id'si
    const students = await Student.find({ supervisor: req.user.id });

    res.json({
      success: true,
      data: students
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Sunucu hatası' });
  }
};

const Internship = require('../models/InternshipRecord');

// Danışmanın onaylaması gereken staj başvurularını getir
exports.getPendingInternships = async (req, res) => {
  try {
    // Danışmana atanmış ve henüz onaylanmamış başvurular
    const internships = await Internship.find({
      supervisor: req.user.id,
      status: 'pending'
    }).populate('student', 'name surname email');

    res.json({
      success: true,
      data: internships
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Sunucu hatası' });
  }
};
