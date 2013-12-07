module.exports = function (grunt) {

  grunt.registerTask('release', [
    'build',
    's3:release'
  ]);

};