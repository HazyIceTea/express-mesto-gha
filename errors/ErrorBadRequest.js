const http2 = require('http2');

module.exports = class ErrorBadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = http2.constants.HTTP_STATUS_BAD_REQUEST;
  }
};
