// args
var argv = require('optimist')
  .usage('node scripts/generate/logs [-h|--host localhost:9200] [-c|--count 14000] [-d|--days 7]')
  .options({
    count: {
      alias: 'c',
      type: 'number',
      default: 14000
    },
    days: {
      alias: 'd',
      type: 'number',
      required: true
    },
    host: {
      alias: 'h',
      default: 'localhost:9200'
    }
  })
  .argv;

var es = require('../../../src/elasticsearch');
var async = require('async');
var moment = require('moment');
var makeSamples = require('./samples').make;

var startingMoment = moment().utc().startOf('day').subtract('days', argv.days);
var endingMoment = moment().utc().endOf('day').add('days', argv.days);

var clientConfig = {
  // log: {
  //   level: 'trace',
  //   type: 'file',
  //   path: path.join(__dirname, '../../../log')
  // }
};

if (argv.host) {
  clientConfig.hosts = argv.host;
} else if (argv.hosts) {
  clientConfig.hosts = JSON.parse(argv.hosts);
}

var client = new es.Client(clientConfig);
var samples = makeSamples(startingMoment, endingMoment);

console.log('Generating', argv.count, 'events across ±', argv.days, 'days');

var indices = {};
var events = [];
var doneEventing = false;
var eventsPerBulk = 3500;
var eventElementsPerBulk = eventsPerBulk * 2; // events are stored next to their headers, so each event has two elements;

function createIndex(indexName, done) {
  console.log('made index', indexName);
  var indexBody = {
    mappings: {
      _default_: {
        properties: {
          '@timestamp': {
            type: 'date',
            index: 'not_analyzed'
          },
          id: {
            type: 'integer',
            index: 'not_analyzed',
            include_in_all: false
          },
          country: {
            type: 'string',
            index: 'not_analyzed'
          },
          agent: {
            type: 'multi_field',
            fields: {
              agent: {
                type: 'string',
                index: 'analyzed'
              },
              raw: {
                type: 'string',
                index: 'not_analyzed'
              }
            }
          },
          clientip: {
            type: 'ip'
          },
          ip: {
            type: 'ip'
          },
          memory: {
            type: 'double'
          }
        }
      }
    }
  };

  client.indices.create({
    ignore: 400,
    index: indexName,
    body: indexBody
  }, done);
}

var bulk = async.queue(function (chunk, done) {
  if (typeof chunk === 'string') {
    return createIndex(chunk, done);
  }

  console.info('writing', chunk.length / 2, 'documents');
  client.bulk({
    body: chunk
  }, done);
}, 3);

bulk.drain = function () {
  if (!doneEventing) {
    // console.log('indexed faster than the events were created');
    return;
  }

  client.close();
  console.log('done');
};

async.timesSeries(argv.count, function (i, done) {

  // random date, plus less random time
  var date = moment(samples.randomMsInDayRange())
    .utc()
    .startOf('day')
    .add('milliseconds', samples.lessRandomMsInDay());

  var event = {};

  event.index =  date.format('[logstash-]YYYY.MM.DD');
  event['@timestamp'] =  date.toISOString();
  event.ip =  samples.ips();
  event.extension =  samples.extensions();
  event.response =  samples.responseCodes();
  event.country =  samples.countries();
  event.point =  samples.airports();
  event['@tags'] = [
    samples.tags(),
    samples.tags2()
  ];
  event.utc_time =  date.toISOString();
  event.referer =  'http://' + samples.referrers() + '/' + samples.tags() + '/' + samples.astronauts();
  event.agent =  samples.userAgents();
  event.clientip = event.ip;
  event.bytes = event.response < 500 ? samples.lessRandomRespSize() : 0;
  event.request = '/' + samples.astronauts() + '.' + event.extension;
  if (event.extension === 'php') {
    event.phpmemory = event.memory = event.bytes * 40;
  }
  event['@message'] = event.ip + ' - - [' + date.toISOString() + '] "GET ' + event.request + ' HTTP/1.1" ' +
      event.response + ' ' + event.bytes + ' "-" "' + event.agent + '"';


  if (indices[event.index] !== true) {
    bulk.push(event.index); // when it receives a string it handles that immediately
    indices[event.index] = true;
  }

  events.push(
    {
      index: {
        _index: event.index,
        _type: samples.types(),
        _id: i
      }
    },
    event
  );

  // eventsPerBulk must be multiplied by 2 because each event is two elements long
  if (events.length === eventElementsPerBulk || i === argv.count - 1) {
    bulk.push([events.splice(0, eventElementsPerBulk)]);
  }

  setImmediate(done);
}, function () {
  console.log('done creating events');
  doneEventing = true;
});