var express = require('express');
var http = require('http');
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var root = path.join(__dirname, '../../..');
var glob = require('glob');
var browserify = require('browserify');
var pkg = require(root + '/package.json');
var testFiles = 'test/unit/test_!(' + [
  'file_logger',
  'http_connector',
  'stdio_logger',
  'console_logger',
  'stream_logger',
  'tracer_logger',
  'transport_with_server',
].join('') + ')*';

var defaultFiles = _.map(glob.sync(testFiles), function (filename) {
  return path.resolve(root, filename);
});

var aliasify = require('aliasify').configure({
  aliases: pkg.browser,
  excludeExtensions: 'json',
  // verbose: false,
  configDir: root
});

function browserBuild(name) {
  var files = _.union(defaultFiles, [path.resolve(root, 'test/unit/browser_test_' + name + '_build.js')]);

  return function (req, res, next) {
    res.set('Content-Type', 'application/javascript');

    var b = browserify(files);
    b.transform(aliasify);
    b.bundle({
      insertGlobals: true
    }).pipe(res);
  };
}

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
  .get('/browser.html', sendFile(root + '/test/angular_build_unit_tests.html'))
  .get('/jquery.html', sendFile(root + '/test/angular_build_unit_tests.html'))
  .get('/angular.html', sendFile(root + '/test/angular_build_unit_tests.html'))

  // support
  .get('/expect.js', sendFile(root + '/node_modules/expect.js/expect.js'))
  .get('/mocha.css', sendFile(root + '/node_modules/mocha/mocha.css'))
  .get('/mocha.js', sendFile(root + '/node_modules/mocha/mocha.js'))

  // libs
  .get('/angular.js', sendFile(root + '/test/utils/angular.js'))
  .get('/jquery.js', sendFile(root + '/test/utils/jquery.js'))

  // bundles
  .get('/angular_build.js', browserBuild('angular'))
  .get('/jquery_build.js', browserBuild('jquery'))
  .get('/browser_build.js', browserBuild('browser'));

http.createServer(app).listen(8000, function () {
  console.log('listening on port 8000');
});