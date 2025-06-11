const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

router.get('/', verifyToken, authorizeRoles('admin','company'), companyController.getAllCompanies);
router.get('/:id', verifyToken, authorizeRoles('admin','company'), companyController.getCompany);
router.post('/', verifyToken, authorizeRoles('admin'), companyController.createCompany);
router.put('/:id', verifyToken, authorizeRoles('admin'), companyController.updateCompany);
router.delete('/:id', verifyToken, authorizeRoles('admin'), companyController.deleteCompany);

module.exports = router;