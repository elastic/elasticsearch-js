var _ = require('lodash');
var pkg = require('../package.json');
var branches = [...pkg.config.supported_es_branches, ...pkg.config.unstable_es_branches];
var semver = require('semver');

function nextMajorVersion() {
  const largestMajor = branches
    .map(v => parseFloat(v.split('.')[0]))
    .filter(n => !isNaN(n))
    .sort((a, b) => b - a)
    .shift()

  return new Version(`${largestMajor + 1}.0.0`)
}

function nextMinorVersion(major) {
  const largestMinor = branches
    .map(v => v.split('.').map(parseFloat).slice(0, 2))
    // ensure all tuples have length 2
    .filter(vt => vt.length === 2)
    // ensure all values in tuples are not NaN
    .filter(vt => vt.every(v => !isNaN(v)))
    // ensure that major version in tuple matches major (both as a string)
    .filter(vt => `${vt[0]}` === `${major}`)
    // sort by the minor version in each tuple
    .sort((vta, vtb) => vtb[1] - vta[1])
    // get the minor version from the first tuple
    .shift()[1];

  return new Version(`${major}.${largestMinor + 1}.0`);
}

function Version(v) {
  this.version = v;
  this.major = semver.major(v);
  this.minor = semver.minor(v);
  this.patch = semver.patch(v);
}

Version.fromBranch = function (branch) {
  // n.m -> n.m.0
  if (/^\d+\.\d+$/.test(branch)) return new Version(branch + '.0');

  // n.x -> n.(maxVersion + 1).0
  const match = branch.match(/^(\d+)\.x$/i)
  if (match) return nextMinorVersion(match[1]);

  // master => (maxMajorVersion + 1).0.0
  if (branch === 'master') return nextMajorVersion()

  throw new Error('unable to convert branch "' + branch + '" to semver');
};

Version.prototype.increment = function (which) {
  return new Version(semver.inc(this.version, which));
};

Version.prototype.satisfies = function (range) {
  debugger
  return semver.satisfies(this.version, range);
};

// merge a list of option objects, each of which has a "version" key dictating
// the range of versions those options should be included in. Options are merged
// in the order of the array
Version.prototype.mergeOpts = function (versioned, overrides) {

  const candidates = versioned
    .filter(o => this.satisfies(o.version))
    .map(o => _.omit(o, 'version'))

  return _.merge({}, overrides || {}, ...candidates)
};

module.exports = Version;
