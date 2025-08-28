// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Admin işlemleri
router.post("/register", adminController.registerAdmin);
router.post("/login", adminController.loginAdmin);
router.get("/", adminController.getAllAdmins);

module.exports = router;
