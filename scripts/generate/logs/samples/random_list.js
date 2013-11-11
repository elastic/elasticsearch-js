/**
 * @class RandomList
 */

module.exports = RandomList;

var _ = require('../../../../src/lib/utils');

function RandomList(list) {
  this.get = function () {
    return list[Math.round(Math.random() * list.length)];
  };
}
