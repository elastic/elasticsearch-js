
var sinon = require('sinon');

exports.make = function () {
  var log = [];
  afterEach(function () {
    var stub;
    while (stub = log.pop()) {
      stub.restore();
    }
  });
  var stubber = function () {
    log.push(sinon.stub.apply(sinon, arguments));
  };

  stubber.autoRelease = function (item) {
    log.push(item);
  };

  return stubber;
};