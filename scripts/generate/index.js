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
  cp.exec('git submodule update --init && git submodule foreach git pull origin master',
  function (err, stdout, stderr) {
    stdout = stdout.trim();
    stderr = stderr.trim();

    if (err) {
      done(new Error('Unable to update submodules: ' + err.message));
      return;
    } else if (argv.verbose && stdout) {
      console.log(stdout);
    }

    if (stderr) {
      console.error(stderr);
    }
    done();
  });
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