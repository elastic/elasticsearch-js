module.exports = function (grunt) {

  grunt.registerTask('browser_clients_publish', [
    'build_browser_clients',
    'compress:dist_zip',
    'compress:dist_tarball',
    's3:latest'
  ]);

};