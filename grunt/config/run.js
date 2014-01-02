module.exports = {
  options: {
    cwd: './scripts'
  },
  generate: {
    exec: 'node generate'
  },
  browser_integration_tests: {
    exec: 'node run_browser_integration_suite',
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