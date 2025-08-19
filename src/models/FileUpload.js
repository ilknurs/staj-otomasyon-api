const mongoose = require("mongoose");

const fileUploadSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  fileType: { type: String },
  fileSize: { type: Number },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("FileUpload", fileUploadSchema);
