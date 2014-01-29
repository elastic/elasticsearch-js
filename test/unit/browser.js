var exclude = [
  'file_logger.js',
  'http_connector.js',
  'stdio_logger.js',
  'console_logger.js',
  'stream_logger.js',
  'tracer_logger.js',
  'transport_with_server.js'
];

var _ = require('lodash');
var specDir = __dirname + '/specs';

_(require('fs').readdirSync(specDir)).difference(exclude).each(function (file) {
  require(specDir + '/' + file);
});