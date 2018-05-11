/**
 * The JUnit xml output desired by Jenkins essentially looks like this:
 *
 * testsuites:
 *   - testsuite: (name, timestamp, hostname, tests, failures, errors, time)
 *     - testcase: (error or failure, name, classname, time)
 *
 * Full XSD avaliable [here](http://windyroad.com.au/dl/Open%20Source/JUnit.xsd)
 *
 * from
 *
 * {
 *   stats: {
 *
 *   }
 *   suite: [
 *     {
 *       name:
 *       results: []
 *       suites: [] // optional
 *     }
 *   ]
 * }
 */
module.exports = makeJUnitXml;

var testXml = require('xmlbuilder');
var suites = testXml.create('testsuites');
var suiteCount = 0;
var moment = require('moment');
var _ = require('lodash');
var chalk = require('chalk');

function makeJUnitXml(runnerName, testDetails) {
  _.each(testDetails.suites, function serializeSuite(suiteInfo) {

    var suite = suites.ele('testsuite', {
      package: 'elasticsearch-js',
      id: suiteCount++,
      name: suiteInfo.name,
      timestamp: moment(suiteInfo.start).toJSON(),
      hostname: 'localhost',
      tests: (suiteInfo.results && suiteInfo.results.length) || 0,
      failures: _.filter(suiteInfo.results, { pass: false }).length,
      errors: 0,
      time: suiteInfo.time / 1000
    });

    _.each(suiteInfo.results, function (testInfo) {
      var section;
      var integration = false;

      if (suiteInfo.name.match(/\/.*\.yaml$/)) {
        section = suiteInfo.name.split('/').slice(0, -1).join('/').replace(/\./g, '/');
      } else {
        section = suiteInfo.name.replace(/\./g, ',');
      }

      if (section.indexOf('integration ') === 0) {
        section = section.replace(/^integration /, '');
        integration = true;
      }

      var testcase = suite.ele('testcase', {
        name: testInfo.name,
        time: (testInfo.time || 0) / 1000,
        classname: runnerName + (integration ? ' - integration' : '') + '.' + section
      });

      if (testInfo.errMsg) {
        testcase.ele('failure', {
          message: testInfo.errMsg,
          type: 'AssertError'
        });
      } else if (!testInfo.pass) {
        testcase.ele('error', {
          message: 'Unknown Error',
          type: 'TestError'
        });
      }

      giveOutput(testcase, testInfo);
    });

    if (suiteInfo.suites) {
      _.each(suiteInfo.suites, serializeSuite);
    }

    giveOutput(suite, suiteInfo);
  });

  return suites.toString({ pretty: true });
}

function giveOutput(el, info) {
  var out = info.stdout.trim();
  var err = info.stderr.trim();

  if (out) {
    el.ele('system-out', {}).cdata(chalk.stripColor(out));
  }

  if (err) {
    el.ele('system-err', {}).cdata(chalk.stripColor(err));
  }
}
