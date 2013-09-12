/* jshint node:true */
'use strict';

module.exports = function (grunt) {

  var pre = [
    'src/pre.js',
    'src/shared.js',
    'src/serializer.js',
    'src/serializer/*',
    'src/selector.js',
    'src/logger/*',
    'src/transport.js'
  ];

  var post = ['src/client.js','src/post.js'];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= pkg.license %> */\n\n'
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      node: {
        src: pre.concat(['src/transport/elasticsearch-node.js'],post),
        dest: 'dist/elasticsearch-node.js'
      }
    },
    nodeunit: {
      files: ['test/**/*.js']
    },
    jshint: {
      files: ['Gruntfile.js', '<%= concat.node.dest %>', 'test/**/*.js' ],
      options: {
        bitwise: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        globalstrict: true,
        devel: true,
        node: true,
        globals: {
          exports: true,
          module: false
        }
      }
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');


  // Default task.
  grunt.registerTask('default', ['concat','nodeunit','jshint']);

};