const clock = require('sinon').useFakeTimers();
const Client = require('../../src/elasticsearch').Client;
const _ = require('lodash');
const times = require('async').times;

process.once('message', function (port) {
  const es = new Client({
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
    const conns = es.transport.connectionPool._conns;
    const sockets = _([].concat(conns.dead, conns.alive))
      .transform(function (sockets, conn) {
        sockets.push(_.values(conn.agent.sockets), _.values(conn.agent.freeSockets));
      }, [])
      .flatten()
      .value();

    es.close();

    const out = {
      socketCount: err || sockets.length,
      remaining: _.filter(sockets, { destroyed: true }).length - sockets.length,
      timeouts: _.size(clock.timers) && _.map(clock.timers, 'func').map(String)
    };

    clock.restore();
    process.connected ? process.send(out) : console.log(out);
  });
});
