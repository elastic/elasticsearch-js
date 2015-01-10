var root = require('find-root')(__dirname);
var rootReq = function (p) { return require(require('path').resolve(root, p)); };
var utils = rootReq('grunt/utils');
var _ = rootReq('src/lib/utils');

var JENKINS_REPORTER = 'test/utils/jenkins-reporter.js';

var config = {
  unit: {
    src: 'test/unit/index.js'
  },

  jenkins_unit: {
    src: 'test/unit/index.js',
    options: {
      reporter: JENKINS_REPORTER,
      output: 'test/junit-node-unit.xml'
    }
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

  config['jenkins_integration_' + branch] = {
    src: 'test/integration/yaml_suite/index_' + _.snakeCase(branch) + '.js',
    options: {
      reporter: JENKINS_REPORTER,
      output: 'test/junit-node-integration.xml'
    }
  };
});

module.exports = config;