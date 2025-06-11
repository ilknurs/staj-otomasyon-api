const asyncHandler = require('express-async-handler');
const companyService = require('../services/companyService');

exports.getAllCompanies = asyncHandler(async (req, res) => {
  const companies = await companyService.getAllCompanies();
  res.json({ success: true, data: companies });
});

exports.getCompany = asyncHandler(async (req, res) => {
  const company = await companyService.getCompanyById(req.params.id);
  if (!company) { res.status(404); throw new Error('Şirket bulunamadı.'); }
  res.json({ success: true, data: company });
});

exports.createCompany = asyncHandler(async (req, res) => {
  const comp = await companyService.createCompany(req.body);
  res.status(201).json({ success: true, data: comp });
});

exports.updateCompany = asyncHandler(async (req, res) => {
  const updated = await companyService.updateCompany(req.params.id, req.body);
  if (!updated) { res.status(404); throw new Error('Şirket bulunamadı.'); }
  res.json({ success: true, data: updated });
});

exports.deleteCompany = asyncHandler(async (req, res) => {
  await companyService.deleteCompany(req.params.id);
  res.json({ success: true, message: 'Şirket silindi.' });
});
