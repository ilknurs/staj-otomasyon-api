const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

router.get('/', verifyToken, authorizeRoles('supervisor'), evaluationController.getAllEvaluations);
router.get('/:id', verifyToken, authorizeRoles('supervisor','company','student'), evaluationController.getEvaluation);
router.post('/', verifyToken, authorizeRoles('supervisor'), evaluationController.createEvaluation);
router.put('/:id', verifyToken, authorizeRoles('supervisor'), evaluationController.updateEvaluation);
router.delete('/:id', verifyToken, authorizeRoles('supervisor'), evaluationController.deleteEvaluation);

module.exports = router;