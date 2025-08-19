const FileUpload = require("../models/FileUpload");

// Dosya yükleme
exports.uploadFiles = async (req, res) => {
  try {
    const studentId = req.user.id; // Auth middleware'den gelen öğrenci id

    const filesData = req.files.map(file => ({
      studentId,
      fileName: file.originalname,
      filePath: file.path,
      fileType: file.mimetype,
      fileSize: file.size
    }));

    const savedFiles = await FileUpload.insertMany(filesData);

    res.status(201).json({ success: true, files: savedFiles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Dosya yüklenemedi" });
  }
};

// Öğrenciye ait dosyaları listele
exports.getStudentFiles = async (req, res) => {
  try {
    const studentId = req.user.id;
    const files = await FileUpload.find({ studentId });
    res.json({ success: true, files });
  } catch (error) {
    res.status(500).json({ success: false, message: "Dosyalar getirilemedi" });
  }
};
