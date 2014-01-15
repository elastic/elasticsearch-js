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

source _utils.sh

#####
# call grunt, but make sure it's installed first
#####
function grunt_ {
  local DO="$*"

  if [ ! -x "`which grunt`" ]; then
    group "start:install_grunt"
      echo "installing grunt-cli"
      call npm install -g grunt-cli
    group "end:install_grunt"
  fi

  call grunt $DO
}


if [ -n "$ES_BRANCH" ]; then
  TESTING_BRANCH=$ES_BRANCH
elif [ -n "$ES_V" ]; then
  TESTING_BRANCH=$ES_V
else
  TESTING_BRANCH="master"
fi

if [[ "$NODE_UNIT" != "0" ]]; then
  grunt_ jshint mochacov:unit
fi

if [[ "$NODE_INTEGRATION" != "0" ]]; then
  if [[ -n "$ES_BRANCH" ]] && [[ "$USER" != "jenkins" ]]; then
    manage_es start $ES_BRANCH $ES_RELEASE
  fi

  call node scripts/generate --no-api --es_branch=\"$TESTING_BRANCH\"
  grunt_ mochacov:integration

  if [[ -n "$ES_BRANCH" ]] && [[ "$USER" != "jenkins" ]]; then
    manage_es stop $ES_BRANCH $ES_RELEASE
  fi
fi

if [[ -n "$TEST_BROWSER" ]]; then
  grunt_ run:browser_test_server saucelabs-mocha:${TEST_BROWSER}
fi

if [[ "$COVERAGE" == "1" ]]; then
  grunt_ mochacov:ship_coverage
fi
