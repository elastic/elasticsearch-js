var errors = require('../../../src/lib/errors');
var expect = require('expect.js');
var _ = require('lodash');

_.each(errors, function (CustomError, name) {
  if (name.charAt(0) !== '_') {
    describe(name, function () {
      it('extend the ErrorAbstract and Error classes', function () {
        var err = new CustomError();
        expect(err).to.be.an(Error);
        expect(err).to.be.an(errors._Abstract);
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

    expect(err.stack).to.be.a('string');
  });
});

describe('StatusCodeError', function () {
  it('exposes status code as a number', function () {
    var err = new errors['404']();
    expect(err.status).to.be(404);
    expect(err.status).to.not.be('404');
  });
});
