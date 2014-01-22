var express = require('express');
var http = require('http');
var fs = require('fs');
var _ = require('lodash');
var async = require('async');
var path = require('path');
var root = path.join(__dirname, '../../..');
var glob = require('glob');
var browserify = require('browserify');
var pkg = require(root + '/package.json');

var testFiles = {
  unit: 'test/unit/tests/!(' + [
    'file_logger',
    'http_connector',
    'stdio_logger',
    'console_logger',
    'stream_logger',
    'tracer_logger',
    'transport_with_server',
  ].join('|') + ')*.js',
  build: 'test/unit/browser_builds/*.js'
};

// resolve the test file globs
_.transform(testFiles, function (out, pattern, name) {
  out[name] = _.map(glob.sync(pattern), function (filename) {
    return path.resolve(root, filename);
  });
}, testFiles);

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
    bundleQueue.push(function (done) {
      res.set('Content-Type', 'application/javascript');

      var b = browserify(testFiles[name]);
      b.transform(aliasify);
      var str = b.bundle({
        insertGlobals: true
      });

      str.pipe(res);
      str.once('end', done);
      str.once('error', done);
    });
  };
}

// create a route that just rends a specific file (like a symlink or something)
function sendFile(file) {
  return function (req, res, next) {
    res.sendfile(file);
  };
}

var app = express();

app
  .use(express.logger('dev'))
  .use(app.router)
  // runners
  .get('/unit.html', sendFile(root + '/test/browser_unit_tests.html'))
  .get('/builds.html', sendFile(root + '/test/browser_build_unit_tests.html'))

  // support
  .get('/expect.js', sendFile(root + '/node_modules/expect.js/expect.js'))
  .get('/mocha.css', sendFile(root + '/node_modules/mocha/mocha.css'))
  .get('/mocha.js', sendFile(root + '/node_modules/mocha/mocha.js'))

  // libs
  .get('/angular.js', sendFile(root + '/test/utils/angular.js'))
  .get('/jquery.js', sendFile(root + '/test/utils/jquery.js'))

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