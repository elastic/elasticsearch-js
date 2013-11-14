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

function makeJUnitXml(runnerName, testDetails) {
  _.each(testDetails.suites, function serializeSuite(suiteInfo) {
    var suite = suites.ele('testsuite', {
      package: 'elasticsearch-js:yaml_tests',
      id: suiteCount++,
      name: suiteInfo.name,
      timestamp: moment(suiteInfo.start).toJSON(),
      hostname: 'localhost',
      tests: (suiteInfo.results && suiteInfo.results.length) || 0,
      failures: _.where(suiteInfo.results, {pass: false}).length,
      errors: 0,
      time: suiteInfo.time / 1000
    });

    _.each(suiteInfo.results, function (testInfo) {

      var parts = suiteInfo.name.replace(/\.yaml$/, '').replace(/\./g, '_').split(/\//);
      var section = parts.shift();
      var behavior = parts.join('/');

      var testcase = suite.ele('testcase', {
        name: behavior + ' - ' + testInfo.name,
        time: (testInfo.time || 0) / 1000,
        classname: runnerName + '.' + section
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
    });

    if (suiteInfo.suites) {
      _.each(suiteInfo.suites, serializeSuite);
    }

    suite.ele('system-out', {}).cdata(suiteInfo.stdout);
    suite.ele('system-err', {}).cdata(suiteInfo.stderr);
  });

  return suites.toString({ pretty: true});
}
