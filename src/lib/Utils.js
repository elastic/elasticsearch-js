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
mixins.requireDir = requireDir;

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

_.mixin(mixins);

module.exports = _;