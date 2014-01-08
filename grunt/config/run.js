module.exports = {
  generate: {
    exec: 'node ./scripts/generate/index.js',
    options: {
      passArgs: [
        'verbose',
        'es_branch'
      ]
    }
  },
  generate_yaml_tests: {
    exec: 'node ./scripts/generate/index.js --no-api',
    options: {
      passArgs: [
        'verbose',
        'es_branch'
      ]
    }
  },
  browser_integration_tests: {
    exec: 'node ./scripts/run_browser_integration_suite',
    options: {
      passArgs: [
        'browsers'
      ]
    }
  },
  browser_unit_tests: {
    exec: './node_modules/.bin/testling .',
    options: {
      passArgs: [
        'x'
      ]
    }
  }
};