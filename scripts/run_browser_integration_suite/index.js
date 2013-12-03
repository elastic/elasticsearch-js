var server = require('./server');
var child_process = require('child_process');
var _ = require('lodash');
var open = require('open');
var fs = require('fs');
var path = require('path');
var async = require('async');
var chalk = require('chalk');

var yamlTestSourceFile = path.join(__dirname, '../../test/integration/yaml_suite/index.js');
var yamlTestBundleFile = path.join(__dirname, '../../test/integration/browser_yaml_suite/yaml_tests.js');
var clientEntryFile = path.join(__dirname, '../../src/elasticsearch.js');

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

async.series([
  function (done) {
    fs.exists('dist', function (yes) {
      if (!argv.forceGen && yes) {
        done();
        return;
      }

      console.log('generating client with "grunt build"');
      child_process.spawn('grunt', ['build'], {
        stdio: 'inherit'
      }).on('close', function (status) {
        done(status && 'grunt closed with a status code of ' + status + '. aborting.');
      });
    });
  },
  function (done) {
    fs.exists(yamlTestBundleFile, function (yes) {
      if (!argv.forceGen && yes) {
        done();
        return;
      }

      console.log('generating browser\'s yaml_tests.js bundle');
      var b = require('browserify')();

      b.add(yamlTestSourceFile);
      var bundle = b.bundle({
        external: [
          'optimist'
        ],
        ignore: [
          'test/integration/yaml_suite/reporter',
          clientEntryFile
        ]
      });
      var file = fs.createWriteStream(yamlTestBundleFile, {
        flags: 'w',
        encoding: 'utf8',
        mode: 0666
      });

      bundle.pipe(file);

      file.once('error', function (err) {
        done(err);
      });

      bundle.once('error', function (err) {
        done(err);
      });

      bundle.once('end', function () {
        done();
      });

    });
  }
], function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    server.listen(0, function () {
      var port = server.address().port;
      console.log('server listening on port', port);

      async.eachSeries(_.clone(server.browsers), function (browser, done) {
        open('http://localhost:' + port +
          '?es_hostname=' + encodeURIComponent(argv.host) +
          '&es_port=' + encodeURIComponent(argv.port) +
          '&browser=' + encodeURIComponent(browser), browserAppNames[browser]);

        server.once('browser complete', function () {
          done();
        });
      });
    });

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
  }

});

