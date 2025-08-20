const express = require('express');
const router = express.Router();
const supervisorController = require('../controllers/supervisorController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

router.get('/', verifyToken, authorizeRoles('admin','company'), supervisorController.getAllSupervisors);
router.get('/:id', verifyToken, authorizeRoles('admin','company','supervisor'), supervisorController.getSupervisor);
router.post('/', verifyToken, authorizeRoles('admin','company'), supervisorController.createSupervisor);
router.put('/:id', verifyToken, authorizeRoles('admin','company'), supervisorController.updateSupervisor);
router.delete('/:id', verifyToken, authorizeRoles('admin'), supervisorController.deleteSupervisor);

// Danışman kendi öğrencilerini görsün
router.get(
  '/my-students',
  verifyToken,
  authorizeRoles('supervisor'),
  supervisorController.getMyStudents
);

// Onay bekleyen staj başvuruları
router.get(
  '/pending-internships',
  verifyToken,
  authorizeRoles('supervisor'),
  supervisorController.getPendingInternships
);

// ✅ Öğrenci değerlendirmeleri
router.get(
  '/evaluations',
  verifyToken,
  authorizeRoles('supervisor'),
  supervisorController.getEvaluations
);

router.patch(
  '/evaluations/:id',
  verifyToken,
  authorizeRoles('supervisor'),
  supervisorController.updateEvaluation
);

// ✅ Raporlar
router.get(
  '/reports',
  verifyToken,
  authorizeRoles('supervisor'),
  supervisorController.getReports
);
module.exports = router;