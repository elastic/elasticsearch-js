/**
 * A logger object, which listens to the LogBridge for logging events based on it's config. This
 * logger writes it logs to any [WriteableStream](http://nodejs.org/api/stream.html#stream_class_stream_writable_1).
 *
 * @class Loggers.Stream
 * @constructor
 * @param {Object} config - A hash of the config options
 * @param {Log} logBridge - The log bridge that will emit events for each log entry
 */
function Stream(config, logBridge) {
  this.setLevel(config.level);
}

module.exports = Stream;