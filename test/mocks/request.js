/**
 * Extended version of http.ClientRequest with a few methods stubbed
 *
 * @type {Constructor}
 */
module.exports = MockRequest;

var sinon = require('sinon');
var util = require('util');
var http = require('http');

function MockRequest() {
  sinon.stub(this, 'end');
  sinon.stub(this, 'write');
  this.log = sinon.stub(this.log);
}
util.inherits(MockRequest, http.ClientRequest);