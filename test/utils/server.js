/* eslint-disable import/no-unresolved */
var express = require('express');
var http = require('http');
var fs = require('fs');
var _ = require('lodash');
var async = require('async');
var root = require('path').join(__dirname, '../..');
var browserify = require('browserify');
var pkg = require(root + '/package.json');
var unitSpecDir = root + '/test/unit/specs';
var browserBuildsDir = root + '/test/unit/browser_builds';

var testFiles = {};

testFiles.unit = _(fs.readdirSync(unitSpecDir))
  .difference([
    'file_logger.js',
    'http_connector.js',
    'stdio_logger.js',
    'console_logger.js',
    'stream_logger.js',
    'tracer_logger.js',
    'transport_with_server.js'
  ])
  .map(function (file) {
    return unitSpecDir + '/' + file;
  })
  .value();

testFiles.build = fs.readdirSync(browserBuildsDir)
  .map(function (file) {
    if (file.substr(-3) === '.js') {
      return browserBuildsDir + '/' + file;
    }

    return null
  })
  .filter(Boolean);

// generic aliasify instance
var aliasify = require('aliasify').configure({
  aliases: pkg.browser,
  excludeExtensions: 'json',
  // verbose: false,
  configDir: root
});

// queue for bundle requests, two at a time
var bundleQueue = async.queue(function (task, done) {
  task(done);
}, 2);

// create a route that bundles a file list, based on the patterns defined in testFiles
function bundleTests(name) {
  return function (req, res, next) {
    bundleQueue.push(function (_cb) {
      var done = function (err) {
        if (err) { return next(err); }
        _cb(err);
      };

      res.set('Content-Type', 'application/javascript');

      var b = browserify(testFiles[name], {
        insertGlobals: true
      });
      b.transform(aliasify);
      var str = b.bundle();

      str.pipe(res);
      str.once('end', done);
      str.once('error', done);
    });
  };
}

// create a route that just rends a specific file (like a symlink or something)
function sendFile(file) {
  return function (req, res) {
    res.sendfile(file);
  };
}

var app = express();

app
  .use(app.router)
  // runners
  .get('/unit.html', sendFile(root + '/test/browser_unit_tests.html'))
  .get('/builds.html', sendFile(root + '/test/browser_build_unit_tests.html'))

  // support
  .get('/expect.js', sendFile(root + '/node_modules/expect.js/index.js'))
  .get('/mocha.css', sendFile(root + '/node_modules/mocha/mocha.css'))
  .get('/mocha.js', sendFile(root + '/node_modules/mocha/mocha.js'))
  .get('/screencast-reporter.css', sendFile(root + '/node_modules/mocha-screencast-reporter/screencast-reporter.css'))
  .get('/screencast-reporter.js', sendFile(root + '/node_modules/mocha-screencast-reporter/screencast-reporter.js'))

  // libs
  .get('/angular.js', sendFile(root + '/bower_components/angular/angular.js'))
  .get('/angular-mocks.js', sendFile(root + '/bower_components/angular-mocks/angular-mocks.js'))
  .get('/jquery.js', sendFile(root + '/node_modules/jquery/dist/jquery.js'))

  // builds
  .get('/elasticsearch.js', sendFile(root + '/dist/elasticsearch.js'))
  .get('/elasticsearch.angular.js', sendFile(root + '/dist/elasticsearch.angular.js'))
  .get('/elasticsearch.jquery.js', sendFile(root + '/dist/elasticsearch.jquery.js'))

  // bundles
  .get('/unit_tests.js', bundleTests('unit'))
  .get('/build_tests.js', bundleTests('build'))

  ;

http.createServer(app).listen(8000, function () {
  console.log('listening on port 8000');
});
