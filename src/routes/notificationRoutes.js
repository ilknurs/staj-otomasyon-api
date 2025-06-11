const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

router.get('/', verifyToken, authorizeRoles('student','company','supervisor'), notificationController.getAllNotifications);
router.get('/:id', verifyToken, authorizeRoles('student','company','supervisor'), notificationController.getNotification);
router.post('/', verifyToken, authorizeRoles('company','supervisor'), notificationController.createNotification);
router.put('/:id', verifyToken, authorizeRoles('company','supervisor'), notificationController.updateNotification);
router.delete('/:id', verifyToken, authorizeRoles('company','supervisor'), notificationController.deleteNotification);

module.exports = router;
