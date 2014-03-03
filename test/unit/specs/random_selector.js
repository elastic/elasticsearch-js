describe('Random Selector', function () {
  var randomSelector = require('../../../src/lib/selectors/random');
  var _ = require('lodash-node');
  var expect = require('expect.js');

  it('chooses a selection by random', function () {
    var log = { a: 0, b: 0, c: 0 };
    var choices = _.keys(log);

    _.times(1000, function () {
      var choice = randomSelector(choices);
      log[choice]++;
    });

    expect(_.filter(log, function (count) {
      return count < 200 || count > 400;
    })).to.have.length(0);

  });
});
