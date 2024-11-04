const { ValidationError } = require('./error');

const MAX_VALUE_SIZE = 16 * 1024; // 16KB

function validateInput(key, value) {
  if (typeof key !== 'string' || key.length === 0) {
    throw new ValidationError('Invalid key');
  }
  const valueStr = typeof value === 'string' ? value : JSON.stringify(value);
  if (Buffer.byteLength(valueStr, 'utf8') > MAX_VALUE_SIZE) {
    throw new ValidationError('Value exceeds maximum size');
  }

}

module.exports = { validateInput };