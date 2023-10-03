const http2 = require("http2");
module.exports = class ErrorUnauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = http2.constants.HTTP_STATUS_UNAUTHORIZED;
  }
}