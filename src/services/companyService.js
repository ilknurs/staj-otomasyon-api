const Company = require('../models/Company');
async function createCompany(data) { return await Company.create(data); }
async function getAllCompanies() { return await Company.find(); }
async function getCompanyById(id) { return await Company.findById(id); }
async function updateCompany(id, data) { return await Company.findByIdAndUpdate(id, data, { new: true }); }
async function deleteCompany(id) { return await Company.findByIdAndDelete(id); }
module.exports = { createCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany };
