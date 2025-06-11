const Student = require('../models/Student');
async function createStudent(data) { return await Student.create(data); }
async function getAllStudents() { return await Student.find().populate('user', 'name surname email'); }
async function getStudentById(id) { return await Student.findById(id).populate('user', 'name surname email'); }
async function updateStudent(id, data) { return await Student.findByIdAndUpdate(id, data, { new: true }); }
async function deleteStudent(id) { return await Student.findByIdAndDelete(id); }
module.exports = { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent };