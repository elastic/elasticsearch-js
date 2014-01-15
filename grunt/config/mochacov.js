var unitTests = ['test/unit/test_*.js'];

module.exports = {
  unit: {
    src: unitTests
  },

  integration_master: {
    src: 'test/integration/yaml_suite/index.js'
  },

  'integration_0.90': {
    src: 'test/integration/yaml_suite/index_0_90.js'
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