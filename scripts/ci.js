/**
 * Run the tests, and setup es if needed
 *
 * ENV VARS:
 *  ES_V - a version identifier used by jenkins. don't use this
 *  ES_BRANCH - the ES branch we should use to generate the tests and download es
 *  ES_RELEASE - a specific ES release to download in use for testing
 *  NODE_UNIT=1 - 0/1 run the unit tests in node
 *  NODE_INTEGRATION=1 - 0/1 run the integration tests in node
 *  BROWSER_UNIT - the browser to test in using, sauce labs. One of 'ie', 'firefox', 'chrome'
 *  COVERAGE - 0/1 check for coverage and ship it to coveralls
 *******/

var Promise = require('bluebird');
var _ = require('lodash-node');
var through2 = require('through2');
var map = require('through2-map');
var split = require('split');
var join = require('path').join;
var child_process = require('child_process');
var chalk = require('chalk');
var format = require('util').format;

var ROOT = join(__dirname, '..');
var GRUNT = join(ROOT, './node_modules/.bin/grunt');
var ENV = _.clone(process.env);
var JENKINS = !!ENV.JENKINS_HOME;

/******
 * SETUP
 ******/
var taskChain = Promise.resolve();
var output; // main output stream
var taskOut; // task output stream

/******
 * GET VERSION
 ******/
task(
  'read version from environment',
  true,
  function () {
    function read() {
      if (ENV.ES_V) {
        var match;
        if (match = ENV.ES_V.match(/^(.*)_nightly$/)) {
          return [match[1], null];
        }

        if (/^(?:1\.\d+|0\.90)\..*$/.test(ENV.ES_V)) {
          return ['v' + ENV.ES_V, ENV.ES_V];
        }

        throw new Error('unable to parse ES_V ' + ENV.ES_V);
      }

      if (ENV.ES_RELEASE) {
        return ['v' + ENV.ES_RELEASE, ENV.ES_RELEASE];
      }

      if (ENV.ES_BRANCH) {
        return [ENV.ES_BRANCH, null];
      }
    }

    var ver = read();
    if (!ver) {
      throw new Error('Unable to run the ci script without at least an ES_BRANCH or ES_RELEASE environment var.');
    }

    if (ver[0]) {
      taskOut.write('branch: ' + (ENV.ES_BRANCH = ver[0]) + '\n');
    } else {
      delete ENV.ES_BRANCH;
    }

    if (ver[1]) {
      taskOut.write('release: ' + (ENV.ES_RELEASE = ver[1]) + '\n');
    } else {
      delete ENV.ES_RELEASE;
    }
  }
);

task(
  'node unit tests',
  ENV.NODE_UNIT !== '0',
  function () {
    if (!JENKINS) {
      return grunt('jshint', 'mochacov:unit');
    }

    return grunt('mochacov:jenkins_unit');
  }
);

task(
  'node integration tests',
  ENV.NODE_INTEGRATION !== '0',
  function () {
    var branch = ENV.ES_BRANCH;

    return node('scripts/generate', '--no-api', '--branch', branch)
    .then(function () {
      var target = (JENKINS ? 'jenkins_' : '') + 'integration:' + branch;
      return grunt('esvm:ci_env', 'mocha_' + target, 'esvm_shutdown:ci_env');
    });
  }
);

task(
  'browser unit tests',
  ENV.BROWSER_UNIT === '1',
  function () {
    return new Promise(function (resolve, reject) {
      // build the clients and start the server, once the server is ready call trySaucelabs()
      var serverTasks = ['browser_clients:build', 'run:browser_test_server:keepalive'];
      spawn(GRUNT, serverTasks, function (cp) {
        var stdout = cp.stdout;
        var lines = split();
        var findReady = through2(function (line, enc, cb) {
          cb();

          line = String(line);
          if (line.indexOf('run:browser_test_server') === -1) return;

          trySaucelabs()
          .finally(function () {
            cp.kill();
          })
          .then(resolve, reject);

          stdout.unpipe(lines);
          lines.end();
        });

        stdout.pipe(lines).pipe(findReady);
      });

      // attempt to run tests on saucelabs and retry if it fails
      var saucelabsAttempts = 0;
      function trySaucelabs() {
        saucelabsAttempts++;
        return new Promise(function (resolve, reject) {
          spawn(GRUNT, ['saucelabs-mocha'], function (cp) {

            var failedTests = 0;
            cp.stdout
            .pipe(split())
            .pipe(map(function (line) {
              line = String(line);
              if (line.trim() === 'Passed: false') {
                failedTests ++;
              }
            }));

            cp.on('error', reject);
            cp.on('exit', function (code) {
              if (code > 0) {
                if (failedTests > 0) {
                  return reject(new Error('Browser tests failed'));
                }

                if (saucelabsAttempts >= 3) {
                  return reject(new Error('Saucelabs is like really really down. Tried 3 times'));
                }

                taskOut.write(chalk.blue('trying saucelabs again...'));
                return trySaucelabs().then(resolve, reject);
              }

              return resolve();
            });
          })
          // swallow spawn() errors
          .then(_.noop, _.noop);
        });
      }
    });
  }
);

task(
  'code coverage',
  ENV.COVERAGE === '1',
  function () {
    return grunt('mochacov:ship_coverage')
    .catch(function () {
      taskOut.write('FAILED TO SHIP COVERAGE! but that\'s okay\n');
    });
  }
);

/******
 * FINISH
 */
taskChain
.finally(function () {
  // output directly to stdout
  output = process.stdout;
})
.then(function () {
  logImportant(chalk.bold.green('✔︎ SUCCESS'));
})
.catch(function (e) {
  logImportant(chalk.bold.red('✗ FAILURE\n\n' + e.stack));

  // override process exit code once it is ready to close
  process.once('exit', function () {
    process.exit(1);
  });
});

/******
 * utils
 ******/

function log() {
  var chunk = format.apply(null, arguments);
  output.write(chunk + '\n');
}

function logImportant(text) {
  log('\n------------');
  log(text);
  log('------------\n');
}

function indent() {
  var RE = /\n/g;
  var first = true;
  return through2(
    function (chunk, enc, cb) {
      if (first) {
        this.push('  ');
        first = false;
      }

      this.push(('' + chunk).replace(RE, '\n  '));
      cb();
    },
    function (cb) {
      this.push('\n');
      cb();
    }
  );
}

function task(name, condition, block) {
  if (!condition) return;

  taskChain = taskChain.then(function () {
    taskOut = through2();
    output = through2();

    taskOut
    .pipe(indent())
    .pipe(output);

    output
    .pipe(process.stdout, { end: false });

    log(chalk.white.underline(name));

    function flushTaskOut() {
      return new Promise(function (resolve) {
        // wait for the taskOut to finish writing before continuing
        output.once('finish', function () {
          process.stdout.write('\n');
          resolve();
        });
        taskOut.end(); // will end output as well
        taskOut = output = null;
      });
    }

    return Promise.try(block).finally(flushTaskOut);
  });
}

function spawn(file, args, block) {
  return new Promise(function (resolve, reject) {
    var cp = child_process.spawn(file, args, {
      cwd: ROOT,
      env: ENV,
      stdio: [0, 'pipe', 'pipe']
    });

    cp.stdout.pipe(taskOut, { end: false });
    cp.stderr.pipe(taskOut, { end: false });

    var stdout = '';
    cp.stdout
    .pipe(through2(function (chunk, enc, cb) {
      stdout += chunk;
      cb();
    }));

    block && block(cp);

    cp.on('exit', function (code) {
      if (code > 0) {
        reject(new Error('non-zero exit code: ' + code));
      } else {
        resolve(stdout);
      }
    });

    cp.on('error', function (origErr) {
      reject(new Error('Unable to execute "' + file + ' ' + args.join(' ') + '": ' + origErr.message));
    });
  });
}

function node(/*args... */) {
  return spawn(process.execPath, _.toArray(arguments));
}

function grunt(/* args... */) {
  return spawn(GRUNT, _.toArray(arguments));
}