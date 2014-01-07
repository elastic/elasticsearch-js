var cp = require('child_process');
var async = require('async');
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
    es_version: {
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

function updateSubmodules(done) {
  var branch = argv.es_version;
  // branch can be prefixed with = or suffixed with _nightly
  if (branch.indexOf) {
    ['='].forEach(function removePrefix(pref) {
      if (branch.indexOf(pref) === 0) {
        branch = branch.substring(pref.length);
      }
    });

    ['_nightly'].forEach(function removeSuffix(suf) {
      if (branch.indexOf(suf) === branch.length - suf.length) {
        branch = branch.substr(0, branch.length - suf.length);
      }
    });
  }

  var stdio = [
    'ignore',
    argv.verbose ? process.stdout : 'ignore',
    process.stderr
  ];

  async.series([
    function (done) {
      // init submodules
      cp.spawn('git', ['submodule', 'update', '--init'], {
        stdio: stdio
      }).on('exit', function (status) {
        done(status ? new Error('Unable to init submodules.') : void 0);
      });
    },
    function (done) {
      // checkout branch and clean it
      cp.spawn('git', ['submodule', 'foreach', 'git checkout --detach origin/' + branch + ' && git clean -f'], {
        stdio: stdio
      }).on('exit', function (status) {
        done(status ? new Error('Unable to init submodules.') : void 0);
      });
    }
  ], done);
}

updateSubmodules(function (err) {
  if (err) {
    throw err;
  }

  var tasks = [];

  if (argv.api) {
    tasks.push(require('./js_api'));
  }
  if (argv.tests) {
    tasks.push(require('./yaml_tests'));
  }

  async.parallel(tasks, function () {});
});