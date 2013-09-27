var clc = require('cli-color')
  , Log = require('../log')
  , _ = require('../utils');

/**
 * Special version of the Stream logger, which logs errors and warnings to stderr and all other
 * levels to stdout.
 *
 * @class Loggers.Stdio
 * @constructor
 * @param {Object} config - The configuration for the Logger
 * @param {string} config.level - The highest log level for this logger to output.
 * @param {Log} bridge - The object that triggers logging events, which we will record
 */
function Stdio(config, bridge) {
  this.bridge = bridge;

  // config/state
  this.color = _.has(config, 'color') ? !!config.color : true;
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

/**
 * Clear the current event listeners and then re-listen for events based on the level specified
 *
 * @method setupListeners
 * @private
 * @param  {Integer} level - The max log level that this logger should listen to
 * @return {undefined}
 */
Stdio.prototype.setupListeners = function (levels) {
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
Stdio.prototype.cleanUpListeners = function () {
  _.each(this.listeningLevels, function (level) {
    this.bridge.removeListener(level, this.handlers[level]);
  }, this);
};

/**
 * Sends output to a stream, does some formatting first
 *
 * @method write
 * @private
 * @param  {WriteableStream} to - The stream that should receive this message
 * @param  {String} label - The text that should be used at the begining of the message
 * @param  {function} colorize - A function that recieves a string and returned a colored version of it
 * @param  {*} what - The message to log
 * @return {undefined}
 */
Stdio.prototype.write = function (to, label, colorize, what) {
  if (this.color) {
    label = colorize(label);
  }
  to.write(label + ': ' + what + '\n');
};

/**
 * Handler for the bridges "error" event
 *
 * @method onError
 * @private
 * @param  {Error} e - The Error object to log
 * @return {undefined}
 */
Stdio.prototype.onError = function (e) {
  this.write(process.stderr, e.name === 'Error' ? 'ERROR' : e.name, clc.red.bold,  [e.message, '\n\nStack Trace:\n' + e.stack]);
};

/**
 * Handler for the bridges "warning" event
 *
 * @method onWarning
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
Stdio.prototype.onWarning = function (msg) {
  this.write(process.stderr, 'WARNING', clc.yellow.bold, msg);
};

/**
 * Handler for the bridges "info" event
 *
 * @method onInfo
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
Stdio.prototype.onInfo = function (msg) {
  this.write(process.stdout, 'INFO', clc.cyan.bold, msg);
};

/**
 * Handler for the bridges "debug" event
 *
 * @method onDebug
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
Stdio.prototype.onDebug = function (msg) {
  this.write(process.stdout, 'DEBUG', clc.magentaBright.bold, msg);
};

/**
 * Handler for the bridges "trace" event
 *
 * @method onTrace
 * @private
 * @param  {String} msg - The message to be logged
 * @return {undefined}
 */
Stdio.prototype.onTrace = function (method, url, body, responseStatus, responseBody) {
  var message = '\nHTTP ' + method + ' ' + url + ' -> ';
  if (this.color) {
    if (responseStatus === 200) {
      message += clc.green.bold(responseStatus);
    } else {
      message += clc.red.bold(responseStatus);
    }
  } else {
    message += responseStatus;
  }
  message += '\n' + responseBody + '\n\n';
  message += 'curl "' + url.replace('"', '\\"') + '" -X' + method.toUpperCase();
  if (body) {
    message += ' -d ' + JSON.stringify(JSON.stringify(body));
  }
  this.write(process.stdout, 'TRACE', clc.cyanBright.bold, message + '\n\n');
};

module.exports = Stdio;