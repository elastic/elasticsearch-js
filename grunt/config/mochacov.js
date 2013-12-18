var unitTests = ['test/unit/test_*.js'];
var integrationTests = ['test/integration/yaml_suite/index.js'];

module.exports = {
  options: {
    require: ['should']
  },
  coverage: {
    src: unitTests,
    options: {
      reporter: 'mocha-lcov-reporter',
      coveralls: {
        serviceName: 'travis-ci',
        repoToken: process.env.ESJS_COVERALS_REPO_TOKEN
      }
    }
  },
  unit: {
    src: unitTests
  },
  integration: {
    src: integrationTests
  },
  make_html_unit_cov: {
    src: unitTests,
    options: {
      reporter: 'html-cov',
      output: 'coverage.html'
    }
  },

};