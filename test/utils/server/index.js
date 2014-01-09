var express = require('express');
var http = require('http');
var fs = require('fs');
var _ = require('lodash');
var path = require('path');
var root = path.join(__dirname, '../../..');
var glob = require('glob');
var browserify = require('browserify');

var pkg = require(root + '/package.json');

var defaultFiles = _.transform(pkg.testling.files, function (files, pattern) {
  [].push.apply(files, _.map(glob.sync(pattern), function (filename) {
    console.log('resolving', filename);
    return path.resolve(root, filename);
  }));
}, []);

var aliasify = require('aliasify').configure({
  aliases: pkg.browser,
  excludeExtensions: 'json',
  // verbose: false,
  configDir: root
});

function browserBuild(name) {
  return function (req, res, next) {

    res.set('Content-Type', 'application/javascript');

    var b = browserify(_.union(defaultFiles, [
      path.resolve(root, 'test/unit/browser_test_' + name + '_build.js')
    ]));
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
  .get('/browser_build.js', browserBuild('browser'))

  // stupid
  .get('/begin!', function (req, res) {
    res.set('Content-Type', 'application/javascript');
    res.send([
      'mocha.run().on(\'end\', function () {',
      '  var stats = window.completeTestStats = {};',
      '  for (var key in this.stats) {',
      '    if (this.stats.hasOwnProperty(key)) {',
      '      stats[key] = this.stats[key];',
      '    }',
      '  }',
      '  console && console.dir && console.dir(window.completeTestStats);',
      '});'
    ].join('\n'));
  });

http.createServer(app).listen(8000, function () {
  console.log('listening on port 8000');
});