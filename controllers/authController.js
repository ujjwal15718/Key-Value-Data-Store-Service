const jwt = require("jsonwebtoken");
const config = require("../config/config"); // Import the config module

// Email validation function
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Controller method to handle token generation
exports.generateToken = (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  // Validate the email format
  if (!validateEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Check if JWT_SECRET is defined
  if (!config.jwtSecret) {
    return res.status(500).json({ error: "JWT_SECRET is not defined" });
  }

  // Generate a token with the email as payload
  const token = jwt.sign({ email }, config.jwtSecret, { expiresIn: "1h" });

  // Send the token as the response
  res.status(200).json({ token });
};
