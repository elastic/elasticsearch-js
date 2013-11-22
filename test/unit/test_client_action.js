var ca = require('../../src/lib/client_action');
var should = require('should');
var _ = require('lodash');
var when = require('when');

/**
 * Creates a simple mock of the client, whose "transport" has a request
 * function that just calls back with the parameters it received
 *
 * @return {Object}
 */
function mockClient() {
  return {
    transport: {
      request: function (params, cb) {
        if (typeof cb === 'function') {
          process.nextTick(function () {
            cb(void 0, params);
          });
        } else {
          return when.resolve(params);
        }
      }
    }
  };
}

/**
 * Creates a client action, ensuring that is has some default url specs, and binds it to
 * a mock client.
 *
 * @param  {Object} spec - the spec for the client action
 * @return {Function} - the client action
 */
function makeClientAction(spec) {
  spec = spec || {};

  if (!spec.urls && !spec.url) {
    spec.url = {
      fmt: '/'
    };
  }

  return _.bind(ca(spec), mockClient());
}

/**
 * Calls ca.proxy and binds it to a mock client
 * @param  {Function} fn - the function to proxy
 * @param  {Object} spec - The spec for the proxy
 * @return {Function} - the clientActionProxy
 */
function makeClientActionProxy(fn, spec) {
  return _.bind(ca.proxy(fn, spec || {}), mockClient());
}


describe('Client Action runner', function () {
  var action;

  describe('argument juggling', function () {
    it('creates an empty param set when no params are sent', function (done) {
      action = makeClientAction();

      // note: the first arg is the callback
      action(function (err, params) {
        params.query.should.eql({});
        done();
      });
    });
  });

  describe('clientAction::proxy', function () {
    it('proxies to the passed function', function () {
      var action = makeClientActionProxy(function (params, cb) {
        throw new Error('proxy function called');
      });

      (function () {
        action({}, function () {});
      }).should.throw('proxy function called');

    });

    it('provides the proper context', function (done) {
      var client;
      var action = makeClientActionProxy(function (params, cb) {
        client = this;
        process.nextTick(function () {
          cb(void 0, params);
        });
      });

      action({}, function (err, params) {
        client.transport.request.should.be.type('function');
        done();
      });
    });

    it('handles passing just the callback', function () {
      var action = makeClientActionProxy(function (params, cb) {
        should(_.isObject(params)).be.ok;
        cb.should.be.type('function');
      });

      action(function () {});
    });

    it('supports a param transformation function', function () {
      var action = makeClientActionProxy(function (params, cb) {
        params.should.have.property('transformed');
      }, {
        transform: function (params) {
          params.transformed = true;
        }
      });

      action(function () {});
    });

    it('returns the proxied function\'s return value', function () {
      var football = {};
      var action = makeClientActionProxy(function (params, cb) {
        return football;
      });

      action().should.be.exactly(football);
    });
  });

  describe('param casting', function () {
    describe('duration', function () {
      beforeEach(function () {
        action = makeClientAction({
          params: {
            one: {
              type: 'duration'
            },
            two: {
              type: 'duration'
            },
            three: {
              type: 'duration'
            },
            four: {
              type: 'duration'
            }
          }
        });
      });

      it('accepts a number, string, or interval', function (done) {
        action({
          one: 1500,
          two: '500',
          three: '15m'
        }, function (err, params) {
          if (err) { throw err; }
          params.query.one.should.eql(1500);
          params.query.two.should.eql('500');
          params.query.three.should.eql('15m');

          done();
        });
      });

      it('rejects date values', function (done) {
        action({
          one: new Date()
        }, function (err, params) {
          err.should.be.an.instanceOf(TypeError);
          done();
        });
      });

      it('rejects array', function (done) {
        action({
          one: ['one'],
          two: [ 1304 ]
        }, function (err, params) {
          err.should.be.an.instanceOf(TypeError);
          done();
        });
      });

      it('rejects object', function (done) {
        action({
          one: { but: 'duration' }
        }, function (err, params) {
          err.should.be.an.instanceOf(TypeError);
          done();
        });
      });
    });

    describe('list', function () {
      beforeEach(function () {
        action = makeClientAction({
          params: {
            one: { type: 'list' },
            two: { type: 'list' },
            three: { type: 'list' }
          }
        });
      });

      it('accepts a string, number, or array', function (done) {
        action({
          one: 'some,strings',
          two: 1430,
          three: ['some', 'strings'],
        }, function (err, params) {
          if (err) { throw err; }
          params.query.should.eql({
            one: 'some,strings',
            two: 1430,
            three: 'some,strings'
          });
          done();
        });
      });

      it('it rejects regexp', function (done) {
        action({
          one: /regexp!/g
        }, function (err, params) {
          err.should.be.an.instanceOf(TypeError);
          done();
        });
      });

      it('it rejects objects', function (done) {
        action({
          one: {
            pasta: 'sauce'
          }
        }, function (err, params) {
          err.should.be.an.instanceOf(TypeError);
          done();
        });
      });
    });

    describe('enum', function () {
      beforeEach(function () {
        action = makeClientAction({
          params: {
            one: { type: 'enum', options: ['opt', 'other opt', '150'] }
          }
        });
      });

      it('accepts any value in the list', function (done) {
        action({
          one: 'opt'
        }, function (err, params) {
          if (err) { throw err; }
          params.query.one.should.eql('opt');
          done();
        });
      });

      it('accepts any value kind of in the list', function (done) {
        action({
          one: 150
        }, function (err, params) {
          if (err) { throw err; }
          params.query.one.should.be.exactly('150');
          done();
        });
      });

      it('it rejects things not in the list', function (done) {
        action({
          one: 'not an opt'
        }, function (err, params) {
          err.should.be.an.instanceOf(TypeError);
          done();
        });
      });
    });

    describe('boolean', function () {
      beforeEach(function () {
        action = makeClientAction({
          params: {
            one: { type: 'boolean' },
            two: { type: 'boolean' },
            three: { type: 'boolean' },
            four: { type: 'boolean' },
            five: { type: 'boolean' },
            six: { type: 'boolean' },
          }
        });
      });

      it('casts "off", "no", and other falsey things to false', function (done) {
        action({
          one: 'off',
          two: 'no',
          three: false,
          four: ''
        }, function (err, params) {
          if (err) { throw err; }
          should(params.query.one).be.exactly(false);
          should(params.query.two).be.exactly(false);
          should(params.query.three).be.exactly(false);
          should(params.query.four).be.exactly(false);
          done();
        });
      });

      it('cast most everything else to true', function (done) {
        action({
          one: 'yes',
          two: 'ok',
          three: true,
          four: 1,
          five: new Date(),
          six: {}
        }, function (err, params) {
          if (err) { throw err; }
          should(params.query.one).be.exactly(true);
          should(params.query.two).be.exactly(true);
          should(params.query.three).be.exactly(true);
          should(params.query.four).be.exactly(true);
          should(params.query.five).be.exactly(true);
          should(params.query.six).be.exactly(true);
          done();
        });
      });
    });

    describe('number', function () {
      beforeEach(function () {
        action = makeClientAction({
          params: {
            one: { type: 'number' },
            two: { type: 'number' },
            three: { type: 'number' },
            four: { type: 'number' },
            five: { type: 'number' },
            six: { type: 'number' },
          }
        });
      });

      it('casts integers properly', function (done) {
        action({
          one: '42',
          two: '-69',
          three: 15,
          four: -100,
          five: '0xFF',
          six: 0xFFF
        }, function (err, params) {
          if (err) { throw err; }
          params.query.one.should.equal(42);
          params.query.two.should.equal(-69);
          params.query.three.should.equal(15);
          params.query.four.should.equal(-100);
          params.query.five.should.equal(255);
          params.query.six.should.equal(4095);
          done();
        });
      });

      it('casts floats properly', function (done) {
        action({
          one: '-1.6',
          two: '4.536',
          three: -2.6,
          four: 3.1415,
          five: 8e5,
          six: '123e-2',
        }, function (err, params) {
          if (err) { throw err; }
          params.query.one.should.equal(-1.6);
          params.query.two.should.equal(4.536);
          params.query.three.should.equal(-2.6);
          params.query.four.should.equal(3.1415);
          params.query.five.should.equal(800000);
          params.query.six.should.equal(1.23);
          done();
        });
      });

      it('rejects dates', function (done) {
        action({
          one: new Date()
        }, function (err, params) {
          err.should.be.an.instanceOf(TypeError);
          done();
        });
      });
      it('rejects objects', function (done) {
        action({
          one: {}
        }, function (err, params) {
          err.should.be.an.instanceOf(TypeError);
          done();
        });
      });
      it('rejects arrays', function (done) {
        action({
          one: []
        }, function (err, params) {
          err.should.be.an.instanceOf(TypeError);
          done();
        });
      });
      it('rejects regexp', function (done) {
        action({
          one: /pasta/g
        }, function (err, params) {
          err.should.be.an.instanceOf(TypeError);
          done();
        });
      });
    });

    describe('string', function () {
      beforeEach(function () {
        action = makeClientAction({
          params: {
            one: { type: 'string' },
            two: { type: 'string' },
            three: { type: 'string' },
            four: { type: 'string' },
            five: { type: 'string' },
            six: { type: 'string' },
          }
        });
      });

      it('accepts numbers and strings', function (done) {
        action({
          one: '42',
          two: '-69',
          three: 15,
          four: -100,
          five: '0xFF',
          six: 0xFFF
        }, function (err, params) {
          if (err) { throw err; }
          params.query.one.should.equal('42');
          params.query.two.should.equal('-69');
          params.query.three.should.equal('15');
          params.query.four.should.equal('-100');
          params.query.five.should.equal('0xFF');
          params.query.six.should.equal('4095');
          done();
        });
      });

      it('rejects dates', function (done) {
        action({
          one: new Date()
        }, function (err, params) {
          err.should.be.an.instanceOf(TypeError);
          done();
        });
      });
      it('rejects objects', function (done) {
        action({
          one: {}
        }, function (err, params) {
          err.should.be.an.instanceOf(TypeError);
          done();
        });
      });
      it('rejects arrays', function (done) {
        action({
          one: []
        }, function (err, params) {
          err.should.be.an.instanceOf(TypeError);
          done();
        });
      });
      it('rejects regexp', function (done) {
        action({
          one: /pasta/g
        }, function (err, params) {
          err.should.be.an.instanceOf(TypeError);
          done();
        });
      });
    });

    describe('time', function () {
      beforeEach(function () {
        action = makeClientAction({
          params: {
            one: { type: 'time' },
            two: { type: 'time' },
            three: { type: 'time' },
            four: { type: 'time' },
            five: { type: 'time' },
            six: { type: 'time' },
          }
        });
      });

      it('accepts numbers, strings, and dates', function (done) {
        var now = new Date();

        action({
          one: '42',
          two: '-69',
          three: 15,
          four: now,
          five: new Date(999, 2399, 152433)
        }, function (err, params) {
          if (err) { throw err; }
          params.query.one.should.equal('42');
          params.query.two.should.equal('-69');
          params.query.three.should.equal('15');
          params.query.four.should.equal('' + now.getTime());
          params.query.five.should.equal('-11162941200000');
          done();
        });
      });

      it('rejects objects', function (done) {
        action({
          one: {}
        }, function (err, params) {
          err.should.be.an.instanceOf(TypeError);
          done();
        });
      });
      it('rejects arrays', function (done) {
        action({
          one: []
        }, function (err, params) {
          err.should.be.an.instanceOf(TypeError);
          done();
        });
      });
      it('rejects regexp', function (done) {
        action({
          one: /pasta/g
        }, function (err, params) {
          err.should.be.an.instanceOf(TypeError);
          done();
        });
      });
    });
  });

  describe('passing of control params from spec', function () {
    it('passes bulkBody', function (done) {
      var action = makeClientAction({
        bulkBody: true
      });

      action({}, function (err, params) {
        params.bulkBody.should.be.exactly(true);
        done();
      });
    });

    it('passes castExists', function (done) {
      var action = makeClientAction({
        castExists: true
      });

      action({}, function (err, params) {
        params.castExists.should.be.exactly(true);
        done();
      });
    });
  });

  describe('body handling', function () {
    var action = makeClientAction({
      needsBody: true
    });

    it('passed the body when it is set', function (done) {
      var body = '{"JSON":"PLEASE"}';

      action({ body: body }, function (err, params) {
        params.body.should.be.exactly(body);
        done();
      });
    });

    it('errors when the body is not set but required', function (done) {
      action().then(function () {
        done(new Error('Error should have been raised'));
      }, function (err) {
        err.should.be.an.instanceOf(TypeError);
        done();
      });
    });
  });

  describe('passing of http method', function () {
    it('uppercases and passed the default method', function (done) {
      var action = makeClientAction({
        method: 'POST'
      });

      action({method: 'get'}, function (err, params) {
        params.method.should.be.exactly('GET');
        done();
      });
    });

    it('uppercases and passed the default method', function (done) {
      var action = makeClientAction({
        method: 'POST'
      });

      action({}, function (err, params) {
        params.method.should.be.exactly('POST');
        done();
      });
    });
  });

  describe('passing of ignore param', function () {
    it('passes ignore as an array', function (done) {
      var action = makeClientAction({});
      action({ ignore: 404 }, function (err, params) {
        params.ignore.should.eql([404]);
        done();
      });
    });
  });

  describe('passing of timeout', function () {
    it('passes the timeout', function (done) {
      var action = makeClientAction({
        timeout: 100
      });

      action({}, function (err, params) {
        params.timeout.should.be.exactly(100);
        done();
      });
    });

    it('passes the provided value for timeout', function (done) {
      var action = makeClientAction({
        timeout: 100
      });

      action({ timeout: 3000 }, function (err, params) {
        params.timeout.should.be.exactly(3000);
        done();
      });
    });

    it('uses 10000 as the default timeout', function (done) {
      var action = makeClientAction({});

      action({}, function (err, params) {
        params.timeout.should.be.exactly(10000);
        done();
      });
    });
  });

  describe('url resolver', function () {

    var action =  makeClientAction({
      urls: [
        {
          fmt: '/<%=index%>/<%=type%>/<%=id%>/<%=thing%>',
          req: {
            index: {
              type: 'list'
            },
            id: {
              type: 'any'
            }
          },
          opt: {
            type: {
              type: 'list',
              default: '_all'
            },
            thing: {
              type: 'any',
              default: ''
            }
          }
        }
      ]
    });

    // match a url to the parameters passed in.
    it('rejects a url if it required params that are not present', function (done) {
      action({
        type: ['type1', 'type2']
      }, function (err, params) {
        err.should.be.an.instanceOf(TypeError);
        done();
      });
    });

    it('uses the default value for optional params', function (done) {
      action({
        index: 'index1',
        id: '1'
      }, function (err, params) {
        if (err) { throw err; }
        params.path.should.be.exactly('/index1/_all/1/');
        done();
      });
    });

    it('casts both optional and required args', function (done) {
      action({
        index: ['index1', 'index2'],
        id: '123',
        type: ['_all', '-pizza'],
        thing: 'poo'
      }, function (err, params) {
        if (err) { throw err; }
        params.path.should.be.exactly('/index1%2Cindex2/_all%2C-pizza/123/poo');
        done();
      });
    });
  });

  describe('param collection', function () {
    var action = makeClientAction({
      params: {
        a: { type: 'list', required: true },
        b: { type: 'duration', default: '15m' },
        q: { type: 'any' }
      }
    });

    it('collects all of the params into params.query', function (done) {
      action({
        a: 'pizza',
        b: '1M'
      },
      function (err, params) {
        if (err) { throw err; }
        params.query.should.eql({
          a: 'pizza',
          b: '1M'
        });
        done();
      });
    });

    it('includes extra params', function (done) {
      action({
        a: 'pizza',
        b: '3w',
        c: 'popular',
      },
      function (err, params) {
        if (err) { throw err; }
        params.query.should.eql({
          a: 'pizza',
          b: '3w',
          c: 'popular'
        });
        done();
      });
    });

    it('excludes default values', function (done) {
      action({
        a: 'pizza',
        b: '15m',
      },
      function (err, params) {
        if (err) { throw err; }
        params.query.should.eql({
          a: 'pizza'
        });
        done();
      });
    });

    it('does not include non-query param keys', function (done) {
      action({
        a: 'pizza',
        b: '3w',
        q: 'beep',
        body: '{ "mmm": "json" }',
        timeout: 1000,
        method: 'head',
        ignore: 201
      },
      function (err, params) {
        if (err) { throw err; }
        params.query.should.eql({
          a: 'pizza',
          b: '3w',
          q: 'beep'
        });
        done();
      });
    });

    it('enforces required params', function (done) {
      action({
        b: '3w'
      },
      function (err, params) {
        err.should.be.an.instanceOf(TypeError);
        done();
      });
    });
  });

});
