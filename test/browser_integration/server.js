var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var browserify = require('browserify');
var port = process.argv[2] || 8888;

var middleware = [];

Error.stackTraceLimit = Infinity;

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

var server = http.createServer(function (req, resp) {
  req.uri = url.parse(req.url).pathname;
  req.filename = path.join(__dirname, req.uri);

  resp._end = resp.end;
  resp.end = function () {
    console.log(this.statusCode, req.uri);
    resp._end.apply(resp, arguments);
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

    resp.setHeader('Content-Type', contentType);
    resp.writeHead(200);
    resp.end(
      data
        .replace(/\{\{ts\}\}/g, Date.now())
        .replace(/\{\{phantom\}\}/g, req.filename === '/phantom.html' ? '-phantom' : '')
    );
  }
});

server.listen(parseInt(port, 10), function () {
  console.log('server listening on port', server.address().port);
});
