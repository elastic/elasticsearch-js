module.exports = function (grunt) {

  // Default task runs the build process.
  grunt.registerTask('default', [
    'generate',
    'test'
  ]);

  grunt.registerTask('generate', [
    'run:generate'
  ]);

  grunt.registerTask('test', [
    'jshint',
    'mochacov:unit',
    'run:generate',
    'mochacov:integration',
  ]);

  grunt.registerTask('coverage', [
    'mochacov:make_html_unit_cov',
    'open:html_unit_cov'
  ]);

  grunt.registerTask('travis', [
    'test',
    'mochacov:coverage'
  ]);
};