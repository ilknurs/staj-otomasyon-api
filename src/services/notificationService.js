const Notification = require('../models/Notification');
async function createNotification(data) { return await Notification.create(data); }
async function getAllNotifications() { return await Notification.find(); }
async function getNotificationById(id) { return await Notification.findById(id); }
async function updateNotification(id, data) { return await Notification.findByIdAndUpdate(id, data, { new: true }); }
async function deleteNotification(id) { return await Notification.findByIdAndDelete(id); }
module.exports = { createNotification, getAllNotifications, getNotificationById, updateNotification, deleteNotification };
