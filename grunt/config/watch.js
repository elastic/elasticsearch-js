module.exports = {
  source: {
    files: [
      'src/**/*.js',
      'grunt/**/*.js',
      'test/unit/**/*.js',
      'Gruntfile.js'
    ],
    tasks: [
      'jshint',
      'mochacov:unit'
    ],
    options: {
      interrupt: true
    }
  }
};