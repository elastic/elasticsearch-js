var path = require('path');
// var _ = require('lodash');
// require('../../stub')
var nodeUtils = require('util');

/**
 * Custom _v4 library, basically a modified version of [lodash](http://lodash.com/docs) +
 * [node._v4](http://nodejs.org/api/util.html#util_util) that doesn't use mixins to prevent
 * confusion when requiring lodash itself.
 *
 * @class _v4
 * @static
 */
_v4.assign(_v4, nodeUtils);
// _v4 = _v4;

/**
 * Link to [path.join](http://nodejs.org/api/path.html#path_path_join_path1_path2)
 *
 * @method _v4.joinPath
 * @type {function}
 */
_v4.joinPath = path.join;

/**
 * Recursively merge two objects, walking into each object and concating arrays. If both to and from have a value at a
 * key, but the values' types don't match to's value is left unmodified. Only Array and Object values are merged - that
 * it to say values with a typeof "object"
 *
 * @param  {Object} to - Object to merge into (no cloning, the original object
 *   is modified)
 * @param  {Object} from - Object to pull changed from
 * @return {Object} - returns the modified to value
 */
_v4.deepMerge = function (to, from) {
  _v4.each(from, function (fromVal, key) {
    switch (typeof to[key]) {
      case 'undefined':
        to[key] = from[key];
        break;
      case 'object':
        if (_v4.isArray(to[key]) && _v4.isArray(from[key])) {
          to[key] = to[key].concat(from[key]);
        }
        else if (_v4.isPlainObject(to[key]) && _v4.isPlainObject(from[key])) {
          _v4.deepMerge(to[key], from[key]);
        }
    }
  });
  return to;
};

/**
 * Test if a value is an array and it's contents are of a specific type
 *
 * @method isArrayOf<Strings|Object|Array|Finite|Function|RegExp>s
 * @param  {Array} arr - An array to check
 * @return {Boolean}
 */
_v4.each([
  'String',
  'Object',
  'PlainObject',
  'Array',
  'Finite',
  'Function',
  'RegExp'
], function (type) {
  var check = _v4['is' + type];

  _v4['isArrayOf' + type + 's'] = function (arr) {
    // quick shallow check of arrays
    return _v4.isArray(arr) && _v4.every(arr.slice(0, 10), check);
  };
});


/**
 * Capitalize the first letter of a word
 *
 * @method  ucfirst
 * @param  {string} word - The word to transform
 * @return {string}
 */
_v4.ucfirst = function (word) {
  return word[0].toUpperCase() + word.substring(1).toLowerCase();
};

/**
 * Base algo for studlyCase and camelCase
 * @param  {boolean} firstWordCap - Should the first character of the first word be capitalized
 * @return {Function}
 */
function adjustWordCase(firstWordCap, otherWordsCap, sep) {
  return function (string) {
    var i = 0;
    var words = [];
    var word = '';
    var code, c, upper, lower;

    for (; i < string.length; i++) {
      code = string.charCodeAt(i);
      c = string.charAt(i);
      lower = (code >= 97 && code <= 122) || (code >= 48 && code <= 57);
      upper = code >= 65 && code <= 90;

      if (upper || !lower) {
        // new word
        if (word.length) {
          words.push(word);
        }
        word = '';
      }

      if (upper || lower) {
        if (lower && word.length) {
          word += c;
        } else {
          if ((!words.length && firstWordCap) || (words.length && otherWordsCap)) {
            word = c.toUpperCase();
          }
          else {
            word = c.toLowerCase();
          }
        }
      }
    }
    if (word.length) {
      words.push(word);
    }
    // add the leading underscore back to strings the had it originally
    if (words.length && string.charAt(0) === '_') {
      words[0] = '_' + words[0];
    }
    return words.join(sep);
  };
}

/**
 * Transform a string into StudlyCase
 *
 * @method studlyCase
 * @param  {String} string
 * @return {String}
 */
_v4.studlyCase = adjustWordCase(true, true, '');

/**
 * Transform a string into camelCase
 *
 * @method camelCase
 * @param  {String} string
 * @return {String}
 */
_v4.camelCase = adjustWordCase(false, true, '');

/**
 * Transform a string into snakeCase
 *
 * @method snakeCase
 * @param  {String} string
 * @return {String}
 */
_v4.snakeCase = adjustWordCase(false, false, '_');

/**
 * Lower-case a string, and return an empty string if any is not a string
 *
 * @param any {*} - Something or nothing
 * @returns {string}
 */
_v4.toLowerString = function (any) {
  if (any) {
    if (typeof any !== 'string') {
      any = any.toString();
    }
  } else {
    any = '';
  }
  return any.toLowerCase();
};

/**
 * Upper-case the string, return an empty string if any is not a string
 *
 * @param any {*} - Something or nothing
 * @returns {string}
 */
_v4.toUpperString = function (any) {
  if (any) {
    if (typeof any !== 'string') {
      any = any.toString();
    }
  } else {
    any = '';
  }
  return any.toUpperCase();
};

/**
 * Test if a value is "numeric" meaning that it can be transformed into something besides NaN
 *
 * @method isNumeric
 * @param  {*} val
 * @return {Boolean}
 */
_v4.isNumeric = function (val) {
  return typeof val !== 'object' && val - parseFloat(val) >= 0;
};

// regexp to test for intervals
var intervalRE = /^(\d+(?:\.\d+)?)(M|w|d|h|m|s|y|ms)$/;

/**
 * Test if a string represents an interval (eg. 1m, 2Y)
 *
 * @method isInterval
 * @param {String} val
 * @return {Boolean}
 */
_v4.isInterval = function (val) {
  return !!(val.match && val.match(intervalRE));
};

/**
 * Repeat a string n times
 *
 * @todo TestPerformance
 * @method repeat
 * @param {String} what - The string to repeat
 * @param {Number} times - Times the string should be repeated
 * @return {String}
 */
_v4.repeat = function (what, times) {
  return (new Array(times + 1)).join(what);
};

/**
 * Call a function, applying the arguments object to it in an optimized way, rather than always turning it into an array
 *
 * @param func {Function} - The function to execute
 * @param context {*} - The context the function will be executed with
 * @param args {Arguments} - The arguments to send to func
 * @param [sliceIndex=0] {Integer} - The index that args should be sliced at, before feeding args to func
 * @returns {*} - the return value of func
 */
_v4.applyArgs = function (func, context, args, sliceIndex) {
  sliceIndex = sliceIndex || 0;
  switch (args.length - sliceIndex) {
    case 0:
      return func.call(context);
    case 1:
      return func.call(context, args[0 + sliceIndex]);
    case 2:
      return func.call(context, args[0 + sliceIndex], args[1 + sliceIndex]);
    case 3:
      return func.call(context, args[0 + sliceIndex], args[1 + sliceIndex], args[2 + sliceIndex]);
    case 4:
      return func.call(context, args[0 + sliceIndex], args[1 + sliceIndex], args[2 + sliceIndex], args[3 + sliceIndex]);
    case 5:
      return func.call(context, args[0 + sliceIndex], args[1 + sliceIndex],
      args[2 + sliceIndex], args[3 + sliceIndex], args[4 + sliceIndex]);
    default:
      return func.apply(context, Array.prototype.slice.call(args, sliceIndex));
  }
};

/**
 * Schedule a function to be called on the next tick, and supply it with these arguments
 * when it is called.
 * @return {[type]} [description]
 */
_v4.nextTick = function (cb) {
  // bind the function and schedule it
  process.nextTick(_v4.bindKey(_v4, 'applyArgs', cb, null, arguments, 1));
};

/**
 * Marks a method as a handler. Currently this just makes a property on the method
 * flagging it to be bound to the object at object creation when "makeBoundMethods" is called
 *
 * ```
 * ClassName.prototype.methodName = _v4.handler(function () {
 *   // this will always be bound when called via classInstance.bound.methodName
 *   this === classInstance
 * });
 * ```
 *
 * @alias _.scheduled
 * @param  {Function} func - The method that is being defined
 * @return {Function}
 */
_v4.handler = function (func) {
  func._provideBound = true;
  return func;
};
_v4.scheduled = _v4.handler;

/**
 * Creates an "bound" property on an object, which all or a subset of methods from
 * the object which are bound to the original object.
 *
 * ```
 * var obj = {
 *   onEvent: function () {}
 * };
 *
 * _v4.makeBoundMethods(obj);
 *
 * obj.bound.onEvent() // is bound to obj, and can safely be used as an event handler.
 * ```
 *
 * @param {Object} obj - The object to bind the methods to
 */
_v4.makeBoundMethods = function (obj) {
  obj.bound = {};
  for (var prop in obj) {
    // dearest maintainer, we want to look through the prototype
    if (typeof obj[prop] === 'function' && obj[prop]._provideBound === true) {
      obj.bound[prop] = _v4.bind(obj[prop], obj);
    }
  }
};

_v4.noop = function () {};

/**
 * Implements the standard "string or constructor" check that I was copy/pasting everywhere
 * @param  {String|Function} val - the value that the user passed in
 * @param  {Object} opts - a map of the options
 * @return {Function|undefined} - If a valid option was specified, then the constructor is returned
 */
_v4.funcEnum = function (config, name, opts, def) {
  var val = config[name];
  switch (typeof val) {
    case 'undefined':
      return opts[def];
    case 'function':
      return val;
    case 'string':
      if (opts.hasOwnProperty(val)) {
        return opts[val];
      }
    /* falls through */
    default:
      var err = 'Invalid ' + name + ' "' + val + '", expected a function';
      switch (_v4.size(opts)) {
        case 0:
          break;
        case 1:
          err += ' or ' + _v4.keys(opts)[0];
          break;
        default:
          err += ' or one of ' + _v4.keys(opts).join(', ');
          break;
      }
      throw new TypeError(err);
  }
};

/**
 * Accepts any object and attempts to convert it into an array. If the object passed in is not
 * an array it will be wrapped in one. Then the transform/map function will be called for each element
 * and create a new array that is returned. If the map function fails to return something, the loop is
 * halted and false is returned instead of an array.
 *
 * @param  {*} input - The value to convert
 * @param  {Function} transform - A function called for each element of the resulting array
 * @return {Array|false} - an array on success, or false on failure.
 */
_v4.createArray = function (input, transform) {
  transform = typeof transform === 'function' ? transform : _v4.identity;
  var output = [];
  var item;
  var i;

  if (!_v4.isArray(input)) {
    input = [input];
  }

  for (i = 0; i < input.length; i++) {
    item = transform(input[i]);
    if (item === void 0) {
      return false;
    } else {
      output.push(item);
    }
  }
  return output;
};

/**
 * Takes a WritableStream, and returns the chunks that have not successfully written, returning them as a string.
 *
 * ONLY WORKS FOR TEXT STREAMS
 *
 * @param  {WritableStream} stream - an instance of stream.Writable
 * @return {string} - the remaining test to be written to the stream
 */
_v4.getUnwrittenFromStream = function (stream) {
  var writeBuffer = _v4.getStreamWriteBuffer(stream);
  if (!writeBuffer) return;

  // flush the write buffer
  var out = '';
  if (!writeBuffer.length) return out;

  _v4.each(writeBuffer, function (writeReq) {
    if (writeReq.chunk) {
      // 0.9.12+ uses WriteReq objects with a chunk prop
      out += '' + writeReq.chunk;
    } else if (_v4.isArray(writeReq) && (typeof writeReq[0] === 'string' || Buffer.isBuffer(writeReq[0]))) {
      // 0.9.4 - 0.9.9 buffers are arrays of arrays like [[chunk, cb], [chunk, undef], ...].
      out += '' + writeReq[0];
    } else {
      return false;
    }
  });
  return out;
};

_v4.getStreamWriteBuffer = function (stream) {
  if (!stream || !stream._writableState) return;

  var writeState = stream._writableState;

  if (writeState.getBuffer) {
    return writeState.getBuffer();
  } else if (writeState.buffer) {
    return writeState.buffer;
  }
};

_v4.clearWriteStreamBuffer = function (stream) {
  var buffer = _v4.getStreamWriteBuffer(stream);
  return buffer && buffer.splice(0);
};

/**
 * return the current time in milliseconds since epoch
 */
_v4.now = function () {
  return (typeof Date.now === 'function') ? Date.now() : (new Date()).getTime();
};

module.exports = _v4;
