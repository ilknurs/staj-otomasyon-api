const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

router.get('/test', (req, res) => {
  res.json({ message: 'Department route çalışıyor' });
});

router.get('/internships/export', verifyToken, authorizeRoles('department'), departmentController.exportInternshipsToExcel);

// Diğer route'lar
router.get('/', verifyToken, authorizeRoles('admin','department'), departmentController.getAllDepartments);
router.get('/:id', verifyToken, authorizeRoles('admin','department','company','supervisor'), departmentController.getDepartment);
router.post('/', verifyToken, authorizeRoles('admin'), departmentController.createDepartment);
router.put('/:id', verifyToken, authorizeRoles('admin','department'), departmentController.updateDepartment);
router.delete('/:id', verifyToken, authorizeRoles('admin'), departmentController.deleteDepartment);

module.exports = router;