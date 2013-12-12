var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var chalk = require('chalk');
var makeJUnitXml = require('../../test/utils/make_j_unit_xml');
var docRoot = path.join(__dirname, '../../test/integration/browser_yaml_suite');
chalk.enabled = true;

var middleware = [];

Error.stackTraceLimit = Infinity;

var chars = 'abcdefghijklmnopqrstuvwxyz';

var server = http.createServer(function (req, resp) {
  var parsedUrl = url.parse(req.url, true);
  req.uri = parsedUrl.pathname;
  req.query = parsedUrl.query;
  req.filename = path.join(docRoot, req.uri);

  var end = resp.end;
  resp.end = function (data) {
    console.log(
      chalk[this.statusCode < 300 ? 'green' : 'red'](this.statusCode),
      req.uri,
      '-',
      Buffer.byteLength(data || ''),
      'bytes'
    );
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

server.browsers = [
  // browsers will go here, and will be removed once they call tests-complete
  // once gone, we will emit "tests done"
];

function rand(length) {
  var str = '';
  while (str.length < length) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return str;
}

function collectTestResults(req, resp) {
  var body = '';
  var browser = req.query.browser;
  var logFilename = 'test-output-' + browser + '.xml';

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

    var xml = makeJUnitXml(browser, testDetails);
    fs.writeFile(logFilename, xml, function (err) {
      if (err) {
        console.log('unable to save test-output to', err.message);
        console.trace();
        browserComplete(browser);
      } else {
        console.log('test output written to', logFilename);
        browserComplete(browser, true);
      }
    });
  });
}

var report = {};

function browserComplete(browser, success) {
  var i = server.browsers.indexOf(browser);
  report[browser] = success;
  server.emit('browser complete', browser, success);
  if (i >= 0) {
    server.browsers.splice(i, 1);
    if (server.browsers.length) {
      console.log('waiting for', server.browsers.length, 'browsers');
    } else {
      server.emit('tests done', report);
    }
  } else {
    console.error('invalid browser', browser);
  }
}


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
        req.filename = path.join(docRoot, 'index.html');
      }
      next();
    }
  });
});

middleware.push(function (req, resp) {
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


module.exports = server;
