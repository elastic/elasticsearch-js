describe('JSON serializer', function () {
  var JsonSerializer = require('../../../src/lib/serializers/json');
  var expect = require('expect.js');
  var sinon = require('sinon');
  var stub = require('../../utils/auto_release_stub').make();

  function makeSerializer() {
    return new JsonSerializer();
  }

  describe('#serialize', function () {
    it('defers to JSON.stringify', function () {
      var stub = sinon.stub(JSON, 'stringify');
      var ser = makeSerializer();
      ser.serialize({ some: 'object' });
      expect(stub.callCount).to.eql(1);
      stub.restore();
    });

    it('does not modify strings', function () {
      var ser = makeSerializer();
      var thing = 'pretend that I am serialized';
      expect(ser.serialize(thing)).to.be(thing);
    });

    it('returns nothing for invalid values', function () {
      var ser = makeSerializer();

      expect(ser.serialize(null)).to.be(undefined);
      expect(ser.serialize(false)).to.be(undefined);
    });

    it('throws serialization errors', function () {
      var ser = makeSerializer();
      var thing = { name: 'thing' };
      thing.self = thing;

      expect(function () {
        ser.serialize(thing);
      }).to.throwError();
    });
  });

  describe('#deserialize', function () {
    it('defers to JSON.parse', function () {
      stub(JSON, 'parse');
      var ser = makeSerializer();
      ser.deserialize('{ "some": "JSON" }');
      expect(JSON.parse.callCount).to.eql(1);
    });

    it('ignores non string values', function () {
      var ser = makeSerializer();
      var thing = ['pretend that I am not here'];
      expect(ser.deserialize(thing)).to.be(undefined);
      expect(ser.deserialize(null)).to.be(undefined);
      expect(ser.deserialize(false)).to.be(undefined);
    });

    it('catches serialization errors, returns nothing', function () {
      var ser = makeSerializer();
      var thing = '{ name: \'thing\' }';

      expect(ser.deserialize(thing)).to.be(undefined);
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
      expect(ser.bulkBody(body)).to.eql(bulk);
    });

    it('adds a newline to the end of strings', function () {
      var ser = makeSerializer();
      expect(ser.bulkBody(bulk.substr(0, bulk.length - 1))).to.eql(bulk);
    });

    it('throws an error for anything else', function () {
      var ser = makeSerializer();
      expect(function () {
        ser.bulkBody({});
      }).to.throwError();

      expect(function () {
        ser.bulkBody(null);
      }).to.throwError();

      expect(function () {
        ser.bulkBody(false);
      }).to.throwError();
    });
  });
});