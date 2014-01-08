#!/usr/bin/env bash

if [ -z $ES_BRANCH ]; then
  echo "Missing ES_BRANCH environment var"
  exit 1
fi

ROOT="$PWD"
ES_SUBMODULE="$ROOT/src/elasticsearch"
SNAPSHOTS="$ROOT/.snapshots"
ES_VERSION="${ES_BRANCH}_nightly"
ES_URL="http://s3-us-west-2.amazonaws.com/build.elasticsearch.org/origin/$ES_BRANCH/nightly/JDK6/elasticsearch-latest-SNAPSHOT.zip"

if [ ! -z $ES_RELEASE ]; then
  ES_VERSION="v${ES_RELEASE}"
  ES_URL="https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-${ES_RELEASE}.zip"
fi

ES_DIR="$SNAPSHOTS/$ES_VERSION"
ES_BIN="$ES_DIR/bin/elasticsearch"

function fold {
  if [ $TRAVIS = "true" ]; then
    echo -e "travis_fold:$1"
  fi
}

function check {
  RESULT=$1
  if [ "$RESULT" -gt "0" ]; then
    echo "non-zero exit code: $RESULT"
    exit $RESULT
  fi
}

fold "start:setup_es"
  echo "Setting up elasticsearch"

  echo "Killing existsing java processes"
  killall java 2>/dev/null

  if [ ! -d "$SNAPSHOTS" ]; then
    mkdir $SNAPSHOTS
  fi

  cd $SNAPSHOTS
  
  if [ ! -d "$ES_DIR" ]; then
    echo "Downloading Elasticsearch $ES_VERSION to $ES_DIR"

    
    curl -O $ES_URL \
      && unzip elasticsearch-*.zip
    check $?

    rm elasticsearch-*.zip
    check $?

    mv elasticsearch-*/ $ES_DIR
    check $?
  fi

  cd $ROOT

  if [ ! -x "$ES_BIN" ]; then
    echo "Unable to find elasticsearch executable"
    exit 1
  fi

  if [ "$ES_BRANCH" = "0.90" ]; then
    echo "Starting Elasticsearch $ES_VERSION"
    $ES_BIN \
      -Des.network.host=localhost \
      -Des.discovery.zen.ping.multicast.enabled=false \
      -Des.discovery.zen.ping_timeout=1
    check $?
  else
    echo "Starting Elasticsearch $ES_VERSION as a deamon"
    $ES_BIN -d \
      -Des.network.host=localhost \
      -Des.discovery.zen.ping.multicast.enabled=false \
      -Des.discovery.zen.ping_timeout=1
    check $?
  fi
fold "end:setup_es"


if [ ! -x "`which grunt`" ]; then
  fold "start:install_grunt"
    echo "installing grunt-cli"
    npm install -g grunt-cli
    check $?
  fold "end:install_grunt"
fi

if [ -z "$NO_UNIT" ]; then
  grunt jshint mochacov:unit
  check $?
fi

if [ -z "$NO_INTEGRATION" ]; then
  grunt --es_branch="=$ES_BRANCH" run:generate_yaml_tests mochacov:integration
  check $?
fi

if [ -n "$COVERAGE" ]; then
  grunt mochacov:ship_coverage
fi

killall java 2>/dev/null