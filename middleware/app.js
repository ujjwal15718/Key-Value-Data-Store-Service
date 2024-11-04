const express = require('express');
const bodyParser = require('body-parser');
const objectRoutes = require('../routes/objectRoutes');
const batchRoutes = require('../routes/batchRoutes');
const authRoutes = require('../routes/authRoutes');
const { swaggerUi, specs } = require('../swagger/swagger');
require('../cleanupJob');
require('../database/connection')
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes for object and batch operations
app.use('/api', objectRoutes);
app.use('/api', batchRoutes);
app.use('/auth', authRoutes);

module.exports = app;