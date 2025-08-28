// controllers/adminController.js
const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// JWT oluşturucu
const generateToken = (id) => {
  return jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Admin kaydı (sadece 1 tane olabilir)
exports.registerAdmin = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;

    // Zaten admin var mı kontrol et
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(403).json({ message: "Zaten bir admin mevcut. Yeni admin oluşturulamaz." });
    }

    const admin = await Admin.create({ name, surname, email, password });
    res.status(201).json({
      message: "Admin başarıyla oluşturuldu",
      token: generateToken(admin._id),
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// Admin girişi
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Geçersiz email" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Geçersiz şifre" });
    }

    res.json({
      message: "Giriş başarılı",
      token: generateToken(admin._id),
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};

// Tüm adminleri listele (tek kişi olacak ama yedek için kalsın)
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
};
