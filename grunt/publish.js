module.exports = function (grunt) {

  grunt.registerTask('publish', [
    'build',
    's3:latest'
  ]);

};