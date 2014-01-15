#!/usr/bin/env bash

###########
# Run the tests, and setup es if needed
#
# ENV VARS:
#  TRAVIS - Identifies that we're running on travis-ci
#  ES_V - version identifier set by Jenkins
#  ES_BRANCH - the ES branch we should use to generate the tests and download es
#  ES_VERSION - a specific ES version to download in use for testing
#  NODE_UNIT=1 - 0/1 run the unit tests in node
#  NODE_INTEGRATION=1 - 0/1 run the integration tests in node
#  TEST_BROWSER - the browser to run using selemium '{{name}}:{{version}}:{{OS}}'
#  COVERAGE - 0/1 check for coverage and ship it to coveralls
#
###########

export ES_NODE_NAME="elasticsearch_js_test_runner"
export SAUCE_USERNAME="elasticsearch-js"
export SAUCE_ACCESS_KEY="3259dd1e-a9f2-41cc-afd7-855d80588aeb"

HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source $HERE/_utils.sh

#####
# call grunt, but make sure it's installed first
#####
function grunt_ {
  local DO="$*"

  if [[ ! -x "`which grunt`" ]]; then
    group "start:install_grunt"
      echo "installing grunt-cli"
      call npm install -g grunt-cli
    group "end:install_grunt"
  fi

  call grunt $DO
}

# normalize ES_BRANCH into TESTING_BRANCH
if [[ -n "$ES_BRANCH" ]]; then
  TESTING_BRANCH=$ES_BRANCH
elif [[ -n "$ES_V" ]]; then
  re='^(.*)_nightly$';
  if [[ $ES_V =~ $re ]]; then
    TESTING_BRANCH=${BASH_REMATCH[1]}
  else
    echo "unable to parse ES_V $ES_V"
    exit 1
  fi
else
  TESTING_BRANCH="master"
fi

if [[ "$NODE_UNIT" != "0" ]]; then
  if [[ -n "$JENKINS" ]]; then
    ./node_modules/.bin/mocha test/unit/test_*.js \
      --require should \
      --reporter ../../../test/utils/jenkins-reporter.js \
      2> test/junit-node-unit.xml
  else
    grunt_ jshint mochacov:unit
  fi
fi

if [[ "$NODE_INTEGRATION" != "0" ]]; then
  group "start:generate_tests"
    call node scripts/generate --no-api
  group "end:generate_tests"

  if [[ -n "$JENKINS" ]]; then
    # convert TESTING_BRANCH into BRANCH_SUFFIX
    if [[ $TESTING_BRANCH = 'master' ]]; then
      BRANCH_SUFFIX=''
    else
      BRANCH_SUFFIX=${TESTING_BRANCH//./_}
    fi

    # find value of ES_PORT
    if [[ -n "$es_port" ]]; then
      # jenkins
      ES_PORT=$es_port
    else
      ES_PORT=9200
    fi

    ./node_modules/.bin/mocha test/integration/yaml_suite/index${BRANCH_SUFFIX}.js \
      --require should \
      --host localhost \
      --port $ES_PORT \
      --reporter ../../../test/utils/jenkins-reporter.js \
      2> test/junit-node-integration.xml
  else
    manage_es start $TESTING_BRANCH $ES_RELEASE
    grunt_ mochacov:integration_$TESTING_BRANCH
    manage_es stop $TESTING_BRANCH $ES_RELEASE
  fi
fi

if [[ -n "$TEST_BROWSER" ]]; then
  grunt_ browser_clients:build run:browser_test_server saucelabs-mocha:${TEST_BROWSER}
fi

if [[ "$COVERAGE" == "1" ]]; then
  grunt_ mochacov:ship_coverage
fi
