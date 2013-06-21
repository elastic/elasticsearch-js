/* node transport function tests */
// TODO: add check to see if any data in ES, fail if so.
'use strict';

var esj = require('../../dist/elasticsearch-node.js');
var _c = new esj.Client();

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.transportNode = {
  setUp: function(done) {
    done();
  },
  'hosts': function(test) {
    test.expect(4);

    _c.options.hosts = ['foo:9200','bar:9200'];
    test.equal(_c.options.hosts.length, 2, 'should be 2');
    test.equal(_c.options.hosts[1], 'bar:9200', 'should be bar:9200');
    _c.options.hosts = ['localhost:9200'];
    test.equal(_c.options.hosts.length, 1, 'should be 1');
    test.equal(_c.options.hosts[0], 'localhost:9200', 'should be localhost:9200');

    test.done();
  },
  'options': function(test) {
    test.expect(6);
    var _n = new esj.Client();

    test.equal(_c.options.sniff_on_start, false, 'should be false');
    test.equal(_c.options.sniff_after_requests, 0, 'should be 0');
    test.equal(_c.options.sniff_on_connection_fail, false, 'should be false');
    test.equal(_c.options.max_retries, 3, 'should be 3');

    _c.options.max_retries = 5;

    test.equal(_c.options.max_retries, 5, '_c max_retries should be 5');
    test.equal(_n.options.max_retries, 3, '_n max_retries should be 3');

    test.done();
  },
  // Create an index with put
  'put': function(test) {
    test.expect(1);
    _c.transport.put('/foo',{},'{"foo":1}',function(res) {
      test.equal(res.data.ok,true,'index should be created');
      test.done();
    });
  },
  'post': function(test) {
    test.expect(1);
    _c.transport.post('/foo/bar/baz',{},'{"foo":1}',function(res) {
      test.equal(res.data.ok,true,'document should be created');
      test.done();
    });
  },
  'get success': function(test) {
    test.expect(1);
    _c.transport.get('/foo/bar/baz',{},'',function(res) {
      test.deepEqual(res.data._source,{foo:1},'should contain document source');
      test.done();
    });
  },
  'get error': function(test) {
    test.expect(1);
    _c.transport.get('/foo/bar',{},'',function(data){},function(res) {
      test.equal(res.data,'No handler found for uri [/foo/bar?] and method [GET]','End point should not exist');
      test.done();
    });
  },
  'del': function(test) {
    test.expect(1);
    _c.transport.del('/foo',{},'',function(res) {
      test.equal(res.data.ok,true,'index should be deleted');
      test.done();
    });
  },
  'error callback': function(test) {
    test.expect(1);
    _c.options.hosts = ['localhost:1'];
    _c.transport.get('/foo/bar',{},'',function(res){
      test.equal(res.data,'Test failed','Success function should not be called');
      test.done();
    },function(res) {
      test.equal(res.code,'ECONNREFUSED','Connection should be refused');
      test.done();
    });
  }
};