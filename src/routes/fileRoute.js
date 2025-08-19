const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const fileController = require("../controllers/fileController");
const { protect } = require("../middleware/authMiddleware"); // auth middleware

// Çoklu dosya yükleme
router.post("/upload", protect, upload.array("files", 5), fileController.uploadFiles);

// Öğrencinin dosyalarını listeleme
router.get("/my-files", protect, fileController.getStudentFiles);

module.exports = router;
