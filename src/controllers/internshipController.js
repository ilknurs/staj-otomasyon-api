const asyncHandler = require('express-async-handler');
const internshipService = require('../services/internshipService');
const { withInternshipDetails } = require('../utils/populate');

exports.getAllInternships = asyncHandler(async (req, res) => {
  let query = internshipService.getAllInternships();
  query = withInternshipDetails(query);
  const list = await query;
  res.json({ success: true, data: list });
});

exports.getInternship = asyncHandler(async (req, res) => {
  let query = internshipService.getInternshipById(req.params.id);
  query = withInternshipDetails(query);
  const item = await query;
  if (!item) { res.status(404); throw new Error('Staj bulunamadı.'); }
  res.json({ success: true, data: item });
});

exports.createInternship = asyncHandler(async (req, res) => {
  const record = await internshipService.createInternship(req.body);
  res.status(201).json({ success: true, data: record });
});

exports.updateInternship = asyncHandler(async (req, res) => {
  const updated = await internshipService.updateInternship(req.params.id, req.body);
  if (!updated) { res.status(404); throw new Error('Staj bulunamadı.'); }
  res.json({ success: true, data: updated });
});

exports.deleteInternship = asyncHandler(async (req, res) => {
  await internshipService.deleteInternship(req.params.id);
  res.json({ success: true, message: 'Staj silindi.' });
});


// internshipController.js - Bu fonksiyonu ekleyin
exports.exportToExcel = asyncHandler(async (req, res) => {
  const XLSX = require('xlsx');
  
  // Tüm stajları getir
  let query = internshipService.getAllInternships();
  query = withInternshipDetails(query);
  const internships = await query;
  
  // Excel için veri hazırla
  const excelData = internships.map(internship => ({
    'TC Kimlik No': internship.studentId?.tcNo || '',
    'Öğrenci Adı': internship.studentId?.name || '',
    'Şirket': internship.companyId?.name || '',
    'Başlangıç Tarihi': internship.startDate ? new Date(internship.startDate).toLocaleDateString('tr-TR') : '',
    'Bitiş Tarihi': internship.endDate ? new Date(internship.endDate).toLocaleDateString('tr-TR') : '',
    'Durum': internship.status || '',
    'Departman': internship.department || ''
  }));
  
  // Excel dosyası oluştur
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Stajlar');
  
  // Excel dosyasını buffer olarak oluştur
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  
  // Response header'larını ayarla
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=stajlar_${new Date().toISOString().split('T')[0]}.xlsx`);
  
  // Excel dosyasını gönder
  res.send(excelBuffer);
});