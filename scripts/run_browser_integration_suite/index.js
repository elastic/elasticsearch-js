var server = require('./server');
var _ = require('lodash');
var open = require('open');
var async = require('async');
var chalk = require('chalk');

var browserAppNames = _.transform({
  safari: {
    darwin: 'Safari'
  },
  chrome: {
    darwin: 'Google Chrome',
    win32: 'Google Chrome',
    linux: 'google-chrome'
  },
  chromium: {
    linux: 'chromium-browser',
  },
  firefox: {
    darwin: 'Firefox',
    win32: 'Firefox',
    linux: 'firefox'
  },
  opera: {
    darwin: 'Opera',
    win32: 'Opera',
    linux: 'opera'
  }
}, function (browserAppNames, config, name) {
  if (config[process.platform]) {
    browserAppNames[name] = config[process.platform];
    return;
  }

  if (process.platform !== 'darwin' && process.platform !== 'win32' && config.linux) {
    browserAppNames[name] = config.executable;
    return;
  }
}, {});

var argv = require('optimist')
  .default({
    browsers: '*',
    forceGen: false,
    host: 'localhost',
    port: 9200
  })
  .boolean('forceGen')
  .alias({
    f: 'forceGen',
    b: 'browsers',
    h: 'host',
    p: 'port'
  })
  .argv;

server.browsers = [];

if (argv.browsers === '*') {
  server.browsers = _.keys(browserAppNames);
} else {
  argv.browsers.split(',').forEach(function (browser) {
    server.browsers.push(browser);
  });
}

var badKeys = _.difference(server.browsers, _.keys(browserAppNames));
if (badKeys.length) {
  console.error('Invalid keys: ' + badKeys.join(', '));
  process.exit();
} else {
  console.log('opening browser suite in', server.browsers);
}

server.on('tests done', function (report) {
  var reports = [];
  var success = true;
  _.each(report, function (testSucceeded, browser) {
    var msg = browser + ':' + (success ? '✔︎' : '⚑');
    if (testSucceeded) {
      msg = chalk.green(msg);
    } else {
      msg = chalk.red(msg);
      success = false;
    }
    reports.push(' - ' + msg);
  });
  console.log('test completed!\n', reports.join('\n'));
  process.exit(success ? 0 : 1);
});

async.series([
  function (done) {
    server.listen(0, function () {
      server.port = server.address().port;
      console.log('server listening on port', server.port);
      done();
    });
  },
  function (done) {
    async.eachSeries(_.clone(server.browsers), function (browser, browserDone) {
      open('http://localhost:' + server.port +
        '?es_hostname=' + encodeURIComponent(argv.host) +
        '&es_port=' + encodeURIComponent(argv.port) +
        '&browser=' + encodeURIComponent(browser), browserAppNames[browser]);

      server.once('browser complete', _.bind(browserDone, null, null));
    }, done);
  }
], function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

