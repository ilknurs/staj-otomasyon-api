const asyncHandler = require('express-async-handler');
const userService = require('../services/userService');

exports.getUser = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  if (!user) { res.status(404); throw new Error('Kullanıcı bulunamadı.'); }
  res.json({ success: true, data: user });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const updated = await userService.updateUser(req.params.id, req.body);
  if (!updated) { res.status(404); throw new Error('Kullanıcı bulunamadı.'); }
  res.json({ success: true, data: updated });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.json({ success: true, message: 'Kullanıcı silindi.' });
});
