class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createAPIError = (message, statusCode) => {
  return new APIError(message, statusCode);
};

export { APIError, createAPIError };
