const kvService = require('../services/kvService');


// Controller method to handle creation of a key-value pair
exports.createObject = async (req, res) => {
    try {
        // Extract key, data, and ttl from the request body
        const { key, data, ttl } = req.body;
        console.log(key, data, ttl); // Log the key, data, and ttl for debugging purposes
        // Call the create method from the kvService
        const result = await kvService.create(key, data, ttl);
        // Send the result as the response with a status code of 201 (Created)
        res.status(201).json(result);
    } catch (error) {
        // Send an error response with a status code of 400 (Bad Request)
        res.status(400).json({ error: error.message });
    }
};

// Controller method to handle retrieval of a key-value pair by key
exports.getObject = async (req, res) => {
    try {
        // Extract key from the request parameters
        const { key } = req.params;
        console.log(key); // Log the key for debugging purposes
        // Call the get method from the kvService
        const result = await kvService.get(key);
        // Send the result as the response with a status code of 200 (OK)
        res.status(200).json(result);
    } catch (error) {
        // Send an error response with a status code of 404 (Not Found)
        res.status(404).json({ error: error.message });
    }
};

// Controller method to handle deletion of a key-value pair by key
exports.deleteObject = async (req, res) => {
    try {
        // Extract key from the request parameters
        const { key } = req.params;
        // Call the delete method from the kvService
        await kvService.delete(key);
        // Send a response with a status code of 204 (No Content)
        res.status(204).send();
    } catch (error) {
        // Send an error response with a status code of 404 (Not Found)
        res.status(404).json({ error: error.message });
    }
};