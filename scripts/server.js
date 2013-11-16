var http = require('http');

var server = http.createServer(function (req, resp) {
  var closed, count = 0;

  resp.on('close', function () {
    closed = true;
    console.log('response was closed');
  });

  process.removeAllListeners();

  var interval = setInterval(function () {
    if (count > 99 || resp.closed || closed) {
      clearInterval(interval);
      console.log('done writing', resp.socket.bytesWritten, 'bytes');
      resp.end();
    } else {
      process.stdout.write('->');
      resp.write('line of data, more to come... slowly!');
      count++;
    }
  }, 100);
});

server.listen(7500, function () {
  console.log('server listening at', server.address());
});
