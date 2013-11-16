var es = require('../src/elasticsearch');
var async = require('async');
var argv = require('optimist').default({
    indx: 'test-docs',
    type: 'test-doc',
    warm: 10000,
    docs: 100000,
    sync: false,
    sock: 100
  })
  .boolean('sync')
  .argv;

function hrtime(start) {
  var hr = start ? process.hrtime(start) : process.hrtime();
  return start ? Math.round(((hr[0] * 1e9 + hr[1]) / 1e6) * 100) / 100 : hr;
}

var client = new es.Client({
  hosts: 'localhost:9200',
  log: null,
  maxSockets: argv.sock
});

async.series([
  function (done) {
    console.log('removing existing "%s" index', argv.indx);
    client.indices.delete({
      index: argv.indx,
      ignore: 404
    }, done);
  },
  function (done) {
    console.log('creating new "%s" index', argv.indx);
    client.indices.create({
      index: argv.indx,
      body: {}
    }, done);
  },
  function (done) {
    console.log('warnming up index with %d docs', argv.warm);
    async.times(argv.warm, function (i, done) {
      client.index({
        index: argv.indx,
        type: argv.type,
        body: {}
      }, done);
    }, done);
  },
  function (done) {
    console.log('waiting for cluster to go yellow');
    client.cluster.health({
      waitForStatus: 'yellow'
    }, done);
  },
  function (done) {
    console.log('creating %d docs ' + (async.sync ? 'in series' : argv.sock + ' requests at a time'), argv.docs);
    var start = hrtime();
    async[argv.sync ? 'timesSeries' : 'times'](argv.docs, function (i, done) {
      client.index({
        index: argv.indx,
        type: argv.type,
        body: {}
      }, done);
    }, function (err) {
      console.log('complete in', hrtime(start), 'ms');
      done(err);
    });
  }
], function (err) {
  if (err) {
    console.error(err);
  }
});
