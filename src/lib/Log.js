var _ = require('../Utils'),
  events = require('events'),
  loggers = _.requireDir(module, './loggers');

/**
 *
 * Log bridge, which writes using one or more Logger's. Setup these loggers by
 * specifying their config with the first argument, or by calling addOutput.
 *
 * @constructor
 * @extends {@link events.EventEmitter}
 *
 * @param {string|Object|(string|Object)[]} output - Either the level to setup a single logger, a
 *   full config object for alogger, or an array of config objects to use for creating log outputs.
 * @param {string} output.level - One of the keys in {@link Log.levels} (error, warning, etc.)
 * @param {string} output.type - The name of the logger to use for this output
 */
function Log(output) {
  var i;

  output = output || 2;

  if (_.isString(output)) {
    output = [
      {
        level: output
      }
    ];
  } else if (_.isObject(output)) {
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

  if (!_.isArrayOfObjects(output)) {
    throw new TypeError('Invalid Logging output config');
  }

  /**
   * A list of the log streams, which are listening to this logger.
   * @type {Array}
   */
  this.outputs = [];

  for (i = 0; i < output.length; i++) {
    this.addLogger(output[i]);
  }

}
_.inherits(Log, events.EventEmitter);

/**
 * Levels observed by the loggers, with their rank
 * @type {Object}
 */
Log.levels = {
  // unexpected exceptions and 500s
  error: 1,
  // correctly formatted error responses from ES (400, ...) and recoverable errors (one node unresponsive)
  warning: 2,
  // info on what's going on (sniffing etc)
  info: 3,
  // all requests with query params and no data, response codes & exec times
  debug: 4,
  // body and response for all requests
  trace: 5
};

Log.levelsInverted = _.invert(Log.levels);

/**
 * Converts a log identifier to an integer representing it's level
 * @private
 * @param  {*} ident - The identifying to convert, if invalid then the default will be returned
 * @param  {Integer} default - The default log level to use if the identifier is not valid
 * @return {Integer} - The number reprsenting the log level
 */
Log.level = function (ident, def) {
  if (_.has(Log.levelsInverted, ident)) {
    return _.parseInt(ident);
  } else {
    if (_.has(Log.levels, ident)) {
      return Log.levels[ident];
    } else {
      return def;
    }
  }
};

/**
 * Create a new logger, based on the config.
 * @param {object} config  An object with config options for the logger. Type is used to find the
 *                         logger class, and should be one of 'file' or 'stdio' if running in node.js,
 *                         or one of 'console' or 'html' if running in the browser.
 * @return {undefined}
 */
Log.prototype.addOutput = function (config) {
  _.defaults(config, {
    type: 'stdio',
    level: Log.level(config.type, 2)
  });

  if (loggers[config.type]) {
    return this.outputs[this.outputs.push(new loggers[config.type](config, this)) - 1];
  } else {
    throw new TypeError('Invalid logger type ' + config.type);
  }
};

/**
 * Log an error
 * @param  {Error/String} error  The Error to log
 * @return {undefined}
 */
Log.prototype.error = function (e) {
  this.emit('error', e instanceof Error ? e : new Error(e));
};


/**
 * Log a warning message
 * @param  {String} message The warning message
 * @return {undefined}
 */
Log.prototype.warning = function (message) {
  this.emit('warning', message);
};
/** @alias Log.warning */
Log.prototype.warn = Log.prototype.warning;


/**
 * Log useful info about what's going on
 * @param  {String} message The warning message
 * @return {undefined}
 */
Log.prototype.info = function (message) {
  this.emit('info', message);
};

/**
 * Log a debug level message
 * @param  {String} message The warning message
 * @return {undefined}
 */
Log.prototype.debug = function (message) {
  this.emit('debug', message);
};

/**
 * Log a trace level message
 * @param  {String} message The warning message
 * @return {undefined}
 */
Log.prototype.trace = function (message) {
  this.emit('trace', message);
};



module.exports = Log;