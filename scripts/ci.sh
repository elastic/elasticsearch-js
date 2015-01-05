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

MOCHA="./node_modules/.bin/mocha"
MOCHA_REPORTER="../../../test/utils/jenkins-reporter.js"

# execute a command, and exit if it fails
function crit {
  $*
  CODE=$?
  if [[ $CODE -gt 0 ]]; then
    echo "last command was critical, but it reported non-zero exit code $CODE";
    exit;
  fi
}

if [[ "$(which grunt)" == "" ]]; then
  crit npm install -g grunt
fi

# normalize ES_BRANCH into TESTING_BRANCH
if [[ -n "$ES_BRANCH" ]]; then
  TESTING_BRANCH=$ES_BRANCH
else
  TESTING_BRANCH="master"
fi

if [[ "$NODE_UNIT" != "0" ]]; then
  if [[ -n "$JENKINS" ]]; then
    $MOCHA test/unit/index.js --reporter $MOCHA_REPORTER 2> test/junit-node-unit.xml
    if [ "$?" -gt "0" ]; then
      echo "non-zero exit code: $RESULT"
      cat test/junit-node-unit.xml
    fi
  else
    crit grunt jshint mochacov:unit
  fi
fi

if [[ "$NODE_INTEGRATION" != "0" ]]; then
  crit node scripts/generate --no-api --branch $TESTING_BRANCH

  if [[ -n "$JENKINS" ]]; then
    # convert TESTING_BRANCH into BRANCH_SUFFIX
    BRANCH_SUFFIX="_${TESTING_BRANCH//./_}"

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
    crit grunt esvm:ci_env "mochacov:integration_${TESTING_BRANCH}" esvm_shutdown:ci_env
  fi
fi

if [[ "$BROWSER_UNIT" == "1" ]]; then
  crit grunt browser_clients:build run:browser_test_server saucelabs-mocha
fi

if [[ "$COVERAGE" == "1" ]]; then
  # don't fail even if this does
  grunt --force mochacov:ship_coverage
fi
