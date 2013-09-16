/** @module StreamLogger */

/**
 * A logger object, which listens to the LogBridge for logging events based on it's config. This
 * logger writes it logs to any [WriteableStream]{@link http://nodejs.org/api/stream.html#stream_class_stream_writable_1}.
 * @constructor
 * @param {Object} config    A hash of the config options
 * @param {[type]} logBridge [description]
 */
function Stream(config, logBridge) {
  this.setLevel(config.level);
}

module.exports = Stream;