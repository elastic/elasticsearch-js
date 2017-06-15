const errors = require('../../../src/lib/errors');
const expect = require('expect.js');
const _ = require('lodash');

_.each(errors, function (CustomError, name) {
  if (name.charAt(0) !== '_') {
    describe(name, function () {
      it('extend the ErrorAbstract and Error classes', function () {
        const err = new CustomError();
        expect(err).to.be.an(Error);
        expect(err).to.be.an(errors._Abstract);
      });
    });
  }
});

describe('Error Abstract', function () {
  it('provides a stack property in the browser', function () {
    const isBrowser = process.browser;
    process.browser = true;
    const err = new errors._Abstract();
    process.browser = isBrowser;

    expect(err.stack).to.be.a('string');
  });
});

describe('StatusCodeError', function () {
  it('exposes status code as a number', function () {
    const err = new errors['404']();
    expect(err.status).to.be(404);
    expect(err.status).to.not.be('404');
  });
});
