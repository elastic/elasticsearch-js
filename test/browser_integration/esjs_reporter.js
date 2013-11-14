(function (global) {
  /* jshint browser:true */
  /* global alert, BROWSER_NAME */

  /**
   * Save timer references to avoid Sinon interfering (see GH-237).
   */

  var Date = global.Date;
  var setTimeout = global.setTimeout;
  var setInterval = global.setInterval;
  var clearTimeout = global.clearTimeout;
  var clearInterval = global.clearInterval;
  var mocha = global.mocha;
  var Base = mocha.reporter('base')._reporter;
  var $ = global.jQuery;

  /**
   * Expose `HTML`.
   */

  global.EsjsReporter = EsjsReporter;

  /**
   * Initialize a new `HTML` reporter.
   *
   * @param {Runner} runner
   * @api public
   */

  function EsjsReporter(runner, root) {
    Base.call(this, runner);

    var stats = this.stats;
    var rootSuite = {
      $el: $('<ul id="mocha-report"></ul>'),
      results: [],
      suites: []
    };


    var stack = [rootSuite];
    rootSuite.$el.appendTo(root || '#mocha');

    runner.on('suite', function (suite) {
      if (suite.root) {
        $.post('/tests-started');
        return;
      }

      // suite
      suite = {
        name: suite.title,
        results: [],
        start: Date.now(),
        stdout: '',
        stderr: '',
        $el: $('<li class="suite">').append($('<h1>').text(suite.title)),
        $results: $('<ul>')
      };

      // append the list of results to the main element
      suite.$results.appendTo(suite.$el);

      // append to the previous stack leader
      stack[0].$el.append(suite.$el);
      if (!stack[0].suites) {
        stack[0].suites = [];
      }
      stack[0].suites.push(suite);

      // push the suite onto the top of the stack
      stack.unshift(suite);
    });

    runner.on('suite end', function (suite) {
      if (suite.root) {
        return;
      }
      stack[0].time = Date.now() - stack[0].start;
      stack.shift();
    });

    runner.on('fail', function (test, err) {
      if ('hook' === test.type) {
        runner.emit('test end', test);
      }
    });

    runner.on('test end', function (test) {
      // test
      var $test = $('<li>')
        .addClass('test')
        .addClass(test.state)
        .text(test.title + ' (' + test.duration + 'ms)');

      var errMsg = void 0;

      if ('passed' !== test.state && !test.pending) {
        errMsg = test.err.stack || test.err.toString();

        // FF / Opera do not add the message
        if (!~errMsg.indexOf(test.err.message)) {
          errMsg = test.err.message + '\n' + errMsg;
        }

        // <=IE7 stringifies to [Object Error]. Since it can be overloaded, we
        // check for the result of the stringifying.
        if ('[object Error]' === errMsg) {
          errMsg = test.err.message;
        }

        // Safari doesn't give you a stack. Let's at least provide a source line.
        if (!test.err.stack && test.err.sourceURL && test.err.line !== undefined) {
          errMsg += '\n(' + test.err.sourceURL + ':' + test.err.line + ')';
        }


        $test.append($('<pre class="error">').text(errMsg));
      }

      if (!test.pending) {
        if (stack[0]) {
          stack[0].results.push({
            name: test.title,
            time: test.duration,
            pass: test.state === 'passed',
            errMsg: errMsg
          });
          $test.appendTo(stack[0].$results);
        }
      }
    });

    runner.on('end', function () {
      var testResults = {
        stats: stats,
        suites: $.map(rootSuite.suites, function removeElements(suite) {
          var s = {
            name: suite.name,
            start: suite.start,
            time: suite.time,
            results: suite.results,
            stdout: suite.stdout,
            stderr: suite.stderr
          };

          if (suite.suites) {
            s.suites = $.map(suite.suites, removeElements);
          }
          return s;
        })
      };

      $.post('/tests-complete?browser=' + BROWSER_NAME, JSON.stringify(testResults), function () {
        window.close();
      });
    });

    /** override console to force all output to go to log and err, then we have all the output **/
    global.console = (function () {
      function flattenArgs(_arguments) {
        var args = [];
        for (var i = 0; i < _arguments.length; i++) {
          args.push(_arguments[i]);
        }
        return args;
      }

      function argsToString(args) {
        return $.map(flattenArgs(args), function (arg) {
          return String(arg);
        }).join('\n');
      }

      var origLog = $.noop;
      var origErr = $.noop;
      if (global.console) {
        if (global.console.log) {
          origLog = $.proxy(global.console, 'log');
        }
        if (global.console.error) {
          origErr = $.proxy(global.console, 'error');
        } else {
          origErr = origLog;
        }
      }

      return {
        log: function () {
          if (stack[0]) {
            stack[0].stdout += argsToString(arguments) + '\n\n';
          } else {
            origLog(argsToString(arguments));
          }
        },
        error: function () {
          if (stack[0]) {
            stack[0].stderr += argsToString(arguments) + '\n\n';
          } else {
            origErr(argsToString(arguments));
          }
        }
      };

    }());

  }

  mocha.reporter(EsjsReporter);

}(this));
