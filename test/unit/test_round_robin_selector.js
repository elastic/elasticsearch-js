var selector = require('../../src/lib/selectors/round_robin');
var _ = require('lodash');

describe('Round Robin Selector', function () {
  it('chooses options in order', function () {
    var options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    var expected = _.clone(options);
    var selections = [];

    _.times(options.length, function () {
      selections.push(selector(options));
    });

    selections.should.eql(expected);
  });
});
