var ca = require('../../../src/lib/client_action');
var expect = require('expect.js');
var _ = require('lodash-node');
var Promise = require('bluebird');

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
          return Promise.resolve(params);
        }
      },
      defer: function () {
        return Promise.defer();
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

  // used to check that params are not clobbered
  var params = (function () {
    var _stash = {};
    afterEach(function () { _stash = {}; });
    var make = function (params) {
      _stash.orig = params;
      _stash.copy = _.clone(params);
      return params;
    };
    make.check = function () {
      expect(_stash.orig).to.eql(_stash.copy);
    };

    return make;
  }());

  describe('argument juggling', function () {
    it('creates an empty param set when no params are sent', function (done) {
      action = makeClientAction();

      // note: the first arg is the callback
      action(function (err, params) {
        expect(params.query).to.eql({});
        done();
      });
    });
  });

  describe('clientAction::proxy', function () {
    it('proxies to the passed function', function () {
      var action = makeClientActionProxy(function (params, cb) {
        throw new Error('proxy function called');
      });

      expect(function () {
        action({}, function () {});
      }).to.throwError('proxy function called');
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
        expect(client.transport.request).to.be.a('function');
        done();
      });
    });

    it('handles passing just the callback', function () {
      var action = makeClientActionProxy(function (params, cb) {
        expect(_.isObject(params)).to.be.ok();
        expect(cb).to.be.a('function');
      });

      action(function () {});
    });

    it('supports a param transformation function', function () {
      var action = makeClientActionProxy(function (params, cb) {
        expect(params).to.have.property('transformed');
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

      expect(action()).to.be(football);
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
          expect(params.query.one).to.eql(1500);
          expect(params.query.two).to.eql('500');
          expect(params.query.three).to.eql('15m');

          done();
        });
      });

      it('rejects date values', function (done) {
        action({
          one: new Date()
        }, function (err, params) {
          expect(err).to.be.a(TypeError);
          done();
        });
      });

      it('rejects array', function (done) {
        action({
          one: ['one'],
          two: [ 1304 ]
        }, function (err, params) {
          expect(err).to.be.a(TypeError);
          done();
        });
      });

      it('rejects object', function (done) {
        action({
          one: { but: 'duration' }
        }, function (err, params) {
          expect(err).to.be.a(TypeError);
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
          expect(params.query).to.eql({
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
          expect(err).to.be.a(TypeError);
          done();
        });
      });

      it('it rejects objects', function (done) {
        action({
          one: {
            pasta: 'sauce'
          }
        }, function (err, params) {
          expect(err).to.be.a(TypeError);
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
          expect(params.query.one).to.eql('opt');
          done();
        });
      });

      it('accepts any value kind of in the list', function (done) {
        action({
          one: 150
        }, function (err, params) {
          if (err) { throw err; }
          expect(params.query.one).to.be('150');
          done();
        });
      });

      it('it rejects things not in the list', function (done) {
        action({
          one: 'not an opt'
        }, function (err, params) {
          expect(err).to.be.a(TypeError);
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
          expect(params.query.one).to.be(false);
          expect(params.query.two).to.be(false);
          expect(params.query.three).to.be(false);
          expect(params.query.four).to.be(false);
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
          expect(params.query.one).to.be(true);
          expect(params.query.two).to.be(true);
          expect(params.query.three).to.be(true);
          expect(params.query.four).to.be(true);
          expect(params.query.five).to.be(true);
          expect(params.query.six).to.be(true);
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
          expect(params.query.one).to.be(42);
          expect(params.query.two).to.be(-69);
          expect(params.query.three).to.be(15);
          expect(params.query.four).to.be(-100);
          expect(params.query.five).to.be(255);
          expect(params.query.six).to.be(4095);
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
          expect(params.query.one).to.be(-1.6);
          expect(params.query.two).to.be(4.536);
          expect(params.query.three).to.be(-2.6);
          expect(params.query.four).to.be(3.1415);
          expect(params.query.five).to.be(800000);
          expect(params.query.six).to.be(1.23);
          done();
        });
      });

      it('rejects dates', function (done) {
        action({
          one: new Date()
        }, function (err, params) {
          expect(err).to.be.a(TypeError);
          done();
        });
      });

      it('rejects objects', function (done) {
        action({
          one: {}
        }, function (err, params) {
          expect(err).to.be.a(TypeError);
          done();
        });
      });

      it('rejects arrays', function (done) {
        action({
          one: []
        }, function (err, params) {
          expect(err).to.be.a(TypeError);
          done();
        });
      });

      it('rejects regexp', function (done) {
        action({
          one: /pasta/g
        }, function (err, params) {
          expect(err).to.be.a(TypeError);
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
          expect(params.query.one).to.be('42');
          expect(params.query.two).to.be('-69');
          expect(params.query.three).to.be('15');
          expect(params.query.four).to.be('-100');
          expect(params.query.five).to.be('0xFF');
          expect(params.query.six).to.be('4095');
          done();
        });
      });

      it('rejects dates', function (done) {
        action({
          one: new Date()
        }, function (err, params) {
          expect(err).to.be.a(TypeError);
          done();
        });
      });

      it('rejects objects', function (done) {
        action({
          one: {}
        }, function (err, params) {
          expect(err).to.be.a(TypeError);
          done();
        });
      });

      it('rejects arrays', function (done) {
        action({
          one: []
        }, function (err, params) {
          expect(err).to.be.a(TypeError);
          done();
        });
      });

      it('rejects regexp', function (done) {
        action({
          one: /pasta/g
        }, function (err, params) {
          expect(err).to.be.a(TypeError);
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
          five: new Date('2013-03-01T01:10:00Z')
        }, function (err, params) {
          if (err) { throw err; }
          expect(params.query.one).to.be('42');
          expect(params.query.two).to.be('-69');
          expect(params.query.three).to.be('15');
          expect(params.query.four).to.be('' + now.getTime());
          expect(params.query.five).to.be('1362100200000');
          done();
        });
      });

      it('rejects objects', function (done) {
        action({
          one: {}
        }, function (err, params) {
          expect(err).to.be.a(TypeError);
          done();
        });
      });

      it('rejects arrays', function (done) {
        action({
          one: []
        }, function (err, params) {
          expect(err).to.be.a(TypeError);
          done();
        });
      });

      it('rejects regexp', function (done) {
        action({
          one: /pasta/g
        }, function (err, params) {
          expect(err).to.be.a(TypeError);
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
        expect(params.bulkBody).to.be(true);
        done();
      });
    });

    it('sets castExists when the method in the spec is HEAD', function (done) {
      var action = makeClientAction({
        method: 'HEAD'
      });

      action({}, function (err, params) {
        expect(params.castExists).to.be(true);
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
        expect(params.body).to.be(body);
        done();
      });
    });

    it('errors when the body is not set but required', function (done) {
      action().then(function () {
        done(new Error('Error should have been raised'));
      }, function (err) {
        expect(err).to.be.a(TypeError);
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
        expect(params.method).to.be('GET');
        done();
      });
    });

    it('uppercases and passed the default method', function (done) {
      var action = makeClientAction({
        method: 'POST'
      });

      action({}, function (err, params) {
        expect(params.method).to.be('POST');
        done();
      });
    });
  });

  describe('passing of ignore param', function () {
    it('passes ignore as an array', function (done) {
      var action = makeClientAction({});
      action({ ignore: 404 }, function (err, params) {
        expect(params.ignore).to.eql([404]);
        done();
      });
    });
  });

  describe('passing requestTimeout', function () {
    it('passes passes the spec value by default', function (done) {
      var action = makeClientAction({
        requestTimeout: 100
      });

      action({}, function (err, params) {
        expect(params.requestTimeout).to.be(100);
        done();
      });
    });

    it('passes the provided value', function (done) {
      var action = makeClientAction({
        requestTimeout: 100
      });

      action({ requestTimeout: 3000 }, function (err, params) {
        expect(params.requestTimeout).to.be(3000);
        done();
      });
    });

    it('passes nothing be default', function (done) {
      var action = makeClientAction({});

      action({}, function (err, params) {
        expect(params.requestTimeout).be(void 0);
        done();
      });
    });
  });

  describe('url resolver', function () {

    var action = makeClientAction({
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
              'default': '_all'
            },
            thing: {
              type: 'any',
              'default': ''
            }
          }
        }
      ]
    });

    // match a url to the parameters passed in.
    it('rejects a url if it required params that are not present', function (done) {
      action(params({
        type: ['type1', 'type2']
      }), function (err, resp) {
        expect(err).to.be.a(TypeError);
        params.check();
        done();
      });
    });

    it('uses the default value for optional params', function (done) {
      action(params({
        index: 'index1',
        id: '1'
      }), function (err, resp) {
        if (err) { throw err; }
        expect(resp.path).to.be('/index1/_all/1/');
        params.check();
        done();
      });
    });

    it('casts both optional and required args', function (done) {
      action(params({
        index: ['index1', 'index2'],
        id: '123',
        type: ['_all', '-pizza'],
        thing: 'poo'
      }), function (err, resp) {
        if (err) { throw err; }
        expect(resp.path).to.be('/index1%2Cindex2/_all%2C-pizza/123/poo');
        params.check();
        done();
      });
    });
  });

  describe('param collection', function () {
    var action = makeClientAction({
      params: {
        a: { type: 'list', required: true },
        b: { type: 'duration', 'default': '15m' },
        q: { type: 'any' }
      }
    });

    it('collects all of the params into params.query', function (done) {
      action(params({
        a: 'pizza',
        b: '1M'
      }), function (err, resp) {
        if (err) { throw err; }
        expect(resp.query).to.eql({
          a: 'pizza',
          b: '1M'
        });
        params.check();
        done();
      });
    });

    it('includes extra params', function (done) {
      action(params({
        a: 'pizza',
        b: '3w',
        c: 'popular',
      }), function (err, resp) {
        if (err) { throw err; }
        expect(resp.query).to.eql({
          a: 'pizza',
          b: '3w',
          c: 'popular'
        });
        params.check();
        done();
      });
    });

    it('excludes default values', function (done) {
      action(params({
        a: 'pizza',
        b: '15m',
      }), function (err, resp) {
        if (err) { throw err; }
        expect(resp.query).to.eql({
          a: 'pizza'
        });
        params.check();
        done();
      });
    });

    it('does not include non-query param keys', function (done) {
      action(params({
        a: 'pizza',
        b: '3w',
        q: 'beep',
        body: '{ "mmm": "json" }',
        requestTimeout: 1000,
        method: 'head',
        ignore: 201
      }), function (err, resp) {
        if (err) { throw err; }
        expect(resp.query).to.eql({
          a: 'pizza',
          b: '3w',
          q: 'beep'
        });
        params.check();
        done();
      });
    });

    it('enforces required params', function (done) {
      action(params({
        b: '3w'
      }), function (err, resp) {
        expect(err).to.be.a(TypeError);
        params.check();
        done();
      });
    });

    it('does not modify the incoming params object', function () {
      var action = makeClientAction({
        url: {
          req: {
            index: { type: 'string' }
          },
          fmt: '/<%= index %>'
        }
      });
      action(params({
        index: 'index'
      }), function (err, resp) {
        expect(resp).to.eql({
          method: 'GET',
          path: '/index',
          query: {}
        });
        params.check();
      });
    });
  });

});
