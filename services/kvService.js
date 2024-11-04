const KVModel = require("../models/kvModel");
const { ValidationError } = require('../error');
const { validateInput } = require('../validation');

class KVService {
  /**
   * Creates a new key-value pair in the database.
   * @param {string} key - The key to be created.
   * @param {any} data - The data to be associated with the key.
   * @param {number} ttl - Time-to-Live (TTL) in seconds.
   * @returns {Promise<Object>} - The created key-value pair.
   */
  async create(key, data, ttl) {
    try {
      validateInput(key, data);
      // Check if the key already exists
      const existing = await KVModel.query().findOne({ key });
      if (existing) {
        throw new ValidationError("Key already exists");
      }
      // Insert the new key-value pair
      return await KVModel.query().insert({ key, data, ttl });
    } catch (error) {
      console.error("Error in create:", error);
      throw error;
    }
  }

  /**
   * Retrieves a key-value pair from the database.
   * @param {string} key - The key to be retrieved.
   * @returns {Promise<Object>} - The retrieved key-value pair.
   */
  async get(key) {
    try {
      // Find the key-value pair by key
      const record = await KVModel.query().findOne({ key });
      if (!record) {
        throw new ValidationError("Key not found");
      }
      // Check if the TTL has expired
      const now = new Date();
      const createdAt = new Date(record.created_at);
      const ttl = record.ttl;
      if (ttl && (now - createdAt) / 1000 > ttl) {
        throw new ValidationError("Key has expired");
      }
      return record;
    } catch (error) {
      console.error("Error in get:", error);
      throw error;
    }
  }

  /**
   * Deletes a key-value pair from the database.
   * @param {string} key - The key to be deleted.
   * @returns {Promise<void>}
   */
  async delete(key) {
    try {
      // Find the key-value pair by key
      const record = await KVModel.query().findOne({ key });
      if (!record) {
        throw new ValidationError("Key not found");
      }
      // Check if the TTL has expired
      const now = new Date();
      const createdAt = new Date(record.created_at);
      const ttl = record.ttl;
      if (ttl && (now - createdAt) / 1000 > ttl) {
        throw new ValidationError("Key has expired");
      }
      // Delete the key-value pair
      const numDeleted = await KVModel.query().delete().where({ key });
      if (numDeleted === 0) {
        throw new ValidationError("Key not found");
      }
    } catch (error) {
      console.error("Error in delete:", error);
      throw error;
    }
  }

  /**
   * Creates multiple key-value pairs in the database.
   * @param {Array<Object>} items - The key-value pairs to be created.
   * @returns {Promise<Array<Object>>} - The created key-value pairs.
   * @throws {Error} - If the number of items exceeds the batch limit.
   */
  async batchCreate(items) {
    try {
      const BATCH_LIMIT = 100; // Limit for the number of items in a single batch

      // Explanation for choosing a batch limit of 100:
      // 1. Performance Optimization: Balances database transaction load and avoids excessive load.
      // 2. Resource Management: Manages memory usage and allows better concurrency control.
      // 3. System Stability: Facilitates error handling and retries, and ensures scalability.
      // 4. Industry Best Practices: Aligns with common practices for optimal performance and stability.

      // Check if the number of items exceeds the batch limit
      if (items.length > BATCH_LIMIT) {
        throw new ValidationError(
          `Batch limit exceeded. Maximum allowed is ${BATCH_LIMIT} items.`
        );
      }

      const results = [];
      for (const item of items) {
        try {
          validateInput(item.key, item.data);
          // Insert each key-value pair individually
          const result = await KVModel.query().insert(item);
          results.push({ success: true, item: result });
        } catch (error) {
          // Collect errors for individual items
          results.push({ success: false, error: error.message, item });
        }
      }
      return results;
    } catch (error) {
      console.error("Error in batchCreate:", error);
      throw error;
    }
  }
}

module.exports = new KVService();