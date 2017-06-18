
const sinon = require('sinon');

exports.make = function () {
  const log = [];
  afterEach(function () {
    let stub;
    while (stub = log.pop()) {
      stub.restore();
    }
  });
  const stubber = function () {
    log.push(sinon.stub.apply(sinon, arguments));
  };

  stubber.autoRelease = function (item) {
    log.push(item);
  };

  return stubber;
};
