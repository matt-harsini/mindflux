class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createAPIError = (message, statusCode) => {
  return new APIError(message, statusCode);
};

function handleError(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}

export { APIError, createAPIError, handleError };
