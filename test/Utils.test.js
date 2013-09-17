var _ = require('../src/lib/Utils');

describe('Utils', function () {

  describe('isArrayOfObjects', function () {
    var is;

    beforeEach(function () {
      is = [{}, {}];
    });

    it('should identify an array of objects', function () {
      _.isArrayOfObjects(is).should.equal(true);
    });

    it('should identify a non object in the array', function () {
      is.push(' not ');
      _.isArrayOfObjects(is).should.equal(false);
    });
  });

  describe('isArrayOfStrings', function () {
    var is;

    beforeEach(function () {
      is = ['spencer', 'poop'];
    });

    it('should identify an array of strings', function () {
      _.isArrayOfStrings(is).should.equal(true);
    });

    it('should identify a non string in the array', function () {
      is.push({});
      _.isArrayOfStrings(is).should.equal(false);
    });
  });

  describe('isArrayOfArrays', function () {
    var is;

    beforeEach(function () {
      is = [['im'], ['usefull']];
    });

    it('should identify an array of arrays', function () {
      _.isArrayOfArrays(is).should.equal(true);
    });

    it('should identify a non array in the array', function () {
      is.push({});
      _.isArrayOfArrays(is).should.equal(false);
    });
  });

  describe('isArrayOfFinites', function () {
    var is;

    beforeEach(function () {
      is = [11123, 666];
    });

    it('should identify an array of objects', function () {
      _.isArrayOfFinites(is).should.equal(true);
    });

    it('should identify a non object in the array', function () {
      is.push(Infinity);
      _.isArrayOfFinites(is).should.equal(false);
    });
  });

  describe('isArrayOfFunctions', function () {
    var is;

    beforeEach(function () {
      is = [console.error, console.log];
    });

    it('should identify an array of functions', function () {
      _.isArrayOfFunctions(is).should.equal(true);
    });

    it('should identify a non function in the array', function () {
      is.push('not');
      _.isArrayOfFunctions(is).should.equal(false);
    });
  });

  describe('isArrayOfRegExps', function () {
    var is;

    beforeEach(function () {
      is = [/.*/, new RegExp('a')];
    });

    it('should identify an array of regular expressions', function () {
      _.isArrayOfRegExps(is).should.equal(true);
    });

    it('should identify a non regular expression in the array', function () {
      is.push('not');
      _.isArrayOfRegExps(is).should.equal(false);
    });
  });

});