var utils = require('../utils');

var config = {
  generate: {
    exec: 'node ./scripts/generate/index.js',
    options: {
      passArgs: [
        'verbose'
      ]
    }
  },
  browser_test_server: {
    exec: 'node ./test/utils/server',
    options: {
      wait: false,
      quiet: false,
      ready: /listening/
    }
  },
  clone_bower_repo: {
    exec: [
      'test -d src/bower_es_js',
      'git clone git@github.com:elasticsearch/bower-elasticsearch-js.git <%= bowerSubmodule %>'
    ].join(' || '),
    options: {
      quiet: true
    }
  },
  checkout_bower_repo_master: {
    exec: 'git checkout master',
    options: {
      cwd: '<%= bowerSubmodule %>',
      quiet: true
    }
  },
  checkout_bower_repo_prerelease: {
    exec: 'git checkout prerelease',
    options: {
      cwd: '<%= bowerSubmodule %>',
      quiet: true
    }
  },
  push_prerelease_branch: {
    exec: 'git add -A && git commit -m "prerelease build" && git push origin prerelease',
    options: {
      cwd: '<%= bowerSubmodule %>',
      quite: true
    }
  },
  release_bower_tag: {
    exec: 'node ./scripts/release/bower'
  }
};

utils.branches.forEach(function (branch) {
  config['generate_' + branch] = {
    exec: 'node ./scripts/generate/index.js --branch=' + branch
  };
});

module.exports = config;