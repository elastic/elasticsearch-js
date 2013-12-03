/* jshint browser: true, jquery: true */

/**
 * Simple connection class for using the XHR object in browsers
 *
 * @class {XhrConnection}
 */
module.exports = JqueryConnector;

function JqueryConnector() {}

JqueryConnector.prototype.request = function (params, cb) {
  var ajax = {
    data: params.body,
    dataType: 'json',
    headers: params.headers,
    timeout: params.requestTimeout,
    done: cb
  };

  if (params.auth) {
    var auths = params.auth.split(':');
    ajax.username = auths[0];
    ajax.password = auths[1];
  }

  return jQuery.ajax(ajax);
};


