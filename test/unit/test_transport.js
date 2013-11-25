var Transport = require('../../src/lib/transport');

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

});
