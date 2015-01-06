var utils = require('../utils');
var _ = require('lodash-node');

var defaultOpts = exports.options = {
  nodes: 1,
  quiet: true,
  config: {
    'node.name': 'elasticsearch_js_test_runner',
    'cluster.name': 'elasticsearch_js_test_runners',
    'http.port': 9400,
    'network.host': 'localhost',
    'discovery.zen.ping_timeout': 1,
    'discovery.zen.ping.multicast.enabled': false
  }
};

function setBranchConfig(branch, target) {
  switch (branch) {
  case '0.90':
  case '1.0':
  case '1.1':
    // no special treatment
    break;
  default:
    target.options.config = _.merge({
      'node.bench': true,
      'script.disable_dynamic': false
    }, defaultOpts.config);
    break;
  }
}

// targets for each branch
utils.branches.forEach(function (branch) {
  exports[branch] = {
    options: {
      branch: branch
    }
  };
  setBranchConfig(branch, exports[branch]);
});


// ci target, based on env variables
(function () {
  var release = process.env.ES_RELEASE;
  var branch = process.env.ES_BRANCH;

  if (release) {
    exports.ci_env = { options: { version: release } };

    var versions = process.env.ES_RELEASE.split('.');
    var major = versions.shift();
    var minor = versions.shift();
    branch = major + '.' + minor;
  }

  if (!release && branch) {
    exports.ci_env = { options: { branch: branch } };
  }

  if (!branch) {
    return;
  }

  setBranchConfig(branch, exports.ci_env);
}());