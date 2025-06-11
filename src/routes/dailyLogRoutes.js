const express = require('express');
const router = express.Router();
const dailyLogController = require('../controllers/dailyLogController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

router.get('/', verifyToken, authorizeRoles('company','student'), dailyLogController.getAllDailyLogs);
router.get('/:id', verifyToken, authorizeRoles('company','student'), dailyLogController.getDailyLog);
router.post('/', verifyToken, authorizeRoles('student'), dailyLogController.createDailyLog);
router.put('/:id', verifyToken, authorizeRoles('student'), dailyLogController.updateDailyLog);
router.delete('/:id', verifyToken, authorizeRoles('student'), dailyLogController.deleteDailyLog);

module.exports = router;
