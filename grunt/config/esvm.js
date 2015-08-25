var _ = require('lodash');
var utils = require('../utils');
var fromRoot = require('path').join.bind(null, __dirname, '..', '..');

var release = process.env.ES_RELEASE;
var ref = process.env.ES_REF;
var port = parseFloat(_.get(process.env, 'ES_PORT', 9400));
var host = _.get(process.env, 'ES_HOST', 'localhost');

var Version = require('../../scripts/Version');
var versionedOpts = [
  {
    version: '*',
    directory: fromRoot('esvm'),
    nodes: 1,
    quiet: false,
    config: {
      'path.data': fromRoot('esvm/data_dir'),
      'node.name': 'elasticsearch_js_test_runner',
      'cluster.name': 'elasticsearch_js_test_runners',
      'http.port': port,
      'network.host': host,
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
      'script.indexed': true,
      'path.repo': process.env.ES_PATH_REPO || fromRoot('.es-snapshot-repos'),
      'repositories.url.allowed_urls': 'http://snapshot.*'
    }
  }
];

// targets for each branch
utils.branches.forEach(function (branch) {
  exports[branch] = {
    options: Version.fromBranch(branch).mergeOpts(versionedOpts, {
      branch: branch,
      fresh: true
    })
  };
});


// ci target, based on env variables
(function () {
  var v;
  var opts = {
    config: {
      'http.port': port
    }
  };

  if (release) {
    v = new Version(String(release).replace(/^v/, ''));
    opts.version = v.version;
  }
  else if (ref) {
    v = new Version.fromBranch(String(ref).replace(/v?(\d+\.\d+)\..+/, '$1'));
    opts.branch = ref;
    opts.fresh = true;
  }
  else {
    return;
  }

  exports.ci_env = {
    options: v.mergeOpts(versionedOpts, opts)
  };
}());