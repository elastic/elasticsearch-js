module.exports = function (grunt) {
  var utils = require('./utils');

  // Default task runs the build process.
  grunt.registerTask('default', [
    'test'
  ]);

  grunt.registerTask('test', function (branch) {
    var tasks = [
      'jshint',
      'run:generate',
      'mochacov:unit'
    ];

    var branches = branch ? [branch] : utils.branches;

    branches.forEach(function (branch) {
      tasks.push(
        'run:install_es_' + branch,
        'run:es_' + branch,
        'mochacov:integration_' + branch,
        'stop:es_' + branch
      );
    });

    grunt.task.run(tasks);
  });

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