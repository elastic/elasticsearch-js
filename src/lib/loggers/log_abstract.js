var Log = require('../log')
  , _ = require('../toolbelt');

function LogAbstract(config, bridge) {

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
LogAbstract.prototype.timestamp = function () {
  var d = new Date();
  return d.getUTCFullYear() + '-' +
    padNumToTen(d.getUTCMonth() + 1) + '-' +
    padNumToTen(d.getUTCDate()) + 'T' +
    padNumToTen(d.getUTCHours()) + ':' +
    padNumToTen(d.getUTCMinutes()) + ':' +
    padNumToTen(d.getUTCSeconds()) + 'Z';
};

function indent(test, spaces) {
  var space = _.repeat(' ', spaces || 2);
  return test.split(/\r?\n/).map(function (line) {
    return space + line;
  }).join('\n');
}

LogAbstract.prototype.format = function (label, message) {
  return label + ': ' + this.timestamp() + '\n' + indent(message) + '\n\n';
};

/**
 * Clear the current event listeners and then re-listen for events based on the level specified
 *
 * @method setupListeners
 * @private
 * @param  {Integer} level - The max log level that this logger should listen to
 * @return {undefined}
 */
LogAbstract.prototype.setupListeners = function (levels) {
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
LogAbstract.prototype.cleanUpListeners = function () {
  _.each(this.listeningLevels, function (level) {
    this.bridge.removeListener(level, this.handlers[level]);
  }, this);
};


module.exports = LogAbstract;
