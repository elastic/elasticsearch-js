var async = require('async');
var cp = require('child_process');
var chalk = require('chalk');
var argv = require('optimist')
  .usage([
    'Runner for the Elasticsearch.js unit and integration tests in both node and the browser.',
    'To negate a flag you can use --no-{{flag}}.',
    '',
    'Examples:',
    '',
    '# Before a commit (unit tests in Node & Phantom + integration in Chrome & Firefox):',
    'npm test --unit --integration --browsers=chrome,firefox',
    '',
    '# After a change in the rest-spec:',
    'npm test --no-unit --integration --browsers=chrome,firefox --check-upstream',
    '',
    '# During dev (just Node unit tests):',
    'npm test --no-browsers',
    ''
  ].join('\n'))
  .options({
    server: {
      default: true,
      alias: 's'
    },
    unit: {
      default: false,
      alias: 'u'
    },
    integration: {
      default: false,
      alias: 'i'
    },
    host: {
      default: 'localhost',
      description: 'hostname for elasticsearch instance used in integration tests'
    },
    port: {
      default: 9200,
      alias: 'p'
    },
    browsers: {
      default: '*',
      alias: 'b'
    },
    'check-upstream': {
      default: false,
      description: 'check for remote updates to the yaml test suite'
    }
  });

if (process.argv.indexOf('help') + process.argv.indexOf('--help') + process.argv.indexOf('-h') !== -3) {
  argv.showHelp();
  process.exit(1);
}

if (process.env.npm_config_argv) {
  // when called by NPM
  argv = argv.parse([].concat(process.argv).concat(JSON.parse(process.env.npm_config_argv).original));
} else {
  // when called directly
  argv = argv.argv;
}

var commands = [];
var command;

if (argv['check-upstream']) {
  command = ['node', 'scripts/generate'];
  if (argv.force) {
    command.push('--force');
  }
  commands.push(command);
}

if (argv.unit) {
  if (argv.server) {
    commands.push(['./node_modules/.bin/mocha', 'test/unit/test_*.js', '--require should']);
  }
  if (argv.browsers) {
    commands.push(['./node_modules/.bin/testling', '.']);
  }
}

if (argv.integration) {
  if (argv.server) {
    commands.push([
      './node_modules/.bin/mocha',
      'test/integration/yaml_suite/index.js',
      // '-b',
      '--require', 'should',
      '--host', argv.host,
      '--port', argv.port
    ].filter(Boolean));
  }
  if (argv.browsers) {
    commands.push([
      'node',
      'scripts/run_browser_integration_suite/index.js',
      '--browsers',
      argv.browsers
    ]);
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
