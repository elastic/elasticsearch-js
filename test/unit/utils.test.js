var _ = require('../../src/lib/utils')
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
        expect(_.isNumeric(Infinity)).to.be.true;
      });

      it('likes strings', function () {
        expect(_.isNumeric('100')).to.be.true;
      });

      it('likes integers', function () {
        expect(_.isNumeric(100)).to.be.true;
      });

      it('likes floats', function () {
        expect(_.isNumeric(100.1)).to.be.true;
      });

      it('likes exponentials', function () {
        expect(_.isNumeric(100e1)).to.be.true;
      });

      it('likes hexidecimals', function () {
        expect(_.isNumeric(0x100)).to.be.true;
      });

      it('likes imaginary numbers', function () {
        expect(_.isNumeric('yeah right')).to.be.false;
      });

      it('dislikes strings with words', function () {
        expect(_.isNumeric('100heat')).to.be.false;
      });

      it('dislikes strings with words even if they are seperate', function () {
        expect(_.isNumeric('100 pasta')).to.be.false;
      });

      it('dislikes null', function () {
        expect(_.isNumeric(null)).to.be.false;
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


  describe('String Transformers', function () {

    describe('#camelCase', function () {
      it('find spaces, underscores, and other natural word breaks', function () {
        expect(_.camelCase('Neil Patrick.Harris-is_a.dog')).to.eql('neilPatrickHarrisIsADog');
      });

      it('ignores abreviations', function () {
        expect(_.camelCase('Json_parser')).to.eql('jsonParser');
      });

      it('handles trailing _', function () {
        expect(_.camelCase('_thing_one_')).to.eql('thingOne');
      });
    });

    describe('#studlyCase', function () {
      it('find spaces, underscores, and other natural word breaks', function () {
        expect(_.studlyCase('Neil Patrick.Harris-is_a.dog')).to.eql('NeilPatrickHarrisIsADog');
      });

      it('ignores abreviations', function () {
        expect(_.studlyCase('Json_parser')).to.eql('JsonParser');
      });

      it('handles trailing _', function () {
        expect(_.studlyCase('_thing_one_')).to.eql('ThingOne');
      });
    });

    describe('#snakeCase', function () {
      it('find spaces, underscores, and other natural word breaks', function () {
        expect(_.snakeCase('Neil Patrick.Harris-is_a.dog')).to.eql('neil_patrick_harris_is_a_dog');
      });

      it('ignores abreviations', function () {
        expect(_.snakeCase('Json_parser')).to.eql('json_parser');
      });

      it('handles trailing _', function () {
        expect(_.snakeCase('_thing_one_')).to.eql('thing_one');
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
});
