const express = require("express");
const router = express.Router();
const batchController = require("../controllers/batchController");
const authenticateJWT = require("../middleware/authMiddleware");

// Route to handle batch creation of key-value pairs
router.post("/batch/object", authenticateJWT, async (req, res) => {
  try {
    // Call the batchCreate method from the batchController
    const result = await batchController.batchCreate(req);
    // Send the result as the response
    res.status(200).json(result);
  } catch (error) {
    // Log the error and send an error response
    console.error("Error in batch creation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
