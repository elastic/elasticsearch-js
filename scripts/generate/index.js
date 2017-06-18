/* jshint curly: false */
const async = require('async');
const fs = require('fs');
const spawn = require('../_spawn');
let argv = require('optimist')
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

const path = require('path');
const fromRoot = path.join.bind(path, require('find-root')(__dirname));
const utils = require(fromRoot('grunt/utils'));
const _ = require(fromRoot('src/lib/utils'));
const esUrl = process.env.ES_REPO
  ? path.resolve(process.cwd(), process.env.ES_REPO)
  : 'https://github.com/elastic/elasticsearch.git';

let branches;

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

const TMP_DIR = fromRoot('tmp');
const ES_REPO_DIR = path.join(TMP_DIR, 'es/repo');
const ES_BRANCHES_DIR = path.join(TMP_DIR, 'es/branches');
const YAML_TESTS_DIR = path.join(TMP_DIR, 'yaml_tests');

const paths = {
  root: fromRoot('.'),
  src: fromRoot('src'),
  docs: fromRoot('docs'),
  docsIndex: fromRoot('docs/index.asciidoc'),
  apiSrc: 'src/lib/apis',
  getArchiveDir: function (branch) {
    return path.join(ES_BRANCHES_DIR, _.snakeCase(branch));
  },
  getArchiveTarball: function (branch) {
    return path.join(ES_BRANCHES_DIR, _.snakeCase(branch) + '.tar');
  },
  getSpecPathInRepo: function (branch) {
    return /^v?(master|[2-9]\.)/.test(branch) ? 'rest-api-spec/src/main/resources/rest-api-spec' : 'rest-api-spec';
  }
};

function isDirectory(dir) {
  try {
    const stat = fs.statSync(dir);
    return stat.isDirectory();
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }

    throw error;
  }
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
    return _.include(opts, name);
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
  return function (done) {
    if (isDirectory(ES_REPO_DIR)) {
      async.series([
        spawnStep('git', ['remote', 'set-url', 'origin', esUrl], ES_REPO_DIR)
      ], done);
    } else {
      async.series([
        spawnStep('mkdir', ['-p', path.dirname(ES_REPO_DIR)], paths.root),
        spawnStep('git', ['init', '--bare', ES_REPO_DIR], paths.root),
        spawnStep('git', ['remote', 'add', 'origin', esUrl], ES_REPO_DIR)
      ], done);
    }
  };
}

function fetchBranchesStep() {
  const branchArgs = branches.map(function (b) { return b + ':' + b; });
  return spawnStep('git', ['fetch', '--depth=1', '--no-tags', '--force', 'origin'].concat(branchArgs), ES_REPO_DIR);
}


function findGeneratedApiFiles() {
  const anyApiMethodDocs = /^(configuration|index|api_methods).*\.asciidoc$/;
  const anyApiJsFiled = /^.+\.js$/;
  const allBranches = _.isEqual(branches, utils.branches);

  if (allBranches) {
    return [
      dirRegex(paths.docs, anyApiMethodDocs),
      dirRegex(paths.apiSrc, anyApiJsFiled)
    ];
  }

  return branches.reduce(function (files, branch) {
    const b = _.snakeCase(branch);

    files.push(dirOpts(paths.docs, 'api_methods_' + b + '.asciidoc'));

    const isDefault = branch === utils.branches._default;
    if (isDefault) {
      files.push(dirOpts(paths.docs, 'api_methods.asciidoc'));
    }

    files.push(dirOpts(paths.apiSrc, b + '.js'));

    return files;
  }, []);
}


function clearGeneratedFiles() {
  const generatedFiles = [
    ES_BRANCHES_DIR,
  ];

  if (argv.api) {
    generatedFiles.push(findGeneratedApiFiles());
  }

  if (argv.api) {
    generatedFiles.push(YAML_TESTS_DIR);
  }

  const rmSteps = _.chain(generatedFiles)
  .flatten()
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

  const dir = paths.getArchiveDir(branch);
  if (!isDirectory(dir)) return;

  return spawnStep('rm', ['-rf', dir], paths.root);
}

function createArchive(branch) {
  return function (done) {
    const dir = paths.getArchiveDir(branch);
    const tarball = paths.getArchiveTarball(branch);
    const specPathInRepo = paths.getSpecPathInRepo(branch);
    const subDirCount = _.countBy(specPathInRepo, p => p === '/').true || 0;

    if (isDirectory(dir)) {
      console.log(branch + ' archive already exists');
      return process.nextTick(done);
    }

    async.series([
      spawnStep('mkdir', ['-p', dir], paths.root),
      spawnStep('git', ['archive', '--format', 'tar', '--output', tarball, branch, specPathInRepo], ES_REPO_DIR),
      spawnStep('tar', ['-x', '-f', tarball, '-C', dir, '--strip-components', subDirCount]),
      spawnStep('rm', [tarball])
    ], done);
  };
}

function generateStep(branch) {
  return function (done) {
    async.parallel([
      argv.api && async.apply(require('./js_api'), branch),
      argv.tests && async.apply(require('./yaml_tests'), branch, ES_BRANCHES_DIR, YAML_TESTS_DIR)
    ].filter(Boolean), done);
  };
}

const steps = [
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
