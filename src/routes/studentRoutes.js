// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const ctl = require('../controllers/studentController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

/**
 * Öğrenci rolü self-service endpoint’leri
 * Prefix: /api/students
 */

// Profil görüntüle ve güncelle




router.get('/profile/:id', verifyToken, async (req, res) => { 
  try {
    const studentId = req.params.id;
    const student = await Student.findById(studentId);
    
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Öğrenci bulunamadı'
      });
    }

    res.json({
      success: true,
      student: student
    });
  } catch (error) {
    console.error('Öğrenci profil hatası:', error);
    res.status(500).json({
      success: false,
      message: 'Sunucu hatası'
    });
  }
});
router.get(
  '/profile',
  verifyToken,
  authorizeRoles('student'),
  ctl.getProfile
);
router.put(
  '/profile',
  verifyToken,
  authorizeRoles('student'),
  ctl.updateProfile
);

// Tercihler getir / ayarla
router.get(
  '/preferences',
  verifyToken,
  authorizeRoles('student'),
  ctl.getPreferences
);
router.post(
  '/preferences',
  verifyToken,
  authorizeRoles('student'),
  ctl.setPreferences
);

// Dönem başı atamalar: listele ve tip güncelle
router.get(
  '/assignments',
  verifyToken,
  authorizeRoles('student'),
  ctl.getAssignments
);
router.patch(
  '/assignments/:aid/type',
  verifyToken,
  authorizeRoles('student'),
  ctl.updateAssignmentType
);

// Günlük günlükler: listele ve ekle
router.get(
  '/assignments/:aid/logs',
  verifyToken,
  authorizeRoles('student'),
  ctl.getLogs
);
router.post(
  '/assignments/:aid/logs',
  verifyToken,
  authorizeRoles('student'),
  ctl.addLog
);

// Devam bilgileri (yalnızca görüntüleme)
router.get(
  '/attendance',
  verifyToken,
  authorizeRoles('student'),
  ctl.getAttendance
);

// Dönem sonu not & rapor (yalnızca görüntüleme)
router.get(
  '/grades',
  verifyToken,
  authorizeRoles('student'),
  ctl.getGrades
);

/**
 * Admin ve Supervisor CRUD endpoint’leri
 */

// Öğrenci listesi (admin, supervisor)
router.get(
  '/',
  verifyToken,
  authorizeRoles('admin','supervisor'),
  ctl.getAllStudents
);

// Öğrenci detay (admin, supervisor, öğrenci kendi profili)
router.get(
  '/:id',
  verifyToken,
  authorizeRoles('admin','supervisor','student'),
  ctl.getStudent
);

// Öğrenci oluşturma (admin)
router.post(
  '/',
  verifyToken,
  authorizeRoles('admin'),
  ctl.createStudent
);

// Öğrenci güncelleme (admin)
router.put(
  '/:id',
  verifyToken,
  authorizeRoles('admin'),
  ctl.updateStudent
);

// Öğrenci silme (admin)
router.delete(
  '/:id',
  verifyToken,
  authorizeRoles('admin'),
  ctl.deleteStudent
);

module.exports = router;
