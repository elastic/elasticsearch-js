/**
 * Run the tests, and setup es if needed
 *
 * ENV VARS:
 *  RUN - a list of task names to run, specifying this turns of all other tasks
 *  ES_REF - the ES branch/tag we should use to generate the tests and download es
 *  ES_RELEASE - a specific ES release to download in use for testing
 *  ES_PORT - the port number we should run elasticsearch on
 *  ES_V - a version identifier used by jenkins. don't use this
 *
 * Tasks:
 *  NODE_UNIT - run the unit tests in node (default: true)
 *  NODE_INTEGRATION - run the integration tests in node  (default: true)
 *  SAUCE_LABS - run the browser tests  (default: false)
 *  CHECK_COVERAGE - check for coverage and ship it to coveralls (default: false)
 *
 *******/

var Promise = require('bluebird');
var _ = require('lodash');
var through2 = require('through2');
var map = require('through2-map');
var split = require('split');
var join = require('path').join;
var child_process = require('child_process');
var chalk = require('chalk');
var format = require('util').format;

var NL_RE = /(\r?\n)/g;
var ROOT = join(__dirname, '..');
var GRUNT = join(ROOT, 'node_modules', '.bin', 'grunt');
var ENV = _.clone(process.env);
var JENKINS = !!ENV.JENKINS_HOME;
var TASKS = [];

var output; // main output stream
var taskOut; // task output stream

task('NODE_UNIT', true, function () {
  if (!JENKINS) {
    return grunt('jshint', 'mochacov:unit');
  }

  return grunt('mochacov:jenkins_unit');
});

task('NODE_INTEGRATION', true, function () {
  var branch = ENV.ES_REF;

  return node('scripts/generate', '--no-api', '--branch', branch)
  .then(function () {
    var target = (JENKINS ? 'jenkins_' : '') + 'integration:' + branch;
    return grunt('esvm:ci_env', 'mocha_' + target, 'esvm_shutdown:ci_env');
  });
});

task('SAUCE_LABS', false, function () {
  return new Promise(function (resolve, reject) {
    // build the clients and start the server, once the server is ready call trySaucelabs()
    var serverTasks = ['browser_clients:build', 'run:browser_test_server:keepalive'];
    spawn(GRUNT, serverTasks, function (cp) {
      var toLines = split();

      cp.stdout
      .pipe(toLines)
      .pipe(through2(function (line, enc, cb) {
        cb();

        if (String(line).indexOf('listening on port 8000') === -1) return;


        trySaucelabs()
        .finally(function () { cp && cp.kill(); })
        .then(resolve, reject);

        cp.on('exit', function () { cp = null; });
        cp.stdout.unpipe(toLines);
        toLines.end();
      }));
    })
    // ignore server errors
    .catch(_.noop);

    // attempt to run tests on saucelabs and retry if it fails
    var saucelabsAttempts = 0;
    function trySaucelabs() {
      saucelabsAttempts++;
      return new Promise(function (resolve, reject) {
        log(chalk.green('saucelabs attempt #', saucelabsAttempts));
        spawn(GRUNT, ['saucelabs-mocha'], function (cp) {

          var failedTests = 0;
          cp.stdout
          .pipe(split())
          .pipe(map(function (line) {
            failedTests += String(line).trim() === 'Passed: false' ? 1 : 0;
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

              log(chalk.blue('trying saucelabs again...'));
              return trySaucelabs().then(resolve, reject);
            }

            return resolve();
          });
        })
        // swallow spawn() errors, custom error handler in place
        .catch(_.noop);
      });
    }
  });
});

task('CHECK_COVERAGE', false, function () {
  return grunt('mochacov:ship_coverage')
  .catch(function () {
    log('FAILED TO SHIP COVERAGE! but that\'s okay');
  });
});

execTask('SETUP', function () {
  return Promise.try(function readVersion() {
    if (!ENV.ES_V) {
      if (ENV.ES_RELEASE)
        return ['v' + ENV.ES_RELEASE, ENV.ES_RELEASE];

      if (ENV.ES_REF)
        return [ENV.ES_REF, null];
    }

    var match;
    if (match = ENV.ES_V.match(/^(.*)_nightly$/))
      return [match[1], null];

    if (/^(?:1\.\d+|0\.90)\..*$/.test(ENV.ES_V))
      return ['v' + ENV.ES_V, ENV.ES_V];

    throw new Error('unable to parse ES_V ' + ENV.ES_V);
  })
  .then(function readOtherConf(ver) {
    if (!ver)
      throw new Error('Unable to run the ci script without at least an ES_REF or ES_RELEASE environment var.');

    log('ES_PORT:', ENV.ES_PORT = parseInt(ENV.ES_PORT || 9400, 10));

    if (ver[0]) log('ES_REF:', ENV.ES_REF = ver[0]);
    else delete ENV.ES_REF;

    if (ver[1]) log('ES_RELEASE:', ENV.ES_RELEASE = ver[1]);
    else delete ENV.ES_RELEASE;
  })
  .then(function readTasks() {
    if (!ENV.RUN)
      return _.where(TASKS, { default: true });

    return ENV.RUN
    .split(',')
    .map(function (name) {
      return _.find(TASKS, { name: name.trim() });
    })
    .filter(Boolean);
  });
})
.then(function (queue) {
  if (!queue.length) {
    throw new Error('no tasks to run');
  }

  // Recursively do tasks until the queue is empty
  return (function next() {
    if (!queue.length) return;
    return execTask(queue.shift()).then(next);
  }());
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
  (taskOut || output || process.stdout).write(chunk + '\n');
}

function logImportant(text) {
  log('\n------------');
  log(text);
  log('------------');
}

function push(m) {
  return function () {
    var args = _.toArray(arguments);
    var cb = args.pop();
    this.push(m.apply(this, args));
    cb();
  };
}

function indent() {
  var str = through2(
    push(function (chunk) { return String(chunk).replace(NL_RE, '$1  '); }),
    push(function () { return '\n'; })
  );
  str.push('  ');
  return str;
}

function task(name, def, fn) {
  if (_.isFunction(def)) {
    fn = def;
    def = true;
  }

  TASKS.push({
    name: name,
    default: def,
    fn: fn
  });
}

function execTask(name, task) {
  if (_.isObject(name)) {
    task = name.fn;
    name = name.name;
  }

  output = through2();
  output
  .pipe(process.stdout, { end: false });

  log(chalk.white.underline(name));

  taskOut = through2();
  taskOut
  .pipe(indent())
  .pipe(output);

  function flushTaskOut() {
    return new Promise(function (resolve) {
      // wait for the taskOut to finish writing before continuing
      output.once('finish', function () {
        log('');
        resolve();
      });
      taskOut.end(); // will end output as well
      taskOut = output = null;
    });
  }

  return Promise.try(task).finally(flushTaskOut);
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
  return spawn(
    process.execPath,
    _.toArray(arguments)
  );
}

function grunt(/* args... */) {
  return spawn(
    GRUNT,
    _.toArray(arguments)
  );
}