require("dotenv").config(); // Load environment variables from .env file

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  port: process.env.PORT || 3000,
};
