module.exports = {
  generate: {
    exec: 'node scripts/generate'
  },
  unit_tests: {
    exec: 'node scripts/run_tests --unit --no-browsers',
    options: {
      passArgs: [
        'port',
        'host'
      ]
    }
  },
  integration_tests: {
    exec: 'node scripts/run_tests --integration --no-browsers',
    options: {
      passArgs: [
        'port',
        'host'
      ]
    }
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