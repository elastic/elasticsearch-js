var async = require('async');
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

var root = require('path').join(__dirname, '../..');
var esSubModule = root + '/src/elasticsearch';

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

function makeSpawn(cmd, args, cwd) {
  return function (done) {
    spawn(cmd, args, {
      verbose: argv.versbose,
      cwd: cwd || esSubModule
    }, function (status) {
      done(status ? new Error('Non-zero exit code: %d', status) : void 0);
    });
  };
}

function generateBranch(branch, done) {
  async.series([
    makeSpawn('git', ['reset', '--hard']),
    makeSpawn('git', ['clean', '-fdx']),
    makeSpawn('git', ['checkout', 'origin/' + branch]),
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
  makeSpawn('git', ['submodule', 'update', '--', esSubModule], root)
];
if (argv.update) {
  steps.push(makeSpawn('git', ['fetch', 'origin'], esSubModule));
}
steps.push(
  async.apply(generateBranch, '0.90'),
  async.apply(generateBranch, 'master')
);

async.series(steps, function (err) {
  if (err) {
    throw err;
  }
});