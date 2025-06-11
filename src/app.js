// src/app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

// Route definitions
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const studentRoutes = require('./routes/studentRoutes');
const companyRoutes = require('./routes/companyRoutes');
const supervisorRoutes = require('./routes/supervisorRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const dailyLogRoutes = require('./routes/dailyLogRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

// Connect to database
connectDB();

const app = express();

// Global middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/supervisors', supervisorRoutes);
app.use('/api/attendances', attendanceRoutes);
app.use('/api/daily-logs', dailyLogRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/notifications', notificationRoutes);


app.use(errorHandler);

module.exports = app;

