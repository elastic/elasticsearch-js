module.exports = {
  source: {
    files: [
      'src/**/*.js',
      'test/unit/**/*.js',
      'grunt/**/*.js',
      'Gruntfile.js'
    ],
    tasks: [
      'jshint',
      'run:unit_tests'
    ],
    options: {
      interrupt: true,
    }
  }
};