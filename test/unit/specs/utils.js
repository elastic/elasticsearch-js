var _ = require('lodash');
var utils = require('../../../src/lib/utils');
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
        expect(utils.isArrayOfStrings(thing.is)).to.be(true);
      });

      it('dislikes when there is even one non string', function () {
        // notice a string in the array
        thing.is.push(thing.not || ' not ');
        expect(utils.isArrayOfStrings(thing.is)).to.be(false);
      });
    });

    describe('#isNumeric', function () {
      it('likes integer literals', function () {
        expect(utils.isNumeric('-10')).to.be(true);
        expect(utils.isNumeric('0')).to.be(true);
        expect(utils.isNumeric('5')).to.be(true);
        expect(utils.isNumeric(-16)).to.be(true);
        expect(utils.isNumeric(0)).to.be(true);
        expect(utils.isNumeric(32)).to.be(true);
        expect(utils.isNumeric('040')).to.be(true);
        expect(utils.isNumeric('0xFF')).to.be(true);
        expect(utils.isNumeric(0xFFF)).to.be(true);
      });

      it('likes float literals', function () {
        expect(utils.isNumeric('-1.6')).to.be(true);
        expect(utils.isNumeric('4.536')).to.be(true);
        expect(utils.isNumeric(-2.6)).to.be(true);
        expect(utils.isNumeric(3.1415)).to.be(true);
        expect(utils.isNumeric(8e5)).to.be(true);
        expect(utils.isNumeric('123e-2')).to.be(true);
      });

      it('dislikes non-numeric stuff', function () {
        expect(utils.isNumeric('')).to.be(false);
        expect(utils.isNumeric('        ')).to.be(false);
        expect(utils.isNumeric('\t\t')).to.be(false);
        expect(utils.isNumeric('abcdefghijklm1234567890')).to.be(false);
        expect(utils.isNumeric('xabcdefx')).to.be(false);
        expect(utils.isNumeric(true)).to.be(false);
        expect(utils.isNumeric(false)).to.be(false);
        expect(utils.isNumeric('bcfed5.2')).to.be(false);
        expect(utils.isNumeric('7.2acdgs')).to.be(false);
        expect(utils.isNumeric(undefined)).to.be(false);
        expect(utils.isNumeric(null)).to.be(false);
        expect(utils.isNumeric(NaN)).to.be(false);
        expect(utils.isNumeric(Infinity)).to.be(false);
        expect(utils.isNumeric(Number.POSITIVE_INFINITY)).to.be(false);
        expect(utils.isNumeric(Number.NEGATIVE_INFINITY)).to.be(false);
        expect(utils.isNumeric(new Date(2009, 1, 1))).to.be(false);
        expect(utils.isNumeric([])).to.be(false);
        expect(utils.isNumeric([1, 2, 3, 4])).to.be(false);
        expect(utils.isNumeric({})).to.be(false);
        expect(utils.isNumeric(function () {})).to.be(false);
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
          expect(utils.isInterval('1' + unit)).to.be(true);
        });

        it('likes decimal ' + name, function () {
          expect(utils.isInterval('1.5' + unit)).to.be(true);
        });
      });

      it('dislikes more than one unit', function () {
        expect(utils.isInterval('1my')).to.be(false);
      });

      it('dislikes spaces', function () {
        expect(utils.isInterval('1 m')).to.be(false);
      });
    });
  });


  describe('String Transformers', function () {

    describe('#camelCase', function () {
      it('find spaces, underscores, and other natural word breaks', function () {
        expect(utils.camelCase('Neil Patrick.Harris-is_a.dog')).to.eql('neilPatrickHarrisIsADog');
      });

      it('ignores abreviations', function () {
        expect(utils.camelCase('Json_parser')).to.eql('jsonParser');
      });

      it('handles leading _', function () {
        expect(utils.camelCase('_thing_one_')).to.eql('_thingOne');
      });

      it('works on numbers', function () {
        expect(utils.camelCase('version 1.0')).to.eql('version10');
      });
    });

    describe('#studlyCase', function () {
      it('find spaces, underscores, and other natural word breaks', function () {
        expect(utils.studlyCase('Neil Patrick.Harris-is_a.dog')).to.eql('NeilPatrickHarrisIsADog');
      });

      it('ignores abreviations', function () {
        expect(utils.studlyCase('Json_parser')).to.eql('JsonParser');
      });

      it('handles leading _', function () {
        expect(utils.studlyCase('_thing_one_')).to.eql('_ThingOne');
      });

      it('works on numbers', function () {
        expect(utils.studlyCase('version 1.0')).to.eql('Version10');
      });
    });

    describe('#snakeCase', function () {
      it('find spaces, underscores, and other natural word breaks', function () {
        expect(utils.snakeCase('Neil Patrick.Harris-is_a.dog')).to.eql('neil_patrick_harris_is_a_dog');
      });

      it('ignores abreviations', function () {
        expect(utils.snakeCase('Json_parser')).to.eql('json_parser');
      });

      it('handles leading _', function () {
        expect(utils.snakeCase('_thing_one_')).to.eql('_thing_one');
      });

      it('works on numbers', function () {
        expect(utils.snakeCase('version 1.0')).to.eql('version_1_0');
      });
    });

    describe('#toUpperString', function () {
      it('transforms normal strings', function () {
        expect(utils.toUpperString('PASTA')).to.eql('PASTA');
      });

      it('ignores long form empty vals (null, false, undef)', function () {
        expect(utils.toUpperString(null)).to.eql('');
        expect(utils.toUpperString(false)).to.eql('');
        expect(utils.toUpperString(void 0)).to.eql('');
      });

      it('uses the objects own toString', function () {
        expect(utils.toUpperString(['A', 'B'])).to.eql('A,B');
      });

      it('sorta kinda works on objects', function () {
        expect(utils.toUpperString({ a: 'thing' })).to.eql('[OBJECT OBJECT]');
      });
    });

    describe('#repeat', function () {
      it('repeats strings', function () {
        expect(utils.repeat(' ', 5)).to.eql('     ');
        expect(utils.repeat('foobar', 2)).to.eql('foobarfoobar');
      });
    });

    describe('#ucfirst', function () {
      it('only capitalized the first letter, lowercases everything else', function () {
        expect(utils.ucfirst('ALGER')).to.eql('Alger');
      });
    });

  });


  describe('#deepMerge', function () {

    it('returns the same object that was passed', function () {
      var obj = {
        foo: 'bar'
      };
      expect(utils.deepMerge(obj, { bar: 'baz' })).to.eql(obj);
    });

    it('concats arrays', function () {
      var obj = {
        foo: ['bax', 'boz']
      };
      utils.deepMerge(obj, { foo: ['boop'] });
      expect(obj.foo).to.have.length(3);
    });

    it('wont merge values of different types', function () {
      var obj = {
        foo: ['stop', 'foo', 'stahp']
      };
      utils.deepMerge(obj, { foo: 'string' });
      expect(obj.foo).to.have.length(3);
    });

    it('works recursively', function () {
      var obj = {
        foo: 'bar',
        bax: {
          foo: ['bax', 'boz']
        }
      };
      utils.deepMerge(obj, { bax: { foo: ['poo'] } });
      expect(obj.bax.foo).to.have.length(3);
    });

  });

  describe('#createArray', function () {
    it('accepts an array of things and simply returns a copy of it', function () {
      var inp = [{ a: 1 }, 'pizza'];
      var out = utils.createArray(inp);
      expect(out).to.eql(inp);
      expect(out).to.not.be(inp);
    });
    it('accepts a primitive value and calls the the transform function', function (done) {
      utils.createArray('str', function (val) {
        expect(val).to.be('str');
        done();
      });
    });
    it('wraps any non-array in an array', function () {
      expect(utils.createArray({})).to.eql([{}]);
      expect(utils.createArray('')).to.eql(['']);
      expect(utils.createArray(123)).to.eql([123]);
      expect(utils.createArray(/abc/)).to.eql([/abc/]);
      expect(utils.createArray(false)).to.eql([false]);
    });
    it('returns false when the transform function returns undefined', function () {
      expect(utils.createArray(['str', 1], function (val) {
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
      expect(utils.funcEnum(config, 'func', {}, 'toString'))
        .to.be(config.func);
    });
    it('tests if the value at key in object is undefined, returns the option at key default if so', function () {
      var config = {
        func: undefined
      };
      expect(utils.funcEnum(config, 'func', {}, 'toString'))
        .to.be(Object.prototype.toString);
    });
    it('tests if the value at key in object is a string, returns the option at that key if so', function () {
      var config = {
        'config key name': 'toString'
      };
      expect(utils.funcEnum(config, 'config key name', { toString: 'pizza' }, 'toJSON'))
        .to.be('pizza');
    });
    it('throws an informative error if the selection if invalid', function () {
      var config = {
        'config': 'val'
      };

      expect(function () {
        utils.funcEnum(config, 'config', {});
      }).to.throwError(/expected a function/i);

      expect(function () {
        utils.funcEnum(config, 'config', { main: 'default' }, 'main');
      }).to.throwError(/expected a function or main/i);

      expect(function () {
        utils.funcEnum(config, 'config', { main: 'default', other: 'default' }, 'main');
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
        utils.applyArgs(func, null, args);

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
        utils.applyArgs(func, null, args, slice);

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
      expect(utils.getUnwrittenFromStream()).to.be(undefined);
      expect(utils.getUnwrittenFromStream(false)).to.be(undefined);
      expect(utils.getUnwrittenFromStream([])).to.be(undefined);
      expect(utils.getUnwrittenFromStream({})).to.be(undefined);
    });

    if (require('stream').Writable) {
      var MockWritableStream = require('../../mocks/writable_stream');
      it('ignores empty stream', function () {
        var stream = new MockWritableStream();
        expect(utils.getUnwrittenFromStream(stream)).to.be('');
      });

      it('returns only what is in the buffer', function () {
        var stream = new MockWritableStream();
        stream.write('hot');
        stream.write('dog');
        expect(utils.getUnwrittenFromStream(stream)).to.be('dog');
      });
    }
  });

});
