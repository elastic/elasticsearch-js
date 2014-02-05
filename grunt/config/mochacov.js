var root = require('find-root')(__dirname);
var utils = require(root + '/grunt/utils');

var config = {
  unit: {
    src: 'test/unit/index.js'
  },

  // run the unit tests, and update coverage.html
  make_coverage_html: {
    src: 'test/unit/coverage.js',
    options: {
      reporter: 'html-cov',
      output: 'coverage.html',
      instrument: false
    }
  },

  // for use by travis
  ship_coverage: {
    src: 'test/unit/coverage.js',
    options: {
      reporter: 'mocha-lcov-reporter',
      coveralls: true,
      instrument: false
    }
  }
};

utils.branches.forEach(function (branch) {
  config['integration_' + branch] = {
    src: 'test/integration/yaml_suite/index' + utils.branchSuffix(branch) + '.js'
  };
});

module.exports = config;