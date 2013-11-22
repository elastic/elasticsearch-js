var randomSelector = require('../../src/lib/selectors/random');
var _ = require('lodash');

describe('Random Selector', function () {
  it('chooses a selection by random', function () {
    var log = { a: 0, b: 0, c: 0 };
    var choices = _.keys(log);

    _.times(1000, function () {
      var choice = randomSelector(choices);
      log[choice]++;
    });

    _.filter(log, function (count) {
      return count < 200 || count > 400;
    }).should.have.length(0);

  });
});
