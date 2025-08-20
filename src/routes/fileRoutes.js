const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload"); 
const FileUpload = require("../models/FileUpload");

const { verifyToken } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");

// ✅ Sadece öğrenciler dosya yükleyebilsin
router.post(
  "/upload", 
  verifyToken, 
  authorizeRoles("student"), 
  upload.single("file"), 
  async (req, res) => {
    try {
      const file = new FileUpload({
        studentId: req.userId, // Token’den gelen kullanıcı ID
        fileName: req.file.filename,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: req.file.size
      });

      await file.save();
      res.status(201).json({ message: "Dosya başarıyla yüklendi", file });
    } catch (err) {
      res.status(500).json({ message: "Dosya yüklenemedi", error: err.message });
    }
  }
);

// ✅ Öğrenciler kendi dosyalarını görebilsin
router.get(
  "/my-files", 
  verifyToken, 
  authorizeRoles("student"), 
  async (req, res) => {
    try {
      const files = await FileUpload.find({ studentId: req.userId });
      res.json(files);
    } catch (err) {
      res.status(500).json({ message: "Dosyalar alınamadı", error: err.message });
    }
  }
);

module.exports = router;
