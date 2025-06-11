const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

router.get('/', verifyToken, authorizeRoles('admin','supervisor'), studentController.getAllStudents);
router.get('/:id', verifyToken, authorizeRoles('admin','supervisor','student'), studentController.getStudent);
router.post('/', verifyToken, authorizeRoles('admin'), studentController.createStudent);
router.put('/:id', verifyToken, authorizeRoles('admin'), studentController.updateStudent);
router.delete('/:id', verifyToken, authorizeRoles('admin'), studentController.deleteStudent);

module.exports = router;
