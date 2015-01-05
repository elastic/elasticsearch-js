#!/usr/bin/env node

/**
 * Run the tests, and setup es if needed
 *
 * ENV VARS:
 *  ES_BRANCH - the ES branch we should use to generate the tests and download es
 *  ES_RELEASE - a specific ES release to download in use for testing
 *  NODE_UNIT=1 - 0/1 run the unit tests in node
 *  NODE_INTEGRATION=1 - 0/1 run the integration tests in node
 *  BROWSER_UNIT - the browser to test in using, sauce labs. One of 'ie', 'firefox', 'chrome'
 *  COVERAGE - 0/1 check for coverage and ship it to coveralls
 *******/

var Promise = require('bluebird');
var _ = require('lodash-node');
var join = require('path').join;
var fs = require('fs');
var child_process = require('child_process');

var ROOT = join(__dirname, '..');
var GRUNT = join(ROOT, './node_modules/.bin/grunt');
var MOCHA = join(ROOT, './node_modules/.bin/mocha');
var BRANCH = process.env.ES_BRANCH || 'master';
var MOCHA_REPORTER = 'test/utils/jenkins-reporter.js';

var JENKINS = !!process.env.JENKINS;
var NODE_UNIT = process.env.NODE_UNIT !== '0';
var NODE_INTEGRATION = process.env.NODE_UNIT !== '0';
var BROWSER_UNIT = process.env.NODE_UNIT === '1';
var COVERAGE = process.env.NODE_UNIT === '1';

function spawn(file, args, opts, block) {
  return new Promise(function (resolve, reject) {
    var cp = child_process.spawn(GRUNT, args, _.defaults(opts || {}, {
      cwd: ROOT,
      env: process.env,
      stdio: 'inherit'
    }));

    block && block(cp);

    cp.on('exit', function (code) {
      if (code > 1) {
        reject(new Error('non-zero exit code: ' + code));
      } else {
        resolve();
      }
    });
  });
}

function node(/*args... */) {
  return spawn('node', _.rest(arguments));
}

function grunt(/* args... */) {
  return spawn(GRUNT, _.rest(arguments));
}

function mocha(report/*, args... */) {
  return spawn(MOCHA, _.rest(arguments, 1), { stdio: [0, 1, 'pipe'] }, function (cp) {
    cp.stderr.pipe(fs.createWriteStream(report));
  });
}

var chain = Promise.resolve();

if (NODE_UNIT && !JENKINS) {
  chain = chain.then(function () {
    return grunt('jshint', 'mochacov:unit');
  });
}


if (NODE_UNIT && JENKINS) {
  chain = chain.then(function () {
    var report = join(ROOT, 'test/junit-node-unit.xml');
    var tests = join(ROOT, 'test/unit/index.js');

    return mocha(report, tests, '--reporter', join(ROOT, MOCHA_REPORTER));
  });
}

if (NODE_INTEGRATION) {
  chain = chain.then(function () {
    return node('scripts/generate.js', '--no-api', '--branch', BRANCH);
  });
}

if (NODE_INTEGRATION && !JENKINS) {
  chain = chain.then(function () {
    grunt('esvm:ci_env', 'mochacov:integration_' + BRANCH, 'esvm_shutdown:ci_env');
  });
}

if (NODE_INTEGRATION && JENKINS) {
  chain = chain.then(function () {
    var branchSuffix = '_' + BRANCH.replace(/\./g, '_');
    var tests = 'test/integration/yaml_suite/index' + branchSuffix + '.js';
    var esPort = process.env.es_port || 9200;
    var report = 'test/junit-node-integration.xml';

    return mocha(report, tests, '--host', 'localhost', '--port', esPort, '--reporter', MOCHA_REPORTER);
  });
}

if (BROWSER_UNIT) {
  chain = chain.then(function () {
    return grunt('browser_clients:build', 'run:browser_test_server', 'saucelabs-mocha');
  });
}

if (COVERAGE) {
  chain = chain.then(function () {
    return grunt('mochacov:ship_coverage');
  })
  .catch(function () {
    console.log('FAILED TO SHIP COVERAGE! but that\'s normal');
  });
}