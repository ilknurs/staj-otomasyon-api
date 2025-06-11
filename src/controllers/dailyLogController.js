const asyncHandler = require('express-async-handler');
const dailyLogService = require('../services/dailyLogService');
const { withInternshipDetails } = require('../utils/populate');

exports.getAllDailyLogs = asyncHandler(async (req, res) => {
  let query = dailyLogService.getAllDailyLogs();
  query = withInternshipDetails(query);
  const logs = await query;
  res.json({ success: true, data: logs });
});

exports.getDailyLog = asyncHandler(async (req, res) => {
  let query = dailyLogService.getDailyLogById(req.params.id);
  query = withInternshipDetails(query);
  const log = await query;
  if (!log) { res.status(404); throw new Error('Günlük kayıt bulunamadı.'); }
  res.json({ success: true, data: log });
});

exports.createDailyLog = asyncHandler(async (req, res) => {
  const log = await dailyLogService.createDailyLog(req.body);
  res.status(201).json({ success: true, data: log });
});

exports.updateDailyLog = asyncHandler(async (req, res) => {
  const updated = await dailyLogService.updateDailyLog(req.params.id, req.body);
  if (!updated) { res.status(404); throw new Error('Günlük kayıt bulunamadı.'); }
  res.json({ success: true, data: updated });
});

exports.deleteDailyLog = asyncHandler(async (req, res) => {
  await dailyLogService.deleteDailyLog(req.params.id);
  res.json({ success: true, message: 'Günlük kayıt silindi.' });
});
