const asyncHandler = require('express-async-handler');
const evaluationService = require('../services/evaluationService');

exports.getAllEvaluations = asyncHandler(async (req, res) => {
  const evals = await evaluationService.getAllEvaluations();
  res.json({ success: true, data: evals });
});

exports.getEvaluation = asyncHandler(async (req, res) => {
  const evalItem = await evaluationService.getEvaluationById(req.params.id);
  if (!evalItem) { res.status(404); throw new Error('Değerlendirme bulunamadı.'); }
  res.json({ success: true, data: evalItem });
});

exports.createEvaluation = asyncHandler(async (req, res) => {
  const ev = await evaluationService.createEvaluation(req.body);
  res.status(201).json({ success: true, data: ev });
});

exports.updateEvaluation = asyncHandler(async (req, res) => {
  const updated = await evaluationService.updateEvaluation(req.params.id, req.body);
  if (!updated) { res.status(404); throw new Error('Değerlendirme bulunamadı.'); }
  res.json({ success: true, data: updated });
});

exports.deleteEvaluation = asyncHandler(async (req, res) => {
  await evaluationService.deleteEvaluation(req.params.id);
  res.json({ success: true, message: 'Değerlendirme silindi.' });
});
