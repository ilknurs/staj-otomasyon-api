// routes/authRoutes.js
const express        = require('express');
const router         = express.Router();
const authController = require('../controllers/authController');

console.log('register handler type is:', typeof authController.register);  // → "function"
console.log('login    handler type is:', typeof authController.login);     // → "function"

router.post('/register', authController.register);
router.post('/login',    authController.login);

module.exports = router;
