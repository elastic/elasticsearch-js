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

#####
# Start or stop a group for travis
#####
function group {
  if [ -n "$TRAVIS" ]; then
    echo -e "travis_fold:$1"
  fi
}

#####
# Do, log, and check a call
#####
function call {
  local DO="$*"
  echo "\$ ${DO}"
  echo $DO | bash
  local RESULT=$?
  if [ "$RESULT" -gt "0" ]; then
    echo "non-zero exit code: $RESULT"
    exit $RESULT
  fi
}

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

#####
# Download a version of ES and get it running
# @arg ES_BRANCH - The branch to run off of
# @arg ES_RELEASE - The specific release to run, overrides ES_BRANCH
#####
function get_es {
  group "start:setup_es"
    local ES_BRANCH=$1
    local ES_RELEASE=$2

    local ROOT="$PWD"
    local ES_SUBMODULE="$ROOT/src/elasticsearch"
    local SNAPSHOTS="$ROOT/.snapshots"

    if [ ! -d "$SNAPSHOTS" ]; then
      mkdir -p $SNAPSHOTS
    fi

    if [ -n "$ES_RELEASE" ]; then
      local ES_VERSION="v${ES_RELEASE}"
      local ES_URL="https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-${ES_RELEASE}.zip"
      local ES_DIR="${SNAPSHOTS}/${ES_VERSION}"
    else
      local ES_VERSION="${ES_BRANCH}_nightly"
      local ES_URL="http://s3-us-west-2.amazonaws.com/build.elasticsearch.org/origin/$ES_BRANCH/nightly/JDK6/elasticsearch-latest-SNAPSHOT.zip"
      local DATE=`date +%Y_%m_%d`
      local ES_DIR="${SNAPSHOTS}/${ES_VERSION}_${DATE}"
      if [ ! -d $ES_DIR ]; then
        call rm -rf ${SNAPSHOTS}/${ES_VERSION}*
      fi
    fi

    local ES_BIN="$ES_DIR/bin/elasticsearch"

    call cd $SNAPSHOTS

    if [ ! -d "$ES_DIR" ]; then
      echo "Downloading Elasticsearch $ES_VERSION"
      call curl -#O $ES_URL
      unzip -q elasticsearch-*.zip
      rm elasticsearch-*.zip
      mv elasticsearch-*/ $ES_DIR
    fi

    call cd $ROOT

    if [ ! -x "$ES_BIN" ]; then
      echo "Unable to find elasticsearch executable"
      exit 1
    fi

    if [ "$ES_BRANCH" = "0.90" ]; then
      echo "Starting Elasticsearch $ES_VERSION"
      call $ES_BIN \
        -Des.network.host=localhost \
        -Des.discovery.zen.ping.multicast.enabled=false \
        -Des.discovery.zen.ping_timeout=1
    else
      echo "Starting Elasticsearch $ES_VERSION as a deamon"
      call $ES_BIN -d \
        -Des.network.host=localhost \
        -Des.discovery.zen.ping.multicast.enabled=false \
        -Des.discovery.zen.ping_timeout=1
    fi
  group "end:setup_es"
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
    killall java 2>/dev/null
    get_es $ES_BRANCH $ES_RELEASE
  fi

  call node scripts/generate --no-api --es_branch=\"$TESTING_BRANCH\"
  grunt_ mochacov:integration

  if [[ -n "$ES_BRANCH" ]] && [[ "$USER" != "jenkins" ]]; then
    killall java 2>/dev/null
  fi
fi

if [[ -n "$TEST_BROWSER" ]]; then
  grunt_ run:browser_test_server saucelabs-mocha:${TEST_BROWSER}
fi

if [[ "$COVERAGE" == "1" ]]; then
  grunt_ mochacov:ship_coverage
fi
