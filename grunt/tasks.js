module.exports = function (grunt) {

  // Default task runs the build process.
  grunt.registerTask('default', [
    'test'
  ]);

  grunt.registerTask('test', [
    'jshint',
    'run:generate',
    'mochacov:unit',

    'run:install_es_master',
    'run:es_master',
    'mochacov:integration_master',
    'stop:es_master',

    'run:install_es_0.90',
    'run:es_0.90',
    'mochacov:integration_0.90',
    'stop:es_0.90'
  ]);

  grunt.registerTask('unit_test', [
    'jshint',
    'run:generate',
    'mochacov:unit',
  ]);

  grunt.registerTask('coverage', [
    'mochacov:make_coverage_html',
    'open:coverage'
  ]);
};