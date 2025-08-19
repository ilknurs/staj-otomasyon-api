// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');


const PeriodStart = require("../models/PeriodStart");
const EndPeriod = require("../models/EndPeriod");
const Preferences = require("../models/Preferences");
const StudentInfo = require("../models/StudentInfo");




// === PERIOD START ===
// Öğrenci kendi staj başlangıcını ekler
router.post("/period-start", verifyToken, authorizeRoles("student"), async (req, res) => {
  try {
    const record = new PeriodStart({
      student: req.user.id,
      date: req.body.date,
      note: req.body.note,
    });
    await record.save();
    res.status(201).json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// === END PERIOD ===
router.post("/end-period", verifyToken, authorizeRoles("student"), async (req, res) => {
  try {
    const record = new EndPeriod({
      student: req.user.id,
      date: req.body.date,
      summary: req.body.summary,
    });
    await record.save();
    res.status(201).json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// === PREFERENCES ===
router.post("/preferences", verifyToken, authorizeRoles("student"), async (req, res) => {
  try {
    const record = new Preferences({
      student: req.user.id,
      company: req.body.company,
      field: req.body.field,
    });
    await record.save();
    res.status(201).json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// === STUDENT INFO ===
router.post("/info", verifyToken, authorizeRoles("student"), async (req, res) => {
  try {
    const record = new StudentInfo({
      student: req.user.id,
      address: req.body.address,
      phone: req.body.phone,
      emergencyContact: req.body.emergencyContact,
    });
    await record.save();
    res.status(201).json({ success: true, data: record });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});



/**
 * === STUDENT DASHBOARD ROUTES ===
 */

// Test
router.get('/test', (req, res) => {
  res.json({ message: 'Student route çalışıyor!' });
});

// Dashboard verileri (Sadece öğrenci kendi dashboard’unu görebilir)
router.get(
  '/dashboard/:studentId',
  verifyToken,
  authorizeRoles('student'),
  StudentController.getStudentDashboard
);

// Öğrenci kendi profilini görmek için (kendi id’sini JWT’den alıyoruz)
router.get(
  '/profile',
  verifyToken,
  authorizeRoles('student'),
  StudentController.getOwnProfile
);

// Belirli bir öğrencinin detaylarını getirme - department, admin, supervisor erişebilir
router.get(
  '/detail/:studentId',
  verifyToken,
  authorizeRoles('department', 'admin', 'supervisor'),
  StudentController.getStudentDashboard
);

// Öğrenci bilgilerini güncelleme (öğrenci kendi bilgilerini güncelleyebilir)
router.put(
  '/:studentId',
  verifyToken,
  authorizeRoles('student'),
  StudentController.updateStudent
);

// Tüm öğrencileri listeleme - sadece department ve admin
router.get(
  '/list',
  verifyToken,
  authorizeRoles('department', 'admin'),
  StudentController.getStudents
);

// Öğrenci silme (admin)
router.delete(
  '/:studentId',
  verifyToken,
  authorizeRoles('admin'),
  StudentController.deleteStudent
);

module.exports = router;
