module.exports = function (grunt) {
  grunt.registerTask('browser_clients:test', [
    'build',
    'browserify:yaml_tests',
    'run:browser_unit_tests',
    'run:browser_integration_tests'
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
    'clean:dist',
    'browser_clients:build',
    'copy:dist_to_named_dir',
    'compress:master_zip',
    'compress:master_tarball',
    's3:latest'
  ]);

  grunt.registerTask('browser_clients:release', [
    'prompt:confirm_release',
    '__check_for_confirmation',
    'clean:dist',
    'browser_clients:build',
    'copy:dist_to_named_dir',
    'compress:release_zip',
    'compress:release_tarball',
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