/**
 * Generic Transport for the browser, using the XmlHttpRequest object
 *
 * @class  connections.Xhr
 */
module.exports = XhrConnector;

/* jshint browser:true */

var _ = require('../utils');
var ConnectionAbstract = require('../connection');
var ConnectionFault = require('../errors').ConnectionFault;
var asyncDefault = !(navigator && /PhantomJS/i.test(navigator.userAgent));

function XhrConnector(host, config) {
  ConnectionAbstract.call(this, host, config);
}
_.inherits(XhrConnector, ConnectionAbstract);

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
  getXhr = _(['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'])
  .map(function (appName) {
    /* jshint unused: false */
    try {
      var test = new window.ActiveXObject(appName); // eslint-disable-line no-unused-vars
      return function () {
        return new window.ActiveXObject(appName);
      };
    } catch (e) {
      return false;
    }
  })
  .compact()
  .first();
}

if (!getXhr) {
  throw new Error('getXhr(): XMLHttpRequest not available');
}

XhrConnector.prototype.request = function (params, cb) {
  var xhr = getXhr();
  var timeoutId;
  var host = this.host;
  var log = this.log;

  var url = host.makeUrl(params);
  var headers = host.getHeaders(params.headers);
  var async = params.async === false ? false : asyncDefault;

  function parseResponseHeaders(headerStr) {
    var headers = {};
    if (!headerStr) {
      return headers;
    }
    var headerPairs = headerStr.split('\u000d\u000a');
    for (var i = 0; i < headerPairs.length; i++) {
      var headerPair = headerPairs[i];
      // Can't use split() here because it does the wrong thing
      // if the header value has the string ": " in it.
      var index = headerPair.indexOf('\u003a\u0020');
      if (index > 0) {
        var key = headerPair.substring(0, index);
        var val = headerPair.substring(index + 2);
        headers[key] = val;
      }
    }
    return headers;
  }

  xhr.open(params.method || 'GET', url, async);

  if (headers) {
    for (var key in headers) {
      if (headers[key] !== void 0) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      clearTimeout(timeoutId);
      log.trace(params.method, url, params.body, xhr.responseText, xhr.status);
      var err = xhr.status ? void 0 : new ConnectionFault(xhr.statusText || 'Request failed to complete.');
      var headers = parseResponseHeaders(xhr.getAllResponseHeaders());
      cb(err, xhr.responseText, xhr.status, headers);
    }
  };

  xhr.send(params.body || void 0);

  return function () {
    xhr.abort();
  };
};
