var path = require('path');
var _ = require('../../../src/lib/utils');

var defaults = {
  executable: process.env.ES_HOME ? path.join(process.env.ES_HOME, './bin/elasticsearch') : null,
  clusterName: 'yaml-test-runner',
  dataPath: '/tmp/yaml-test-runner',
  host: 'localhost',
  port: '9200',
  match: '**'
};

if (process.browser) {
  module.exports = defaults;
} else {
  module.exports = require('optimist')
    .default(defaults)
    .boolean('createServer')
    .argv;
}
