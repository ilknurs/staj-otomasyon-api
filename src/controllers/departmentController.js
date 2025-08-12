const asyncHandler = require('express-async-handler');
const departmentService = require('../services/departmentService');
const ExcelJS = require('exceljs'); // Bu satırı da ekle

// Mevcut export'lar
exports.getAllDepartments = asyncHandler(async (req, res) => {
  const deps = await departmentService.getAllDepartments();
  res.json({ success: true, data: deps });
});

exports.getDepartment = asyncHandler(async (req, res) => {
  const dep = await departmentService.getDepartmentById(req.params.id);
  if (!dep) { res.status(404); throw new Error('Bölüm bulunamadı.'); }
  res.json({ success: true, data: dep });
});

exports.createDepartment = asyncHandler(async (req, res) => {
  const dpt = await departmentService.createDepartment(req.body);
  res.status(201).json({ success: true, data: dpt });
});

exports.updateDepartment = asyncHandler(async (req, res) => {
  const updated = await departmentService.updateDepartment(req.params.id, req.body);
  if (!updated) { res.status(404); throw new Error('Bölüm bulunamadı.'); }
  res.json({ success: true, data: updated });
});

exports.deleteDepartment = asyncHandler(async (req, res) => {
  await departmentService.deleteDepartment(req.params.id);
  res.json({ success: true, message: 'Bölüm silindi.' });
});

// Excel export fonksiyonu
exports.exportInternshipsToExcel = asyncHandler(async (req, res) => {
  res.send('Export endpoint çalışıyor!');
  try {
    // Kullanıcının department ID'sini al
    const departmentId = req.user.departmentId || req.user.id;
    
    // Stajları getir
    const InternshipRecord = require('../models/InternshipRecord');
    const internships = await InternshipRecord.find({ 
      departmentId: departmentId 
    }).populate('studentId companyId supervisorId');
    
    if (!internships || internships.length === 0) {
      return res.status(404).json({ success: false, message: 'Staj kaydı bulunamadı.' });
    }
    
    // Excel dosyası oluştur
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Stajlar');
    
    // Headers
    worksheet.columns = [
      { header: 'Öğrenci Adı', key: 'studentName', width: 20 },
      { header: 'TC Kimlik No', key: 'tcNo', width: 15 },
      { header: 'Şirket Adı', key: 'companyName', width: 25 },
      { header: 'Başlangıç Tarihi', key: 'startDate', width: 15 },
      { header: 'Bitiş Tarihi', key: 'endDate', width: 15 },
      { header: 'Durum', key: 'status', width: 15 }
    ];
    
    // Verileri ekle
    internships.forEach(internship => {
      worksheet.addRow({
        studentName: internship.studentId?.name || 'Bilinmiyor',
        tcNo: internship.studentId?.tcNo || 'Bilinmiyor',
        companyName: internship.companyId?.name || 'Bilinmiyor',
        startDate: internship.startDate ? new Date(internship.startDate).toLocaleDateString('tr-TR') : 'Bilinmiyor',
        endDate: internship.endDate ? new Date(internship.endDate).toLocaleDateString('tr-TR') : 'Bilinmiyor',
        status: internship.status || 'Bilinmiyor'
      });
    });
    
    // Style
    worksheet.getRow(1).font = { bold: true };
    
    // Response headers
    const fileName = `stajlar_${new Date().toLocaleDateString('tr-TR').replace(/\./g, '_')}.xlsx`;
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    
    await workbook.xlsx.write(res);
    res.end();
    
  } catch (error) {
    console.error('Excel export error:', error);
    res.status(500).json({ success: false, message: 'Excel export başarısız' });
  }
});