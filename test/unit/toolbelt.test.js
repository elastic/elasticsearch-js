var _ = require('../../src/lib/toolbelt')
  , expect = require('expect.js');

describe('Utils', function () {

  describe('Additional Type Checkers', function () {
    _.forEach({
      Object: {
        is: [[], console.log]
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
          expect(_['isArrayOf' + name + 's'](thing.is)).to.be.true;
        });

        it('dislikes when there is even one non ' + name, function () {
          // notice a string in the array
          thing.is.push(thing.not || ' not ');
          expect(_['isArrayOf' + name + 's'](thing.is)).to.be.false;
        });
      });
    });

    describe('#isNumeric', function () {
      it('likes Infinity', function () {
        expect(_.isNumeric(Infinity)).to.eq(true);
      });

      it('likes strings', function () {
        expect(_.isNumeric('100')).to.eq(true);
      });

      it('likes integers', function () {
        expect(_.isNumeric(100)).to.eq(true);
      });

      it('likes floats', function () {
        expect(_.isNumeric(100.1)).to.eq(true);
      });

      it('likes exponentials', function () {
        expect(_.isNumeric(100e1)).to.eq(true);
      });

      it('likes hexidecimals', function () {
        expect(_.isNumeric(0x100)).to.eq(true);
      });

      it('likes imaginary numbers', function () {
        expect(_.isNumeric('yeah right')).to.eq(false);
      });

      it('dislikes strings with words', function () {
        expect(_.isNumeric('100heat')).to.eq(false);
      });

      it('dislikes strings with words even if they are seperate', function () {
        expect(_.isNumeric('100 pasta')).to.eq(false);
      });

      it('dislikes null', function () {
        expect(_.isNumeric(null)).to.eq(false);
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
        it('likes ' + name, function () { expect(_.isInterval('1' + unit)).to.be.true; });
        it('likes decimal ' + name, function () { expect(_.isInterval('1.5' + unit)).to.be.true; });
      });

      it('dislikes more than one unit', function () {
        expect(_.isInterval('1my')).to.be.false;
      });

      it('dislikes spaces', function () {
        expect(_.isInterval('1 m')).to.be.false;
      });
    });

  });


  describe('Lodash Modifications', function () {

    describe('#map', function () {
      it('returns an object when passed an object', function () {
        var out = _.map({a:1, b:2}, function (val) { return val * 2; });
        expect(out).to.deep.eq({a:2, b:4});
      });

      it('returns an array for anything else', function () {
        var std = _.map([1, 2, 3], function (val) { return val * 2; });
        expect(std)
          .to.be.a('array')
          .and.to.deep.eq(_.map('123', function (val) { return val * 2; }));
      });
    });

  });


  describe('String Transformers', function () {

    describe('#camelCase', function () {
      it('find spaces, underscores, and other natural word breaks', function () {
        expect(_.camelCase('Neil PatRICK hArris-is_a.dog')).to.eq('neilPatrickHarrisIsADog');
      });

      it('ignores abreviations', function () {
        expect(_.camelCase('JSON_parser')).to.eq('jsonParser');
      });
    });

    describe('#studlyCase', function () {
      it('find spaces, underscores, and other natural word breaks', function () {
        expect(_.studlyCase('Neil PatRICK hArris-is_a.dog')).to.eq('NeilPatrickHarrisIsADog');
      });

      it('ignores abreviations', function () {
        expect(_.studlyCase('JSON_parser')).to.eq('JsonParser');
      });
    });

    describe('#toLowerString', function () {
      it('transforms normal strings', function () {
        expect(_.toLowerString('PASTA')).to.eq('pasta');
      });

      it('ignores long form empty vals (null, false, undef)', function () {
        expect(_.toLowerString(null)).to.eq('');
        expect(_.toLowerString(false)).to.eq('');
        expect(_.toLowerString(void 0)).to.eq('');
      });

      it('uses the objects own toString', function () {
        expect(_.toLowerString(['A', 'B'])).to.eq('a,b');
      });

      it('sorta kinda works on objects', function () {
        expect(_.toLowerString({a: 'thing'})).to.eq('[object object]');
      });
    });
  });


  describe('#deepMerge', function () {

    it('returns the same object that was passed', function () {
      var obj = {
        foo:'bar'
      };
      expect(_.deepMerge(obj, { bar: 'baz' })).to.eq(obj);
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
        foo:'bar',
        bax: {
          foo: ['bax', 'boz']
        }
      };
      _.deepMerge(obj, { bax: { foo: ['poo'] }});
      expect(obj.bax.foo).to.have.length(3);
    });

  });
});
