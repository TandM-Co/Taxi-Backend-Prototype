const { ErrorHandler } = require('../models/index');

async function errorHandler(operation, error) {
  const { message, status } = error;

  try {
    return await operation;
  } catch (err) {
    throw new ErrorHandler({message: err.message}, status);
  }
}

module.exports = errorHandler;