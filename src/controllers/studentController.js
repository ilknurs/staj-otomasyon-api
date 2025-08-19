// controllers/studentController.js
const StudentService = require('../services/studentService');

class StudentController {
  // Dashboard verileri - GET /api/student/dashboard/:studentId
  static async getStudentDashboard(req, res) {
    try {
      const { studentId } = req.params;

      if (!studentId) {
        return res.status(400).json({ error: 'Geçersiz öğrenci ID' });
      }

      const dashboardData = await StudentService.getStudentDashboardData(studentId);

      if (!dashboardData) {
        return res.status(404).json({ error: 'Öğrenci bulunamadı' });
      }

      res.status(200).json({
        success: true,
        data: dashboardData
      });
    } catch (error) {
      console.error('Student Dashboard Error:', error);
      res.status(500).json({
        success: false,
        error: 'Sunucu hatası',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Kendi profilini görme - GET /api/student/profile
  static async getOwnProfile(req, res) {
    try {
      const studentId = req.user.id; // JWT’den geliyor
      const dashboardData = await StudentService.getStudentDashboardData(studentId);

      if (!dashboardData) {
        return res.status(404).json({ error: 'Öğrenci bulunamadı' });
      }

      res.status(200).json({
        success: true,
        data: dashboardData
      });
    } catch (error) {
      console.error('Student Profile Error:', error);
      res.status(500).json({ success: false, error: 'Sunucu hatası' });
    }
  }

  // Öğrenci güncelleme - PUT /api/student/:studentId
  static async updateStudent(req, res) {
    try {
      const { studentId } = req.params;
      const updateData = req.body;

      if (!studentId) {
        return res.status(400).json({ error: 'Geçersiz öğrenci ID' });
      }
      if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: 'Güncelleme verisi bulunamadı' });
      }

      const result = await StudentService.updateStudent(studentId, updateData);

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error('Student Update Error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Öğrenci silme - DELETE /api/student/:studentId
  static async deleteStudent(req, res) {
    try {
      const { studentId } = req.params;
      if (!studentId) {
        return res.status(400).json({ error: 'Geçersiz öğrenci ID' });
      }

      await StudentService.deleteStudent(studentId);

      res.status(200).json({ success: true, message: 'Öğrenci başarıyla silindi' });
    } catch (error) {
      console.error('Student Delete Error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Öğrenci listesi - GET /api/student/list
  static async getStudents(req, res) {
    try {
      const { page = 1, limit = 10, search } = req.query;
      const students = await StudentService.getStudents(page, limit, search);

      res.status(200).json({
        success: true,
        data: students
      });
    } catch (error) {
      console.error('Students List Error:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = StudentController;
