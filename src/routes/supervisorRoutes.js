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

module.exports = router;