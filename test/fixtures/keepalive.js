var clock = require('sinon').useFakeTimers();
var Client = require('../../src/elasticsearch').Client;
var _ = require('lodash-node');
var times = require('async').times;

var app = require('express')();
app.post('/_search', function (req, res) {
  res.json(200, { hits: { hits: [] } });
});

var server = require('http').createServer(app);
server.listen(function () {
  var es = new Client({
    host: 'http://127.0.0.1:' + server.address().port,
    log: false
  });

  var matchAll = {
    query: {
      match_all: {}
    }
  };

  times(1000, function (i, done) {
    es.search({
      body: matchAll
    }, _.partial(done, null)); // ignore errors
    clock.tick(10);
  }, function () {

    var sockets = _(es.transport.connectionPool._conns.dead)
      .concat(es.transport.connectionPool._conns.alive)
      .transform(function (sockets, conn) {
        [].push.apply(sockets, _.values(conn.agent.sockets));
        [].push.apply(sockets, _.values(conn.agent.freeSockets));
      }, [])
      .flatten()
      .value();

    server.close();
    es.close();

    var out = {
      socketCount: sockets.length,
      remaining: _.where(sockets, { destroyed: true }).length - sockets.length,
      timeouts: _.size(clock.timeouts) && clock.timeouts
    };

    clock.restore();
    process.connected ? process.send(out) : console.log(out);
  });
});