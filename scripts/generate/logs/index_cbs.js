/* jshint curly:false */
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
// var Promise = require('bluebird');

var startingMoment = moment().utc().startOf('day').subtract('days', argv.days);
var endingMoment = moment().utc().endOf('day').add('days', argv.days);
var clientConfig = {
  // log: {
  //   level: 'trace',
  //   type: 'file',
  //   path: require('path').join(__dirname, '../../../log')
  // }
};

if (argv.host) {
  clientConfig.hosts = argv.host;
} else if (argv.hosts) {
  clientConfig.hosts = JSON.parse(argv.hosts);
}

var client = new es.Client(clientConfig);
var samples = makeSamples(startingMoment, endingMoment);

var indices = {};
var doneCreatingEvents = false;
var total = argv.count;

console.log('Generating', total, 'events across ±', argv.days, 'days');

function createIndex(indexName, done) {
  // console.log('ensuring index "%s" exists', indexName);

  var indexBody = {
    settings: {
      index: {
        number_of_shards: 1,
        number_of_replicas: 0
      }
    },
    mappings: {
      _default_: {
        properties: {
          '@timestamp': {
            type: 'date'
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
  }, function (err) {
    if (err) return done(err);

    client.cluster.health({
      index: indexName,
      waitForStatus: 'yellow'
    }, done);
  });
}

var queue = async.queue(function (events, done) {

  var body = [];
  var deps = [];

  events.forEach(function (event) {
    var header = event.header;
    event = event.body;

    if (indices[event.index] !== true) {
      deps.push(async.apply(createIndex, event.index));
      indices[event.index] = true;
    }

    body.push({ index: header }, event);
  });

  async.parallel(deps, function (err) {
    if (err) return done(err);

    client.bulk({
      body: body
    }, function (err, resp) {
      if (err) return done(err);

      if (resp.errors) {
        console.log(resp);
        console.log(JSON.stringify(body, null, '  '));
        console.log(JSON.stringify(resp, null, '  '));
        process.exit();
      }

      process.stdout.write('.');
      done();
    });
  });

}, 1);

queue.drain = function () {
  if (doneCreatingEvents) {
    client.close();
    process.stdout.write('.\n\ncreated ' + total + ' events\n\n');
  }
};

var topLevelErrorHandler = function (err) {
  if (err) {
    console.error(err.resp);
    console.error(err.stack);
    process.exit();
  }
};

var unqueuedEvents = [];
unqueuedEvents.queue = function () {
  queue.push([unqueuedEvents.splice(0)], topLevelErrorHandler);
};

async.timesSeries(total, function (i, done) {

  // random date, plus less random time
  var date = new Date(samples.randomMsInDayRange());

  var ms = samples.lessRandomMsInDay();

  // extract number of hours from the milliseconds
  var hours = Math.floor(ms / 3600000);
  ms = ms - hours * 3600000;

  // extract number of minutes from the milliseconds
  var minutes = Math.floor(ms / 60000);
  ms = ms - minutes * 60000;

  // extract number of seconds from the milliseconds
  var seconds = Math.floor(ms / 1000);
  ms = ms - seconds * 1000;

  // apply the values found to the date
  date.setUTCHours(hours, minutes, seconds, ms);

  var dateAsIso = date.toISOString();
  var indexName = 'logstash-' + dateAsIso.substr(0, 4) + '.' + dateAsIso.substr(5, 2) + '.' + dateAsIso.substr(8, 2);
  var event = {};

  event.index = indexName;
  event['@timestamp'] =  dateAsIso;
  event.ip =  samples.ips();
  event.extension =  samples.extensions();
  event.response =  samples.responseCodes();
  event.country =  samples.countries();
  event.point =  samples.airports();
  event['@tags'] = [
    samples.tags(),
    samples.tags2()
  ];
  event.utc_time =  dateAsIso;
  event.referer =  'http://' + samples.referrers() + '/' + samples.tags() + '/' + samples.astronauts();
  event.agent =  samples.userAgents();
  event.clientip = event.ip;
  event.bytes = event.response < 500 ? samples.lessRandomRespSize() : 0;
  event.request = '/' + samples.astronauts() + '.' + event.extension;
  if (event.extension === 'php') {
    event.phpmemory = event.memory = event.bytes * 40;
  }
  event['@message'] = event.ip + ' - - [' + dateAsIso + '] "GET ' + event.request + ' HTTP/1.1" ' +
      event.response + ' ' + event.bytes + ' "-" "' + event.agent + '"';

  unqueuedEvents.push({
    header: {
      _index: event.index,
      _type: samples.types(),
      _id: i,
    },
    body: event
  });

  unqueuedEvents.length === 3500 && unqueuedEvents.queue();
  setImmediate(done);
}, function () {
  unqueuedEvents.length && unqueuedEvents.queue();
  doneCreatingEvents = true;
});