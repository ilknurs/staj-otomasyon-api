const Supervisor = require('../models/Supervisor');
async function createSupervisor(data) { return await Supervisor.create(data); }
async function getAllSupervisors() { return await Supervisor.find().populate('user', 'name surname email'); }
async function getSupervisorById(id) { return await Supervisor.findById(id).populate('user', 'name surname email'); }
async function updateSupervisor(id, data) { return await Supervisor.findByIdAndUpdate(id, data, { new: true }); }
async function deleteSupervisor(id) { return await Supervisor.findByIdAndDelete(id); }
module.exports = { createSupervisor, getAllSupervisors, getSupervisorById, updateSupervisor, deleteSupervisor };
