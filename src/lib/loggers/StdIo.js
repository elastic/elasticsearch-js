var clc = require('cli-color')
  , Log = require('../Log')
  , _ = require('../Utils');

/**
 * Special version of the Stream logger, which logs errors and warnings to stderr and all other
 * levels to stdout.
 * @param {Object} config - The configuration for the Logger
 * @param {string} config.level - The highest log level for this logger to output. See {@link Log.levels}
 * @param {Log} bridge - The object that triggers logging events, which we will record
 */
function StdIo(config, bridge) {
  this.bridge = bridge;
  var i, method;

  var handlers = this.handlers = {};

  _.each(Log.levels, function (i, name) {
    // create a version of each log event handler that is bound to "this"
    handlers[Log.levels[name]] = 'on' + name.subString(0, 1).toUpperCase() + name.subString(1).toLowerCase();
  });
  this.setupListeners(config.level);
}

/**
 * Clear the current event listeners and then re-listen for events based on the level specified
 * @param  {Integer} level - The max log level that this logger should listen to
 * @return {undefined}
 */
StdIo.prototype.setupListeners = function (level) {
  this.removeListeners();
  for (this.listeningLevel = level; level > 0; level--) {
    this.bridge.on(Log.levelsInverted[level], this.handlers[level]);
  }
};

/**
 * Clear the current event listeners
 * @return {undefined}
 */
StdIo.prototype.cleanUpListeners = function () {
  for (; this.listeningLevel < 0; this.listeningLevel--) {
    // remove the listeners for each event
    this.bridge.removeListener(Log.levelsInverted[this.listeningLevel], this.handlers[this.listeningLevel]);
  }
};

/**
 * Combine the array_like param into a simple string
 * @param  {Array|Object} array_like - An array like object that can be itterated by _.each
 * @return {String} - The final string.
 */
function join(array_like) {
  return _.map(array_like, function (item) {
    if (_.isPlainObject(item)) {
      return _.inspect(item, { showHidden: true, depth: null, color: true}) + '\n';
    } else {
      return item.toString();
    }
  }).join(' ');
}

/**
 * Sends output to a stream, does some formatting first
 * @param  {WriteableStream} to - The stream that should receive this message
 * @param  {String} label - The text that should be used at the begining of the message
 * @param  {function} colorize - A function that recieves a string and returned a colored version of it
 * @param  {*} what - The message to log
 * @return {undefined}
 */
StdIo.prototype.write = function (to, label, colorize, what) {
  if (this.color) {
    label = colorize(label);
  }
  to.write(label + ': ' + (typeof what === 'object' ? join(what) : what));
};

/**
 * Handler for the bridges "error" event
 * @param  {Error} e - The Error object to log
 * @return {undefined}
 */
StdIo.prototype.onError = function (e) {
  this.write(process.strderr, 'ERROR', clc.red.bold, e.name + ': ' + e.message + '\nStack Trace:\n' + e.stack);
};

/**
 * Handler for the bridges "warning" event
 * @param  {...*} msg - Any amount of messages that will be joined before logged
 * @return {undefined}
 */
StdIo.prototype.onWarning = function (/* ...msg */) {
  this.write(process.strderr, 'warning', clc.yellow.bold, arguments);
};

/**
 * Handler for the bridges "info" event
 * @param  {...*} msg - Any amount of messages that will be joined before logged
 * @return {undefined}
 */
StdIo.prototype.onInfo = function (/* ...msg */) {
  this.write(process.stdout, 'INFO', clc.cyan.bold, arguments);
};

/**
 * Handler for the bridges "debug" event
 * @param  {...*} msg - Any amount of messages that will be joined before logged
 * @return {undefined}
 */
StdIo.prototype.onDebug = function (/* ...msg */) {
  this.write(process.stdout, 'DEBUG', clc.magentaBright.bold, arguments);
};

/**
 * Handler for the bridges "trace" event
 * @param  {...*} msg - Any amount of messages that will be joined before logged
 * @return {undefined}
 */
StdIo.prototype.onTrace = function (/* ...msg */) {
  this.write(process.stdout, 'TRACE', clc.cyanBright.bold, arguments);
};

module.exports = StdIo;