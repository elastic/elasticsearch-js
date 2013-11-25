var async = require('async');
var cp = require('child_process');
var chalk = require('chalk');
var argv = require('optimist')
  .usage([
    'Runner for the Elasticsearch.js unit and integration tests in both node and the browser.',
    'Specify --no-{{flag}} to negate it.'
  ].join('\n'))
  .default({
    server: true,
    browser: true,
    unit: true,
    integration: false,
    host: 'localhost',
    port: 9200,
    'check-upstream': false
  })
  .describe({
    host: 'hostname for elasticsearch instance used in integration tests',
    'check-upstream': 'check for remote updates to the yaml test suite'
  })
  .alias({
    u: 'unit',
    i: 'integration',
    b: 'browser',
    s: 'server',
  });

if (process.argv.indexOf('help') + process.argv.indexOf('--help') + process.argv.indexOf('-h') !== -3) {
  argv.showHelp();
  process.exit(1);
}

if (process.env.npm_config_argv) {
  // when called by NPM
  argv = argv.parse(JSON.parse(process.env.npm_config_argv).original);
} else {
  // when called by NPM - via `npm test`
  argv = argv.argv;
}

var commands = [];

if (argv['just-browser']) {
  argv.server = false;
  argv.browser = true;
}

if (argv['check-upstream']) {
  commands.push(['node', 'scripts/generate/yaml_tests/index.js']);
}

if (argv.unit) {
  if (argv.server) {
    commands.push(['mocha', 'test/unit/test_*.js', '--require=should']);
  }
  if (argv.browser) {
    commands.push(['testling', '.']);
  }
}

if (argv.integration) {
  if (argv.server) {
    commands.push([
      'mocha',
      'test/integration/yaml_suite/index.js',
      '-b',
      '--require=should',
      '--host=' + argv.host,
      '--port=' + argv.port
    ]);
  }
  if (argv.browser) {
    commands.push(['node', 'scripts/run_browser_integration_suite/index.js']);
  }
}

var proc = null;
process.on('exit', function () {
  if (proc && proc.kill) {
    proc.kill();
  }
});

if (commands.length) {
  async.forEachSeries(commands, function (args, done) {
    var command = args.shift();
    console.log(chalk.gray.bold('\n\n' + '# ' + command + ' ' + args.join(' ')));
    proc = cp.spawn(command, args, {
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
      console.log(chalk.red('\n\n⚑⚑⚑︎ Error! ⚑⚑⚑'));
      console.error(err.message);
      process.exit(1);
    } else {
      console.log(chalk.green('\n\n✔︎ looks good\n\n'));
      process.exit(0);
    }
  });
} else {
  console.log('Arguments resulted in no tests to run.');
  console.log('Try combining test types with environments');
}
