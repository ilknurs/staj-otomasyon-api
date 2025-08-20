const asyncHandler = require('express-async-handler');
const supervisorService = require('../services/supervisorService');
const Student = require('../models/Student');
const Internship = require('../models/InternshipRecord');
const Evaluation = require('../models/Evaluation');
const Report = require('../models/Report');

// --- Supervisor CRUD ---
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

// --- Danışmanın öğrencileri ---
exports.getMyStudents = async (req, res) => {
  try {
    const students = await Student.find({ supervisor: req.user.id });
    res.json({ success: true, data: students });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Sunucu hatası' });
  }
};

// --- Onay bekleyen stajlar ---
exports.getPendingInternships = async (req, res) => {
  try {
    const internships = await Internship.find({
      supervisor: req.user.id,
      status: 'pending'
    }).populate('student', 'name surname email');

    res.json({ success: true, data: internships });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Sunucu hatası' });
  }
};

// --- Öğrenci değerlendirmeleri ---
exports.getEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find({
      supervisor: req.user.id
    }).populate('student', 'name surname email');

    res.json({ success: true, data: evaluations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Sunucu hatası' });
  }
};

exports.updateEvaluation = async (req, res) => {
  try {
    const { id } = req.params;
    const { score } = req.body;

    const evaluation = await Evaluation.findByIdAndUpdate(
      id,
      { score },
      { new: true }
    );

    if (!evaluation) {
      return res.status(404).json({ success: false, message: 'Değerlendirme bulunamadı' });
    }

    res.json({ success: true, data: evaluation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Sunucu hatası' });
  }
};

// --- Staj raporları ---
exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find({
      supervisor: req.user.id
    }).populate('student', 'name surname email');

    res.json({ success: true, data: reports });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Sunucu hatası' });
  }
};

// --- Değerlendirmeler ---
// Danışmanın kendi yaptığı değerlendirmeleri getir
exports.getEvaluations = async (req, res) => {
  try {
    const evaluations = await Evaluation.find({
      supervisorId: req.user.id,
      evaluatorRole: 'supervisor'
    }).populate({
      path: 'internshipId',
      populate: { path: 'student', select: 'name surname email' }
    });

    res.json({ success: true, data: evaluations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Değerlendirmeler alınamadı' });
  }
};

// Danışman değerlendirmesini güncelle veya ekle
exports.updateEvaluation = async (req, res) => {
  try {
    const { id } = req.params; // internshipId
    const { score, comments } = req.body;

    // Var mı diye kontrol et
    let evaluation = await Evaluation.findOne({
      internshipId: id,
      supervisorId: req.user.id,
      evaluatorRole: 'supervisor'
    });

    if (evaluation) {
      evaluation.score = score;
      evaluation.comments = comments;
      await evaluation.save();
    } else {
      evaluation = await Evaluation.create({
        internshipId: id,
        supervisorId: req.user.id,
        evaluatorRole: 'supervisor',
        score,
        comments
      });
    }

    res.json({ success: true, data: evaluation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Değerlendirme güncellenemedi' });
  }
};