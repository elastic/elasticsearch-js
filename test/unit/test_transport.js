var Transport = require('../../src/lib/transport');
var Host = require('../../src/lib/host');

var sinon = require('sinon');
var nodeList = require('../fixtures/short_node_list.json');

var stub = require('./auto_release_stub').make();

describe('Transport Class', function () {

  describe('Constructor', function () {
    it('Accepts a log class and intanciates it at this.log', function () {
      function CustomLogClass() {}
      var trans = new Transport({
        logClass: CustomLogClass
      });

      trans.log.should.be.an.instanceOf(CustomLogClass);
    });

    it('Accepts the name of a log class that is defined on Transport.logs', function () {
      Transport.logs.custom = function () {
        // custom logger class!
      };

      var trans = new Transport({
        logClass: 'custom'
      });

      trans.log.should.be.an.instanceOf(Transport.logs.custom);
      delete Transport.logs.custom;
    });

    it('Accepts a "createDefer" function, which can be used to tie into other promise libs.', function () {
      function CustomPromise() {
        this.then = function () {};
      }

      var trans = new Transport({
        createDefer: function () {
          return new CustomPromise();
        }
      });

      trans.createDefer().should.be.an.instanceOf(CustomPromise);
    });

    it('Accepts a connection pool class and intanciates it at this.connectionPool', function () {
      function CustomConnectionPool() {}
      var trans = new Transport({
        connectionPool: CustomConnectionPool
      });

      trans.connectionPool.should.be.an.instanceOf(CustomConnectionPool);
    });

    it('Accepts the name of a connectionPool class that is defined on Transport.connectionPools', function () {
      Transport.connectionPools.custom = function () {};

      var trans = new Transport({
        connectionPool: 'custom'
      });

      trans.connectionPool.should.be.an.instanceOf(Transport.connectionPools.custom);
      delete Transport.connectionPools.custom;
    });

    it('Throws an error when the logClass or connectionPool configs are set wrong', function () {
      (function () {
        var trans = new Transport({
          connectionPool: 'pasta'
        });
      }).should.throw(/invalid connectionpool/i);

      (function () {
        var trans = new Transport({
          logClass: 'pasta'
        });
      }).should.throw(/invalid logclass/i);
    });
  });

  describe('#sniff', function () {
    var trans;

    beforeEach(function () {
      trans = new Transport();
      stub(trans, 'request', function (params, cb) {
        process.nextTick(function () {
          cb(void 0, {
            ok: true,
            cluster_name: 'clustername',
            nodes: nodeList
          }, 200);
        });
      });

      stub(trans.connectionPool, 'setHosts');
    });

    it('works without a callback', function (done) {
      trans.sniff();
      setTimeout(function () {
        trans.request.callCount.should.eql(1);
        done();
      }, 5);
    });

    it('calls the nodesToHostCallback with the list of nodes', function (done) {
      trans.nodesToHostCallback = function (nodes) {
        nodes.should.eql(nodeList);
        done();
        return [];
      };
      trans.sniff();
    });

    it('takes the host configs, converts them into Host objects, and passes them to connectionPool.setHosts',
    function (done) {
      trans.sniff(function () {
        trans.connectionPool.setHosts.callCount.should.eql(1);
        var hosts = trans.connectionPool.setHosts.lastCall.args[0];

        hosts.should.have.length(2);

        hosts[0].should.be.an.instanceOf(Host);
        hosts[0].host.should.eql('10.10.10.100');
        hosts[0].port.should.eql(9205);

        hosts[0].should.be.an.instanceOf(Host);
        hosts[1].host.should.eql('10.10.10.101');
        hosts[1].port.should.eql(9205);
        done();
      });
    });

    it('passed back errors caught from the request', function (done) {
      trans.request.func = function (params, cb) {
        process.nextTick(function () {
          cb(new Error('something funked up'));
        });
      };

      trans.sniff(function (err) {
        err.message.should.eql('something funked up');
        done();
      });
    });

    it('passed back the full server response', function (done) {
      trans.sniff(function (err, resp, status) {
        resp.should.include({
          ok: true,
          cluster_name: 'clustername'
        });
        done();
      });
    });
    it('passed back the server response code', function (done) {
      trans.sniff(function (err, resp, status) {
        status.should.eql(200);
        done();
      });
    });
  });

});
