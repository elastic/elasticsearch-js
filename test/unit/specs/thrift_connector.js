describe('Thrift Connector', function () {

  var _ = require('lodash-node');
  var expect = require('expect.js');
  var nock = require('nock');
  var sinon = require('sinon');
  var util = require('util');
  var thrift = require('thrift');
  var CustomAgent = require('../../../src/lib/connectors/_custom_agent');

  var Host = require('../../../src/lib/host');
  var errors = require('../../../src/lib/errors');
  var ThriftConnection = require('../../../src/lib/connectors/thrift');
  var ConnectionAbstract = require('../../../src/lib/connection');

  var expectSubObject = require('../../utils/expect_sub_object');
  var MockRequest = require('../../mocks/request');
  var MockIncommingMessage = require('../../mocks/incomming_message');

  nock.disableNetConnect();

  var stub = require('../../utils/auto_release_stub').make();

  function makeStubReqMethod(prep) {
    return function (params, cb) {
      var req = new MockRequest();
      if (prep) {
        prep(req, params, cb);
      }
      return req;
    };
  }

  function whereReqDies(withErr) {
    return function (req) {
      process.nextTick(function () {
        // causes the request to quit and callback
        req.emit('error', withErr || void 0);
      });
    };
  }

  describe('Constructor', function () {
    it('creates an object that extends ConnectionAbstract', function () {
      var con = new ThriftConnection(new Host());
      expect(con).to.be.a(ConnectionAbstract);
    });

    it('expects the host to have a protocol of thrift', function () {
      expect(function () {
        var con = new ThriftConnection(new Host('http://es.com/stuff'));
      }).to.throwError(/invalid protocol/i);
    });
  });

});
