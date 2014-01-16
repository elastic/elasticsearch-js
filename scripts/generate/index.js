var cp = require('child_process');
var async = require('async');
var estream = require('event-stream');
var chalk = require('chalk');
var argv = require('optimist')
  .options({
    force: {
      alias: 'f',
      default: false,
      boolean: true
    },
    verbose: {
      alias: 'v',
      default: false,
      boolean: true
    },
    api: {
      default: true,
      boolean: true
    },
    tests: {
      default: true,
      boolean: true
    },
    es_branch: {
      default: 'master',
      string: true,
      alias: 'b'
    }
  });

if (process.env.npm_config_argv) {
  // when called by NPM
  argv = argv.parse(JSON.parse(process.env.npm_config_argv).original);
} else {
  // when called directly
  argv = argv.argv;
}

if (!argv.force && process.env.FORCE || process.env.FORCE_GEN) {
  argv.force = argv.f = process.env.FORCE || process.env.FORCE_GEN;
}

function spawn(cmd, args) {
  console.log(chalk.white.bold('$ ' + cmd + ' ' + args.join(' ')));

  var proc = cp.spawn(cmd, args, { stdio: 'pipe'});
  var out = estream.split();

  if (argv.verbose) {
    proc.stdout.pipe(out);
  } else {
    proc.stdout.resume();
  }

  proc.stderr.pipe(out);

  out
    .pipe(estream.mapSync(function indent(line) {
      return '    ' + line + '\n';
    }))
    .pipe(process.stdout);

  return proc;
}

function initSubmodule(done) {
  spawn('git', ['submodule', 'update', '--init'])
    .on('exit', function (status) {
      done(status ? new Error('Unable to init submodules.') : void 0);
    });
  return;
}

function fetch(done) {
  spawn('git', ['submodule', 'foreach', 'git fetch origin'])
    .on('exit', function (status) {
      done(status ? new Error('Unable fetch lastest changes.') : void 0);
    });
  return;
}

function generateBranch(branch, done) {
  async.series([
    function (done) {
      spawn('git', ['submodule', 'foreach', [
        'git reset --hard', 'git clean -fdx', 'git checkout origin/' + branch
      ].join(' && ')])
        .on('exit', function (status) {
          done(status ? new Error('Unable to checkout ' + branch) : void 0);
        });
    },
    function (done) {
      var tasks = [];

      if (argv.api) {
        tasks.push(
          async.apply(require('./js_api'), branch)
        );
      }
      if (argv.tests) {
        tasks.push(
          async.apply(require('./yaml_tests'), branch)
        );
      }

      async.parallel(tasks, done);
    }
  ], done);
}

async.series([
  initSubmodule,
  fetch,
  async.apply(generateBranch, '0.90'),
  async.apply(generateBranch, 'master')
], function (err) {
  if (err) {
    throw err;
  }
});