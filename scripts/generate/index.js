/*jshint curly: false */
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

var sourceDir = fromRoot('src/_elasticsearch_');
function storeDir(branch) {
  return fromRoot('src/_elasticsearch_' + _.snakeCase(branch));
}

function isDirectory(dir) {
  var stat;
  try { stat = fs.statSync(dir); } catch (e) {}
  return (stat && stat.isDirectory());
}

function spawnStep(cmd, args, cwd) {
  return function (done) {
    spawn(cmd, args, {
      verbose: argv.verbose,
      cwd: cwd
    }, function (status) {
      done(status ? new Error('Non-zero exit code: ' + status) : void 0);
    });
  };
}

function execStep(cmd, cwd) {
  return function (done) {
    spawn.exec(cmd, {
      verbose: argv.verbose,
      cwd: cwd
    }, function (status) {
      done(status ? new Error('Non-zero exit code: ' + status) : void 0);
    });
  };
}

function cloneStep() {
  return function (done) {
    if (isDirectory(sourceDir)) return done();
    spawnStep('git', ['clone', '--depth', '50', '--mirror', esUrl, sourceDir], root)(done);
  };
}

function fetchBranchesStep() {
  return spawnStep('git', ['fetch', '--depth', '50', 'origin'].concat(branches), sourceDir);
}

function removePrevArchive(branch) {
  return function (done) {
    var dir = storeDir(branch);

    if (!isDirectory(dir)) return done();
    else spawnStep('rm', ['-rf', dir], root)(done);
  };
}

function createArchive(branch) {
  return function (done) {
    var dir = storeDir(branch);
    if (isDirectory(dir)) return done();
    async.series([
      spawnStep('mkdir', [dir], root),
      execStep('git archive --format tar ' + branch + ' rest-api-spec | tar -x -C ' + dir, sourceDir)
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

var steps = [
  cloneStep(),
  fetchBranchesStep()
];
branches.forEach(function (branch) {
  if (argv.update) steps.push(removePrevArchive(branch));
  steps.push(
    createArchive(branch),
    generateStep(branch)
  );
});

async.series(steps, function (err) {
  if (err) {
    throw err;
  }
});