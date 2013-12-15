module.exports = {
  source: {
    files: [
      'src/**/*.js',
      'test/unit/**/*.js',
      'grunt/**/*.js',
      'Gruntfile.js'
    ],
    interrupt: true,
    tasks: [
      // 'jshint',
      'run:unit_tests'
    ]
  }
};