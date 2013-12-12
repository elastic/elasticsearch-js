module.exports = function (grunt) {

  // Default task runs the build process.
  grunt.registerTask('default', [
    'run:generate',
    'test'
  ]);

};