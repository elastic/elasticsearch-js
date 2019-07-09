var sinon = require('sinon');

exports.make = function() {
  var log = [];
  afterEach(function() {
    for (const stub of log) {
      stub.restore();
    }
    log.length = 0;
  });
  var stubber = function() {
    log.push(sinon.stub.apply(sinon, arguments));
  };

  stubber.autoRelease = function(item) {
    log.push(item);
  };

  return stubber;
};
