module.exports = function (grunt) {
  grunt.registerTask('browser_clients:test', [
    'browser_clients:build',
    'run:browser_test_server',
    'saucelabs-mocha'
  ]);

  grunt.registerTask('browser_clients:build', [
    'clean:dist',
    'browserify:browser_client',
    'browserify:angular_client',
    'browserify:jquery_client',
    'uglify:dist',
    'concat:dist_banners'
  ]);

  grunt.registerTask('browser_clients:distribute', [
    'browser_clients:build',
    'copy:dist_to_named_dir',
    'compress:master_zip',
    'compress:master_tarball',
    's3:upload_archives'
  ]);

  grunt.registerTask('browser_clients:release', [
    'prompt:confirm_release',
    '__check_for_confirmation',
    'browser_clients:build',
    'copy:dist_to_named_dir',
    'compress:release_zip',
    'compress:release_tarball',
    's3:upload_archives'
  ]);

  grunt.registerTask('__check_for_confirmation', function () {
    if (grunt.config.get('confirm.release')) {
      grunt.log.verbose.writeln('release confirmed');
    } else {
      throw new Error('Aborting release');
    }
  });

};