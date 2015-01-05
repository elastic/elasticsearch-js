var utils = require('../utils');
var _ = require('lodash-node');

exports.options = {
  nodes: 1,
  config: {
    'node.name': 'elasticsearch_js_test_runner',
    'cluster.name': 'elasticsearch_js_test_runners',
    'http.port': 9400,
    'network.host': 'localhost',
    'discovery.zen.ping_timeout': 1,
    'discovery.zen.ping.multicast.enabled': false,
    'logger.level': 'ERROR',
  }
};

// targets for each branch
utils.branches.forEach(function (branch) {
  exports[branch] = {
    options: {
      branch: branch
    }
  };

  switch (branch) {
  case '0.90':
  case '1.0':
  case '1.1':
    // no special treatment
    break;
  default:
    exports[branch].options.config = _.merge({
      'node.bench': true,
      'script.disable_dynamic': false
    }, exports.options.config);

    break;
  }
});

// ci target, based on env variables
var ciVersion = process.env.ES_RELEASE;
var ciBranch = process.env.TESTING_BRANCH;
exports.ci_env = {
  options: {
    version: ciVersion,
    branch: !ciVersion && ciBranch,
  }
};