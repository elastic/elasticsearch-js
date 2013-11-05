/* jshint node:true */
'use strict';

module.exports = function (grunt) {

  var _ = require('lodash');
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
    generate: {
      js_api: {
        cmd: 'node',
        args: [
          'scripts/generate/js_api'
        ]
      },
      yaml_tests: {
        cmd: 'node',
        args: [
          'scripts/generate/yaml_tests'
        ]
      }
    },
    start: {
      integration_server: {
        cmd: 'node',
        args: [
          'test/browser_integration/server.js'
        ]
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
    }
  });

  // load plugins
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
    'start:integration_server',
    // 'mocha:yaml_suite' -- this will fail because of the way that PhantomJS handle's DELETE requests with body's
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'browserify',
    'uglify:dist',
    'concat:dist_banners',
    'generate:yaml_tests',
    'generate:js_api'
  ]);

  grunt.task.registerMultiTask('generate', 'used to generate things', function () {
    var done = this.async();
    var proc = require('child_process').spawn(
      this.data.cmd,
      this.data.args,
      {
        stdio: ['ignore', 'pipe', 'pipe']
      }
    );

    proc.stdout.on('data', grunt.log.write);
    proc.stderr.on('data', grunt.log.error);

    proc.on('close', function (exitCode) {
      done(!exitCode);
    });
  });

  var runningProcs = {};

  process.on('exit', function () {
    _.each(runningProcs, function (proc) {
      proc.kill();
    });
  });

  grunt.task.registerMultiTask('start', 'used to start external processes (like servers)', function () {
    var self = this;


    var proc = require('child_process').spawn(
      self.data.cmd,
      self.data.args,
      {
        stdio: ['ignore', 'pipe', 'pipe']
      }
    );

    proc.stdout.on('data', grunt.log.write);
    proc.stderr.on('data', function (chunk) {
      grunt.log.error(chunk);
      proc.kill();
      self.ansyc()(new Error('Error output received'));
      clearTimeout(timeoutId);
    });

    runningProcs[self.nameArgs] = proc;

    proc.on('close', function (exitCode) {
      delete runningProcs[self.nameArgs];
    });

    // operates asyncronously to give the processes a moment to start up, not sure if there is a signal for "I'm ready"
    var timeoutId = setTimeout(self.async(), 1000);
  });

  grunt.task.registerMultiTask('stop', 'used to stop external processes (like servers)', function () {
    var proc = runningProcs[this.nameArgs.replace(/^start:/, 'stop:')];
    if (proc) {
      proc.kill();
    } else {
      grunt.log.error(this.nameArgs + ' failed to find active process');
    }
  });

};
