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
  browser_test_server: {
    exec: 'node ./test/utils/server',
    options: {
      wait: false,
      ready: /listening/
    }
  }
};