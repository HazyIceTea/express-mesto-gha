const http2 = require("http2");
module.exports = class ErrorNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = http2.constants.HTTP_STATUS_NOT_FOUND;
  }
}
