var errors = require('../../src/lib/errors');
var _ = require('lodash');

_.each(errors, function (CustomError, name) {
  if (name.charAt(0) !== '_') {
    describe(name, function () {
      it('extend the ErrorAbstract and Error classes', function () {
        var err = new CustomError();
        err.message.length.should.be.above(7);
        err.should.be.an.instanceOf(Error).and.an.instanceOf(errors._Abstract);
      });
    });
  }
});

describe('Error Abstract', function () {
  it('provides a stack property in the browser', function () {
    var isBrowser = process.browser;
    process.browser = true;
    var err = new errors._Abstract();
    process.browser = isBrowser;

    err.stack.should.be.exactly('');
  });
});
