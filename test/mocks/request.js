/**
 * Extended version of http.ClientRequest with a few methods stubbed
 *
 * @type {Constructor}
 */
module.exports = MockRequest;

const sinon = require('sinon');
const util = require('util');
const http = require('http');

function MockRequest() {
  sinon.stub(this, 'end');
  sinon.stub(this, 'write');
  sinon.stub(this, 'setHeader');
  this.log = sinon.stub(this.log);
}
util.inherits(MockRequest, http.ClientRequest);
