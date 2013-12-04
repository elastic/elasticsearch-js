var JsonSerializer = require('../../src/lib/serializers/json');
var should = require('should');

describe('JSON serializer', function () {
  var stub = require('./auto_release_stub').make();

  function makeSerializer() {
    return new JsonSerializer();
  }

  describe('#serialize', function () {
    it('defers to JSON.stringify', function () {
      stub(JSON, 'stringify');
      var ser = makeSerializer();
      ser.serialize({ some: 'object' });
      JSON.stringify.callCount.should.eql(1);
    });

    it('does not modify strings', function () {
      var ser = makeSerializer();
      var thing = 'pretend that I am serialized';
      ser.serialize(thing).should.be.exactly(thing);
    });

    it('returns nothing for invalid values', function () {
      var ser = makeSerializer();

      should.not.exist(ser.serialize(null));
      should.not.exist(ser.serialize(false));
    });

    it('throws serialization errors', function () {
      var ser = makeSerializer();
      var thing = { name: 'thing' };
      thing.self = thing;

      (function () {
        ser.serialize(thing);
      }).should.throw();
    });
  });

  describe('#deserialize', function () {
    it('defers to JSON.parse', function () {
      stub(JSON, 'parse');
      var ser = makeSerializer();
      ser.deserialize('{ "some": "JSON" }');
      JSON.parse.callCount.should.eql(1);
    });

    it('ignores non string values', function () {
      var ser = makeSerializer();
      var thing = ['pretend that I am not here'];
      should.not.exist(ser.deserialize(thing));
      should.not.exist(ser.deserialize(null));
      should.not.exist(ser.deserialize(false));
    });

    it('catches serialization errors, returns nothing', function () {
      var ser = makeSerializer();
      var thing = '{ name: \'thing\' }';

      should.not.exist(ser.deserialize(thing));
    });
  });

  describe('#bulkBody', function () {
    var body = [
      { index: 'thing' },
      { document: 'hi' }
    ];
    var bulk = '{"index":"thing"}\n{"document":"hi"}\n';

    it('creates a string out of an array of obejcts', function () {
      var ser = makeSerializer();
      ser.bulkBody(body).should.eql(bulk);
    });

    it('adds a newline to the end of strings', function () {
      var ser = makeSerializer();
      ser.bulkBody(bulk.substr(0, bulk.length - 1)).should.eql(bulk);
    });

    it('throws an error for anything else', function () {
      var ser = makeSerializer();
      (function () {
        ser.bulkBody({});
      }).should.throw();

      (function () {
        ser.bulkBody(null);
      }).should.throw();

      (function () {
        ser.bulkBody(false);
      }).should.throw();
    });
  });
});