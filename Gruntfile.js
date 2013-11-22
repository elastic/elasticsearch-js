/* jshint node:true */
'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    distDir: 'dist',
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= pkg.license %> */\n' +
        ' // built using browserify\n\n'
    },
    clean: {
      dist: {
        src: ['<%= distDir %>']
      }
    },
    jshint: {
      source: {
        src: [
          'src/**/*.js',
          'scripts/**/*.js',
          'test/**/*.js -test/browser_integration/yaml_tests.js',
          'Gruntfile.js'
        ],
        options: {
          jshintrc: true
        }
      }
    },
    browserify: {
      client: {
        files: {
          '<%= distDir %>/elasticsearch.js': 'src/elasticsearch.js'
        },
        options: {
          standalone: 'elasticsearch',
          ignore: [
            'src/lib/connectors/jquery.js',
            'src/lib/connectors/angular.js'
          ]
        }
      },
      angular: {
        files: {
          '<%= distDir %>/elasticsearch.angular.js': ['src/elasticsearch.angular.js']
        },
        options: {
          ignore: [
            'src/lib/connectors/jquery.js',
            'src/lib/connectors/xhr.js',
            'when'
          ]
        }
      },
      jquery: {
        files: {
          '<%= distDir %>/elasticsearch.jquery.js': ['src/elasticsearch.jquery.js']
        },
        options: {
          ignore: [
            'src/lib/connectors/angular.js',
            'src/lib/connectors/xhr.js',
            'when'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= distDir %>/elasticsearch.min.js': '<%= distDir %>/elasticsearch.js',
          '<%= distDir %>/elasticsearch.angular.min.js': '<%= distDir %>/elasticsearch.angular.js',
          '<%= distDir %>/elasticsearch.jquery.min.js': '<%= distDir %>/elasticsearch.jquery.js'
        }
      }
    },
    concat: {
      dist_banners: {
        files: {
          '<%= distDir %>/elasticsearch.angular.js': '<%= distDir %>/elasticsearch.angular.js',
          '<%= distDir %>/elasticsearch.angular.min.js': '<%= distDir %>/elasticsearch.angular.min.js',
          '<%= distDir %>/elasticsearch.jquery.js': '<%= distDir %>/elasticsearch.jquery.js',
          '<%= distDir %>/elasticsearch.jquery.min.js': '<%= distDir %>/elasticsearch.jquery.min.js',
          '<%= distDir %>/elasticsearch.js': '<%= distDir %>/elasticsearch.js',
          '<%= distDir %>/elasticsearch.min.js': '<%= distDir %>/elasticsearch.min.js'
        },
        options: {
          banner: '<%= meta.banner %>'
        }
      }
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task runs the build process.
  grunt.registerTask('default', [
    'clean:dist',
    'browserify',
    'uglify:dist',
    'concat:dist_banners'
  ]);

};
