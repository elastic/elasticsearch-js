module.exports = function (grunt) {

  // Default task runs the build process.
  grunt.registerTask('default', [
    'test'
  ]);

  grunt.registerTask('test', [
    'jshint',
    'mochacov:unit',
    'run:generate',
    'mochacov:integration',
  ]);

  grunt.registerTask('unit_test', [
    'jshint',
    'mochacov:unit'
  ]);

  grunt.registerTask('coverage', [
    'mochacov:make_coverage_html',
    'open:coverage'
  ]);
};