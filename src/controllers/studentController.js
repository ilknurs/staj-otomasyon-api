// controllers/studentController.js
const StudentService = require('../services/studentService');

class StudentController {

  // Dashboard verileri - GET /api/student/:studentId
  static async getStudentDashboard(req, res) {
    try {
      const { studentId } = req.params;

      // Parametreleri kontrol et
      if (!studentId || typeof studentId !== 'string' || studentId.trim() === '') {
        return res.status(400).json({ error: 'Geçersiz öğrenci ID' });
        }


      // Servis katmanından verileri al
      const dashboardData = await StudentService.getStudentDashboardData(studentId);

      res.status(200).json(dashboardData);

    } catch (error) {
      console.error('Student Dashboard Error:', error);
      
      if (error.message.includes('bulunamadı')) {
        return res.status(404).json({
          error: error.message
        });
      }

      res.status(500).json({
        error: 'Sunucu hatası',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Tüm öğrenci alanları - GET /api/student/fields/:studentId
  static async getStudentFields(req, res) {
    try {
      const { studentId } = req.params;

      if (!studentId || typeof studentId !== 'string' || studentId.trim() === '') {
        return res.status(400).json({ error: 'Geçersiz öğrenci ID' });
        }

      const studentFields = await StudentService.getAllStudentFields(studentId);

      res.status(200).json(studentFields);

    } catch (error) {
      console.error('Student Fields Error:', error);
      
      if (error.message.includes('bulunamadı')) {
        return res.status(404).json({
          error: error.message
        });
      }

      res.status(500).json({
        error: 'Sunucu hatası',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Öğrenci güncelleme - PUT /api/student/:studentId
  static async updateStudent(req, res) {
    try {
      const { studentId } = req.params;
      const updateData = req.body;

      // Parametreleri kontrol et
      if (!studentId || typeof studentId !== 'string' || studentId.trim() === '') {
        return res.status(400).json({ error: 'Geçersiz öğrenci ID' });
        }

      // Body kontrolü
      if (!updateData || Object.keys(updateData).length === 0) {
        return res.status(400).json({
          error: 'Güncelleme verisi bulunamadı'
        });
      }

      // Servis katmanından güncelleme yap
      const result = await StudentService.updateStudent(studentId, updateData);

      res.status(200).json(result);

    } catch (error) {
      console.error('Student Update Error:', error);
      
      // Farklı hata türlerine göre status kodları
      if (error.message.includes('bulunamadı')) {
        return res.status(404).json({
          error: error.message
        });
      }
      
      if (error.message.includes('Validasyon') || error.message.includes('Geçersiz')) {
        return res.status(400).json({
          error: error.message
        });
      }

      if (error.message.includes('Güncellenecek')) {
        return res.status(400).json({
          error: error.message
        });
      }

      res.status(500).json({
        error: 'Sunucu hatası',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Öğrenci silme - DELETE /api/student/:studentId (bonus)
  static async deleteStudent(req, res) {
    try {
      const { studentId } = req.params;

      if (!studentId || typeof studentId !== 'string' || studentId.trim() === '') {
        return res.status(400).json({ error: 'Geçersiz öğrenci ID' });
        }

      // Burada silme işlemi yapılabilir
      // await StudentService.deleteStudent(studentId);

      res.status(200).json({
        message: 'Öğrenci başarıyla silindi'
      });

    } catch (error) {
      console.error('Student Delete Error:', error);
      
      if (error.message.includes('bulunamadı')) {
        return res.status(404).json({
          error: error.message
        });
      }

      res.status(500).json({
        error: 'Sunucu hatası',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Öğrenci listesi - GET /api/students (bonus)
  static async getStudents(req, res) {
    try {
      const { page = 1, limit = 10, search } = req.query;

      // Burada listeleme yapılabilir
      // const students = await StudentService.getStudents(page, limit, search);

      res.status(200).json({
        students: [],
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: 0
        }
      });

    } catch (error) {
      console.error('Students List Error:', error);
      
      res.status(500).json({
        error: 'Sunucu hatası',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
}

module.exports = StudentController;