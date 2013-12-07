module.exports = function (grunt) {
  grunt.registerTask('build', [
    'clean:dist',
    'browserify',
    'uglify:dist',
    'concat:dist_banners'
  ]);
};