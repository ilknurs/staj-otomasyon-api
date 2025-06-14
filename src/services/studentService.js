// src/services/studentService.js
import axios from 'axios';

const studentBase = '/api/students';  

/** Öğrenci kendi profili */
export async function getProfile() {
  const res = await axios.get(`${studentBase}/profile`);
  return res.data.data;
}
export async function updateProfile(data) {
  const res = await axios.put(`${studentBase}/profile`, data);
  return res.data.data;
}

/** Tercihler */
export async function fetchPreferences() {
  const res = await axios.get(`${studentBase}/preferences`);
  return res.data.data;
}
export async function setPreferences(preferences) {
  const res = await axios.post(
    `${studentBase}/preferences`,
    { preferences }
  );
  return res.data.data;
}

/** Dönem Başı */
export async function fetchAssignments() {
  const res = await axios.get(`${studentBase}/assignments`);
  return res.data.data;
}
export async function setAssignmentType(aid, type) {
  const res = await axios.patch(
    `${studentBase}/assignments/${aid}/type`,
    { type }
  );
  return res.data.data;
}

/** Günlük Günlükler */
export async function fetchLogs(aid) {
  const res = await axios.get(`${studentBase}/assignments/${aid}/logs`);
  return res.data.data;
}
export async function addLog(aid, entry) {
  const res = await axios.post(
    `${studentBase}/assignments/${aid}/logs`,
    entry
  );
  return res.data.data;
}

/** Devam Bilgileri */
export async function fetchAttendance() {
  const res = await axios.get(`${studentBase}/attendance`);
  return res.data.data;
}

/** Dönem Sonu Not & Rapor */
export async function fetchGrades() {
  const res = await axios.get(`${studentBase}/grades`);
  return res.data.data;
}
