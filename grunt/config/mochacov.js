var unitTests = ['test/unit/test_*.js'];
var integrationTests = ['test/integration/yaml_suite/index.js'];

module.exports = {
  options: {
    require: ['should']
  },
  unit: {
    src: unitTests
  },
  integration: {
    src: integrationTests
  },

  // run the unit tests, and update coverage.html
  make_coverage_html: {
    src: unitTests,
    options: {
      reporter: 'html-cov',
      output: 'coverage.html'
    }
  },

  // for use by travis
  ship_coverage: {
    src: unitTests,
    options: {
      reporter: 'mocha-lcov-reporter',
      coveralls: {
        serviceName: 'travis-ci'
      }
    }
  }
};