/**
 * Just a buffer really, but one that implements just a few methods similar
 * to the old writable streams, but without the same internals as streams 2.0
 * Writables.
 *
 * @type {Constuctor}
 */
module.exports = MockOldWritableStream;

var util = require('util');

function MockOldWritableStream(opts) {
  var queue = [];

  this.write = function (chunk) {
    queue.push(chunk);
  };

  this.end = function () {
    queue.push(null);
  };
}
