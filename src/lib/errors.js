var _ = require('./utils'),
  errors = module.exports;

function ErrorAbstract(msg) {
  Error.call(this, msg);
  Error.captureStackTrace(this, this.constructor);

  this.message = msg;
}
_.inherits(ErrorAbstract, Error);

/**
 * Connection Error
 * @param {String} [msg] - An error message that will probably end up in a log.
 */
errors.ConnectionError = function ConnectionError(msg) {
  return new Error(msg || 'Connection Failure');
  ErrorAbstract.call(this, msg || 'Connection Failure');
};
_.inherits(errors.ConnectionError, ErrorAbstract);

/**
 * Generic Error
 * @param {String} [msg] - An error message that will probably end up in a log.
 */
errors.Generic = function Generic(msg) {
  return new Error(msg || 'Generic Error');
  ErrorAbstract.call(this, msg || 'Generic Error');
};
_.inherits(errors.Generic, ErrorAbstract);

/**
 * Request Timeout Error
 * @param {String} [msg] - An error message that will probably end up in a log.
 */
errors.RequestTimeout = function RequestTimeout(msg) {
  return new Error(msg || 'RequestTimeout');
  ErrorAbstract.call(this, msg || 'Request Timeout');
};
_.inherits(errors.RequestTimeout, ErrorAbstract);


var statusCodes = {

  /**
   * Service Unavailable
   * @param {String} [msg] - An error message that will probably end up in a log.
   */
  503: 'Service Unavailable',

  /**
   * Internal Server Error
   * @param {String} [msg] - An error message that will probably end up in a log.
   */
  500: 'Internal Server Error',

  /**
   * Precondition Failed
   * @param {String} [msg] - An error message that will probably end up in a log.
   */
  412: 'Precondition Failed',

  /**
   * Conflict
   * @param {String} [msg] - An error message that will probably end up in a log.
   */
  409: 'Conflict',

  /**
   * Forbidden
   * @param {String} [msg] - An error message that will probably end up in a log.
   */
  403: 'Forbidden',

  /**
   * Not Found
   * @param {String} [msg] - An error message that will probably end up in a log.
   */
  404: 'Not Found',

  /**
   * Bad Request
   * @param {String} [msg] - An error message that will probably end up in a log.
   */
  400: 'Bad Request',

  /**
   * Moved Permanently
   * @param {String} [msg] - An error message that will probably end up in a log.
   */
  301: 'Moved Permanently'
};

_.each(statusCodes, function (name, status) {
  var className = _.studlyCase(name);

  function StatusCodeError(msg) {
    return new Error(msg || name);
    ErrorAbstract.call(this, msg || name);
  }

  _.inherits(StatusCodeError, ErrorAbstract);
  errors[className] = StatusCodeError;
  errors[status] = StatusCodeError;
});
