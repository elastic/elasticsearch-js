var _ = require('lodash-2');
var Utils = require('../../../src/lib/utils');
var expect = require('expect.js');

var stub = require('../../utils/auto_release_stub').make();

describe('Utils', function () {

  describe('Additional Type Checkers', function () {
    describe('#isArrayOfStrings', function () {
      const thing = {
        is: ['creamy', 'poop'],
        not: {}
      };

      it('likes arrays of strings', function () {
        expect(Utils.isArrayOfStrings(thing.is)).to.be(true);
      });

      it('dislikes when there is even one non string', function () {
        // notice a string in the array
        thing.is.push(thing.not || ' not ');
        expect(Utils.isArrayOfStrings(thing.is)).to.be(false);
      });
    });

    describe('#isNumeric', function () {
      it('likes integer literals', function () {
        expect(Utils.isNumeric('-10')).to.be(true);
        expect(Utils.isNumeric('0')).to.be(true);
        expect(Utils.isNumeric('5')).to.be(true);
        expect(Utils.isNumeric(-16)).to.be(true);
        expect(Utils.isNumeric(0)).to.be(true);
        expect(Utils.isNumeric(32)).to.be(true);
        expect(Utils.isNumeric('040')).to.be(true);
        expect(Utils.isNumeric('0xFF')).to.be(true);
        expect(Utils.isNumeric(0xFFF)).to.be(true);
      });

      it('likes float literals', function () {
        expect(Utils.isNumeric('-1.6')).to.be(true);
        expect(Utils.isNumeric('4.536')).to.be(true);
        expect(Utils.isNumeric(-2.6)).to.be(true);
        expect(Utils.isNumeric(3.1415)).to.be(true);
        expect(Utils.isNumeric(8e5)).to.be(true);
        expect(Utils.isNumeric('123e-2')).to.be(true);
      });

      it('dislikes non-numeric stuff', function () {
        expect(Utils.isNumeric('')).to.be(false);
        expect(Utils.isNumeric('        ')).to.be(false);
        expect(Utils.isNumeric('\t\t')).to.be(false);
        expect(Utils.isNumeric('abcdefghijklm1234567890')).to.be(false);
        expect(Utils.isNumeric('xabcdefx')).to.be(false);
        expect(Utils.isNumeric(true)).to.be(false);
        expect(Utils.isNumeric(false)).to.be(false);
        expect(Utils.isNumeric('bcfed5.2')).to.be(false);
        expect(Utils.isNumeric('7.2acdgs')).to.be(false);
        expect(Utils.isNumeric(undefined)).to.be(false);
        expect(Utils.isNumeric(null)).to.be(false);
        expect(Utils.isNumeric(NaN)).to.be(false);
        expect(Utils.isNumeric(Infinity)).to.be(false);
        expect(Utils.isNumeric(Number.POSITIVE_INFINITY)).to.be(false);
        expect(Utils.isNumeric(Number.NEGATIVE_INFINITY)).to.be(false);
        expect(Utils.isNumeric(new Date(2009, 1, 1))).to.be(false);
        expect(Utils.isNumeric([])).to.be(false);
        expect(Utils.isNumeric([1, 2, 3, 4])).to.be(false);
        expect(Utils.isNumeric({})).to.be(false);
        expect(Utils.isNumeric(function () {})).to.be(false);
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
          expect(Utils.isInterval('1' + unit)).to.be(true);
        });

        it('likes decimal ' + name, function () {
          expect(Utils.isInterval('1.5' + unit)).to.be(true);
        });
      });

      it('dislikes more than one unit', function () {
        expect(Utils.isInterval('1my')).to.be(false);
      });

      it('dislikes spaces', function () {
        expect(Utils.isInterval('1 m')).to.be(false);
      });
    });
  });


  describe('String Transformers', function () {

    describe('#camelCase', function () {
      it('find spaces, underscores, and other natural word breaks', function () {
        expect(Utils.camelCase('Neil Patrick.Harris-is_a.dog')).to.eql('neilPatrickHarrisIsADog');
      });

      it('ignores abreviations', function () {
        expect(Utils.camelCase('Json_parser')).to.eql('jsonParser');
      });

      it('handles leading _', function () {
        expect(Utils.camelCase('_thing_one_')).to.eql('_thingOne');
      });

      it('works on numbers', function () {
        expect(Utils.camelCase('version 1.0')).to.eql('version10');
      });
    });

    describe('#studlyCase', function () {
      it('find spaces, underscores, and other natural word breaks', function () {
        expect(Utils.studlyCase('Neil Patrick.Harris-is_a.dog')).to.eql('NeilPatrickHarrisIsADog');
      });

      it('ignores abreviations', function () {
        expect(Utils.studlyCase('Json_parser')).to.eql('JsonParser');
      });

      it('handles leading _', function () {
        expect(Utils.studlyCase('_thing_one_')).to.eql('_ThingOne');
      });

      it('works on numbers', function () {
        expect(Utils.studlyCase('version 1.0')).to.eql('Version10');
      });
    });

    describe('#snakeCase', function () {
      it('find spaces, underscores, and other natural word breaks', function () {
        expect(Utils.snakeCase('Neil Patrick.Harris-is_a.dog')).to.eql('neil_patrick_harris_is_a_dog');
      });

      it('ignores abreviations', function () {
        expect(Utils.snakeCase('Json_parser')).to.eql('json_parser');
      });

      it('handles leading _', function () {
        expect(Utils.snakeCase('_thing_one_')).to.eql('_thing_one');
      });

      it('works on numbers', function () {
        expect(Utils.snakeCase('version 1.0')).to.eql('version_1_0');
      });
    });

    describe('#toLowerString', function () {
      it('transforms normal strings', function () {
        expect(Utils.toLowerString('PASTA')).to.eql('pasta');
      });

      it('ignores long form empty vals (null, false, undef)', function () {
        expect(Utils.toLowerString(null)).to.eql('');
        expect(Utils.toLowerString(false)).to.eql('');
        expect(Utils.toLowerString(void 0)).to.eql('');
      });

      it('uses the objects own toString', function () {
        expect(Utils.toLowerString(['A', 'B'])).to.eql('a,b');
      });

      it('sorta kinda works on objects', function () {
        expect(Utils.toLowerString({ a: 'thing' })).to.eql('[object object]');
      });
    });

    describe('#toUpperString', function () {
      it('transforms normal strings', function () {
        expect(Utils.toUpperString('PASTA')).to.eql('PASTA');
      });

      it('ignores long form empty vals (null, false, undef)', function () {
        expect(Utils.toUpperString(null)).to.eql('');
        expect(Utils.toUpperString(false)).to.eql('');
        expect(Utils.toUpperString(void 0)).to.eql('');
      });

      it('uses the objects own toString', function () {
        expect(Utils.toUpperString(['A', 'B'])).to.eql('A,B');
      });

      it('sorta kinda works on objects', function () {
        expect(Utils.toUpperString({ a: 'thing' })).to.eql('[OBJECT OBJECT]');
      });
    });

    describe('#repeat', function () {
      it('repeats strings', function () {
        expect(Utils.repeat(' ', 5)).to.eql('     ');
        expect(Utils.repeat('foobar', 2)).to.eql('foobarfoobar');
      });
    });

    describe('#ucfirst', function () {
      it('only capitalized the first letter, lowercases everything else', function () {
        expect(Utils.ucfirst('ALGER')).to.eql('Alger');
      });
    });

  });


  describe('#deepMerge', function () {

    it('returns the same object that was passed', function () {
      var obj = {
        foo: 'bar'
      };
      expect(Utils.deepMerge(obj, { bar: 'baz' })).to.eql(obj);
    });

    it('concats arrays', function () {
      var obj = {
        foo: ['bax', 'boz']
      };
      Utils.deepMerge(obj, { foo: ['boop'] });
      expect(obj.foo).to.have.length(3);
    });

    it('wont merge values of different types', function () {
      var obj = {
        foo: ['stop', 'foo', 'stahp']
      };
      Utils.deepMerge(obj, { foo: 'string' });
      expect(obj.foo).to.have.length(3);
    });

    it('works recursively', function () {
      var obj = {
        foo: 'bar',
        bax: {
          foo: ['bax', 'boz']
        }
      };
      Utils.deepMerge(obj, { bax: { foo: ['poo'] } });
      expect(obj.bax.foo).to.have.length(3);
    });

  });

  describe('#createArray', function () {
    it('accepts an array of things and simply returns a copy of it', function () {
      var inp = [{ a: 1 }, 'pizza'];
      var out = Utils.createArray(inp);
      expect(out).to.eql(inp);
      expect(out).to.not.be(inp);
    });
    it('accepts a primitive value and calls the the transform function', function (done) {
      Utils.createArray('str', function (val) {
        expect(val).to.be('str');
        done();
      });
    });
    it('wraps any non-array in an array', function () {
      expect(Utils.createArray({})).to.eql([{}]);
      expect(Utils.createArray('')).to.eql(['']);
      expect(Utils.createArray(123)).to.eql([123]);
      expect(Utils.createArray(/abc/)).to.eql([/abc/]);
      expect(Utils.createArray(false)).to.eql([false]);
    });
    it('returns false when the transform function returns undefined', function () {
      expect(Utils.createArray(['str', 1], function (val) {
        if (_.isString(val)) {
          return {
            val: val
          };
        }
      })).to.be(false);
    });
  });

  describe('#funcEnum', function () {
    /*
     * _.funcEnum(object, key, opts, default);
     */
    it('tests if the value at key in object is a function, returns it if so', function () {
      var config = {
        func: function () {}
      };
      expect(Utils.funcEnum(config, 'func', {}, 'toString'))
        .to.be(config.func);
    });
    it('tests if the value at key in object is undefined, returns the option at key default if so', function () {
      var config = {
        func: undefined
      };
      expect(Utils.funcEnum(config, 'func', {}, 'toString'))
        .to.be(Object.prototype.toString);
    });
    it('tests if the value at key in object is a string, returns the option at that key if so', function () {
      var config = {
        'config key name': 'toString'
      };
      expect(Utils.funcEnum(config, 'config key name', { toString: 'pizza' }, 'toJSON'))
        .to.be('pizza');
    });
    it('throws an informative error if the selection if invalid', function () {
      var config = {
        'config': 'val'
      };

      expect(function () {
        Utils.funcEnum(config, 'config', {});
      }).to.throwError(/expected a function/i);

      expect(function () {
        Utils.funcEnum(config, 'config', { main: 'default' }, 'main');
      }).to.throwError(/expected a function or main/i);

      expect(function () {
        Utils.funcEnum(config, 'config', { main: 'default', other: 'default' }, 'main');
      }).to.throwError(/expected a function or one of main, other/i);
    });
  });

  describe('#applyArgs', function () {
    _.times(10, function (i) {
      var method = i > 5 ? 'apply' : 'call';
      var argCount = i + 1;
      var slice = 1;

      it('uses ' + method + ' with ' + i + ' args', function () {
        var func = function () {};
        stub(func, method);

        var args = _.map(new Array(i), function (val, i) { return i; });
        Utils.applyArgs(func, null, args);

        expect(func[method].callCount).to.eql(1);
        if (method === 'apply') {
          expect(func.apply.lastCall.args[1]).to.eql(args);
        } else {
          expect(func.call.lastCall.args.splice(1)).to.eql(args);
        }
      });

      it('slices the arguments properly before calling ' + method + ' with ' + argCount + ' args sliced at ' + slice,
      function () {
        var func = function () {};
        stub(func, method);

        var args = _.map(new Array(argCount), function (val, i) { return i; });
        var expected = args.slice(slice);
        Utils.applyArgs(func, null, args, slice);

        expect(func[method].callCount).to.eql(1);
        if (method === 'apply') {
          expect(func.apply.lastCall.args[1]).to.eql(expected);
        } else {
          expect(func.call.lastCall.args.splice(1)).to.eql(expected);
        }
      });
    });
  });

  describe('#getUnwrittenFromStream', function () {
    it('ignores things that do not have writableState', function () {
      expect(Utils.getUnwrittenFromStream()).to.be(undefined);
      expect(Utils.getUnwrittenFromStream(false)).to.be(undefined);
      expect(Utils.getUnwrittenFromStream([])).to.be(undefined);
      expect(Utils.getUnwrittenFromStream({})).to.be(undefined);
    });

    if (require('stream').Writable) {
      var MockWritableStream = require('../../mocks/writable_stream');
      it('ignores empty stream', function () {
        var stream = new MockWritableStream();
        expect(Utils.getUnwrittenFromStream(stream)).to.be('');
      });

      it('returns only what is in the buffer', function () {
        var stream = new MockWritableStream();
        stream.write('hot');
        stream.write('dog');
        expect(Utils.getUnwrittenFromStream(stream)).to.be('dog');
      });
    }
  });

});
