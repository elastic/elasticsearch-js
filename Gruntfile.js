/* jshint node:true */
'use strict';

module.exports = function (grunt) {
  // load plugins
  require('load-grunt-config')(grunt, {
    configPath: require('path').join(__dirname, 'grunt/config'),
    init: true,
    config: {
      distDir: 'dist',
      meta: {
        banner: '/*! <%= package.name %> - v<%= package.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= package.homepage ? " * " + package.homepage + "\\n" : "" %>' +
          ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= package.author.company %>;' +
          ' Licensed <%= package.license %> */\n'
      }
    }
  });

  // load task definitions
  grunt.loadTasks('grunt');
};