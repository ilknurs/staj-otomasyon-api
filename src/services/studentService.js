const Student = require('../models/Student');

class StudentService {
  // Öğrenci bilgilerini getir
  static async getStudentById(studentId) {
    const student = await Student.findById(studentId)
      .populate('user')
      .lean();
    if (!student) throw new Error('Öğrenci bulunamadı.');
    
    return {
      tc_no: student.tcKimlikNo,
      ad: student.user?.firstName || '',
      soyad: student.user?.lastName || '',
      universite: 'Belirtilmemiş',
      bolum: student.department,
      sinif: 'Belirtilmemiş',
      staj_baslangic_tarihi: student.internshipStartDate,
      staj_bitis_tarihi: student.internshipEndDate
    };
  }

  // Dashboard istatistikleri
  static async getStudentDashboardStats(studentId) {
    const student = await Student.findById(studentId)
      .populate('attendanceRecords')
      .lean();
    if (!student) throw new Error('Öğrenci bulunamadı.');

    const totalDays = student.attendanceRecords.length;
    const completedDays = student.attendanceRecords.filter(r => r.status === 'present').length;
    const averageScore = student.attendanceRecords.reduce((acc, r) => acc + (r.score || 0), 0) / (totalDays || 1);
    const attendanceRate = totalDays ? (completedDays * 100) / totalDays : 0;

    return {
      toplam_gun: totalDays,
      tamamlanan_gun: completedDays,
      ortalama_puan: Number(averageScore.toFixed(2)),
      devam_orani: Number(attendanceRate.toFixed(2))
    };
  }

  // Son aktiviteler
  static async getRecentLogs(studentId, limit = 5) {
    const student = await Student.findById(studentId)
      .populate({
        path: 'dailyLogs',
        options: { sort: { date: -1 }, limit }
      })
      .lean();
    if (!student) throw new Error('Öğrenci bulunamadı.');

    return student.dailyLogs.map(log => ({
      tarih: log.date,
      aktivite: log.activity,
      saat: log.hours
    }));
  }

  // Kombine veri getir
  static async getStudentDashboardData(studentId) {
    const [studentInfo, dashboardStats, recentLogs] = await Promise.all([
      this.getStudentById(studentId),
      this.getStudentDashboardStats(studentId),
      this.getRecentLogs(studentId)
    ]);
    return { studentInfo, dashboardStats, recentLogs };
  }
}

module.exports = StudentService;
