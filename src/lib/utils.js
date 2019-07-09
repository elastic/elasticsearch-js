var _ = require('lodash');
var nodeUtils = require('util');

/**
 * Custom utils library
 *
 * @class utils
 * @static
 */
var utils = {};

utils.inherits = nodeUtils.inherits;

/**
 * Test if a value is an array and its contents are string type
 *
 * @method isArrayOfStrings
 * @param  {Array} arr - An array to check
 * @return {Boolean}
 */
utils.isArrayOfStrings = function(arr) {
  // quick shallow check of arrays
  return _.isArray(arr) && _.every(arr.slice(0, 10), _.isString);
};

/**
 * Capitalize the first letter of a word
 *
 * @method  ucfirst
 * @param  {string} word - The word to transform
 * @return {string}
 */
utils.ucfirst = function(word) {
  return word[0].toUpperCase() + word.substring(1).toLowerCase();
};

/**
 * Base algo for studlyCase and camelCase
 * @param  {boolean} firstWordCap - Should the first character of the first word be capitalized
 * @return {Function}
 */
function adjustWordCase(firstWordCap, otherWordsCap, sep) {
  return function(string) {
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
          if (
            (!words.length && firstWordCap) ||
            (words.length && otherWordsCap)
          ) {
            word = c.toUpperCase();
          } else {
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
utils.studlyCase = adjustWordCase(true, true, '');

/**
 * Transform a string into camelCase
 *
 * @method camelCase
 * @param  {String} string
 * @return {String}
 */
utils.camelCase = adjustWordCase(false, true, '');

/**
 * Transform a string into snakeCase
 *
 * @method snakeCase
 * @param  {String} string
 * @return {String}
 */
utils.snakeCase = adjustWordCase(false, false, '_');

/**
 * Upper-case the string, return an empty string if any is not a string
 *
 * @param any {*} - Something or nothing
 * @returns {string}
 */
utils.toUpperString = function(any) {
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
utils.isNumeric = function(val) {
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
utils.isInterval = function(val) {
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
utils.repeat = function(what, times) {
  return new Array(times + 1).join(what);
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
utils.applyArgs = function(func, context, args, sliceIndex) {
  sliceIndex = sliceIndex || 0;
  switch (args.length - sliceIndex) {
    case 0:
      return func.call(context);
    case 1:
      return func.call(context, args[0 + sliceIndex]);
    case 2:
      return func.call(context, args[0 + sliceIndex], args[1 + sliceIndex]);
    case 3:
      return func.call(
        context,
        args[0 + sliceIndex],
        args[1 + sliceIndex],
        args[2 + sliceIndex]
      );
    case 4:
      return func.call(
        context,
        args[0 + sliceIndex],
        args[1 + sliceIndex],
        args[2 + sliceIndex],
        args[3 + sliceIndex]
      );
    case 5:
      return func.call(
        context,
        args[0 + sliceIndex],
        args[1 + sliceIndex],
        args[2 + sliceIndex],
        args[3 + sliceIndex],
        args[4 + sliceIndex]
      );
    default:
      return func.apply(context, Array.prototype.slice.call(args, sliceIndex));
  }
};

/**
 * Schedule a function to be called on the next tick, and supply it with these arguments
 * when it is called.
 * @return {[type]} [description]
 */
utils.nextTick = function(cb) {
  // bind the function and schedule it
  process.nextTick(_.bindKey(utils, 'applyArgs', cb, null, arguments, 1));
};

/**
 * Marks a method as a handler. Currently this just makes a property on the method
 * flagging it to be bound to the object at object creation when "makeBoundMethods" is called
 *
 * ```
 * ClassName.prototype.methodName = utils.handler(function () {
 *   // this will always be bound when called via classInstance.bound.methodName
 *   this === classInstance
 * });
 * ```
 *
 * @param  {Function} func - The method that is being defined
 * @return {Function}
 */
utils.handler = function(func) {
  func._provideBound = true;
  return func;
};

/**
 * Creates an "bound" property on an object, which all or a subset of methods from
 * the object which are bound to the original object.
 *
 * ```
 * var obj = {
 *   onEvent: function () {}
 * };
 *
 * utils.makeBoundMethods(obj);
 *
 * obj.bound.onEvent() // is bound to obj, and can safely be used as an event handler.
 * ```
 *
 * @param {Object} obj - The object to bind the methods to
 */
utils.makeBoundMethods = function(obj) {
  obj.bound = {};
  for (var prop in obj) {
    // dearest maintainer, we want to look through the prototype
    if (typeof obj[prop] === 'function' && obj[prop]._provideBound === true) {
      obj.bound[prop] = _.bind(obj[prop], obj);
    }
  }
};

/**
 * Implements the standard "string or constructor" check that I was copy/pasting everywhere
 * @param  {String|Function} val - the value that the user passed in
 * @param  {Object} opts - a map of the options
 * @return {Function|undefined} - If a valid option was specified, then the constructor is returned
 */
utils.funcEnum = function(config, name, opts, def) {
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
      switch (_.size(opts)) {
        case 0:
          break;
        case 1:
          err += ' or ' + _.keys(opts)[0];
          break;
        default:
          err += ' or one of ' + _.keys(opts).join(', ');
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
utils.createArray = function(input, transform) {
  transform = typeof transform === 'function' ? transform : _.identity;
  var output = [];
  var item;
  var i;

  if (!_.isArray(input)) {
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
utils.getUnwrittenFromStream = function(stream) {
  var writeBuffer = utils.getStreamWriteBuffer(stream);
  if (!writeBuffer) return;

  // flush the write buffer
  var out = '';
  if (!writeBuffer.length) return out;

  _.each(writeBuffer, function(writeReq) {
    if (writeReq.chunk) {
      // 0.9.12+ uses WriteReq objects with a chunk prop
      out += '' + writeReq.chunk;
    } else if (
      _.isArray(writeReq) &&
      (typeof writeReq[0] === 'string' || Buffer.isBuffer(writeReq[0]))
    ) {
      // 0.9.4 - 0.9.9 buffers are arrays of arrays like [[chunk, cb], [chunk, undef], ...].
      out += '' + writeReq[0];
    } else {
      return false;
    }
  });
  return out;
};

utils.getStreamWriteBuffer = function(stream) {
  if (!stream || !stream._writableState) return;

  var writeState = stream._writableState;

  if (writeState.getBuffer) {
    return writeState.getBuffer();
  } else if (writeState.buffer) {
    return writeState.buffer;
  }
};

utils.clearWriteStreamBuffer = function(stream) {
  var buffer = utils.getStreamWriteBuffer(stream);
  return buffer && buffer.splice(0);
};

/**
 * return the current time in milliseconds since epoch
 */
utils.now = function() {
  return typeof Date.now === 'function' ? Date.now() : new Date().getTime();
};

module.exports = utils;
