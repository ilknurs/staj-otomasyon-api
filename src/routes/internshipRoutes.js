const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internshipController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');


router.get('/export', verifyToken, authorizeRoles('company','student'), internshipController.exportToExcel);
router.get('/', verifyToken, authorizeRoles('company','student'), internshipController.getAllInternships);
router.get('/:id', verifyToken, authorizeRoles('company','student'), internshipController.getInternship);
router.post('/', verifyToken, authorizeRoles('company','student'), internshipController.createInternship);
router.put('/:id', verifyToken, authorizeRoles('company'), internshipController.updateInternship);
router.delete('/:id', verifyToken, authorizeRoles('company'), internshipController.deleteInternship);

module.exports = router;
