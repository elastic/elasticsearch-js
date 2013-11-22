var server = require('./server');
var child_process = require('child_process');
var _ = require('lodash');
var open = require('open');
var fs = require('fs');
var path = require('path');
var async = require('async');

var yamlTestSourceFile = path.join(__dirname, '../../test/integration/yaml_suite/index.js');
var yamlTestBundleFile = path.join(__dirname, '../../test/browser_integration/yaml_tests.js');
var clientEntryFile = path.join(__dirname, '../../src/elasticsearch.js');

var browsers = _.transform({
  safari: {
    darwin: 'Safari'
  },
  chrome: {
    darwin: 'Google Chrome',
    win32: 'Google Chrome',
    executable: 'google-chrome'
  },
  chromium: {

    executable: 'chromium-browser',
  },
  firefox: {
    darwin: 'Firefox',
    win32: 'Firefox',
    executable: 'firefox'
  },
  opera: {
    darwin: 'Opera',
    win32: 'Opera',
    executable: 'opera'
  }
}, function (browsers, config, name) {
  if (config[process.platform]) {
    browsers[name] = config[process.platform];
    return;
  }

  if (process.platform !== 'darwin' && process.platform !== 'win32' && config.executable) {
    browsers[name] = config.executable;
    return;
  }
}, {});

var argv = require('optimist')
  .default('browser', 'chrome')
  .default('force_gen', false)
  .boolean('force_gen')
  .alias('f', 'force_gen')
  .default('host', 'localhost')
  .default('port', 9200)
  .argv;

var browserAppName;

async.series([
  function (done) {
    if (browsers.hasOwnProperty(argv.browser)) {
      browserAppName = browsers[argv.browser];
      done();
    } else {
      done('--browser must be set to one of ' + _.keys(browsers).join(', ') + ' on this platform');
    }
  },
  function (done) {
    fs.exists('dist', function (yes) {
      if (!argv.force_gen && yes) {
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
      if (!argv.force_gen && yes) {
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

      open('http://localhost:' + port + '?es_hostname=' + encodeURIComponent(argv.host) +
           '&es_port=' + encodeURIComponent(argv.port) +
           '&browser=' + encodeURIComponent(argv.browser), browserAppName);
    });

    server.on('tests done', function (success) {
      console.log('test completed', success ? 'successfully' : 'but failed');
      process.exit(success ? 0 : 1);
    });
  }

});

