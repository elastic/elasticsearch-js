/* jshint node:true */
'use strict';

module.exports = function (grunt) {

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
    mochaTest: {
      unit: [
        'test/unit/**/*.test.js'
      ],
      'yaml-suite': [
        'test/integration/yaml-suite/index.js'
      ],
      options: {
        colors: true,
        require: 'should',
        reporter: 'dot'
      }
    },
    jshint: {
      source: {
        src: [
          'src/**/*.js',
          'test/**/*.js',
          'Gruntfile.js'
        ]
      },
      options: {
        jshintrc: true
      }
    },
    watch: {
      source: {
        files: [
          'src/**/*',
          'test/**/*',
          'Gruntfile.js'
        ],
        tasks: [
          'jshint:source'
        ]
      },
      options: {
        interupt: true
      }
    }//,
    // docular: {
    //   groups: [
    //     {
    //       groupTitle: 'Node',
    //       groupId: 'example',
    //       groupIcon: 'icon-beer',
    //       sections: [
    //         {
    //           id: "client",
    //           title: "Client",
    //           scripts: [
    //             "src/lib/client.js"
    //           ],
    //           docs: [],
    //           rank : {}
    //         }
    //       ]
    //     }
    //   ],
    // }
    // ,
    // yuidoc: {
    //   compile: {
    //     name: '<%= pkg.name %>',
    //     description: '<%= pkg.description %>',
    //     version: '<%= pkg.version %>',
    //     url: '<%= pkg.homepage %>',
    //     logo: '<%= pkg.logo %>',
    //     options: {
    //       paths: 'src',
    //       themedir: '../yuidoc-bootstrap-theme',
    //       helpers: [
    //         '../yuidoc-bootstrap-theme/helpers/helpers.js'
    //       ],
    //       outdir: 'docs'
    //     }
    //   }
    // }
  });

  // load plugins
  // grunt.loadNpmTasks('grunt-docular');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jshint');


  // Default task.
  // grunt.registerTask('docs', ['docular']);
  grunt.registerTask('test', ['jshint', 'mochaTest']);
  grunt.registerTask('default', ['jshint', 'mochaTest:unit']);

};
