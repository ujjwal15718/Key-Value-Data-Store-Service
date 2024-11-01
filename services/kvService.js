const KVModel = require("../models/kvModel");

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
      // Check if the key already exists
      const existing = await KVModel.query().findOne({ key });
      if (existing) {
        throw new Error("Key already exists");
      }
      // Insert the new key-value pair
      return await KVModel.query().insert({ key, data, ttl });
    } catch (error) {
      console.error("Error in create:21111", error);
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
        throw new Error("Key not found");
      }
      // Check if the TTL has expired
      const now = new Date();
      const createdAt = new Date(record.created_at);
      const ttl = record.ttl;
      if (ttl && (now - createdAt) / 1000 > ttl) {
        throw new Error("Key has expired");
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
        throw new Error("Key not found");
      }
      // Check if the TTL has expired
      const now = new Date();
      const createdAt = new Date(record.created_at);
      const ttl = record.ttl;
      if (ttl && (now - createdAt) / 1000 > ttl) {
        throw new Error("Key has expired");
      }
      // Delete the key-value pair
      const numDeleted = await KVModel.query().delete().where({ key });
      if (numDeleted === 0) {
        throw new Error("Key not found");
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
      // Check if the number of items exceeds the batch limit
      if (items.length > BATCH_LIMIT) {
        throw new Error(
          `Batch limit exceeded. Maximum allowed is ${BATCH_LIMIT} items.`
        );
      }
      // Insert the key-value pairs
      const storeDataInDB = await KVModel.query().insert(items);
      return storeDataInDB;
    } catch (error) {
      console.error("Error in batchCreate:", error);
      throw error;
    }
  }
}

module.exports = new KVService();
