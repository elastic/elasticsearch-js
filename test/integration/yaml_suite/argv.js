var path = require('path');
var _ = require('../../../src/lib/utils');

var defaults = {
  executable: process.env.ES_HOME ? path.join(process.env.ES_HOME, './bin/elasticsearch') : null,
  clusterName: 'yaml-test-runner',
  dataPath: '/tmp/yaml-test-runner',
  host: 'localhost',
  port: '9400'
};

if (process.browser) {
  /* jshint browser:true */
  if (window.ES_HOST) {
    defaults.host = window.ES_HOST;
  }

  if (window.ES_PORT) {
    defaults.port = window.ES_PORT;
  }

  module.exports = defaults;
} else {
  module.exports = require('optimist')
    .default(defaults)
    .boolean('createServer')
    .argv;
}
