module.exports = function (grunt) {

  grunt.registerTask('test', [
    'jshint',
    'run:unit_tests',
    'run:generate',
    'run:integration_tests'
  ]);

  grunt.registerTask('browser_clients_test', [
    'build',
    'run:browser_unit_tests',
    'run:browser_integration_tests'
  ]);

};