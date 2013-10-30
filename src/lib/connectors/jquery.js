/* jshint browser: true, jquery: true */

/**
 * Simple connection class for using the XHR object in browsers
 *
 * @class {XhrConnection}
 */
module.exports = JqueryConnection;

function JqueryConnection() {}

JqueryConnection.prototype.request = function (params, cb) {
  var $xhr = jQuery.ajax(params).done(cb);
};


