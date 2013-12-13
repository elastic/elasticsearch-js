module.exports = function (grunt) {

  grunt.registerTask('browser_clients_release', [
    'prompt:confirm_release',
    'check_for_confirmation',
    'browser_clients_build',
    'compress:dist_zip',
    'compress:dist_tarball',
    's3:release'
  ]);

  grunt.registerTask('check_for_confirmation', function () {
    if (grunt.config.get('confirm.release')) {
      grunt.verbose.log('release confirmed');
    } else {
      throw new Error('Aborting release');
    }
  });

};