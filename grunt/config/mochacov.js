var root = require('find-root')(__dirname);
var rel = require('path').resolve.bind(null, root);
var rootReq = function (p) { return require(rel(p)); };
var utils = rootReq('grunt/utils');
var _ = rootReq('src/lib/utils');

var JENKINS_REPORTER = rel('test/utils/jenkins-reporter.js');

var config = {
  unit: {
    src: 'test/unit/index.js'
  },

  jenkins_unit: {
    src: 'test/unit/index.js',
    options: {
      reporter: JENKINS_REPORTER
    }
  },

  // run the unit tests, and update coverage.html
  make_coverage_html: {
    src: 'test/unit/coverage.js',
    options: {
      reporter: 'html-cov',
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

  config['jenkins_integration_' + branch] = {
    src: 'test/integration/yaml_suite/index_' + _.snakeCase(branch) + '.js',
    options: {
      reporter: JENKINS_REPORTER
    }
  };
});

module.exports = config;