var _ = require('../../src/lib/utils');
var should = require('should');

describe('Utils', function () {

  describe('Additional Type Checkers', function () {
    _.forEach({
      Object: {
        is: [[], /regexp/]
      },
      PlainObject: {
        is: [{}, {}]
      },
      String: {
        is: ['steamy', 'poop'],
        not: {}
      },
      Array: {
        is: [['im'], ['usefull']],
      },
      Finite: {
        is: [11123, 666],
        not: Infinity
      },
      Function: {
        is: [console.error, console.log],
      },
      RegExp: {
        is: [/.*/, new RegExp('a')],
      }
    },
    function (thing, name) {

      describe('#isArrayOf' + name, function (test) {
        it('likes arrays of ' + name, function () {
          should(_['isArrayOf' + name + 's'](thing.is)).be.ok;
        });

        it('dislikes when there is even one non ' + name, function () {
          // notice a string in the array
          thing.is.push(thing.not || ' not ');
          should(_['isArrayOf' + name + 's'](thing.is)).not.be.ok;
        });
      });
    });

    describe('#isNumeric', function () {
      it('likes integer literals', function () {
        should(_.isNumeric('-10')).be.ok;
        should(_.isNumeric('0')).be.ok;
        should(_.isNumeric('5')).be.ok;
        should(_.isNumeric(-16)).be.ok;
        should(_.isNumeric(0)).be.ok;
        should(_.isNumeric(32)).be.ok;
        should(_.isNumeric('040')).be.ok;
        should(_.isNumeric(0144)).be.ok;
        should(_.isNumeric('0xFF')).be.ok;
        should(_.isNumeric(0xFFF)).be.ok;
      });

      it('likes float literals', function () {
        should(_.isNumeric('-1.6')).be.ok;
        should(_.isNumeric('4.536')).be.ok;
        should(_.isNumeric(-2.6)).be.ok;
        should(_.isNumeric(3.1415)).be.ok;
        should(_.isNumeric(8e5)).be.ok;
        should(_.isNumeric('123e-2')).be.ok;
      });

      it('dislikes non-numeric stuff', function () {
        should(_.isNumeric('')).not.be.ok;
        should(_.isNumeric('        ')).not.be.ok;
        should(_.isNumeric('\t\t')).not.be.ok;
        should(_.isNumeric('abcdefghijklm1234567890')).not.be.ok;
        should(_.isNumeric('xabcdefx')).not.be.ok;
        should(_.isNumeric(true)).not.be.ok;
        should(_.isNumeric(false)).not.be.ok;
        should(_.isNumeric('bcfed5.2')).not.be.ok;
        should(_.isNumeric('7.2acdgs')).not.be.ok;
        should(_.isNumeric(undefined)).not.be.ok;
        should(_.isNumeric(null)).not.be.ok;
        should(_.isNumeric(NaN)).not.be.ok;
        should(_.isNumeric(Infinity)).not.be.ok;
        should(_.isNumeric(Number.POSITIVE_INFINITY)).not.be.ok;
        should(_.isNumeric(Number.NEGATIVE_INFINITY)).not.be.ok;
        should(_.isNumeric(new Date(2009, 1, 1))).not.be.ok;
        should(_.isNumeric([])).not.be.ok;
        should(_.isNumeric([1, 2, 3, 4])).not.be.ok;
        should(_.isNumeric({})).not.be.ok;
        should(_.isNumeric(function () {})).not.be.ok;
      });
    });


    describe('#isInterval', function () {
      _.forEach({
        M: 'months',
        w: 'weeks',
        d: 'days',
        h: 'hours',
        m: 'minutes',
        s: 'seconds',
        y: 'years'
      },
      function (name, unit) {
        it('likes ' + name, function () {
          should(_.isInterval('1' + unit)).be.ok;
        });

        it('likes decimal ' + name, function () {
          should(_.isInterval('1.5' + unit)).be.ok;
        });
      });

      it('dislikes more than one unit', function () {
        should(_.isInterval('1my')).not.be.ok;
      });

      it('dislikes spaces', function () {
        should(_.isInterval('1 m')).not.be.ok;
      });
    });
  });


  describe('String Transformers', function () {

    describe('#camelCase', function () {
      it('find spaces, underscores, and other natural word breaks', function () {
        _.camelCase('Neil Patrick.Harris-is_a.dog').should.eql('neilPatrickHarrisIsADog');
      });

      it('ignores abreviations', function () {
        _.camelCase('Json_parser').should.eql('jsonParser');
      });

      it('handles trailing _', function () {
        _.camelCase('_thing_one_').should.eql('thingOne');
      });
    });

    describe('#studlyCase', function () {
      it('find spaces, underscores, and other natural word breaks', function () {
        _.studlyCase('Neil Patrick.Harris-is_a.dog').should.eql('NeilPatrickHarrisIsADog');
      });

      it('ignores abreviations', function () {
        _.studlyCase('Json_parser').should.eql('JsonParser');
      });

      it('handles trailing _', function () {
        _.studlyCase('_thing_one_').should.eql('ThingOne');
      });
    });

    describe('#snakeCase', function () {
      it('find spaces, underscores, and other natural word breaks', function () {
        _.snakeCase('Neil Patrick.Harris-is_a.dog').should.eql('neil_patrick_harris_is_a_dog');
      });

      it('ignores abreviations', function () {
        _.snakeCase('Json_parser').should.eql('json_parser');
      });

      it('handles trailing _', function () {
        _.snakeCase('_thing_one_').should.eql('thing_one');
      });
    });

    describe('#toLowerString', function () {
      it('transforms normal strings', function () {
        _.toLowerString('PASTA').should.eql('pasta');
      });

      it('ignores long form empty vals (null, false, undef)', function () {
        _.toLowerString(null).should.eql('');
        _.toLowerString(false).should.eql('');
        _.toLowerString(void 0).should.eql('');
      });

      it('uses the objects own toString', function () {
        _.toLowerString(['A', 'B']).should.eql('a,b');
      });

      it('sorta kinda works on objects', function () {
        _.toLowerString({a: 'thing'}).should.eql('[object object]');
      });
    });

    describe('#toUpperString', function () {
      it('transforms normal strings', function () {
        _.toUpperString('PASTA').should.eql('PASTA');
      });

      it('ignores long form empty vals (null, false, undef)', function () {
        _.toUpperString(null).should.eql('');
        _.toUpperString(false).should.eql('');
        _.toUpperString(void 0).should.eql('');
      });

      it('uses the objects own toString', function () {
        _.toUpperString(['A', 'B']).should.eql('A,B');
      });

      it('sorta kinda works on objects', function () {
        _.toUpperString({a: 'thing'}).should.eql('[OBJECT OBJECT]');
      });
    });

    describe('#repeat', function () {
      it('repeats strings', function () {
        _.repeat(' ', 5).should.eql('     ');
        _.repeat('foobar', 2).should.eql('foobarfoobar');
      });
    });

    describe('#ucfirst', function () {
      it('only capitalized the first letter, lowercases everything else', function () {
        _.ucfirst('ALGER').should.eql('Alger');
      });
    });

  });


  describe('#deepMerge', function () {

    it('returns the same object that was passed', function () {
      var obj = {
        foo: 'bar'
      };
      _.deepMerge(obj, { bar: 'baz' }).should.eql(obj);
    });

    it('concats arrays', function () {
      var obj = {
        foo: ['bax', 'boz']
      };
      _.deepMerge(obj, { foo: ['boop'] });
      obj.foo.should.have.a.lengthOf(3);
    });

    it('wont merge values of different types', function () {
      var obj = {
        foo: ['stop', 'foo', 'stahp']
      };
      _.deepMerge(obj, { foo: 'string' });
      obj.foo.should.have.a.lengthOf(3);
    });

    it('works recursively', function () {
      var obj = {
        foo: 'bar',
        bax: {
          foo: ['bax', 'boz']
        }
      };
      _.deepMerge(obj, { bax: { foo: ['poo'] }});
      obj.bax.foo.should.have.a.lengthOf(3);
    });

  });

  describe('#createArray', function () {
    it('accepts an array of things and simply returns a copy of it', function () {
      var inp = [{ a: 1 }, 'pizza'];
      var out = _.createArray(inp);
      out.should.eql(inp);
      out.should.not.be.exactly(inp);
    });
    it('accepts a primitive value and calls the the transform function', function (done) {
      var out = _.createArray('str', function (val) {
        val.should.be.exactly('str');
        done();
      });
    });
    it('wraps any non-array in an array', function () {
      _.createArray({}).should.eql([{}]);
      _.createArray('').should.eql(['']);
      _.createArray(123).should.eql([123]);
      _.createArray(/abc/).should.eql([/abc/]);
      _.createArray(false).should.eql([false]);
    });
    it('returns false when the transform function returns undefined', function () {
      _.createArray(['str', 1], function (val) {
        if (_.isString(val)) {
          return {
            val: val
          };
        }
      }).should.be.exactly(false);
    });
  });
});
