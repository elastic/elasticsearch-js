var root = require('find-root')(__dirname);
var rel = require('path').resolve.bind(null, root);
var rootReq = function (p) { return require(rel(p)); };
// var _ = rootReq('src/lib/utils');
var grunt = require('grunt');

var JENKINS_REPORTER = rel('test/utils/jenkins-reporter.js');

var config = {
  unit: {
    src: 'test/unit/index.js',
    options: {
      reporter: 'nyan'
    }
  },

  ci_unit: {
    src: 'test/unit/index.js',
    options: {
      reporter: 'spec'
    }
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
  },

  integration: {
    src: null,
    options: {
      reporter: 'spec'
    }
  },

  jenkins_integration: {
    src: null,
    options: {
      reporter: JENKINS_REPORTER
    }
  }
};

grunt.registerTask('mocha_integration', function (branch) {
  grunt.config.set(
    'mochacov.integration.src',
    'test/integration/yaml_suite/index_' + _v4.snakeCase(branch) + '.js'
  );
  grunt.task.run('mochacov:integration');
});

grunt.registerTask('mocha_jenkins_integration', function (branch) {
  grunt.config.set(
    'mochacov.jenkins_integration.src',
    'test/integration/yaml_suite/index_' + _v4.snakeCase(branch) + '.js'
  );
  grunt.task.run('mochacov:jenkins_integration');
});

module.exports = config;
