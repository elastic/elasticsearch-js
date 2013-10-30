var es = require('../src/elasticsearch');
var async = require('async');

function getMs() {
  var hr = process.hrtime();
  return (hr[0] * 1e9 + hr[1]) / 1e6;
}

var client = new es.Client({
  hosts: 'localhost:9200',
  log: null,
  maxSockets: 100
});

async.series([
  function (done) {
    console.log('clearing existing "test-docs" indices');
    client.indices.delete({
      index: 'test-docs',
      ignore: 404
    }, done);
  },
  function (done) {
    console.log('waiting for cluster');
    client.cluster.health({
      wait_for_status: 'yellow'
    }, done);
  },
  function (done) {
    var times = 1e4;
    console.log('creating %d docs', times);
    var start = getMs();
    async.times(times, function (i, done) {
      client.index({
        index: 'test-docs',
        type: 'test-doc',
        body: {}
      }, done);
    }, function (err) {
      console.log('complete in', Math.round((getMs() - start) * 100) / 100, 'ms');
      if (err) {
        client.config.log.error(err);
      }
    });
  }
], function (err) {
  if (err) {
    console.error(err);
  }
});
