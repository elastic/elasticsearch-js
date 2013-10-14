var Log = require('./log'),
  _ = require('./utils');

/**
 * Abstract class providing common functionality to loggers
 * @param {[type]} config [description]
 * @param {[type]} bridge [description]
 */
function LoggerAbstract(config, bridge) {

  this.bridge = bridge;
  this.listeningLevels = [];

  // bound copies of the event handlers
  this.handlers = _.reduce(Log.levels, function (handlers, name) {
    handlers[name] = _.bindKey(this, 'on' + _.studlyCase(name));
    return handlers;
  }, {}, this);

  // then the bridge closes, remove our event listeners
  this.bridge.on('closing', _.bindKey(this, 'cleanUpListeners'));

  this.setupListeners(config.levels);
}

function padNumToTen(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

/**
 * Create a timestamp string used in the format function. Defers to Log.timestamp if it is defined,
 * Also, feel free to override this at the logger level.
 * @return {String} - Timestamp in ISO 8601 UTC
 */
LoggerAbstract.prototype.timestamp = function () {
  var d = new Date();
  return d.getUTCFullYear() + '-' +
    padNumToTen(d.getUTCMonth() + 1) + '-' +
    padNumToTen(d.getUTCDate()) + 'T' +
    padNumToTen(d.getUTCHours()) + ':' +
    padNumToTen(d.getUTCMinutes()) + ':' +
    padNumToTen(d.getUTCSeconds()) + 'Z';
};

function indent(text, spaces) {
  var space = _.repeat(' ', spaces || 2);
  return text.split(/\r?\n/).map(function (line) {
    return space + line;
  }).join('\n');
}

LoggerAbstract.prototype.format = function (label, message) {
  return label + ': ' + this.timestamp() + '\n' + indent(message) + '\n\n';
};

LoggerAbstract.prototype.write = function () {
  throw new Error('This should be overwritten by the logger');
};

/**
 * Clear the current event listeners and then re-listen for events based on the level specified
 *
 * @method setupListeners
 * @private
 * @param  {Integer} level - The max log level that this logger should listen to
 * @return {undefined}
 */
LoggerAbstract.prototype.setupListeners = function (levels) {
  this.cleanUpListeners();

  this.listeningLevels = levels;

  _.each(this.listeningLevels, function (level) {
    this.bridge.on(level, this.handlers[level]);
  }, this);
};

/**
 * Clear the current event listeners
 *
 * @method cleanUpListeners
 * @private
 * @return {undefined}
 */
LoggerAbstract.prototype.cleanUpListeners = function () {
  _.each(this.listeningLevels, function (level) {
    this.bridge.removeListener(level, this.handlers[level]);
  }, this);
};

/**
 * Handler for the bridges "error" event
 *
 * @method onError
 * @private
 * @param  {Error} e - The Error object to log
 * @return {undefined}
 */
LoggerAbstract.prototype.onError = function (e) {
  this.write((e.name === 'Error' ? 'ERROR' : e.name), e.stack);
};

/**
 * Handler for the bridges "warning" event
 *
 * @method onWarning
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
LoggerAbstract.prototype.onWarning = function (msg) {
  this.write('WARNING', msg);
};

/**
 * Handler for the bridges "info" event
 *
 * @method onInfo
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
LoggerAbstract.prototype.onInfo = function (msg) {
  this.write('INFO', msg);
};

/**
 * Handler for the bridges "debug" event
 *
 * @method onDebug
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
LoggerAbstract.prototype.onDebug = function (msg) {
  this.write('DEBUG', msg);
};

/**
 * Handler for the bridges "trace" event
 *
 * @method onTrace
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
LoggerAbstract.prototype.onTrace = function (method, url, body, responseBody, responseStatus) {
  var message = 'curl "' + url.replace(/"/g, '\\"') + '" -X' + method.toUpperCase();
  if (body) {
    message += ' -d "' + body.replace(/"/g, '\\"') + '"';
  }
  message += '\n<- ' + responseStatus + '\n' + responseBody;
  this.write('TRACE', message);
};


module.exports = LoggerAbstract;
