// --- src/utils/populate.js ---
// Ortak populate fonksiyonları
function withInternshipDetails(query) {
  return query.populate({
    path: 'internshipId',
    select: 'studentId companyId',
    populate: [
      { path: 'studentId', select: 'user studentNumber', populate: { path: 'user', select: 'name surname' } },
      { path: 'companyId', select: 'name' }
    ]
  });
}

module.exports = { withInternshipDetails };