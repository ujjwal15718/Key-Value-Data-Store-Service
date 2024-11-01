const config = require('./config/config'); // Import the config module

module.exports = {
    development: {
        client: 'pg', // Specify the database client (PostgreSQL)
        connection: {
            host: config.dbHost, // Database host from config
            user: config.dbUser, // Database user from config
            password: config.dbPassword, // Database password from config
            database: config.dbName, // Database name from config
            searchPath: ['public'], // Specify the search path for the database schema
        },
        migrations: {
            directory: './database/migrations', // Directory for database migration files
        },
    },
};