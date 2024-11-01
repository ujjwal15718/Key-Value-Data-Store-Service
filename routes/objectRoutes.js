const express = require('express');
const router = express.Router();
const objectController = require('../controllers/objectController');
const authenticateJWT = require("../middleware/authMiddleware");



// Route to handle creation of a key-value pair
router.post('/object',authenticateJWT, objectController.createObject);

// Route to handle retrieval of a key-value pair by key
router.get('/object/:key',authenticateJWT, objectController.getObject);

// Route to handle deletion of a key-value pair by key
router.delete('/object/:key',authenticateJWT, objectController.deleteObject);

module.exports = router;