var utils = require('../utils');
var _ = require('lodash');
var join = require('path').join;

var defaultOpts = {
  directory: join(__dirname, '..', '..', '.esvm'),
  nodes: 1,
  quiet: false,
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
    }, target.options.config);
    break;
  }

  target.options = _.merge({}, defaultOpts, target.options);

  if (target.options.branch && !target.options.version) {
    target.options.fresh = true;
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
  var port = process.env.ES_PORT;

  var options = {
    config: {
      'http.port': port || 9200
    }
  };

  if (release) {
    options.version = release;
  }
  else if (branch) {
    options.branch = branch;
  }
  else {
    return;
  }

  exports.ci_env = { options: options };
  setBranchConfig(branch, exports.ci_env);
}());