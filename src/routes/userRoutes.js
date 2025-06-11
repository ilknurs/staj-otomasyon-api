const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

router.get('/:id', verifyToken, authorizeRoles('admin'), userController.getUser);
router.put('/:id', verifyToken, authorizeRoles('admin'), userController.updateUser);
router.delete('/:id', verifyToken, authorizeRoles('admin'), userController.deleteUser);

module.exports = router;