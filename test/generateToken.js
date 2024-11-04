const jwt = require('jsonwebtoken');
const config = require('../config/config')

function generateToken() {
  const payload = {
    userId: "ng@navgurukul.org", // Replace with appropriate user ID or payload
  };
  const secret = config.jwtSecret || 'yourjwtsecret'; // Ensure this matches your .env file
  const options = { expiresIn: '24h' }; // Token expiration time

  return jwt.sign(payload, secret, options);
}

module.exports = generateToken;