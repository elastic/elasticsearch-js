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

    'run:install_es_0_90',
    'run:es_0_90',
    'mochacov:integration_0_90',
    'stop:es_0_90'
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
    'browser_clients:test',
    'mochacov:ship_coverage'
  ]);
};