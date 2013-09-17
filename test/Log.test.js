describe('Log (the log bridge)', function () {

  var Log = require('../src/lib/Log');

  describe('level', function () {

    it('should return 2 for "warning"', function () {
      Log.level('warning', 1)
        .should.equal(2);
    });

    it('should return 2 for 2', function () {
      Log.level('2', 1)
        .should.equal(2);
    });

    it('should return the default for an invalid level', function () {
      Log.level('invalid level', 2)
        .should.equal(2);
    });

  });

  describe('join', function () {

    it('should join strings', function () {
      Log.join(['one', 'two']).should.equal('one two');
    });

    it('should flatten nested arrays', function () {
      Log.join(['one', ['three', 'four']])
        .should.equal('one three,four');
    });

    it('should flatten arguments', function () {
      (function() {
        Log.join(arguments).should.equal('one two');
      }('one', 'two'));
    });

  });

  describe('When an instance has no outputs', function () {
    var log = new Log([]); // no log outputs

    it('error should not emit an event and return false', function () {

    });

  });

});