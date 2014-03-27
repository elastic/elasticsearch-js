var clock = require('sinon').useFakeTimers();
var elasticsearch = require('../../src/elasticsearch');
var _ = require('lodash-node');
var times = require('async').times;

var es = elasticsearch.Client({
  host: 'no-a-real-host-for-sure.bike:5555',
  log: false
});

times(100, function (i, done) {
  es.search({
    index: '_all',
    type: '_all',
    body: {
      query: {
        match_all: {}
      }
    }
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

  es.close();
  clock.restore();

  var out = {
    socketCount: sockets.length,
    remaining: _.where(sockets, { destroyed: true }).length - sockets.length,
    timeouts: _.size(clock.timeouts)
  };
  process.connected ? process.send(out) : console.log(out);
});