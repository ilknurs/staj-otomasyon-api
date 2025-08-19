const Student = require('../models/Student');
const InternshipRecord = require('../models/InternshipRecord');
const Attendance  = require('../models/Attendance');
const DailyLog    = require('../models/DailyLog');
const PeriodStart = require('../models/PeriodStart');
const EndPeriod   = require('../models/EndPeriod');
const Preferences = require('../models/Preferences');
const StudentInfo = require('../models/StudentInfo');


class StudentService {
  // Dashboard verilerini getir
  static async getStudentDashboardData(studentId) {
    try {
      // Öğrenci temel bilgileri
      const student = await Student.findById(studentId)
        .select('name surname email department')
        .lean();

      if (!student) {
        throw new Error('Öğrenci bulunamadı');
      }

      // Staj kayıtları
      const internships = await InternshipRecord.find({ student: studentId })
        .populate('company', 'name')
        .lean();

      // Devam (yoklama) bilgileri
      const attendance = await Attendance.find({ student: studentId }).lean();

      // Günlük staj defteri (loglar)
      const dailyLogs = await DailyLogs.find({ student: studentId })
        .sort({ date: -1 })
        .limit(10) // son 10 günlük log
        .lean();

      // Dönem başlangıcı
      const periodStart = await PeriodStart.findOne({ student: studentId }).lean();

      // Dönem sonu raporu
      const endPeriod = await EndPeriod.findOne({ student: studentId }).lean();

      // Öğrenci tercihleri
      const preferences = await Preferences.findOne({ student: studentId }).lean();

      // Öğrenci ek bilgileri (adres, telefon, vs.)
      const studentInfo = await StudentInfo.findOne({ student: studentId }).lean();

      return {
        student,
        internships,
        attendance,
        dailyLogs,
        periodStart,
        endPeriod,
        preferences,
        studentInfo,
      };
    } catch (error) {
      console.error('StudentService Error:', error);
      throw error;
    }
  }

  // Öğrenci güncelleme
  static async updateStudent(studentId, updateData) {
    return await Student.findByIdAndUpdate(studentId, updateData, { new: true });
  }

  // Öğrenci silme
  static async deleteStudent(studentId) {
    return await Student.findByIdAndDelete(studentId);
  }

  // Listeleme
  static async getStudents(page = 1, limit = 10, search = '') {
    const query = search ? { name: new RegExp(search, 'i') } : {};
    const students = await Student.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    const total = await Student.countDocuments(query);

    return {
      students,
      pagination: {
        page,
        limit,
        total,
      },
    };
  }
}

module.exports = StudentService;
