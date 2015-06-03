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

/**
 * set config vars based on the ref.
 *
 * @param {string} ref    - either a tag or branch name
 * @param {[type]} target - the grunt target to configure
 */
function setConfig(ref, target) {
  var minorV = String(ref).replace(/^v/, '').replace(/(\d+\.\d+)\..+/, '$1');

  switch (minorV) {
  case '0.90':
  case '1.0':
  case '1.1':
    // no special treatment
    break;
  case '1.2':
  case '1.3':
  case '1.4':
  case '1.5':
  case '1.6':
  case '1.x':
    target.options.config = _.merge({
      'node.bench': true,
      'script.disable_dynamic': false
    }, target.options.config);
    break;
  default:
    target.options.config = _.merge({
      'node.bench': true,
      'script.inline': true,
      'script.indexed': true
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
  setConfig(branch, exports[branch]);
});


// ci target, based on env variables
(function () {
  var release = process.env.ES_RELEASE;
  var ref = process.env.ES_REF;
  var port = process.env.ES_PORT;

  var options = {
    config: {
      'http.port': port || 9200
    }
  };

  if (release) {
    options.version = release;
  }
  else if (ref) {
    // assume it is a ref to a branch
    options.branch = ref;
  }
  else {
    return;
  }

  exports.ci_env = { options: options };
  setConfig(ref, exports.ci_env);
}());