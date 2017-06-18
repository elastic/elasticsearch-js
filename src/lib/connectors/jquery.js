/* global jQuery: false */

/**
 * Simple connection class for using the XHR object in browsers
 *
 * @class {XhrConnection}
 */
module.exports = JqueryConnector;

const _ = require('../utils');
const ConnectionAbstract = require('../connection');
const ConnectionFault = require('../errors').ConnectionFault;

function JqueryConnector(host, config) {
  ConnectionAbstract.call(this, host, config);
}
_.inherits(JqueryConnector, ConnectionAbstract);

JqueryConnector.prototype.request = function (params, cb) {
  const ajax = {
    url: this.host.makeUrl(params),
    data: params.body,
    type: params.method,
    dataType: 'text',
    headers: this.host.getHeaders(params.headers),
    done: cb
  };

  const jqXHR = jQuery.ajax(ajax)
    .done(function (data) {
      cb(null, data, jqXHR.statusCode(), {
        'content-type': jqXHR.getResponseHeader('content-type')
      });
    })
    .fail(function (a, b, err) {
      cb(new ConnectionFault(err && err.message));
    });

  return function () {
    jqXHR.abort();
  };
};
