

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