/* JSON Serializer tests */

var JsonSerializer = require('../../src/lib/serializers/Json');

describe('json serializer', function () {

  var json;

  beforeEach(function () {
    json = new JsonSerializer();
  });

  it('creates simple json strings', function () {
    json.serialize({foo: true}).should.eql('{"foo":true}');
  });

  it('creates pretty json strings', function () {
    json.serialize({foo: true, bake: 'cake', 'with': ['bacon']}, null, '  ')
      .should.eql(['{',
      '  "foo": true,',
      '  "bake": "cake",',
      '  "with": [',
      '    "bacon"',
      '  ]',
      '}'].join('\n'));
  });

  it('reads simple json strings', function () {
    json.unserialize('{"foo":true}').should.eql({ foo: true });
  });

  it('does not create date objects', function () {
    json
      .unserialize('{"date":"2012-04-23T18:25:43.511Z"}')
      .should.eql({
        date: '2012-04-23T18:25:43.511Z'
      });
  });

});