var elasticsearch = require('../src/elasticsearch')
  , EventEmitter = require('events').EventEmitter;

var client = new elasticsearch.Client({
  logger: 'trace'
});

console.log(EventEmitter.listenerCount(client.log, 'trace'));

client.cluster.node_stats();