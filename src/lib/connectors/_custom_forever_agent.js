module.exports = CustomForeverAgent;

var ForeverAgent = require('forever-agent');
var inherits = require('util').inherits;

function CustomForeverAgent(opts) {
  ForeverAgent.call(this, opts);
}
inherits(CustomForeverAgent, ForeverAgent);

CustomForeverAgent.prototype.addRequest = function (req, host, port) {
  // force this, so that requests will always use the connection pool
  req.useChunkedEncodingByDefault = false;
  ForeverAgent.prototype.addRequest.call(this, req, host, port);
};

CustomForeverAgent.SSL = ForeverAgent.SSL;