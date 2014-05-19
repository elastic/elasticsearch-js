/* jshint curly:false, latedef:false */
// args
var optimist = require('optimist')
  .usage('A utility to generate sample log data.\n\nUsage: $0 [options]')
  .options({
    count: {
      alias: 'c',
      type: 'number',
      default: 14000,
      describe: 'The number of total records'
    },
    days: {
      alias: 'd',
      type: 'number',
      required: true,
      describe: 'The number of days before and after today, 1 will equal 3 days total.',
      default: 1
    },
    host: {
      alias: 'h',
      describe: 'The host name and port',
      default: 'localhost:9200'
    },
    shards: {
      alias: 's',
      describe: 'The number of primary shards',
      default: 1
    },
    replicas: {
      alias: 'r',
      describe: 'The number of replica shards',
      default: 0
    },
    help: {
      describe: 'This help message',
      type: 'boolean'
    }
  });

var argv = optimist.argv;

if (argv.help) {
  optimist.showHelp(console.log);
  process.exit();
}

var es = require('../../../src/elasticsearch');
var async = require('async');
var moment = require('moment');
var makeSamples = require('./samples').make;
var Promise = require('bluebird');

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

function createIndex(indexName) {
  // console.log('ensuring index "%s" exists', indexName);

  var indexBody = {
    settings: {
      index: {
        number_of_shards: argv.shards,
        number_of_replicas: argv.replicas
      },
      analysis: {
        analyzer: {
          url: {
            type: 'standard',
            tokenizer: 'uax_url_email',
            max_token_length: 1000
          }
        }
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
          },
          referer: {
            type: 'string',
            index: 'not_analyzed'
          }
        },
        geo: {
          properties: {
            srcdst: {
              type: 'string',
              index: 'not_analyzed'
            },
            dst: {
              type: 'string',
              index: 'not_analyzed'
            },
            src: {
              type: 'string',
              index: 'not_analyzed'
            },
            coordinates: {
              type: 'geo_point'
            }
          }
        },
        meta: {
          properties: {
            related: {
              type: 'string',
            },
            char: {
              type: 'string',
              index: 'not_analyzed'
            },
            user: {
              properties: {
                firstname: {
                  type: 'string',
                },
                lastname: {
                  type: 'integer',
                  index: 'not_analyzed'
                }
              }
            }
          }
        }
      }
    }
  };

  return client.indices.create({
    ignore: 400,
    index: indexName,
    body: indexBody
  })
  .then(function () {
    return client.cluster.health({
      index: indexName,
      waitForStatus: 'yellow'
    });
  });
}


var queue = async.queue(function (events, done) {
  var body = [];
  var deps = [];
  var esBulkQueueOverflow = 0;

  events.forEach(function (event) {
    var header = event.header;
    event = event.body;

    if (indices[event.index] !== true) {
      deps.push(createIndex(event.index));
      indices[event.index] = true;
    }

    body.push({ index: header }, event);
  });

  Promise.all(deps)
  .then(function () {
    if (body.length) {
      return client.bulk({
        body: body
      });
    } else {
      return {};
    }
  })
  .then(function (resp) {
    if (resp.errors) {
      resp.items.forEach(function (item, i) {
        if (item.index.error) {
          if (item.index.error.match(/^EsRejectedExecutionException/)) {
            esBulkQueueOverflow ++;
            eventBuffer.push(events[i]);
          }
        }
      });
    }
  })
  .finally(function () {
    if (esBulkQueueOverflow) {
      process.stdout.write('w' + esBulkQueueOverflow + '-');

      // pause for 10ms per queue overage
      queue.pause();
      setTimeout(function () {
        queue.resume();
      }, 10 * esBulkQueueOverflow);

    } else {
      process.stdout.write('.');
    }
  })
  .nodeify(done);
}, 1);

var eventBuffer = [];
eventBuffer.flush = function () {
  if (eventBuffer.length === 3500 || doneCreatingEvents) {
    queue.push([eventBuffer.splice(0)], function (err) {
      if (err) {
        console.error(err.resp);
        console.error(err.stack);
        process.exit();
      }
    });
  }
};

queue.drain = function () {
  if (doneCreatingEvents && eventBuffer.length === 0) {
    client.close();
    process.stdout.write('.\n\ncreated ' + total + ' events\n\n');
  } else {
    eventBuffer.flush();
  }
};

async.series([
  function (done) {
    client.cluster.putSettings({
      body: {
        transient: {
          threadpool: {
            bulk: {
              queue_size: -1
            }
          }
        }
      }
    }, done);
  },
  function (done) {
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
      var indexName = 'logstash-' +
        dateAsIso.substr(0, 4) + '.' + dateAsIso.substr(5, 2) + '.' + dateAsIso.substr(8, 2);
      var event = {};

      event.index = indexName;
      event['@timestamp'] = dateAsIso;
      event.ip = samples.ips();
      event.extension = samples.extensions();
      event.response = samples.responseCodes();

      event.geo = {
        coordinates: samples.airports(),
        src: samples.countries(),
        dest: samples.countries()
      };
      event.geo.srcdest = event.geo.src + ':' + event.geo.dest;

      event['@tags'] = [
        samples.tags(),
        samples.tags2()
      ];
      event.utc_time = dateAsIso;
      event.referer = 'http://' + samples.referrers() + '/' + samples.tags() + '/' + samples.astronauts();
      event.agent = samples.userAgents();
      event.clientip = event.ip;
      event.bytes = event.response < 500 ? samples.lessRandomRespSize() : 0;
      event.request = '/' + samples.astronauts() + '.' + event.extension;
      if (event.extension === 'php') {
        event.phpmemory = event.memory = event.bytes * 40;
      }
      event['@message'] = event.ip + ' - - [' + dateAsIso + '] "GET ' + event.request + ' HTTP/1.1" ' +
          event.response + ' ' + event.bytes + ' "-" "' + event.agent + '"';
      event.spaces = 'this   is   a   thing    with lots of     spaces       wwwwoooooo';
      event.xss = '<script>console.log("xss")</script>';
      event.headings = [
        '<h3>' + samples.astronauts() + '</h5>',
        'http://' + samples.referrers() + '/' + samples.tags() + '/' + samples.astronauts()
      ];
      event.links = [
        samples.astronauts() + '@' + samples.referrers(),
        'http://' + samples.referrers() + '/' + samples.tags2() + '/' + samples.astronauts(),
        'www.' + samples.referrers()
      ];

      event.machine = {
        os: samples.randomOs(),
        ram: samples.randomRam()
      };

      eventBuffer.push({
        header: {
          _index: event.index,
          _type: samples.types(),
          _id: i,
        },
        body: event
      });

      eventBuffer.flush();
      setImmediate(done);
    }, done);
  }
], function (err) {
  if (err) throw err;
  doneCreatingEvents = true;
  eventBuffer.flush();
});