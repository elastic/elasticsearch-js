var utils = require('../src/lib/utils');

var root = require('find-root')(__dirname);
var pkg = require(root + '/package.json');
var stable = pkg.config.supported_es_branches;
var unstable = pkg.config.unstable_es_branches;
var branches = [].concat(stable, unstable);

var gruntUtils = {
  branchSuffix: function (branch) {
    return branch === gruntUtils.branches._default ? '' : '_' + utils.snakeCase(branch);
  },
  branches: branches,
  stableBranches: stable,
  unstableBranches: unstable,
  browserBranches: stable.slice(0, 5).concat(unstable)
};

gruntUtils.branches._default = pkg.config.default_api_branch;

/*
 * trim down a version id to the minor version number ('1.5.1' => '1.5')
 */
gruntUtils.minorVersion = function (version) {
  return version.split('.').slice(0, 2).join('.');
};

/*
 * increment the version based on the release "type"
 */
gruntUtils.increaseVersion = function (version, type) {
  var i;
  switch (type) {
    case 'major':
      i = 0;
      break;
    case 'minor':
      i = 1;
      break;
    case 'bug':
    case 'patch':
    case 'bugfix':
      i = 2;
      break;
    default:
      throw new TypeError('unexpected version bump type');
  }

  // breakout the current version
  var next = version.split('.').map(function (n) {
    return parseInt(n, 10);
  });

  // increment the version type
  next[i] += 1;
  // clear out all following numbers
  for (i ++; i < next.length; i++) next[i] = 0;
  // join back together with '.'
  return next.join('.');
};

/*
 * replace all instances of `replace` with `replacement` without creating a regexp object
 */
gruntUtils.replaceAll = function (str, replace, replacement) {
  var out = '';
  var remaining = str;
  var i = 0;

  while (~(i = remaining.indexOf(replace))) {
    out += remaining.substring(0, i) + replacement;
    remaining = remaining.substr(i + replace.length);
  }

  return out + remaining;
};

module.exports = gruntUtils;
