var _ = require('./utils');
var url = require('url');
var EventEmitter = require('events').EventEmitter;
if (process.browser) {
  var loggers = {
    Console: require('./loggers/console')
  };
} else {
  var loggers = {
    File: require('./loggers/file'),
    Stream: require('./loggers/file'),
    Stdio: require('./loggers/stdio')
  };
}

/**
 * Log bridge, which is an [EventEmitter](http://nodejs.org/api/events.html#events_class_events_eventemitter)
 * that sends events to one or more outputs/loggers. Setup these loggers by
 * specifying their config as the first argument, or by passing it to addOutput().
 *
 * @class Log
 * @uses Loggers.Stdio
 * @constructor
 * @param {string|Object|ArrayOfStrings|ArrayOfObjects} output - Either the level
 *  to setup a single logger, a full config object for alogger, or an array of
 *  config objects to use for creating log outputs.
 * @param {string} output.level - One of the keys in Log.levels (error, warning, etc.)
 * @param {string} output.type - The name of the logger to use for this output
 */
function Log(config) {
  this.config = config || {};

  var i;
  var output = config.loggers ? config.loggers : 'warning';

  if (_.isString(output) || _.isFinite(output)) {
    output = [
      {
        level: output
      }
    ];
  } else if (_.isPlainObject(output)) {
    output = [output];
  } else if (_.isArray(output)) {
    for (i = 0; i < output.length; i++) {
      if (_.isString(output[i])) {
        output[i] = {
          level: output[i]
        };
      }
    }
  }

  if (!_.isArrayOfPlainObjects(output)) {
    throw new TypeError('Invalid Logging output config');
  }

  for (i = 0; i < output.length; i++) {
    this.addOutput(output[i]);
  }

}
_.inherits(Log, EventEmitter);


Log.prototype.close = function () {
  this.emit('closing');
  if (EventEmitter.listenerCount(this)) {
    console.error('Something is still listening for log events, but the logger is closing.');
    this.clearAllListeners();
  }
};

/**
 * Levels observed by the loggers, ordered by rank
 *
 * @property levels
 * @type Array
 * @static
 */
Log.levels = [
  /**
   * Event fired for error level log entries
   * @event error
   * @param {Error} error - The error object to log
   */
  'error',
  /**
   * Event fired for "warning" level log entries, which usually represent things
   * like correctly formatted error responses from ES (400, ...) and recoverable
   * errors (one node unresponsive)
   *
   * @event warning
   * @param {String} message - A message to be logged
   */
  'warning',
  /**
   * Event fired for "info" level log entries, which usually describe what a
   * client is doing (sniffing etc)
   *
   * @event info
   * @param {String} message - A message to be logged
   */
  'info',
  /**
   * Event fired for "debug" level log entries, which will describe requests sent,
   * including their url (no data, response codes, or exec times)
   *
   * @event debug
   * @param {String} message - A message to be logged
   */
  'debug',
  /**
   * Event fired for "trace" level log entries, which provide detailed information
   * about each request made from a client, including reponse codes, execution times,
   * and a full curl command that can be copied and pasted into a terminal
   *
   * @event trace
   * @param {String} method method, , body, responseStatus, responseBody
   * @param {String} url - The url the request was made to
   * @param {String} body - The body of the request
   * @param {Integer} responseStatus - The status code returned from the response
   * @param {String} responseBody - The body of the response
   */
  'trace'
];

/**
 * Converts a log config value (string or array) to an array of level names which
 * it represents
 *
 * @method parseLevels
 * @static
 * @private
 * @param  {String|ArrayOfStrings} input - Cound be a string to specify the max
 *   level, or an array of exact levels
 * @return {Array} -
 */
Log.parseLevels = function (input) {
  if (_.isString(input)) {
    return Log.levels.slice(0, _.indexOf(Log.levels, input) + 1);
  }
  else if (_.isArray(input)) {
    return _.intersection(input, Log.levels);
  }
};

/**
 * Combine the array-like param into a simple string
 *
 * @method join
 * @static
 * @private
 * @param  {*} arrayish - An array like object that can be itterated by _.each
 * @return {String} - The final string.
 */
Log.join = function (arrayish) {
  return _.map(arrayish, function (item) {
    if (_.isPlainObject(item)) {
      return _.inspect(item) + '\n';
    } else {
      return item.toString();
    }
  }).join(' ');
};

/**
 * Create a new logger, based on the config.
 *
 * @method addOutput
 * @param {object} config - An object with config options for the logger.
 * @param {String} [config.type=stdio] - The name of an output/logger. Options
 *   can be found in the `src/loggers` directory.
 * @param {String|ArrayOfStrings} [config.levels=warning] - The levels to output
 *   to this logger, when an array is specified no levels other than the ones
 *   specified will be listened to. When a string is specified, that and all lower
 *   levels will be logged.
 * @return {Logger}
 */
Log.prototype.addOutput = function (config) {
  var levels = Log.parseLevels(config.levels || config.level || 'warning');

  _.defaults(config || {}, {
    type: process.browser ? 'Console' : 'Stdio',
  });

  // force the levels config
  delete config.level;
  config.levels = levels;

  var Logger = loggers[_.studlyCase(config.type)];
  if (Logger) {
    return new Logger(config, this);
  } else {
    throw new Error('Invalid logger type "' + config.type + '". Expected one of ' + _.keys(loggers).join(', '));
  }
};

/**
 * Log an error
 *
 * @method error
 * @param  {Error|String} error  The Error to log
 * @return {Boolean} - True if any outputs accepted the message
 */
Log.prototype.error = function (e) {
  if (EventEmitter.listenerCount(this, 'error')) {
    return this.emit('error', e instanceof Error ? e : new Error(e));
  }
};


/**
 * Log a warning message
 *
 * @method warning
 * @param  {*} msg* - Any amount of messages that will be joined before logged
 * @return {Boolean} - True if any outputs accepted the message
 */
Log.prototype.warning = function (/* ...msg */) {
  if (EventEmitter.listenerCount(this, 'warning')) {
    return this.emit('warning', Log.join(arguments));
  }
};


/**
 * Log useful info about what's going on
 *
 * @method info
 * @param  {*} msg* - Any amount of messages that will be joined before logged
 * @return {Boolean} - True if any outputs accepted the message
 */
Log.prototype.info = function (/* ...msg */) {
  if (EventEmitter.listenerCount(this, 'info')) {
    return this.emit('info', Log.join(arguments));
  }
};

/**
 * Log a debug level message
 *
 * @method debug
 * @param  {*} msg* - Any amount of messages that will be joined before logged
 * @return {Boolean} - True if any outputs accepted the message
 */
Log.prototype.debug = function (/* ...msg */) {
  if (EventEmitter.listenerCount(this, 'debug')) {
    return this.emit('debug', Log.join(arguments) /*+ _.getStackTrace(Log.prototype.debug)*/);
  }
};

/**
 * Log a trace level message
 *
 * @method trace
 * @param {String} method - HTTP request method
 * @param {String|Object} requestUrl - URL requested. If the value is an object,
 *   it is expected to be the return value of Node's url.parse()
 * @param {String} body - The request's body
 * @param {String} responseBody - body returned from ES
 * @param {String} responseStatus - HTTP status code
 * @return {Boolean} - True if any outputs accepted the message
 */
Log.prototype.trace = function (method, requestUrl, body, responseBody, responseStatus) {
  if (EventEmitter.listenerCount(this, 'trace')) {
    if (typeof requestUrl === 'string') {
      requestUrl = url.parse(requestUrl, true, true);
    }
    requestUrl = _.defaults({
      host: 'localhost:9200',
      query: _.defaults({
        pretty: true
      }, requestUrl.query)
    }, requestUrl);
    delete requestUrl.auth;
    return this.emit('trace', method, url.format(requestUrl), body, responseBody, responseStatus);
  }
};

module.exports = Log;
