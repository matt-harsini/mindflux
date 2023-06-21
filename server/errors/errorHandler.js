class APIError extends Error {
  constructor(message, statusCode) {
    this.statusCode = statusCode;
    super(message);
  }
}

const createAPIError = (message, statusCode) => {
  return new APIError(message, statusCode);
};

export { APIError, createAPIError };
