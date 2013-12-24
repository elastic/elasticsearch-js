module.exports = {
  generate: {
    exec: 'node scripts/generate'
  },
  browser_unit_tests: {
    exec: './node_modules/.bin/testling .',
    options: {
      cwd: '.'
    }
  },
  browser_integration_tests: {
    exec: 'node scripts/run_tests --integration --no-server',
    options: {
      cwd: '.',
      passArgs: [
        'port',
        'host'
      ]
    }
  }
};