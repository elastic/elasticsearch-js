var clock = require('sinon').useFakeTimers();
var elasticsearch = require('../../src/elasticsearch');
var _ = require('lodash-node');
var times = require('async').times;

var app = require('express')();
app.post('/_search', function (req, res) {
  res.json(200, {  hits: { hits: [] } });
});

var server = require('http').createServer(app);
server.listen(function () {
  var es = elasticsearch.Client({
    host: 'http://127.0.0.1:' + server.address().port,
    log: false
  });

  times(1000, function (i, done) {
    es.search({
      body: {
        query: {
          match_all: {}
        }
      }
    }, _.partial(done, null)); // ignore errors
    clock.tick(10);
  }, function () {

    server.close();

    var sockets = _(es.transport.connectionPool._conns.dead)
      .concat(es.transport.connectionPool._conns.alive)
      .transform(function (sockets, conn) {
        [].push.apply(sockets, _.values(conn.agent.sockets));
        [].push.apply(sockets, _.values(conn.agent.freeSockets));
      }, [])
      .flatten()
      .value();

    es.close();
    clock.restore();

    var out = {
      socketCount: sockets.length,
      remaining: _.where(sockets, { destroyed: true }).length - sockets.length,
      timeouts: _.size(clock.timeouts)
    };
    process.connected ? process.send(out) : console.log(out);
  });
});