describe('Round Robin Selector', function () {
  const selector = require('../../../src/lib/selectors/round_robin');
  const _ = require('lodash');
  const expect = require('expect.js');

  it('chooses options in order', function () {
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    const expected = _.clone(options);
    const selections = [];

    _.times(options.length, function () {
      selections.push(selector(options));
    });

    expect(selections).to.eql(expected);
  });
});
