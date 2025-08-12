// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const StudentController = require('../controllers/studentController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

/**
 * === STUDENT DASHBOARD ROUTES ===

 */

router.get('/test', (req, res) => {
  res.json({ message: 'Student route çalışıyor!' });
});
// Dashboard verileri getir (Authentication yok - test için)
// GET /api/student/dashboard/:studentId
router.get('/dashboard/:studentId', StudentController.getStudentDashboard);

// Tüm öğrenci alanlarını getir (Authentication yok - test için)
// GET /api/student/fields/:studentId
router.get('/fields/:studentId', StudentController.getStudentFields);

// Öğrenci bilgilerini güncelle (Authentication yok - test için)
// PUT /api/student/:studentId
router.put('/:studentId', StudentController.updateStudent);

/**
 * === AUTHENTICATED ROUTES ===
 * Bu route'lar authentication gerektirir
 */

// Öğrenci profil bilgileri - Student kendi profilini görebilir
router.get('/profile', verifyToken, authorizeRoles('student'), async (req, res) => {
  try {
    const userId = req.user.id;
    const studentData = await StudentController.getStudentDashboard({ params: { studentId: userId } }, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Belirli bir öğrencinin detaylarını getirme - Department rolü için
router.get('/detail/:studentId', verifyToken, authorizeRoles('department', 'admin'), async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const studentData = await StudentController.getStudentDashboard({ params: { studentId } }, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Tüm öğrencileri listeleme - Department rolü için
router.get('/list', verifyToken, authorizeRoles('department', 'admin'), StudentController.getStudents);

/**
 * === LEGACY ROUTES (Eski route'lar) ===
 * Gerekirse bunları da kullanabilirsiniz
 */

// Öğrenci detay (admin, supervisor, öğrenci kendi profili)
router.get('/:id', 
  verifyToken,
  authorizeRoles('admin','supervisor','student'),
  async (req, res) => {
    try {
      const studentId = req.params.id;
      const studentData = await StudentController.getStudentDashboard({ params: { studentId } }, res);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

// Öğrenci oluşturma (admin)
router.post('/', 
  verifyToken,
  authorizeRoles('admin'),
  async (req, res) => {
    res.status(501).json({ message: 'Bu özellik henüz implement edilmedi' });
  }
);

// Öğrenci silme (admin)
router.delete('/:id', 
  verifyToken,
  authorizeRoles('admin'),
  StudentController.deleteStudent
);

module.exports = router;