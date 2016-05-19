// fake es server for the keepalive test script

// Node 0.9.25 uses timeouts for outgoing messages
// which prevent sinon from being able to ensure
// timeouts aren't being left behind

var express = require('express');
var app = express().post('/_search', function (req, res) {
  res.json(200, { hits: { hits: [] } });
});

var server = require('http').createServer(app);
server.listen(function () {
  var port = server.address().port;
  process.connected ? process.send(port) : console.log(port);
});
