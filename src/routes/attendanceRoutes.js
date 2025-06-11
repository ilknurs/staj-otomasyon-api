const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

router.get('/', verifyToken, authorizeRoles('company'), attendanceController.getAllAttendances);
router.get('/:id', verifyToken, authorizeRoles('company','student'), attendanceController.getAttendanceById);
router.post('/', verifyToken, authorizeRoles('company'), attendanceController.createAttendance);
router.put('/:id', verifyToken, authorizeRoles('company'), attendanceController.updateAttendance);
router.delete('/:id', verifyToken, authorizeRoles('company'), attendanceController.deleteAttendance);

module.exports = router;