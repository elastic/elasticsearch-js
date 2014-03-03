var elasticsearch = require('../../src/elasticsearch');
var _ = require('lodash-node');
var clock = require('sinon').useFakeTimers();

var es = elasticsearch.Client({
  host: 'localhost:5555',
  log: false
});

es.search({
  index: '_all',
  type: '_all',
  body: {
    query: {
      match_all: {}
    }
  }
}, function (err, resp) {
  var conn = _.union(es.transport.connectionPool._conns.dead, es.transport.connectionPool._conns.alive).pop();
  es.close();

  if (_.size(clock.timeouts)) {
    console.log('Timeouts were left behind');
    console.log(clock);
  }

  clock.restore();

  var destroyedSockets = 0;
  function countDestroyed(sockets) {
    destroyedSockets += _.where(sockets, { destroyed: true}).length;
  }
  _.each(conn.agent.sockets, countDestroyed);
  _.each(conn.agent.freeSockets, countDestroyed);
  console.log(destroyedSockets);
});

clock.tick(1);