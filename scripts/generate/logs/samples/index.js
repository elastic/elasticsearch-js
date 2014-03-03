var _ = require('../../../../src/lib/utils');
var WeightedList = require('./weighted_list');
var RandomList = require('./random_list');
var IpGenerator = require('./ip_generator');
var Stochator = require('./stochator');
var dayMs = 86400000;

exports.make = function (startingMoment, endingMoment) {

  var sets = {};

  sets.randomMsInDayRange = new Stochator({
    min: startingMoment.toDate().getTime(),
    max: endingMoment.toDate().getTime()
  }, 'get');

  sets.lessRandomRespSize = new Stochator({
    mean: 4500,
    stddev: 4500 * 0.56,
    min: 1500,
    max: 10000
  }, 'get');

  sets.lessRandomMsInDay = new Stochator({
    min: 0,
    max: dayMs,
    mean: dayMs / 2,
    stdev: dayMs * 0.15,
  }, 'get');

  sets.astronauts = new RandomList(require('./astronauts').map(function (name) {
    return name.replace(/\W+/g, '-').toLowerCase();
  }));

  sets.airports = new RandomList(require('./airports'));

  sets.ips = new IpGenerator(100, 1000);

  sets.countries = new WeightedList(require('./countries'));

  sets.extensions = new WeightedList({
    'html': 40,
    'php': 30,
    'png': 15,
    'gif': 5,
    'css': 10
  });

  sets.responseCodes = new WeightedList({
    200: 92,
    404: 5,
    503: 3
  });

  sets.tags = new WeightedList({
    'error': 6,
    'warning': 10,
    'success': 84
  });

  sets.tags2 = new WeightedList({
    'security': 20,
    'info': 75,
    'login': 5
  });

  sets.timezones = new WeightedList({
    '-07:00': 1
  });

  sets.referrers = new WeightedList({
    'www.slate.com': 50,
    'twitter.com': 35,
    'facebook.com': 20,
    'nytimes.com': 10
  });

  sets.userAgents = new WeightedList({
    'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)': 30,
    'Mozilla/5.0 (X11; Linux i686) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.50 Safari/534.24': 35,
    'Mozilla/5.0 (X11; Linux x86_64; rv:6.0a1) Gecko/20110421 Firefox/6.0a1': 40
  });

  sets.types = new WeightedList({
    'nginx': 1,
    'apache': 4
  });

  return _.transform(sets, function (note, set, name) {
    if (name === 'days') {
      return note[name] = set;
    }

    note[name] = _.bindKey(set, 'get');
  }, {});
};
