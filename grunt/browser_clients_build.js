module.exports = function (grunt) {
  grunt.registerTask('browser_clients_build', [
    'clean:dist',
    'browserify',
    'uglify:dist',
    'concat:dist_banners'
  ]);
};