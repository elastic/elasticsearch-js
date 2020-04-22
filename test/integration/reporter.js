'use strict'

const assert = require('assert')
const { create } = require('xmlbuilder2')

function createJunitReporter () {
  const report = {}

  return { testsuites, prettyPrint }

  function prettyPrint () {
    return create(report).end({ prettyPrint: true })
  }

  function testsuites (name) {
    assert(name, 'The testsuites name is required')
    assert(report.testsuites === undefined, 'Cannot set more than one testsuites block')
    const startTime = Date.now()

    report.testsuites = {
      '@id': new Date().toISOString(),
      '@name': name
    }

    const testsuiteList = []

    return {
      testsuite: createTestSuite(testsuiteList),
      end () {
        report.testsuites['@time'] = Math.round((Date.now() - startTime) / 1000)
        report.testsuites['@tests'] = testsuiteList.reduce((acc, val) => {
          acc += val['@tests']
          return acc
        }, 0)
        report.testsuites['@failures'] = testsuiteList.reduce((acc, val) => {
          acc += val['@failures']
          return acc
        }, 0)
        report.testsuites['@skipped'] = testsuiteList.reduce((acc, val) => {
          acc += val['@skipped']
          return acc
        }, 0)
        if (testsuiteList.length) {
          report.testsuites.testsuite = testsuiteList
        }
      }
    }
  }

  function createTestSuite (testsuiteList) {
    return function testsuite (name) {
      assert(name, 'The testsuite name is required')
      const startTime = Date.now()
      const suite = {
        '@id': new Date().toISOString(),
        '@name': name
      }
      const testcaseList = []
      testsuiteList.push(suite)
      return {
        testcase: createTestCase(testcaseList),
        end () {
          suite['@time'] = Math.round((Date.now() - startTime) / 1000)
          suite['@tests'] = testcaseList.length
          suite['@failures'] = testcaseList.filter(t => t.failure).length
          suite['@skipped'] = testcaseList.filter(t => t.skipped).length
          if (testcaseList.length) {
            suite.testcase = testcaseList
          }
        }
      }
    }
  }

  function createTestCase (testcaseList) {
    return function testcase (name) {
      assert(name, 'The testcase name is required')
      const startTime = Date.now()
      const tcase = {
        '@id': new Date().toISOString(),
        '@name': name
      }
      testcaseList.push(tcase)
      return {
        failure (error) {
          assert(error, 'The failure error object is required')
          tcase.failure = {
            '#': error.stack,
            '@message': error.message,
            '@type': error.code
          }
        },
        skip (reason) {
          if (typeof reason !== 'string') {
            reason = JSON.stringify(reason, null, 2)
          }
          tcase.skipped = {
            '#': reason
          }
        },
        end () {
          tcase['@time'] = Math.round((Date.now() - startTime) / 1000)
        }
      }
    }
  }
}

module.exports = createJunitReporter
