const asyncHandler = require('express-async-handler');
const notificationService = require('../services/notificationService');

exports.getAllNotifications = asyncHandler(async (req, res) => {
  const notes = await notificationService.getAllNotifications();
  res.json({ success: true, data: notes });
});

exports.getNotification = asyncHandler(async (req, res) => {
  const note = await notificationService.getNotificationById(req.params.id);
  if (!note) { res.status(404); throw new Error('Bildirim bulunamadı.'); }
  res.json({ success: true, data: note });
});

exports.createNotification = asyncHandler(async (req, res) => {
  const note = await notificationService.createNotification(req.body);
  res.status(201).json({ success: true, data: note });
});

exports.updateNotification = asyncHandler(async (req, res) => {
  const updated = await notificationService.updateNotification(req.params.id, req.body);
  if (!updated) { res.status(404); throw new Error('Bildirim bulunamadı.'); }
  res.json({ success: true, data: updated });
});

exports.deleteNotification = asyncHandler(async (req, res) => {
  await notificationService.deleteNotification(req.params.id);
  res.json({ success: true, message: 'Bildirim silindi.' });
});