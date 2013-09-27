var _ = require('../../src/lib/utils');

exports.Utils = {

  'isArrayOf<Type>': (function (test) {
    var things = {
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
      };

    return _.map(things, function (thing, name) {
      return function (test) {
        // ident an array of objects
        test.equal(_['isArrayOf' + name + 's'](thing.is), true);

        // notice a string in the array
        thing.is.push(thing.not || ' not ');
        test.equal(_['isArrayOf' + name + 's'](thing.is), false);
        test.done();
      };
    });
  })(),

  CustomMap: {
    'return object for object': function (test) {
      var out = _.map({a:1, b:2}, function (val) { return val * 2; });
      test.deepEqual(out, {a:2, b:4});
      test.done();
    },
    'reutrn array for anything else': function (test) {
      var std = _.map([1, 2, 3], function (val) { return val * 2; });
      test.ok(_.isArray(std));
      test.deepEqual(
        std,
        _.map('123', function (val) { return val * 2; })
      );
      test.done();
    },
  }

};