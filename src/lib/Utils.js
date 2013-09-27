var path = require('path')
  , _ = require('lodash')
  , fs = require('fs')
  , requireDir = require('require-directory')
  , qs = require('qs');

/**
 * Custom utils library, basically a modified version of [lodash](http://lodash.com/docs) +
 * [node.uitls](http://nodejs.org/api/util.html#util_util) that doesn't use mixins to prevent
 * confusion when requiring lodash itself.
 *
 * @class utils
 * @static
 */
var utils = _.extend({}, _, require('util'));


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
 * @return {Object} - An object with each required file
 */
utils.requireDir = function (module, dirPath) {
  if (dirPath && dirPath[0] === '.') {
    dirPath = path.join(path.dirname(module.filename), dirPath);
  }
  return requireDir(module, dirPath);
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
  return string.split(/\b|_/).map(function (word) {
    return word.match(/^[a-z]+$/i) ? word[0].toUpperCase() + word.substr(1) : '';
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
      return (i === 0 ? word[0].toLowerCase() : word[0].toUpperCase()) + word.substr(1).toLowerCase();
    } else {
      return '';
    }
  }).join('');
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
  return !isNaN(val * 1);
};

// regexp to test for intervals
var intervalRE = /(\d+(?:\.\d+)?)([Mwdhmsy])/;

/**
 * Test if a string represents an interval (eg. 1m, 2Y)
 *
 * @todo Test
 * @method isInterval
 * @param {String} val
 * @return {Boolean}
 */
utils.isInterval = function (val) {
  return val.match && val.match(intervalRE);
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

module.exports = utils;