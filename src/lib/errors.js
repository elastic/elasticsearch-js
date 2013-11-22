var _ = require('./utils');
var errors = module.exports;

function ErrorAbstract(msg, constructor) {
  this.message = msg;

  Error.call(this, this.message);
  if (process.browser) {
    this.stack = '';
  } else {
    Error.captureStackTrace(this, constructor);
  }
}
errors._Abstract = ErrorAbstract;
_.inherits(ErrorAbstract, Error);

/**
 * Connection Error
 * @param {String} [msg] - An error message that will probably end up in a log.
 */
errors.ConnectionFault = function ConnectionFault(msg) {
  ErrorAbstract.call(this, msg || 'Connection Failure', errors.ConnectionFault);
};
_.inherits(errors.ConnectionFault, ErrorAbstract);

/**
 * No Living Connections
 * @param {String} [msg] - An error message that will probably end up in a log.
 */
errors.NoConnections = function NoConnections(msg) {
  ErrorAbstract.call(this, msg || 'No Living connections', errors.NoConnections);
};
_.inherits(errors.NoConnections, ErrorAbstract);

/**
 * Generic Error
 * @param {String} [msg] - An error message that will probably end up in a log.
 */
errors.Generic = function Generic(msg) {
  ErrorAbstract.call(this, msg || 'Generic Error', errors.Generic);
};
_.inherits(errors.Generic, ErrorAbstract);

/**
 * Request Timeout Error
 * @param {String} [msg] - An error message that will probably end up in a log.
 */
errors.RequestTimeout = function RequestTimeout(msg) {
  ErrorAbstract.call(this, msg || 'Request Timeout', errors.RequestTimeout);
};
_.inherits(errors.RequestTimeout, ErrorAbstract);


/**
 * Request Body could not be parsed
 * @param {String} [msg] - An error message that will probably end up in a log.
 */
errors.Serialization = function Serialization(msg) {
  ErrorAbstract.call(this, msg || 'Unable to parse/serialize body', errors.Serialization);
};
_.inherits(errors.Serialization, ErrorAbstract);


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
    ErrorAbstract.call(this, msg || name, errors[className]);
  }

  _.inherits(StatusCodeError, ErrorAbstract);
  errors[className] = StatusCodeError;
  errors[status] = StatusCodeError;
});
