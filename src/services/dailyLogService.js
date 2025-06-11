const DailyLog = require('../models/DailyLog');
async function createDailyLog(data) { return await DailyLog.create(data); }
async function getAllDailyLogs() { return await DailyLog.find(); }
async function getDailyLogById(id) { return await DailyLog.findById(id); }
async function updateDailyLog(id, data) { return await DailyLog.findByIdAndUpdate(id, data, { new: true }); }
async function deleteDailyLog(id) { return await DailyLog.findByIdAndDelete(id); }
module.exports = { createDailyLog, getAllDailyLogs, getDailyLogById, updateDailyLog, deleteDailyLog };
