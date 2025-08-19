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

// Staj onaylarını listele
router.get(
  '/pending-internships',
  verifyToken,
  authorizeRoles('supervisor'),
  supervisorController.getPendingInternships
);



module.exports = router;