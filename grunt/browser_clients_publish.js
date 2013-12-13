module.exports = function (grunt) {

  grunt.registerTask('browser_clients_publish', [
    'browser_clients_build',
    'compress:dist_zip',
    'compress:dist_tarball',
    's3:latest'
  ]);

};