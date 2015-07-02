var utils = require('../utils');
var fromRoot = require('path').join.bind(null, __dirname, '..', '..');

var Version = require('../../scripts/Version');
var opts = [
  {
    version: '*',
    directory: fromRoot('.esvm'),
    nodes: 1,
    quiet: false,
    config: {
      'node.name': 'elasticsearch_js_test_runner',
      'cluster.name': 'elasticsearch_js_test_runners',
      'http.port': 9400,
      'network.host': 'localhost',
      'discovery.zen.ping.multicast.enabled': false
    }
  },
  {
    version: '<1.6',
    config: {
      'discovery.zen.ping_timeout': 1
    }
  },
  {
    version: '^1.2 <1.6',
    config: {
      'node.bench': true,
      'script.disable_dynamic': false
    }
  },
  {
    version: '>=1.6',
    config: {
      'node.bench': true,
      'script.inline': true,
      'script.indexed': true
    }
  },
  {
    version: '>=2.0',
    config: {
      'path.repo': process.env.ES_PATH_REPO || fromRoot('.es-snapshot-repos')
    }
  }
];

// targets for each branch
utils.branches.forEach(function (branch) {
  exports[branch] = {
    options: Version.fromBranch(branch).mergeOpts(opts, {
      branch: branch,
      fresh: true
    })
  };
});


// ci target, based on env variables
(function () {
  var release = process.env.ES_RELEASE;
  var ref = process.env.ES_REF;
  var port = process.env.ES_PORT;

  var v;
  var defaults = {
    config: {
      'http.port': port || 9200
    }
  };

  if (release) {
    v = new Version(String(release).replace(/^v/, ''));
    defaults.version = v.version;
  }
  else if (ref) {
    v = new Version.fromBranch(String(ref).replace(/v?(\d+\.\d+)\..+/, '$1'));
    defaults.branch = ref;
    defaults.fresh = true;
  }
  else {
    return;
  }

  exports.ci_env = {
    options: v.mergeOpts(opts, defaults)
  };
}());