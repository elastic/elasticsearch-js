var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var crypto = require('crypto');
var _ = require('lodash');
var util = require('util');
var chalk = require('chalk');
var moment = require('moment');
chalk.enabled = true;

var browserify = require('browserify');
var port = process.argv[2] || 8888;

var middleware = [];

Error.stackTraceLimit = Infinity;

var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function rand(length) {
  var str = '';
  while (str.length < length) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
}

function sendBundle(req, resp, files, opts, extend) {
  resp.setHeader('Content-Type', 'application/javascript');
  resp.writeHead(200);

  var b = browserify(files);

  if (typeof extend === 'function') {
    extend(b);
  }

  var out = b.bundle(opts);

  out.on('data', function (chunk) {
    resp.write(chunk);
  });

  out.on('end', function () {
    resp.end();
  });
}

function collectTestResults(req, resp) {
  var body = '';
  var browser = req.query.browser;
  var logFilename = path.join(__dirname, 'test-output-' + browser + '.xml');

  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('error', function (err) {
    resp.writeHead(500);
    resp.end(err.message || 'failed to receive request completely');
  });

  req.on('end', function () {
    var testDetails;
    try {
      testDetails = JSON.parse(body);
    } catch (e) {
      resp.writeHead(500);
      resp.end('encoding failure');
      return;
    }

    resp.writeHead(200);
    resp.end('good work');

    /**
     * The JUnit xml output desired by Jenkins essentially looks like this:
     *
     * testsuites:
     *   - testsuite: (name, timestamp, hostname, tests, failures, errors, time)
     *     - testcase: (error or failure, name, classname, time)
     *
     * Full XSD avaliable [here](http://windyroad.com.au/dl/Open%20Source/JUnit.xsd)
     *
     * from
     *
     * {
     *   stats: {
     *
     *   }
     *   suite: [
     *     {
     *       name:
     *       results: []
     *       suites: [] // optional
     *     }
     *   ]
     * }
     */

    var testXml = require('xmlbuilder');
    var suites = testXml.create('testsuites');
    var suiteCount = 0;

    _.each(testDetails.suites, function serializeSuite(suiteInfo) {

      var suite = suites.ele('testsuite', {
        package: 'elasticsearch-js:yaml_tests',
        id: suiteCount++,
        name: suiteInfo.name,
        timestamp: moment(suiteInfo.start).toJSON(),
        hostname: browser,
        tests: (suiteInfo.results && suiteInfo.results.length) || 0,
        failures: _.where(suiteInfo.results, {pass: false}).length,
        errors: 0,
        time: suiteInfo.time / 1000
      });

      _.each(suiteInfo.results, function (testInfo) {

        var parts = suiteInfo.name.replace(/\.yaml$/, '').replace(/\./g, '_').split(/\//);
        var section = parts.shift();
        var behavior = parts.join('/');

        var testcase = suite.ele('testcase', {
          name: behavior + ' - ' + testInfo.name,
          time: (testInfo.time || 0) / 1000,
          classname: browser + '.' + section
        });

        if (testInfo.errMsg) {
          testcase.ele('failure', {
            message: testInfo.errMsg,
            type: 'AssertError'
          });
        } else if (!testInfo.pass) {
          testcase.ele('error', {
            message: 'Unknown Error',
            type: 'TestError'
          });
        }
      });

      if (suiteInfo.suites) {
        _.each(suiteInfo.suites, serializeSuite);
      }

      suite.ele('system-out', {}).cdata(suiteInfo.stdout);
      suite.ele('system-err', {}).cdata(suiteInfo.stderr);
    });

    fs.writeFile(logFilename, suites.toString({ pretty: true}), function (err) {
      if (err) {
        console.log('unable to save test-output to', err.message);
        console.trace();
        process.exit(1);
      } else {
        console.log('test output written to', logFilename);
        process.exit(testDetails.stats.failures ? 1 : 0);
      }
    });
  });
}

var server = http.createServer(function (req, resp) {
  var parsedUrl = url.parse(req.url, true);
  req.uri = parsedUrl.pathname;
  req.query = parsedUrl.query;
  req.filename = path.join(__dirname, req.uri);

  var end = resp.end;
  resp.end = function () {
    console.log(chalk[this.statusCode < 300 ? 'green' : 'red'](this.statusCode), req.uri);
    end.apply(resp, arguments);
  };

  var middleIndex = -1;

  function next() {
    middleIndex++;
    if (middleIndex < middleware.length) {
      middleware[middleIndex](req, resp, next);
    } else {
      resp.writeHead(500);
      resp.end('500 Bad Gateway\n');
    }
  }
  next();
});

middleware.push(function (req, resp, next) {
  // resolve filenames
  switch (req.uri) {
  case '/tests-started':
    resp.end('OK');
    return;
  case '/tests-complete':
    return collectTestResults(req, resp);
  case '/expect.js':
    req.filename = path.join(__dirname, '../../node_modules/expect.js/expect.js');
    break;
  case '/mocha.js':
  case '/mocha.css':
    req.filename = path.join(__dirname, '../../node_modules/mocha', req.uri);
    break;
  case '/client.js':
    req.filename = path.join(__dirname, '../../dist/elasticsearch.js');
    break;
  }
  next();
});

middleware.push(function (req, resp, next) {
  // catch 404's, add directory's index.html
  fs.stat(req.filename, function (err, stats) {
    if (err) {
      resp.writeHead(404, {'Content-Type': 'text/plain'});
      resp.write('404 Not Found\n');
      resp.end();
    } else {
      if (stats.isDirectory()) {
        req.filename = path.join(req.filename, './index.html');
      }
      next();
    }
  });
});

middleware.push(function (req, resp, next) {
  // static files
  var reader = fs.createReadStream(req.filename);
  var data = '';

  reader.on('data', onData);
  reader.on('error', onError);
  reader.on('end', onEnd);

  function cleanupListeners() {
    reader.removeListener('end', onEnd);
    reader.removeListener('data', onData);
    reader.removeListener('error', onError);
  }

  function onData(chunk) {
    data += chunk;
  }

  function onError(err) {
    cleanupListeners();
    console.error(err);
    resp.setHeader('Content-Type', 'text/plain');
    resp.writeHead(500);
    resp.write(err.message + '\n');
    resp.end();
  }

  function onEnd() {
    cleanupListeners();
    var contentType = 'text/plain';

    switch (req.filename.split('.').pop()) {
    case 'js':
      contentType = 'application/javascript';
      break;
    case 'css':
      contentType = 'text/css';
      break;
    case 'html':
      contentType = 'text/html';
      break;
    }

    if (contentType === 'text/html') {
      resp.end(_.template(data, _.defaults(req.query, {
        es_hostname: 'localhost',
        es_port: 9200,
        browser: 'unknown',
        ts: rand(5)
      })));
    } else {
      resp.end(data);
    }


  }
});

server.listen(parseInt(port, 10), function () {
  console.log('server listening on port', server.address().port);
});
