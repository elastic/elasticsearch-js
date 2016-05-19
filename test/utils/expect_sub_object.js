var _ = require('lodash-migrate');
var expect = require('expect.js');
module.exports = function expectSubObject(obj, subObj) {
  _.forOwn(subObj, function (val, prop) {
    if (typeof obj[prop] === 'object') {
      // non-strict equals
      expect(obj[prop]).to.eql(val, 'Expected property' + prop + ' of object to equal ' + val);
    } else {
      expect(obj).property(prop, val);
    }
  });
};