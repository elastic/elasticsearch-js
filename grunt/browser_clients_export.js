module.exports = function (grunt) {
  grunt.registerTask('export_client', function (build, outDir) {
    var path = require('path');

    grunt.config.set('copy.export_client', {
      expand: true,
      cwd: './dist/',
      src: 'elasticsearch' + (build ? '.' + build : '') + '{.min,}.js',
      dest: outDir,
      rename: function (dest, src) {
        return path.join(dest, 'elasticsearch' + (~src.indexOf('.min') ? '.min' : '') + '.js');
      }
    });

    this.requires('build');

    grunt.task.run([
      'copy:export_client'
    ]);
  });

  grunt.registerTask('export_all_clients', function () {
    grunt.task.run([
      'build',
      'export_client:angular:../bower-elasticsearch-angular',
      'export_client::../bower-elasticsearch-browser',
      'export_client:jquery:../bower-elasticsearch-jquery'
    ]);
  });
};