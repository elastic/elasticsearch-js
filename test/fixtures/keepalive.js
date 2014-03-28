var clock = require('sinon').useFakeTimers();
var Client = require('../../src/elasticsearch').Client;
var _ = require('lodash-node');
var times = require('async').times;

process.once('message', function (port) {
  var es = new Client({
    host: 'http://127.0.0.1:' + port,
    log: false
  });

  times(1000, function (n, done) {
    es.search({
      body: {
        query: {
          match_all: {}
        }
      }
    }, done);
    clock.tick(10);
  }, function (err) {
    var conns = es.transport.connectionPool._conns;
    var sockets = _([].concat(conns.dead, conns.alive))
      .transform(function (sockets, conn) {
        [].push.apply(sockets, _.values(conn.agent.sockets));
        [].push.apply(sockets, _.values(conn.agent.freeSockets));
      }, [])
      .flatten()
      .value();

    es.close();

    var out = {
      socketCount: err || sockets.length,
      remaining: _.where(sockets, { destroyed: true }).length - sockets.length,
      timeouts: _.size(clock.timeouts) && _.pluck(clock.timeouts, 'func').map(String)
    };

    clock.restore();
    process.connected ? process.send(out) : console.log(out);
  });
});