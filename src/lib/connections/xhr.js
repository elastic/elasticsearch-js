/**
 * Generic Transport for the browser, using the XmlHttpRequest object
 *
 * @class  connections.Xhr
 */
module.exports = XhrConnection;

/* jshint browser:true */

var _ = require('../utils');
var ConnectionAbstract = require('../connection');
var ConnectionError = require('../errors').ConnectionError;
var TimeoutError = require('../errors').TimeoutError;

function XhrConnection(config, nodeInfo) {
  ConnectionAbstract.call(this, config, nodeInfo);
}
_.inherits(XhrConnection, ConnectionAbstract);

/**
 * Simply returns an XHR object cross browser
 * @type {Function}
 */
var getXhr = _.noop;

if (typeof XMLHttpRequest !== 'undefined') {
  // rewrite the getXhr method to always return the native implementation
  getXhr = function () {
    return new XMLHttpRequest();
  };
} else {
  // find the first MS implementation available
  getXhr = _.first(['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'], function (appName) {
    try {
      var test = new window.ActiveXObject(appName);
      return function () {
        return new window.ActiveXObject(appName);
      };
    } catch (e) {
      return null;
    }
  });
}

if (!getXhr) {
  throw new Error('getXhr(): XMLHttpRequest not available');
}

XhrConnection.prototype.request = function (params, cb) {
  var xhr = getXhr();
  var timeoutId;

  if (params.auth) {
    xhr.open(params.method, params.url, true, params.auth.user, params.auth.pass);
  } else {
    xhr.open(params.method, params.url, true);
  }

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState === 4) {
      clearTimeout(timeoutId);
      cb(xhr.status ? null : new ConnectionError(), xhr.responseText, xhr.status);
    }
  };

  if (params.timeout !== Infinity) {
    timeoutId = setTimeout(function () {
      xhr.onreadystatechange = _.noop;
      xhr.abort();
      cb(new TimeoutError());
    }, params.timeout);
  }

  xhr.send(params.body || null);
};
