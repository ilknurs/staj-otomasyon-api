const Attendance = require('../models/Attendance');
async function createAttendance(data) { return await Attendance.create(data); }
async function getAllAttendances() { return await Attendance.find(); }
async function getAttendanceById(id) { return await Attendance.findById(id); }
async function updateAttendance(id, data) { return await Attendance.findByIdAndUpdate(id, data, { new: true }); }
async function deleteAttendance(id) { return await Attendance.findByIdAndDelete(id); }
module.exports = { createAttendance, getAllAttendances, getAttendanceById, updateAttendance, deleteAttendance };
