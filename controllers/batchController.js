const kvService = require('../services/kvService');

// Controller method to handle batch creation of key-value pairs
exports.batchCreate = async (req, res) => {
    try {
        // Extract items from the request body
        const items = req.body;
        console.log(items,'>>>>>>>>>>888');
        // Call the batchCreate method from the kvService
        const result = await kvService.batchCreate(items);
        // Send the result as the response with a status code of 200 (OK)
        return result
    } catch (error) {
        // Log the error for debugging purposes
        console.error('Error in batchCreate:', error);
        // Send an error response with a status code of 400 (Bad Request)
        return { error: error.message };
    }
};