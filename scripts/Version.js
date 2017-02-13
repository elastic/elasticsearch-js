var _ = require('lodash');
var pkg = require('../package.json');
var branches = pkg.config.supported_es_branches;
var semver = require('semver');

var maxMinorVersion = function (majorV) {
  var versions = branches.map(function (v) { return v + '.0'; });
  return new Version(semver.maxSatisfying(versions, '^' + majorV));
};

function Version(v) {
  this.version = v;
  this.major = semver.major(v);
  this.minor = semver.minor(v);
  this.patch = semver.patch(v);
}

Version.fromBranch = function (branch) {
  var m;

  // master === the highest version number
  if (branch === 'master') return new Version('5.0.0');

  // n.m -> n.m.0
  if (m = branch.match(/^\d+\.\d+$/)) return new Version(branch + '.0');

  // n.x -> n.(maxVersion + 1).0
  if (m = branch.match(/^(\d+)\.x$/i)) return maxMinorVersion(m[1]).increment('minor');

  throw new Error('unable to convert branch "' + branch + '" to semver');
};

Version.prototype.increment = function (which) {
  return new Version(semver.inc(this.version, which));
};

Version.prototype.satisfies = function (range) {
  return semver.satisfies(this.version, range);
};

// merge a list of option objects, each of which has a "version" key dictating
// the range of versions those options should be included in. Options are merged
// in the order of the array
Version.prototype.mergeOpts = function (versioned, overrides) {

  const candidates = versioned
    .filter(o => this.satisfies(o.version))
    .map(o => _.omit(o, 'version'))
    .reverse()

  return _.merge({}, overrides || {}, ...candidates)
};

module.exports = Version;
