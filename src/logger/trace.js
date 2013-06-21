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
