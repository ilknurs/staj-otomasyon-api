const Evaluation = require('../models/Evaluation');
async function createEvaluation(data) { return await Evaluation.create(data); }
async function getAllEvaluations() { return await Evaluation.find(); }
async function getEvaluationById(id) { return await Evaluation.findById(id); }
async function updateEvaluation(id, data) { return await Evaluation.findByIdAndUpdate(id, data, { new: true }); }
async function deleteEvaluation(id) { return await Evaluation.findByIdAndDelete(id); }
module.exports = { createEvaluation, getAllEvaluations, getEvaluationById, updateEvaluation, deleteEvaluation };
