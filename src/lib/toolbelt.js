var path = require('path')
  , _ = require('lodash')
  , fs = require('fs')
  , requireDir = require('require-directory')
  , qs = require('qs')
  , nodeUtils = require('util');

/**
 * Custom utils library, basically a modified version of [lodash](http://lodash.com/docs) +
 * [node.uitls](http://nodejs.org/api/util.html#util_util) that doesn't use mixins to prevent
 * confusion when requiring lodash itself.
 *
 * @class utils
 * @static
 */
var utils = _.extend({}, _, nodeUtils);

utils.inspect = function (thing, opts) {
  return nodeUtils.inspect(thing, _.defaults(opts || {}, {
    showHidden: true,
    depth: null,
    color: true
  }));
};


/**
 * Link to [path.join](http://nodejs.org/api/path.html#path_path_join_path1_path2)
 *
 * @method utils.joinPath
 * @type {function}
 */
utils.joinPath = path.join;

/**
 * Extends lodash's map function so that objects can be passed to map and will be retuned as an object with
 * each value transformed by the itterator.
 *
 * @method utils.map
 * @param [Iterable] obj - the thing to iterate over
 * @param [Function] mapper - the function to call for each element in obj
 * @param [*] context - the this context to use for each call to mapper
 */
utils.map = function (obj, mapper, context) {
  if (_.isPlainObject(obj)) {
    return _.reduce(obj, function (note, val, key) { note[key] = mapper.call(context, val, key); return note; }, {});
  } else {
    return _.map(obj, mapper, context);
  }
};

/**
 * Require all of the modules in a directory
 *
 * @method requireDir
 * @param {Module} module - The module object which will own the required modules.
 * @param {String} path - Path to the directory which will be traversed (can be relative to module)
 * @return {Object} - An object with each required files
 */
utils.requireDir = function (module, dirPath) {
  if (dirPath && dirPath[0] === '.') {
    dirPath = path.join(path.dirname(module.filename), dirPath);
  }
  return requireDir(module, dirPath);
};

/**
 * Requires all of the files in a directory, then transforms the filenames into
 * StudlyCase -- one level deep for now.
 * @param {Module} module - The module object which will own the required modules.
 * @param {String} path - Path to the directory which will be traversed (can be relative to module)
 * @return {Object} - An object with each required files, keys will be the StudlyCase version of the filesnames.
 */
utils.requireClasses = function (module, dirPath) {
  return utils.reKey(utils.requireDir(module, dirPath), utils.studlyCase, false);
};

/**
 * Recursively re-key an object, applying "transform" to each key
 * @param  {Object} obj - The object to re-key
 * @param  {Function} transform - The transformation function to apply to each key
 * @param  {Boolean} recursive - Should this act recursively?
 * @param  {Object} out - used primarily for recursion, allows you to specify the object which new keys will be written to
 * @return {Object}
 */
utils.reKey = function (obj, transform, recursive) {
  // defaults
  if (typeof recursive === 'undefined') { recursive = true; }
  if (typeof transform !== 'function') { throw new TypeError('invalid transform function'); }

  var out = {};

  _.each(obj, function (prop, name) {
    if (recursive && typeof prop === 'object') {
      out[transform(name)] = utils.reKey(prop, transform, recursive);
    } else {
      out[transform(name)] = prop;
    }
  });

  return out;
};

/**
 * Recursively merge two objects, walking into each object and concating arrays.
 * If both to and from have a value at a key, but the values' types don't match
 * to's value is left unmodified. Only Array and Object values are merged - that
 * it to say values with a typeof "object"
 * @param  {Obejct} to - Object to merge into (no cloning, the original object
 *   is modified)
 * @param  {Object} from - Object to pull changed from
 * @return {Object} - returns the modified to value
 */
utils.deepMerge = function (to, from) {
  Object.keys(from).forEach(function (key) {
    switch (typeof to[key]) {
    case 'undefined':
      to[key] = from[key];
      break;
    case 'object':
      if (_.isArray(to[key]) && _.isArray(from[key])) {
        to[key] = to[key].concat(from[key]);
      }
      else if (_.isPlainObject(to[key]) && _.isPlainObject(from[key])) {
        utils.deepMerge(to[key], from[key]);
      }
    }
  });
  return to;
};

/**
 * Test if a value is an array and it's contents are of a specific type
 *
 * @method isArrayOf<Strings|Objects|Arrays|Finites|Functions|RegExps>
 * @param  {Array} arr - An array to check
 * @return {Boolean}
 */
'String Object PlainObject Array Finite Function RegExp'.split(' ').forEach(function (type) {
  var check = _.bind(_['is' + type], _)
    // used to find the first value that isn't of the sub type specified
    , checkForNotType = function (val) { return !check(val); };

  utils['isArrayOf' + type + 's'] = function (arr) {
    // quick shallow check of arrays
    return _.isArray(arr) && !_.find(arr.slice(0, 10), checkForNotType);
  };
});


/**
 * Capitalize the first letter of a word
 *
 * @todo Tests
 * @method  ucfirst
 * @param  {string} word - The word to transform
 * @return {string}
 */
utils.ucfirst = function (word) {
  return word[0].toUpperCase() + word.substring(1).toLowerCase();
};

/**
 * Transform a string into StudlyCase
 *
 * @todo Tests
 * @method studlyCase
 * @param  {String} string
 * @return {String}
 */
utils.studlyCase = function (string) {
  return _.map(string.split(/\b|_/), function (word, i) {
    return word.match(/^[a-z]+$/i) ? utils.ucfirst(word) : '';
  }).join('');
};

/**
 * Transfor a string into camelCase
 *
 * @todo Tests
 * @method cameCase
 * @param  {String} string
 * @return {String}
 */
utils.camelCase = function (string) {
  return _.map(string.split(/\b|_/), function (word, i) {
    if (word.match(/^[a-z]+$/i)) {
      return i === 0 ? word.toLowerCase() : utils.ucfirst(word);
    } else {
      return '';
    }
  }).join('');
};

utils.toLowerString = function (any) {
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
 * Test if a value is "numeric" meaning that it can be transformed into something besides NaN
 *
 * @todo Test
 * @method isNumeric
 * @param  {*} val
 * @return {Boolean}
 */
utils.isNumeric = function (val) {
  return !isNaN(val === null ? NaN : val * 1);
};

// regexp to test for intervals
var intervalRE = /^(\d+(?:\.\d+)?)([Mwdhmsy])$/;

/**
 * Test if a string represents an interval (eg. 1m, 2Y)
 *
 * @todo Test
 * @method isInterval
 * @param {String} val
 * @return {Boolean}
 */
utils.isInterval = function (val) {
  return !!(val.match && val.match(intervalRE));
};

/**
 * Repeat a string n times
 *
 * @todo Test
 * @todo TestPerformance
 * @method repeat
 * @param {String} what - The string to repeat
 * @param {Number} times - Times the string should be repeated
 * @return {String}
 */
utils.repeat = function (what, times) {
  return (new Array(times + 1)).join(what);
};

/**
 * Convert an object into a query string
 *
 * @method  makeQueryString
 * @param  {Object} obj - The object to convert
 * @param  {Boolean} [start=true] - Should the query string start with a '?'
 * @return {String}
 */
utils.makeQueryString = function (obj, start) {
  var str = qs.stringify(obj);
  return (start === false || str === '') ? str : '?' + str;
};

utils.inherits = function (constructor, superConstructor) {
  nodeUtils.inherits(constructor, superConstructor);
  constructor.prototype._constructSuper = function (args) {
    constructor.super_.apply(this, _.toArray(args));
  };
};

utils.collectMatches = function (text, regExp) {
  var matches = [], match;
  while (match = regExp.exec(text)) {
    matches.push(match);
    if (regExp.global !== true) {
      // would loop forever if not true
      break;
    }
  }
  return matches;
};

module.exports = utils;
