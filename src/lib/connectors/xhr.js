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
var TimeoutError = require('../errors').RequestTimeout;
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
  getXhr = _.first(['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'], function (appName) {
    /* jshint unused: false */
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

XhrConnector.prototype.request = function (params, cb) {
  var xhr = getXhr();
  var timeout = params.timeout ? params.timeout : 10000;
  var timeoutId;
  var url = this.host.makeUrl(params);
  var log = this.config.log;
  var async = params.async === false ? false : asyncDefault;

  if (params.auth) {
    xhr.open(params.method, url, async, params.auth.user, params.auth.pass);
  } else {
    xhr.open(params.method, url, async);
  }

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      clearTimeout(timeoutId);
      log.trace(params.method, url, params.body, xhr.responseText, xhr.status);
      var err = xhr.status ? void 0 : new ConnectionFault(xhr.statusText || 'Request failed to complete.');
      cb(err, xhr.responseText, xhr.status);
    }
  };

  if (timeout !== Infinity) {
    timeoutId = setTimeout(function () {
      xhr.onreadystatechange = _.noop;
      xhr.abort();
      cb(new TimeoutError());
    }, timeout);
  }

  xhr.send(params.body || void 0);
};
