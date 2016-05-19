var clock = require('sinon').useFakeTimers();
var Client = require('../../src/elasticsearch').Client;
// var _ = require('lodash');
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
    var sockets = _v4([].concat(conns.dead, conns.alive))
      .transform(function (sockets, conn) {
        sockets.push(_v4.values(conn.agent.sockets), _v4.values(conn.agent.freeSockets));
      }, [])
      .flattenDeep()
      .value();

    es.close();

    var out = {
      socketCount: err || sockets.length,
      remaining: _v4.filter(sockets, { destroyed: true }).length - sockets.length,
      timeouts: _v4.size(clock.timers) && _v4.map(clock.timers, 'func').map(String)
    };

    clock.restore();
    process.connected ? process.send(out) : console.log(out);
  });
});
