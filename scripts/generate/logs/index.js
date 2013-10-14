// args
var count = parseInt(process.argv[2] || 14000, 10),
  days = parseInt(process.argv[3] || 7, 10);

var es = require('../../../src/elasticsearch'),
  _ = require('../../../src/lib/utils'),
  q = require('q'),
  async = require('async'),
  moment = require('moment'),
  makeSamples = require('./samples').make,
  startingMoment = moment().startOf('day').subtract('days', days),
  endingMoment = moment().endOf('day').add('days', days),
  client = new es.Client({
    log: 'info'
  });

client.log.info('Generating', count, 'events across ±', days, 'days');

fillIndecies(function () {
  var actions = [],
    samples = makeSamples(startingMoment, endingMoment);

  async.timesSeries(count, function (i, done) {
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
        event.respCode + ' ' + event.respSize + ' "-" "' + event.agent + '"';
    event.src = JSON.stringify(event, null, '  ');

    actions.push({
      index: {
        _index: event.index,
        _type: samples.types(),
        _id: i
      }
    });
    actions.push(event);

    if (actions.length === 3000 || i === count - 1) {
      client.log.info('writing', actions.length / 2, 'documents');
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
    }
  });
});

function fillIndecies(cb) {
  var movingDate = moment(startingMoment);
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
          }
        }
      }
    }
  },
  indexPushActions = [];

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

  while (movingDate.unix() < endingMoment.unix()) {
    indexPushActions.push(createDateIndex(movingDate.format('[logstash-]YYYY.MM.DD')));
    movingDate.add('day', 1);
  }

  async.parallel(indexPushActions, function (err, responses) {
    if (err) {
      client.log.error(err);
    } else {
      _.each(_.groupBy(responses), function (list, did) {
        client.log.info(list.length, 'indicies', did);
      });
      cb();
    }
  });
}
