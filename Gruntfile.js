const { resolve } = require('path');

module.exports = function(grunt) {
  // load plugins
  grunt.config.init({
    package: require('./package.json'),
    distDir: resolve(__dirname, 'dist'),
    bowerSubmodule: resolve(__dirname, 'src/bower_es_js'),
    meta: {
      banner:
        '/*! <%= package.name %> - v<%= package.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= package.homepage ? " * " + package.homepage + "\\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= package.author.company %>;' +
        ' Licensed <%= package.license %> */\n',
    },

    clean: require('./grunt/config/clean'),
    compress: require('./grunt/config/compress'),
    concat: require('./grunt/config/concat'),
    copy: require('./grunt/config/copy'),
    run: require('./grunt/config/run'),
    uglify: require('./grunt/config/uglify'),
    webpack: require('./grunt/config/webpack'),
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-webpack');

  require('./grunt/browser_clients')(grunt);
  require('./grunt/tasks')(grunt);
};
