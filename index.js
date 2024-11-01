const express = require('express');
const config = require("./config/config"); // Import the config module
const bodyParser = require('body-parser');
const knex = require('./database/connection');
const objectRoutes = require('./routes/objectRoutes');
const batchRoutes = require('./routes/batchRoutes');
const { swaggerUi, specs } = require('../kv-data-store/swagger/swagger'); // Import Swagger configuration
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
require('./cleanupJob'); // Import and run the cleanup job


const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Routes for object and batch operations
app.use('/api', objectRoutes);
app.use('/api', batchRoutes);
app.use('/auth', authRoutes); // Use authentication routes

// Define the port to run the server on
const PORT = config.port || 3000;

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON:', err);
        return res.status(400).json({ error: 'Invalid JSON format' });
    }
    next(err);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});