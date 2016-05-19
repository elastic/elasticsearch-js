var clock = require('sinon').useFakeTimers();
var Client = require('../../src/elasticsearch').Client;
var _ = require('lodash-migrate');
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
        sockets.push(_.values(conn.agent.sockets), _.values(conn.agent.freeSockets));
      }, [])
      .flattenDeep()
      .value();

    es.close();

    var out = {
      socketCount: err || sockets.length,
      remaining: _.where(sockets, { destroyed: true }).length - sockets.length,
      timeouts: _.size(clock.timers) && _.map(clock.timers, 'func').map(String)
    };

    clock.restore();
    process.connected ? process.send(out) : console.log(out);
  });
});
