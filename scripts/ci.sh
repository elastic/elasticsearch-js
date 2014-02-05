#!/usr/bin/env bash

###########
# Run the tests, and setup es if needed
#
# ENV VARS:
#  ES_BRANCH - the ES branch we should use to generate the tests and download es
#  ES_RELEASE - a specific ES release to download in use for testing
#  NODE_UNIT=1 - 0/1 run the unit tests in node
#  NODE_INTEGRATION=1 - 0/1 run the integration tests in node
#  BROWSER_UNIT - the browser to test in using, sauce labs. One of 'ie', 'firefox', 'chrome'
#  COVERAGE - 0/1 check for coverage and ship it to coveralls
#
###########

export ES_NODE_NAME="elasticsearch_js_test_runner"

HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
MOCHA="./node_modules/.bin/mocha"
MOCHA_REPORTER="../../../test/utils/jenkins-reporter.js"

source $HERE/_utils.sh

# normalize ES_BRANCH into TESTING_BRANCH
if [[ -n "$ES_BRANCH" ]]; then
  TESTING_BRANCH=$ES_BRANCH
else
  TESTING_BRANCH="master"
fi

if [[ "$NODE_UNIT" != "0" ]]; then
  group "running unit tests"
    if [[ -n "$JENKINS" ]]; then
      $MOCHA test/unit/index.js --reporter $MOCHA_REPORTER 2> test/junit-node-unit.xml
      if [ "$?" -gt "0" ]; then
        echo "non-zero exit code: $RESULT"
        cat test/junit-node-unit.xml
      fi
    else
      _grunt jshint mochacov:unit
    fi
fi

if [[ "$NODE_INTEGRATION" != "0" ]]; then
  group "generating tests"
    call node scripts/generate --no-api --branch $TESTING_BRANCH

  group "running integration tests"
    if [[ -n "$JENKINS" ]]; then
      # convert TESTING_BRANCH into BRANCH_SUFFIX
      if [[ $TESTING_BRANCH = 'master' ]]; then
        BRANCH_SUFFIX=''
      else
        BRANCH_SUFFIX="_${TESTING_BRANCH//./_}"
      fi

      # find value of ES_PORT
      if [[ -n "$es_port" ]]; then
        # jenkins
        ES_PORT=$es_port
      else
        ES_PORT=9200
      fi

      FILES=test/integration/yaml_suite/index${BRANCH_SUFFIX}.js
      $MOCHA $FILES --host localhost --port $ES_PORT --reporter $MOCHA_REPORTER 2> test/junit-node-integration.xml
      if [ "$?" -gt "0" ]; then
        echo "non-zero exit code: $RESULT"
        cat test/junit-node-unit.xml
      fi
    else
      manage_es start $TESTING_BRANCH $ES_RELEASE
      _grunt mochacov:integration_$TESTING_BRANCH
      manage_es stop $TESTING_BRANCH $ES_RELEASE
    fi
fi

if [[ "$BROWSER_UNIT" == "1" ]]; then
  group "running browser tests"
  _grunt browser_clients:build run:browser_test_server saucelabs-mocha
fi

if [[ "$COVERAGE" == "1" ]]; then
  group "shipping coverage"
    # don't fail even if this does
    _grunt --force mochacov:ship_coverage
fi
