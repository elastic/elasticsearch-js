module.exports = {
  unit: {
    src: 'test/unit/index.js'
  },

  integration_master: {
    src: 'test/integration/yaml_suite/index.js'
  },

  'integration_0.90': {
    src: 'test/integration/yaml_suite/index_0_90.js'
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