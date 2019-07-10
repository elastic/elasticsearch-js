// fake es server for the keepalive test script

// Node 0.9.25 uses timeouts for outgoing messages
// which prevent sinon from being able to ensure
// timeouts aren't being left behind

var http = require('http');

var server = http.createServer(function(req, res) {
  if (req.url === '/_search' && req.method === 'POST') {
    const body = JSON.stringify({ hits: { hits: [] } });
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Length', body.length);
    res.end(body);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

server.listen(function() {
  var port = server.address().port;
  if (process.connected) {
    process.send(port);
  } else {
    console.log(port);
  }
});
