/* jshint node:true */
'use strict';

module.exports = function (grunt) {

  var _ = require('lodash');
  var child_process = require('child_process');
  var sharedBrowserfyExclusions = [
    'src/lib/connectors/http.js',
    'src/lib/loggers/file.js',
    'src/lib/loggers/stdio.js',
    'src/lib/loggers/stream.js',
    'src/lib/loggers/stream.js'
  ];

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
    mochaTest: {
      unit: [
        'test/unit/**/*.test.js'
      ],
      yaml_suite: [
        'test/integration/yaml_suite/index.js'
      ],
      options: {
        colors: true,
        require: 'should',
        reporter: 'dot',
        bail: true,
        timeout: 11000
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
    },
    run: {
      js_api: {
        args: [
          'scripts/generate/js_api'
        ]
      },
      yaml_tests: {
        args: [
          'scripts/generate/yaml_tests'
        ]
      },
      integration_server: {
        args: [
          'test/browser_integration/server.js'
        ],
        options: {
          wait: false,
          ready: /server listening/
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
          ignore: _.union(sharedBrowserfyExclusions, [
            'src/lib/connectors/jquery.js',
            'src/lib/connectors/angular.js'
          ])
        }
      },
      angular_client: {
        files: {
          '<%= distDir %>/elasticsearch.angular.js': ['src/elasticsearch.angular.js']
        },
        options: {
          standalone: 'elasticsearch',
          ignore: _.union(sharedBrowserfyExclusions, [
            'src/lib/connectors/jquery.js',
            'src/lib/connectors/xhr.js'
          ])
        }
      },
      yaml_suite: {
        files: {
          'test/browser_integration/yaml_tests.js': ['test/integration/yaml_suite/index.js']
        },
        options: {
          external: [
            'optimist'
          ]
        }
      }
    },
    concat: {
      dist_banners: {
        files: {
          '<%= distDir %>/elasticsearch.js': ['<%= distDir %>/elasticsearch.js'],
          '<%= distDir %>/elasticsearch.angular.js': ['<%= distDir %>/elasticsearch.angular.js']
        },
        options: {
          banner: '<%= meta.banner %>'
        }
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= distDir %>/elasticsearch.min.js': '<%= distDir %>/elasticsearch.js',
          '<%= distDir %>/elasticsearch.angular.min.js': '<%= distDir %>/elasticsearch.angular.js'
        },
        options: {
          report: 'min',
          banner: '<%= meta.banner %>'
        },
        global_defs: {
          process: {
            browser: true
          }
        }
      }
    },
    mocha: {
      yaml_suite: {
        options: {
          // log: true,
          run: true,
          urls: [ 'http://localhost:8888' ],
          timeout: 10e3,
          '--web-security': false
        }
      }
    },
    open: {
      yaml_suite: {
        path: 'http://localhost:8888',
        app: 'Google Chrome'
      }
    }
  });

  // load plugins
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task.
  grunt.registerTask('default', [
    /*jshint scripturl:true*/
    'jshint',
    'mochaTest:unit',
    'build',
    'mochaTest:yaml_suite',
    // 'start:integration_server',
    // 'mocha:yaml_suite' -- this will fail because of the way that PhantomJS handle's DELETE requests with body's
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'browserify',
    'uglify:dist',
    'concat:dist_banners',
    'run:yaml_tests',
    'run:js_api'
  ]);

  grunt.registerTask('browser', [
    'run:integration_server',
    'open:yaml_suite',
    'wait:integration_server'
  ]);

};
