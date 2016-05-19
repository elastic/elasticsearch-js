module.exports = function (grunt) {

  grunt.registerTask('browser_clients:dev', [
    'run:browser_test_server:keepalive'
  ]);

  grunt.registerTask('browser_clients:test', [
    'browser_clients:build',
    'run:browser_test_server',
    'saucelabs-mocha:all'
  ]);

  grunt.registerTask('browser_clients:build', function () {
    // prevent this from running more than once accidentally
    grunt.task.renameTask('browser_clients:build', 'browser_clients:rebuild');
    grunt.task.registerTask('browser_clients:build', []);

    grunt.task.run([
      'clean:dist',
      'webpack:browser_clients',
      'uglify:dist',
      'concat:dist_banners'
    ]);
  });

  grunt.registerTask('browser_clients:distribute', [
    'browser_clients:build',
    '_upload_archive:master'
  ]);

  grunt.registerTask('browser_clients:release', [
    'prompt:confirm_release',
    '_check_for_confirmation',
    'browser_clients:build',
    '_upload_archive:release',
    'run:clone_bower_repo',
    'run:checkout_bower_repo_master',
    'copy:dist_to_bower',
    'run:release_bower_tag'
  ]);

  grunt.registerTask('browser_clients:push_prerelease', [
    'browser_clients:build',
    'run:clone_bower_repo',
    'run:checkout_bower_repo_prerelease',
    'copy:dist_to_bower',
    'run:push_prerelease_branch'
  ]);

  grunt.registerTask('_upload_archive', function (type) {
    this.requires(['browser_clients:build']);

    grunt.task.run([
      'copy:dist_to_named_dir',
      'compress:' + type + '_zip',
      'compress:' + type + '_tarball',
      's3:upload_archives'
    ]);
  });

  grunt.registerTask('_check_for_confirmation', function () {
    if (grunt.config.get('confirm.release')) {
      grunt.log.verbose.writeln('release confirmed');
    } else {
      throw new Error('Aborting release');
    }
  });
};
