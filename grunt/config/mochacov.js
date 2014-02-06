var root = require('find-root')(__dirname);
var rootReq = function (p) { return require(require('path').resolve(root, p)); };
var utils = rootReq('grunt/utils');
var _ = rootReq('src/lib/utils');

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
    src: 'test/integration/yaml_suite/index_' + _.snakeCase(branch) + '.js'
  };
});

module.exports = config;