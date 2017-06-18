describe('Random Selector', function () {
  const randomSelector = require('../../../src/lib/selectors/random');
  const _ = require('lodash');
  const expect = require('expect.js');

  it('chooses a selection by random', function () {
    const log = { a: 0, b: 0, c: 0 };
    const choices = _.keys(log);

    _.times(1000, function () {
      const choice = randomSelector(choices);
      log[choice]++;
    });

    expect(_.filter(log, function (count) {
      return count < 200 || count > 400;
    })).to.have.length(0);

  });
});
