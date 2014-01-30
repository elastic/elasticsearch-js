var async = require('async');
var _ = require('lodash');
var spawn = require('../_spawn');
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
    update: {
      default: true,
      boolean: true
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

function initSubmodule(done) {
  spawn('git', ['submodule', 'update', '--init'], argv, function (status) {
    done(status ? new Error('Unable to init submodules.') : void 0);
  });
  return;
}

function fetch(done) {
  spawn('git', ['submodule', 'foreach', 'git fetch origin'], argv, function (status) {
    done(status ? new Error('Unable fetch lastest changes.') : void 0);
  });
  return;
}

function generateBranch(branch, done) {
  async.series([
    function (done) {
      var cmd = [
        'git reset --hard',
        'git clean -fdx',
        'git checkout origin/' + branch
      ].join(' && ');

      spawn('git', ['submodule', 'foreach', cmd], function (status) {
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

var steps = [
  initSubmodule,
  fetch,
  async.apply(generateBranch, '0.90'),
  async.apply(generateBranch, 'master')
];

if (!argv.update) {
  steps = _.without(steps, fetch);
}

async.series(steps, function (err) {
  if (err) {
    throw err;
  }
});