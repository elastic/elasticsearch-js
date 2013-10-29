/**
 * Constructs a function that can be called to make a request to ES
 * @type {[type]}
 */
module.exports = function ClientAction(spec, client) {
  return function (params, cb) {
    return exec((client || this.client).config.transport, spec, params, cb);
  };
};

var errors = require('./errors');
var _ = require('./utils');
var urlParamRE = /\{(\w+)\}/g;

var castType = {
  enum: function (param, val, name) {
    if (_.contains(param.options, val)) {
      return val;
    } else {
      throw new TypeError('Invalid ' + name + ': expected one of ' + param.options.join(','));
    }
  },
  duration: function (param, val, name) {
    if (_.isNumeric(val) || _.isInterval(val)) {
      return val;
    } else {
      throw new TypeError(
        'Invalid ' + name + ': expected a number or interval ' +
        '(an integer followed by one of Mwdhmsy).'
      );
    }
  },
  list: function (param, val, name) {
    switch (typeof val) {
    case 'string':
      return val;
    case 'object':
      if (_.isArray(val)) {
        return val.join(',');
      } else {
        throw new TypeError('Invalid ' + name + ': expected be a comma seperated list, array, or boolean.');
      }
      break;
    default:
      return !!val;
    }
  },
  boolean: function (param, val, name) {
    val = _.isString(val) ? val.toLowerCase() : val;
    return (val === 'no' || val === 'off') ? false : !!val;
  },
  number: function (param, val, name) {
    if (_.isNumeric(val)) {
      return val * 1;
    } else {
      throw new TypeError('Invalid ' + name + ': expected a number.');
    }
  },
  string: function (param, val, name) {
    if (typeof val !== 'object' && val) {
      return '' + val;
    } else {
      throw new TypeError('Invalid ' + name + ': expected a string.');
    }
  },
  time: function (param, val, name) {
    if (val instanceof Date) {
      return val.getTime();
    } else if (_.isNumeric(val)) {
      return val;
    } else {
      throw new TypeError('Invalid ' + name + ': expected some sort of time.');
    }
  }
};

function resolveUrl(url, params) {
  var vars = {}, i, key;

  if (url.req) {
    // url has required params
    if (!url.reqParamKeys) {
      // create cached key list on demand
      url.reqParamKeys = _.keys(url.req);
    }

    for (i = 0; i < url.reqParamKeys.length; i ++) {
      key = url.reqParamKeys[i];
      if (!params.hasOwnProperty(key)) {
        // missing a required param
        return false;
      } else {
        // copy param vals into vars
        vars[key] = params[key];
      }
    }
  }

  if (url.opt) {
    // url has optional params
    if (!url.optParamKeys) {
      url.optParamKeys = _.keys(url.opt);
    }

    for (i = 0; i < url.optParamKeys.length; i ++) {
      key = url.optParamKeys[i];
      if (params[key]) {
        if (castType[url.opt[key].type]) {
          vars[key] = castType[url.opt[key].type](url.opt[key], params[key], key);
        } else {
          vars[key] = params[key];
        }
      } else {
        vars[key] = url.opt[key]['default'];
      }
    }
  }

  if (!url.template) {
    // compile the template on demand
    url.template = _.template(url.fmt);
  }

  return url.template(_.transform(vars, function (note, val, name) {
    // encode each value
    note[name] = encodeURIComponent(val);
    // remove it from the params so that it isn't sent to the final request
    delete params[name];
  }, {}));
}

function exec(transport, spec, params, cb) {
  if (typeof params === 'function') {
    cb = params;
    params = {};
  } else {
    params = params || {};
    cb = typeof cb === 'function' ? cb : _.noop;
  }

  var request = {};
  var parts = {};
  var query = {};
  var i;

  if (spec.needsBody && !params.body) {
    return _.nextTick(cb, new TypeError('A request body is required.'));
  }

  params.body && (request.body = params.body);
  params.ignore && (request.ignore = _.isArray(params.ignore) ? params.ignore : [params.ignore]);
  params.timeout && (request.ignore = _.isArray(params.ignore) ? params.ignore : [params.ignore]);

  // copy over some properties from the spec
  spec.bulkBody && (request.bulkBody = true);
  spec.castExists && (request.castExists = true);

  if (spec.methods.length === 1) {
    request.method = spec.methods[0];
  } else {
    // if set, uppercase the user's choice, other wise returns ""
    request.method = _.toUpperString(params.method);

    if (request.method) {
      // use the one specified as long as it's a valid option
      if (!_.contains(spec.methods, request.method)) {
        return _.nextTick(cb, new TypeError('Invalid method: should be one of ' + spec.methods.join(', ')));
      }
    } else {
      // pick a method
      if (request.body) {
        // first method that isn't "GET"
        request.method = spec.methodWithBody || (
          spec.methodWithBody = _.find(spec.methods, function (m) { return m !== 'GET'; })
        );
      } else {
        // just use the first option
        request.method = spec.methods[0];
      }
    }
  }

  if (spec.url) {
    // only one url option
    request.path = resolveUrl(spec.url, params);
  } else {
    for (i = 0; i < spec.urls.length; i++) {
      if (request.path = resolveUrl(spec.urls[i], params)) {
        break;
      }
    }
  }

  if (!request.path) {
    // there must have been some mimimun requirements that were not met
    return _.nextTick(
      cb,
      new TypeError(
        'Unable to build a path with those params. Supply at least ' +
        _.keys(spec.urls[spec.urls.length - 1].req).join(', ')
      )
    );
  }

  // build the query string
  if (!spec.paramKeys) {
    // build a key list on demand
    spec.paramKeys = _.keys(spec.params);
  }
  var key, param;
  for (i = 0; i < spec.paramKeys.length; i++) {
    key = spec.paramKeys[i];
    param = spec.params[key];
    try {
      if (params[key] != null) {
        query[key] = castType[param.type] ? castType[param.type](param, params[key], key) : params[key];
        if (param['default'] && query[key] === param['default']) {
          delete query[key];
        }
      } else if (param.required) {
        throw new TypeError('Missing required parameter ' + key);
      }
    } catch (e) {
      return _.nextTick(cb, e);
    }
  }

  request.query = query;

  transport.request(request, cb);
}
