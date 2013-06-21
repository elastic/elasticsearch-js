/*! elasticsearch-js - v0.0.1a - 2013-06-21
 * Copyright (c) 2013 Rashid Khan; Licensed Apache License */

(function() {

  'use strict';

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // save the previous version of ejs
  var _esj = root && root.esj,
    esj;

  // Create the esj object
  if (typeof exports !== 'undefined') {
    esj = exports;
  } else {
    esj = root.ejs = {};
  }
  // (c) 2013 Rashid Khan, Elasticsearch BV
  // Portions of this file are borrowed from Underscore js,

  // Set the aliases that underscore uses
  var
    slice = Array.prototype.slice,                                                   
    toString = Object.prototype.toString,                                               
    hasOwnProp = Object.prototype.hasOwnProperty,                                       
    nativeForEach = Array.prototype.forEach,                                         
    nativeIsArray = Array.isArray,                                              
    nativeIndexOf = Array.prototype.indexOf,
    has,
    each,
    defaults,
    extend,
    indexOf,
    isUndefined,
    shuffle,
    queryString,
    breaker = {};

  // Has own property?
  has = function (obj, key) {
    return hasOwnProp.call(obj, key);
  };

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  each = function (obj, iterator, context) {
    if (obj == null) {
      return;
    }
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) {
          return;
        }
      }
    } else {
      for (var key in obj) {
        if (has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) {
            return;
          }
        }
      }
    }
  };
    
  // Fill in a given object with default properties.
  defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Extend a given object with all the properties in passed-in object(s).
  extend = function (obj) {
    each(slice.call(arguments, 1), function (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Returns the index at which value can be found in the array, or -1 if 
  // value is not present in the array.
  indexOf = function (array, item) {
    if (array == null) {
      return -1;
    }
    
    var i = 0, l = array.length;
    if (nativeIndexOf && array.indexOf === nativeIndexOf) {
      return array.indexOf(item);
    }
    
    for (; i < l; i++) {
      if (array[i] === item) {
        return i;
        
      }
    }
    
    return -1;
  };

  // Is an object undefined?
  isUndefined = function(obj) {
    return obj === void 0;
  };

  // shuffle an array
  shuffle = function(obj) {
    var shuffled = [], rand;
    each(obj, function(value, index, list) {
      if (index === 0) {
        shuffled[0] = value;
      } else {
        rand = Math.floor(Math.random() * (index + 1));
        shuffled[index] = shuffled[rand];
        shuffled[rand] = value;
      }
    });
    return shuffled;
  };

  // Takes an object and makes it into a query string
  queryString = function(obj) {
    var str = [];
    each(obj,function(v,k){
      str.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
    });
    return str.join("&");
  };
  /* Generic serializer, does nothing */

  esj.Serializer = {};
  /* JSON serializer */

  esj.Serializer.json = function() {};

  esj.Serializer.json.prototype = (function() {

    return {
      dump : function(obj) {
        return JSON.stringify(obj);
      },

      load : function(string) {
        return JSON.parse(string);
      }
    };
  
  } ());
  /* Host selectors */

  esj.Selector = {
    roundRobin : function(hosts) {
      hosts.unshift(hosts.pop());
      return hosts[0];
    },
    random : function(hosts) {
      hosts = shuffle(hosts);
      return hosts[0];
    }
  };



  /**
  *
  * esj.Log is a basic logger with error, warn, info and debug levels
  * 
  * @typedef {Object} Log
  * @param {Transport} transport the transport ob
  *
  * @property {Object} options The options passed and merged with defaults
  * @property {Transport} transport The esj.Transport for this Log
  *
  */
  esj.Log = function(transport,options) {
    options = options || {};
    var _d = {
      error : true,
      warn  : true,
      info  : false,
      debug : false
    };

    this.options = defaults(options,_d);
    this.transport = transport;
  };

  esj.Log.prototype = (function() {

    var error = function(m) {
      if (this.options.error) {
        console.error(m);
        return m;
      } else {
        return false;
      }
    };

    var warn = function(m) {
      if (this.options.warn){
        console.warn(m);
        return m;
      } else {
        return false;
      }
    };

    var info = function(m) {
      if (this.options.info){
        console.info(m);
        return m;
      } else {
        return false;
      }
    };

    var debug = function(m) {
      if (this.options.debug){
        console.log(m);
        return m;
      } else {
        return false;
      }
    };

    return {
      error : error,
      warn  : warn,
      info  : info,
      debug : debug
    };

  } ());
  esj.Trace = function(transport,options) {
    options = options || {};
    var _d = {
      info : false,
      trace : false
    };

    this.options = defaults(options,_d);
    this.transport = transport;
  };

  // TODO: Make this properly format the messages. Implement helper methods
  esj.Trace.prototype = (function() {

    var info = function(msg) {
      if (this.options.info){
        console.info(this.transport.options.hosts+" "+msg);
        return msg;
      } else {
        return false;
      }
    };

    var trace = function(msg) {
      if (this.options.debug) {
        console.log(this.transport.options.hosts+" "+msg);
        return msg;
      } else {
        return false;
      }
    };

    return {
      info  : info,
      trace : trace
    };

  } ());


  esj.Transport = function (options) {
    
    options = options || {};

    var _d = {
      hosts : ['localhost:9200'],
      //nodes_to_host_callback : construct_hosts_list,
      sniff_on_start  : false,
      sniff_after_requests : 0,
      sniff_on_connection_fail : false,
      max_retries : 3,
      selector : esj.Selector.roundRobin
    };

    // These are all unique to each instance of client
    this.options = defaults(options,_d);

    // For conviences
    this.selector = this.options.selector;

  };
  /* elasticsearch-js nodejs transport */

  var http = require('http');

  esj.Transport.prototype = (function() {

    // Split hostname:port into its repective parts
    var splitHost = function(u) {
      var s = u.split(':');
      return {host:s[0],port:s[1]};
    };

    // Meta function for handling any http request that can have a body (PUT,POST,DELETE)
    var performRequest = function (context,method, path, params, body, successcb, errorcb, retries) {

      var
        //context = context, 
        host = splitHost(context.selector(context.options.hosts)),
        options = {
          host: host.host,
          port: host.port,
          path: path + '?' + queryString(params),
          method: method,
          headers: {
            'Content-Type': 'application/json'
          }
        };
      var request = http.request(options, function (res) {

        var data = '';
        res.setEncoding('utf8');

        res.on('data', function (d) {
          data = data + d;
        });

        res.on('end', function () {

          var response = {
            data : data.charAt(0) === '{' ? JSON.parse(data) : data,
            headers : res.headers,
            status : res.statusCode
          };

          if (successcb != null && response.status < 300) {
            successcb(response);
          } else if (errorcb != null) {
            errorcb(response);
          }
        });
        
      });

      if (errorcb != null) {
        request.on('error', errorcb);
      }

      if(method !== 'GET' && method !== 'HEAD') {    
        request.write(body);
      }

      request.end();
    };

    // Aliases to performRequest
    var put   = function (path, params, body, successcb, errorcb) {performRequest(this, 'PUT', path, params, body, successcb, errorcb);};
    var post  = function (path, params, body, successcb, errorcb) {performRequest(this, 'POST', path, params, body, successcb, errorcb);};
    var del   = function (path, params, body, successcb, errorcb) {performRequest(this, 'DELETE', path, params, body, successcb, errorcb);};
    var get   = function (path, params, body, successcb, errorcb) {performRequest(this, 'GET', path, params, body, successcb, errorcb);};
    var head  = function (path, params, body, successcb, errorcb) {performRequest(this, 'GET', path, params, body, successcb, errorcb);};

    // Public functions
    return {
      get   : get,
      put   : put,
      post  : post,
      del   : del,
      head  : head
    };

  } ());

  /* 

  */

  // Expose the client object
  esj.Client = function(options) {
    this.options = options || {};

    // For convience
    this.transport = this.options.transport || new esj.Transport(this.options);
    this.logger = this.options.logger || new esj.Log(this.transport);
    this.tracer = this.options.tracer || new esj.Trace(this.transport);
    this.serializer = this.options.serializer || new esj.Serializer.json();

  };




}).call(this);