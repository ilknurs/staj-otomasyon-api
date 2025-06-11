const Department = require('../models/Department');
async function createDepartment(data) { return await Department.create(data); }
async function getAllDepartments() { return await Department.find(); }
async function getDepartmentById(id) { return await Department.findById(id); }
async function updateDepartment(id, data) { return await Department.findByIdAndUpdate(id, data, { new: true }); }
async function deleteDepartment(id) { return await Department.findByIdAndDelete(id); }
module.exports = { createDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment };
