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