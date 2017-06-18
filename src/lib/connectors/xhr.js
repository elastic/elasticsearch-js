/**
 * Generic Transport for the browser, using the XmlHttpRequest object
 *
 * @class  connections.Xhr
 */
module.exports = XhrConnector;

/* jshint browser:true */

const _ = require('../utils');
const ConnectionAbstract = require('../connection');
const ConnectionFault = require('../errors').ConnectionFault;
const asyncDefault = !(navigator && /PhantomJS/i.test(navigator.userAgent));

function XhrConnector(host, config) {
  ConnectionAbstract.call(this, host, config);
}
_.inherits(XhrConnector, ConnectionAbstract);

/**
 * Simply returns an XHR object cross browser
 * @type {Function}
 */
let getXhr = _.noop;

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
      const test = new window.ActiveXObject(appName); // eslint-disable-line no-unused-vars
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
  const xhr = getXhr();
  let timeoutId;
  const host = this.host;
  const log = this.log;

  const url = host.makeUrl(params);
  const headers = host.getHeaders(params.headers);
  const async = params.async === false ? false : asyncDefault;

  xhr.open(params.method || 'GET', url, async);

  if (headers) {
    for (const key in headers) {
      if (headers[key] !== void 0) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      clearTimeout(timeoutId);
      log.trace(params.method, url, params.body, xhr.responseText, xhr.status);
      const err = xhr.status ? void 0 : new ConnectionFault(xhr.statusText || 'Request failed to complete.');
      cb(err, xhr.responseText, xhr.status);
    }
  };

  xhr.send(params.body || void 0);

  return function () {
    xhr.abort();
  };
};
