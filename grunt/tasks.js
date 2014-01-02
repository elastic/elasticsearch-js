module.exports = function (grunt) {

  // Default task runs the build process.
  grunt.registerTask('default', [
    'test'
  ]);

  grunt.registerTask('generate', [
    'run:generate'
  ]);

  grunt.registerTask('test', [
    'jshint',
    'mochacov:unit',
    'generate',
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

  grunt.registerTask('travis', [
    'test',
    'mochacov:ship_coverage'
  ]);
};