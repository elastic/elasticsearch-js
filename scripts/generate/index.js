var async = require('async');
var fs = require('fs');
var spawn = require('../_spawn');
var argv = require('optimist')
  .options({
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
    },
    branch: {
      default: null,
      string: true
    }
  });

var path = require('path');
var root = require('find-root')(__dirname);
var fromRoot = path.join.bind(path, root);
var utils = require(fromRoot('grunt/utils'));
var _ = require(fromRoot('src/lib/utils'));
var esUrl = 'https://github.com/elasticsearch/elasticsearch.git';
var branches;

if (process.env.npm_config_argv) {
  // when called by NPM
  argv = argv.parse(JSON.parse(process.env.npm_config_argv).original);
} else {
  // when called directly
  argv = argv.argv;
}

if (argv.branch) {
  branches = [argv.branch];
} else {
  branches = utils.branches;
}


function isDirectory(dir) {
  var stat;
  try { stat = fs.statSync(dir); } catch (e) {}
  return (stat && stat.isDirectory());
}

function storeDir(branch) {
  return fromRoot('src/elasticsearch_' + _.snakeCase(branch));
}

function spawnStep(cmd, args, cwd) {
  return function (done) {
    spawn(cmd, args, {
      verbose: argv.versbose,
      cwd: cwd
    }, function (status) {
      done(status ? new Error('Non-zero exit code: %d', status) : void 0);
    });
  };
}

function checkoutStep(branch) {
  return function (done) {
    var dir = storeDir(branch);

    if (isDirectory(dir)) {
      return done();
    }

    spawnStep('git', [
      'clone', '--depth', '50', '--branch', branch, '--', esUrl, dir
    ], root)(done);
  };
}

function updateStep(branch) {
  return function (done) {
    if (!argv.update) {
      return done();
    }

    var dir = storeDir(branch);

    async.series([
      spawnStep('git', ['fetch', 'origin', branch], dir),
      spawnStep('git', ['reset', '--hard', 'origin/' + branch], dir),
      spawnStep('git', ['clean', '-fdx'], dir)
    ], done);
  };
}

function generateStep(branch) {
  return function (done) {
    async.parallel([
      argv.api && async.apply(require('./js_api'), branch),
      argv.tests && async.apply(require('./yaml_tests'), branch)
    ].filter(Boolean), done);
  };
}

var steps = [];
branches.forEach(function (branch) {
  steps.push(
    checkoutStep(branch),
    updateStep(branch),
    generateStep(branch)
  );
});

async.series(steps, function (err) {
  if (err) {
    throw err;
  }
});