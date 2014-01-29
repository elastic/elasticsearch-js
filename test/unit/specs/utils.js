var _ = require('../../../src/lib/utils');
var expect = require('expect.js');

var stub = require('../../utils/auto_release_stub').make();

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
        is: [function () {}, function () {}],
      },
      RegExp: {
        is: [/.*/, new RegExp('a')],
      }
    },
    function (thing, name) {
      describe('#isArrayOf' + name, function (test) {
        it('likes arrays of ' + name, function () {
          expect(_['isArrayOf' + name + 's'](thing.is)).to.be(true);
        });

        it('dislikes when there is even one non ' + name, function () {
          // notice a string in the array
          thing.is.push(thing.not || ' not ');
          expect(_['isArrayOf' + name + 's'](thing.is)).to.be(false);
        });
      });
    });

    describe('#isNumeric', function () {
      it('likes integer literals', function () {
        expect(_.isNumeric('-10')).to.be(true);
        expect(_.isNumeric('0')).to.be(true);
        expect(_.isNumeric('5')).to.be(true);
        expect(_.isNumeric(-16)).to.be(true);
        expect(_.isNumeric(0)).to.be(true);
        expect(_.isNumeric(32)).to.be(true);
        expect(_.isNumeric('040')).to.be(true);
        expect(_.isNumeric(0144)).to.be(true);
        expect(_.isNumeric('0xFF')).to.be(true);
        expect(_.isNumeric(0xFFF)).to.be(true);
      });

      it('likes float literals', function () {
        expect(_.isNumeric('-1.6')).to.be(true);
        expect(_.isNumeric('4.536')).to.be(true);
        expect(_.isNumeric(-2.6)).to.be(true);
        expect(_.isNumeric(3.1415)).to.be(true);
        expect(_.isNumeric(8e5)).to.be(true);
        expect(_.isNumeric('123e-2')).to.be(true);
      });

      it('dislikes non-numeric stuff', function () {
        expect(_.isNumeric('')).to.be(false);
        expect(_.isNumeric('        ')).to.be(false);
        expect(_.isNumeric('\t\t')).to.be(false);
        expect(_.isNumeric('abcdefghijklm1234567890')).to.be(false);
        expect(_.isNumeric('xabcdefx')).to.be(false);
        expect(_.isNumeric(true)).to.be(false);
        expect(_.isNumeric(false)).to.be(false);
        expect(_.isNumeric('bcfed5.2')).to.be(false);
        expect(_.isNumeric('7.2acdgs')).to.be(false);
        expect(_.isNumeric(undefined)).to.be(false);
        expect(_.isNumeric(null)).to.be(false);
        expect(_.isNumeric(NaN)).to.be(false);
        expect(_.isNumeric(Infinity)).to.be(false);
        expect(_.isNumeric(Number.POSITIVE_INFINITY)).to.be(false);
        expect(_.isNumeric(Number.NEGATIVE_INFINITY)).to.be(false);
        expect(_.isNumeric(new Date(2009, 1, 1))).to.be(false);
        expect(_.isNumeric([])).to.be(false);
        expect(_.isNumeric([1, 2, 3, 4])).to.be(false);
        expect(_.isNumeric({})).to.be(false);
        expect(_.isNumeric(function () {})).to.be(false);
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
          expect(_.isInterval('1' + unit)).to.be(true);
        });

        it('likes decimal ' + name, function () {
          expect(_.isInterval('1.5' + unit)).to.be(true);
        });
      });

      it('dislikes more than one unit', function () {
        expect(_.isInterval('1my')).to.be(false);
      });

      it('dislikes spaces', function () {
        expect(_.isInterval('1 m')).to.be(false);
      });
    });
  });


  describe('String Transformers', function () {

    describe('#camelCase', function () {
      it('find spaces, underscores, and other natural word breaks', function () {
        expect(_.camelCase('Neil Patrick.Harris-is_a.dog')).to.eql('neilPatrickHarrisIsADog');
      });

      it('ignores abreviations', function () {
        expect(_.camelCase('Json_parser')).to.eql('jsonParser');
      });

      it('handles leading _', function () {
        expect(_.camelCase('_thing_one_')).to.eql('_thingOne');
      });

      it('works on numbers', function () {
        expect(_.camelCase('version 1.0')).to.eql('version10');
      });
    });

    describe('#studlyCase', function () {
      it('find spaces, underscores, and other natural word breaks', function () {
        expect(_.studlyCase('Neil Patrick.Harris-is_a.dog')).to.eql('NeilPatrickHarrisIsADog');
      });

      it('ignores abreviations', function () {
        expect(_.studlyCase('Json_parser')).to.eql('JsonParser');
      });

      it('handles leading _', function () {
        expect(_.studlyCase('_thing_one_')).to.eql('_ThingOne');
      });

      it('works on numbers', function () {
        expect(_.studlyCase('version 1.0')).to.eql('Version10');
      });
    });

    describe('#snakeCase', function () {
      it('find spaces, underscores, and other natural word breaks', function () {
        expect(_.snakeCase('Neil Patrick.Harris-is_a.dog')).to.eql('neil_patrick_harris_is_a_dog');
      });

      it('ignores abreviations', function () {
        expect(_.snakeCase('Json_parser')).to.eql('json_parser');
      });

      it('handles leading _', function () {
        expect(_.snakeCase('_thing_one_')).to.eql('_thing_one');
      });

      it('works on numbers', function () {
        expect(_.snakeCase('version 1.0')).to.eql('version_1_0');
      });
    });

    describe('#toLowerString', function () {
      it('transforms normal strings', function () {
        expect(_.toLowerString('PASTA')).to.eql('pasta');
      });

      it('ignores long form empty vals (null, false, undef)', function () {
        expect(_.toLowerString(null)).to.eql('');
        expect(_.toLowerString(false)).to.eql('');
        expect(_.toLowerString(void 0)).to.eql('');
      });

      it('uses the objects own toString', function () {
        expect(_.toLowerString(['A', 'B'])).to.eql('a,b');
      });

      it('sorta kinda works on objects', function () {
        expect(_.toLowerString({a: 'thing'})).to.eql('[object object]');
      });
    });

    describe('#toUpperString', function () {
      it('transforms normal strings', function () {
        expect(_.toUpperString('PASTA')).to.eql('PASTA');
      });

      it('ignores long form empty vals (null, false, undef)', function () {
        expect(_.toUpperString(null)).to.eql('');
        expect(_.toUpperString(false)).to.eql('');
        expect(_.toUpperString(void 0)).to.eql('');
      });

      it('uses the objects own toString', function () {
        expect(_.toUpperString(['A', 'B'])).to.eql('A,B');
      });

      it('sorta kinda works on objects', function () {
        expect(_.toUpperString({a: 'thing'})).to.eql('[OBJECT OBJECT]');
      });
    });

    describe('#repeat', function () {
      it('repeats strings', function () {
        expect(_.repeat(' ', 5)).to.eql('     ');
        expect(_.repeat('foobar', 2)).to.eql('foobarfoobar');
      });
    });

    describe('#ucfirst', function () {
      it('only capitalized the first letter, lowercases everything else', function () {
        expect(_.ucfirst('ALGER')).to.eql('Alger');
      });
    });

  });


  describe('#deepMerge', function () {

    it('returns the same object that was passed', function () {
      var obj = {
        foo: 'bar'
      };
      expect(_.deepMerge(obj, { bar: 'baz' })).to.eql(obj);
    });

    it('concats arrays', function () {
      var obj = {
        foo: ['bax', 'boz']
      };
      _.deepMerge(obj, { foo: ['boop'] });
      expect(obj.foo).to.have.length(3);
    });

    it('wont merge values of different types', function () {
      var obj = {
        foo: ['stop', 'foo', 'stahp']
      };
      _.deepMerge(obj, { foo: 'string' });
      expect(obj.foo).to.have.length(3);
    });

    it('works recursively', function () {
      var obj = {
        foo: 'bar',
        bax: {
          foo: ['bax', 'boz']
        }
      };
      _.deepMerge(obj, { bax: { foo: ['poo'] }});
      expect(obj.bax.foo).to.have.length(3);
    });

  });

  describe('#createArray', function () {
    it('accepts an array of things and simply returns a copy of it', function () {
      var inp = [{ a: 1 }, 'pizza'];
      var out = _.createArray(inp);
      expect(out).to.eql(inp);
      expect(out).to.not.be(inp);
    });
    it('accepts a primitive value and calls the the transform function', function (done) {
      var out = _.createArray('str', function (val) {
        expect(val).to.be('str');
        done();
      });
    });
    it('wraps any non-array in an array', function () {
      expect(_.createArray({})).to.eql([{}]);
      expect(_.createArray('')).to.eql(['']);
      expect(_.createArray(123)).to.eql([123]);
      expect(_.createArray(/abc/)).to.eql([/abc/]);
      expect(_.createArray(false)).to.eql([false]);
    });
    it('returns false when the transform function returns undefined', function () {
      expect(_.createArray(['str', 1], function (val) {
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
      expect(_.funcEnum(config, 'func', {}, 'toString'))
        .to.be(config.func);
    });
    it('tests if the value at key in object is undefined, returns the option at key default if so', function () {
      var config = {
        func: undefined
      };
      expect(_.funcEnum(config, 'func', {}, 'toString'))
        .to.be(Object.prototype.toString);
    });
    it('tests if the value at key in object is a string, returns the option at that key if so', function () {
      var config = {
        'config key name': 'toString'
      };
      expect(_.funcEnum(config, 'config key name', { toString: 'pizza' }, 'toJSON'))
        .to.be('pizza');
    });
    it('throws an informative error if the selection if invalid', function () {
      var config = {
        'config': 'val'
      };

      expect(function () {
        _.funcEnum(config, 'config', {});
      }).to.throwError(/expected a function/i);

      expect(function () {
        _.funcEnum(config, 'config', { main: 'default' }, 'main');
      }).to.throwError(/expected a function or main/i);

      expect(function () {
        _.funcEnum(config, 'config', { main: 'default', other: 'default' }, 'main');
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
        _.applyArgs(func, null, args);

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
        _.applyArgs(func, null, args, slice);

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
      expect(_.getUnwrittenFromStream()).to.be(undefined);
      expect(_.getUnwrittenFromStream(false)).to.be(undefined);
      expect(_.getUnwrittenFromStream([])).to.be(undefined);
      expect(_.getUnwrittenFromStream({})).to.be(undefined);
    });

    if (require('stream').Writable) {
      var MockWritableStream = require('../../mocks/writable_stream');
      it('ignores empty stream', function () {
        var stream = new MockWritableStream();
        expect(_.getUnwrittenFromStream(stream)).to.be('');
      });

      it('returns only what is in the buffer', function () {
        var stream = new MockWritableStream();
        stream.write('hot');
        stream.write('dog');
        expect(_.getUnwrittenFromStream(stream)).to.be('dog');
      });
    }
  });

});
