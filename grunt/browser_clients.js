module.exports = function (grunt) {
  grunt.registerTask('browser_clients:test', [
    'build',
    'run:browser_unit_tests',
    'run:browser_integration_tests'
  ]);

  grunt.registerTask('browser_clients:build', [
    'clean:dist',
    'browserify',
    'uglify:dist',
    'concat:dist_banners'
  ]);

  grunt.registerTask('browser_clients:publish', [
    'browser_clients_build',
    'compress:dist_zip',
    'compress:dist_tarball',
    's3:latest'
  ]);

  grunt.registerTask('browser_clients:release', [
    'prompt:confirm_release',
    '__check_for_confirmation',
    'browser_clients_build',
    'compress:dist_zip',
    'compress:dist_tarball',
    's3:release'
  ]);

  grunt.registerTask('__check_for_confirmation', function () {
    if (grunt.config.get('confirm.release')) {
      grunt.log.verbose.writeln('release confirmed');
    } else {
      throw new Error('Aborting release');
    }
  });

  // grunt.registerTask('browser_clients:export_all', function () {
  //   grunt.task.run([
  //     'build',
  //     'export_client:angular:../bower-elasticsearch-angular',
  //     'export_client::../bower-elasticsearch-browser',
  //     'export_client:jquery:../bower-elasticsearch-jquery'
  //   ]);
  // });

  // grunt.registerTask('browser_clients:export_client', function (build, outDir) {
  //   var path = require('path');

  //   grunt.config.set('copy.export_client', {
  //     expand: true,
  //     cwd: './dist/',
  //     src: 'elasticsearch' + (build ? '.' + build : '') + '{.min,}.js',
  //     dest: outDir,
  //     rename: function (dest, src) {
  //       return path.join(dest, 'elasticsearch' + (~src.indexOf('.min') ? '.min' : '') + '.js');
  //     }
  //   });

  //   this.requires('build');

  //   grunt.task.run([
  //     'copy:export_client'
  //   ]);
  // });


};