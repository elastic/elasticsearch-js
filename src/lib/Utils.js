var _ = require('lodash')
  , path = require('path')
  , requireDir = require('require-directory');

// mix in the node utils
_.mixin(require('util'));


var mixins = {};

/**
 * [joinPath description]
 * @type {[type]}
 */
mixins.joinPath = path.join;


/**
 * Require all of the modules in a directory
 * @param {Module} module The module object which will own the required modules.
 * @param {String} path   Path to the directory which will be traversed
 */
mixins.requireDir = function (module, dirPath) {
  if (dirPath && dirPath[0] === '.') {
    dirPath = path.join(path.dirname(module.filename), dirPath);
  }
  return requireDir(module, dirPath);
};

/**
 * isArrayOf(Strings|Objects|Arrays|Finites|Functions|RegExps)
 * @param  {Array} arr  An array to validate
 * @return {Boolean}
 */
'String Object Array Finite Function RegExp'.split(' ').forEach(function (type) {
  var check = _.bind(_['is' + type], _)
    // used to find the first value that isn't of the sub type specified
    , checkForNotType = function (val) { return !check(val); };

  mixins['isArrayOf' + type + 's'] = function (arr) {
    // quick shallow check of arrays
    return _.isArray(arr) && !_.find(arr.slice(0, 10), checkForNotType);
  };
});

var origBind = _.bind;
/**
 * Slightly modified version of bind, which can accept the context as the first
 * arg and the method name as the second, like jquery's proxy
 * @param {Function|Object} func - The method to bind, or the context if the method will be
 *     specified using a string in param 2
 * @param {Object|String} context - The context when `func` is a function, or the method name to bind
 *     when func is an object
 * @param {...*} [args] Args to be bound to the function
 * @return {Function} The bound function
 */
mixins.bind = function (func, context) {
  var args = _.rest(arguments, 2);
  if (typeof context === 'string') {
    // args[1] is actually a method name, like _.bind(this, 'method');
    args.unshift(func[context], func);
  } else {
    args.unshift(func, context);
  }
  return origBind.apply(_, args);
};

_.mixin(mixins);

module.exports = _;