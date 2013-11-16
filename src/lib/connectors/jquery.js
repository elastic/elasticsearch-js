/* jshint browser: true, jquery: true */

/**
 * Simple connection class for using the XHR object in browsers
 *
 * @class {XhrConnection}
 */
module.exports = JqueryConnector;

function JqueryConnector() {}

JqueryConnector.prototype.request = function (params, cb) {
  jQuery.ajax(params).done(cb);
};


