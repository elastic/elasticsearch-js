const get = require('lodash.get');
const utils = require('../utils');
const fromRoot = require('path').join.bind(null, __dirname, '..', '..');

const release = process.env.ES_RELEASE;
const ref = process.env.ES_REF;
const port = parseFloat(get(process.env, 'ES_PORT', 9400));
const host = get(process.env, 'ES_HOST', 'localhost');

const Version = require('../../scripts/Version');
const versionedOpts = [
  {
    version: '*',
    directory: fromRoot('tmp/esvm'),
    nodes: 1,
    quiet: false,
    logLevel: 'ERROR',
    config: {
      'path.data': fromRoot('tmp/esvm/data_dir'),
      'node.name': 'elasticsearch_js_test_runner',
      'cluster.name': 'elasticsearch_js_test_runners',
      'http.port': port,
      'network.host': host,
      'discovery.zen.minimum_master_nodes': 1
    }
  },
  {
    version: '<3',
    config: {
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
    version: '>=1.6 <5.0',
    config: {
      'node.bench': true
    }
  },
  {
    version: '>2.0 <5.0',
    config: {
      'node.testattr': 'test'
    }
  },
  {
    version: '>=5.0',
    config: {
      'node.attr.testattr': 'test'
    }
  },
  {
    version: '>=1.6 <5.0',
    config: {
      'script.indexed': true
    }
  },
  {
    version: '>=1.6',
    config: {
      'script.inline': true,
      'path.repo': process.env.ES_PATH_REPO || fromRoot('tmp/.es-snapshot-repos'),
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
  let v;
  const opts = {
    config: {
      'http.port': port
    }
  };

  if (release) {
    v = new Version(String(release).replace(/^v/, ''));
    opts.version = v.version;
  }
  else if (ref) {
    v = Version.fromBranch(String(ref).replace(/v?(\d+\.\d+)\..+/, '$1'));
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
