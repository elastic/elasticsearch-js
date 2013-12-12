module.exports = {
  source: {
    src: [
      'src/**/*.js',
      'scripts/**/*.js',
      'test/**/*.js -test/browser_integration/yaml_tests.js',
      'grunt/**/*.js',
      'Gruntfile.js'
    ],
    options: {
      jshintrc: true
    }
  }
};