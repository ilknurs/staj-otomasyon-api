const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

// Admin tarafından supervisor/company/department oluşturma
router.post(
  '/create-by-admin',
  verifyToken,
  authorizeRoles('admin'),
  authController.createByAdmin
);

// Admin CRUD işlemleri
router.get('/:id', verifyToken, authorizeRoles('admin'), userController.getUser);
router.put('/:id', verifyToken, authorizeRoles('admin'), userController.updateUser);
router.delete('/:id', verifyToken, authorizeRoles('admin'), userController.deleteUser);

module.exports = router;
