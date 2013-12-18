module.exports = {
  generate: {
    exec: 'node scripts/generate'
  },
  browser_unit_tests: {
    exec: 'node scripts/run_tests --unit --no-server',
    options: {
      cwd: '.',
      passArgs: [
        'port',
        'host'
      ]
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