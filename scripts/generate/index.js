/* jshint curly: false */
var async = require('async');
var fs = require('fs');
var spawn = require('../_spawn');
var argv = require('optimist')
  .options({
    verbose: {
      alias: 'v',
      default: false,
      boolean: true
    },
    api: {
      default: true,
      boolean: true
    },
    tests: {
      default: true,
      boolean: true
    },
    update: {
      default: true,
      boolean: true
    },
    branch: {
      default: null,
      string: true
    }
  });

var path = require('path');
var fromRoot = path.join.bind(path, require('find-root')(__dirname));
var utils = require(fromRoot('grunt/utils'));
var _ = require(fromRoot('src/lib/utils'));
var esUrl = 'https://github.com/elastic/elasticsearch.git';
var branches;

if (process.env.npm_config_argv) {
  // when called by NPM
  argv = argv.parse(JSON.parse(process.env.npm_config_argv).original);
} else {
  // when called directly
  argv = argv.argv;
}

if (argv.branch) {
  branches = [argv.branch];
} else {
  branches = utils.branches;
}

var paths = {
  root: fromRoot('.'),
  src: fromRoot('src'),
  esSrc: fromRoot('src/_elasticsearch_'),
  docs: fromRoot('docs'),
  docsIndex: fromRoot('docs/index.asciidoc'),
  apiSrc: 'src/lib/apis',
  getArchiveDir: function (branch) {
    return fromRoot('src/_elasticsearch_' + _.snakeCase(branch));
  },
  getArchiveTarball: function (branch) {
    return fromRoot('src/_elasticsearch_' + _.snakeCase(branch) + '.tar');
  },
  getSpecPathInRepo: function (branch) {
    return /^v?(master|[2-9]\.)/.test(branch) ? 'rest-api-spec/src/main/resources/rest-api-spec' : 'rest-api-spec';
  }
};

function isDirectory(dir) {
  var stat;
  try { stat = fs.statSync(dir); } catch (e) {}
  return (stat && stat.isDirectory());
}

function dirFilter(dir, fn) {
  try {
    return fs.readdirSync(dir)
    .filter(function (name) {
      return name !== '.' && name !== '..' && fn(name);
    })
    .map(function (filename) {
      return path.join(dir, filename);
    });
  } catch (e) {
    return [];
  }
}

function dirRegex(dir, regexp) {
  return dirFilter(dir, function (name) {
    return name.match(regexp);
  });
}

function dirOpts(dir, opts) {
  opts = _.isArray(opts) ? opts : [opts];
  return dirFilter(dir, function (name) {
    return _.contains(opts, name);
  });
}

function spawnStep(cmd, args, cwd) {
  return function (done) {
    spawn(cmd, args, {
      verbose: argv.verbose,
      cwd: cwd
    }, function (status) {
      done(status ? new Error('Non-zero exit code: ' + status) : void 0);
    });
  };
}

function initStep() {
  if (isDirectory(paths.esSrc)) return;

  return function (done) {
    async.series([
      spawnStep('git', ['init', '--bare', paths.esSrc], paths.root),
      spawnStep('git', ['remote', 'add', 'origin', esUrl], paths.esSrc)
    ], done);
  };
}

function fetchBranchesStep() {
  var branchArgs = branches.map(function (b) { return b + ':' + b; });
  return spawnStep('git', ['fetch', '--no-tags', '--force', 'origin'].concat(branchArgs), paths.esSrc);
}


function findGeneratedApiFiles() {
  var anyApiMethodDocs = /^(configuration|index|api_methods).*\.asciidoc$/;
  var anyApiJsFiled = /^.+\.js$/;
  var allBranches = _.isEqual(branches, utils.branches);

  if (allBranches) {
    return [
      dirRegex(paths.docs, anyApiMethodDocs),
      dirRegex(paths.apiSrc, anyApiJsFiled)
    ];
  }

  return branches.reduce(function (files, branch) {
    var b = _.snakeCase(branch);

    files.push(dirOpts(paths.docs, 'api_methods_' + b + '.asciidoc'));

    var isDefault = branch === utils.branches._default;
    if (isDefault) {
      files.push(dirOpts(paths.docs, 'api_methods.asciidoc'));
    }

    files.push(dirOpts(paths.apiSrc, b + '.js'));

    return files;
  }, []);
}


function clearGeneratedFiles() {
  var esArchives = /^_elasticsearch_(master|[\dx_]+|\.tar)$/;
  var generatedFiles = [];

  if (argv.api) {
    generatedFiles.push(findGeneratedApiFiles());
  }

  generatedFiles.push(dirRegex(paths.src, esArchives));

  var rmSteps = _.chain(generatedFiles)
  .flattenDeep()
  .uniq()
  .map(function (path) {
    return spawnStep('rm', ['-rf', path]);
  })
  .value();

  if (!rmSteps.length) return;

  return function (done) {
    return async.series(rmSteps, done);
  };
}

function removePrevArchive(branch) {
  if (!argv.update) return;

  var dir = paths.getArchiveDir(branch);
  if (!isDirectory(dir)) return;

  return spawnStep('rm', ['-rf', dir], paths.root);
}

function createArchive(branch) {
  return function (done) {
    var dir = paths.getArchiveDir(branch);
    var tarball = paths.getArchiveTarball(branch);
    var specPathInRepo = paths.getSpecPathInRepo(branch);
    var subDirCount = _.countBy(specPathInRepo, _.partial(_.eq, '/')).true || 0;

    if (isDirectory(dir)) {
      console.log(branch + ' archive already exists');
      return process.nextTick(done);
    }

    async.series([
      spawnStep('mkdir', [dir], paths.root),
      spawnStep('git', ['archive', '--format', 'tar', '--output', tarball, branch, specPathInRepo], paths.esSrc),
      spawnStep('tar', ['-x', '-f', tarball, '-C', dir, '--strip-components', subDirCount]),
      spawnStep('rm', [tarball])
    ], done);
  };
}

function generateStep(branch) {
  return function (done) {
    async.parallel([
      argv.api && async.apply(require('./js_api'), branch),
      argv.tests && async.apply(require('./yaml_tests'), branch)
    ].filter(Boolean), done);
  };
}

var steps = [
  initStep(),
  clearGeneratedFiles(),
  fetchBranchesStep()
].filter(Boolean);

branches.forEach(function (branch) {
  steps.push(_.partial(async.series, [
    removePrevArchive(branch),
    createArchive(branch),
    generateStep(branch)
  ].filter(Boolean)));
});

if (argv.api) {
  steps.push(
    require('./api_index'),
    require('./doc_index'),
    require('./configuration_docs')
  );
}

async.series(
  steps.map(function (step) {
    return function (done) {
      step(function (err) {
        console.log('----\n');
        done(err);
      });
    };
  }),
  function (err) {
    if (err) {
      throw err;
    }
  }
);
