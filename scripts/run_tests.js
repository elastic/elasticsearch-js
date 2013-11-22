var async = require('async');
var cp = require('child_process');
var chalk = require('chalk');
var argv = require('optimist')
  .default({
    'check-upstream': false,
    'in-node': true,
    'in-browser': true,
    'not-in-node': false,
    'not-in-browser': false,
    'unit': true,
    'integration': true
  })
  .alias({
    u: 'unit',
    i: 'integration',
    b: 'in-browser',
    n: 'in-node',
  })
  .parse(JSON.parse(process.env.npm_config_argv).original);

if (argv['not-in-browser']) {
  argv.b = argv['in-browser'] = false;
}
if (argv['not-in-node']) {
  argv.n = argv['in-node'] = false;
}

var commands = [];

if (argv['check-upstream']) {
  commands.push(['node', 'scripts/generate/yaml_tests/index.js']);
}

if (argv.unit) {
  if (argv['in-node']) {
    commands.push(['mocha', 'test/unit/test_*.js', '--require=should']);
  }
  if (argv['in-browser']) {
    commands.push(['testling', '.']);
  }
}

if (argv.integration) {
  if (argv['in-node']) {
    commands.push(['mocha', 'test/integration/yaml_suite/index.js', '-b', '--require=should']);
  }
  if (argv['in-browser']) {
    commands.push(['node', 'scripts/run_browser_integration_suite/index.js']);
  }
}

if (commands.length) {
  async.forEachSeries(commands, function (args, done) {
    var command = args.shift();
    console.log(chalk.gray('\n\n' + '# ' + command + ' ' + args.join(' ')));
    var proc = cp.spawn(command, args, {
      stdio: 'inherit'
    });

    proc.on('error', function (err) {
      proc.removeAllListeners();
      done(err);
    });

    proc.on('exit', function (status) {
      proc.removeAllListeners();
      done(status ? new Error(command + ' exited with status ' + status) : void 0);
    });
  }, function (err) {
    if (err) {
      console.error(err.message);
      process.exit(1);
    } else {
      process.exit(0);
    }
  });
} else {
  console.log('Arguments resulted in no tests to run.');
  console.log('Try combining test types with environments');
}
