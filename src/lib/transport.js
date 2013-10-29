/**
 * Class that manages making request, called by all of the API methods.
 * @type {[type]}
 */
module.exports = Transport;

var _ = require('./utils');
var TransportRequest = require('./transport_request');
var errors = require('./errors');

function Transport(config) {
  this.config = config;
}

/**
 * Perform a request with the client's transport
 *
 * @method request
 * @todo async body writing
 * @todo abort
 * @todo access to custom headers, modifying of request in general
 * @param {object} params
 * @param {String} params.url - The url for the request
 * @param {String} params.method - The HTTP method for the request
 * @param {String} params.body - The body of the HTTP request
 * @param {Function} cb - A function to call back with (error, responseBody, responseStatus)
 */
Transport.prototype.request = function (params, cb) {
  return new TransportRequest(this.config, params, cb);
};

/**
 * Ask an ES node for a list of all the nodes, add/remove nodes from the connection
 * pool as appropriate
 *
 * @param  {Function} cb - Function to call back once complete
 */
Transport.prototype.sniff = function (cb) {
  var config = this.config;

  // make cb a function if it isn't
  cb = typeof cb === 'function' ? cb : _.noop;

  this.request({
    path: '/_cluster/nodes',
    method: 'GET'
  }, function (err, resp) {
    if (!err && resp && resp.nodes) {
      var nodes = config.nodesToHostCallback(resp.nodes);
      config.connectionPool.setNodes(nodes);
    }
    cb(err, resp);
  });
};
