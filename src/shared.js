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