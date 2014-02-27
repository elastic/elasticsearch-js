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
var _ = require('../../../src/lib/utils');
var async = require('async');
var path = require('path');
var moment = require('moment');
var makeSamples = require('./samples').make;

var startingMoment = moment().utc().startOf('day').subtract('days', argv.days);
var endingMoment = moment().utc().endOf('day').add('days', argv.days);

var clientConfig = {
  log: {
    level: 'trace',
    type: 'file',
    path: path.join(__dirname, '../../../log')
  }
};

if (argv.host) {
  clientConfig.hosts = argv.host;
} else if (argv.hosts) {
  clientConfig.hosts = JSON.parse(argv.hosts);
}

var client = new es.Client(clientConfig);
var samples = makeSamples(startingMoment, endingMoment);

console.log('Generating', argv.count, 'events across ±', argv.days, 'days');

fillIndecies(function () {
  var actions = [];

  async.timesSeries(argv.count, function (i, done) {
    // random date, plus less random time
    var date = moment(samples.randomMsInDayRange())
      .utc()
      .startOf('day')
      .add('milliseconds', samples.lessRandomMsInDay());

    var event = {
      index: date.format('[logstash-]YYYY.MM.DD'),
      '@timestamp': date.toISOString(),
      ip: samples.ips(),
      extension: samples.extensions(),
      response: samples.responseCodes(),
      country: samples.countries(),
      point: samples.airports(),
      '@tags': [samples.tags(), samples.tags2()],
      utc_time: date.toISOString(),
      referer: 'http://' + samples.referrers() + '/' + samples.tags() + '/' + samples.astronauts(),
      agent: samples.userAgents(),
    };

    event.clientip = event.ip;
    event.bytes = event.response < 500 ? samples.lessRandomRespSize() : 0;
    event.request = '/' + samples.astronauts() + '.' + event.extension;
    event.memory = event.extension === 'php' ? event.bytes * 40 : 0;
    if (event.memory) {
      event.phpmemory = event.memory;
    }

    event['@message'] = event.ip + ' - - [' + date.toISOString() + '] "GET ' + event.request + ' HTTP/1.1" ' +
        event.response + ' ' + event.bytes + ' "-" "' + event.agent + '"';

    actions.push({
      index: {
        _index: event.index,
        _type: samples.types(),
        _id: i
      }
    });
    actions.push(event);

    if (actions.length === 3000 || i === argv.count - 1) {
      console.info('writing', actions.length / 2, 'documents');
      client.bulk({
        body: actions
      }, done);
      actions = [];
    } else {
      done();
    }
  }, function (err) {
    if (err) {
      throw err;
    } else {
      console.log('Done!');
      process.exit();
    }
  });
});

function fillIndecies(cb) {
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

  function createDateIndex(indexName) {
    return function (done) {
      client.indices.create({
        ignore: 400,
        index: indexName,
        body: indexBody
      }, function (err, resp) {
        if (err) {
          done(err);
        } else {
          done(null, resp.error ? 'existed' : 'created');
        }
      });
    };
  }

  var indexPushActions = samples.days.map(function (moment) {
    return createDateIndex(moment.format('[logstash-]YYYY.MM.DD'));
  });

  async.parallel(indexPushActions, function (err, responses) {
    if (err) {
      console.error(err.message = 'Unable to create indicies: ' + err.message);
      console.error(err.stack);
    } else {
      _.each(_.groupBy(responses), function (list, did) {
        console.info(list.length, 'indicies', did);
      });
      cb();
    }
  });
}
