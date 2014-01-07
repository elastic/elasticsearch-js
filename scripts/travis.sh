#!/usr/bin/env bash

if [ -z $ES_BRANCH ]; then
  echo "Missing ES_BRANCH environment var"
  exit 1
fi

ROOT="$PWD"
ES_SUBMODULE="$ROOT/src/elasticsearch"
SNAPSHOTS="$ROOT/.snapshots"
ES_BIN="$SNAPSHOTS/es/bin/elasticsearch"
ES_VERSION="${ES_BRANCH}_nightly"
ES_URL="http://s3-us-west-2.amazonaws.com/build.elasticsearch.org/origin/$ES_BRANCH/nightly/JDK6/elasticsearch-latest-SNAPSHOT.zip"

if [ ! -z $ES_RELEASE ]; then
  ES_VERSION="v${ES_RELEASE}"
  ES_URL="https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-${ES_RELEASE}.zip"
fi

echo -en 'travis_fold:start:setup_es\\r'
  if [ -d $SNAPSHOTS ]; then
    echo "wiping out existing snapshots"
    rm -rf $SNAPSHOTS
  fi

  echo "Killing existsing java processes"
  killall java 2>/dev/null

  echo "Downloading Elasticsearch $ES_VERSION to $SNAPSHOTS"
  mkdir $SNAPSHOTS &&
    cd $SNAPSHOTS \
    && curl -O $ES_URL \
    && unzip elasticsearch-*.zip \

  cd $ROOT

  if [ ! -d $SNAPSHOTS ]; then
    echo "Failed to download ES"
    exit 1;
  fi

  mv $SNAPSHOTS/elasticsearch-*/ $SNAPSHOTS/es/

  if [ ! -x $ES_BIN ]; then
    echo "Unable to find elasticsearch binary $ES_BIN"
    exit 1
  fi

  if [ $ES_BRANCH = "0.90" ]; then
    echo "Starting Elasticsearch $ES_VERSION"
    $ES_BIN \
      -Des.network.host=localhost \
      -Des.discovery.zen.ping.multicast.enabled=false \
      -Des.discovery.zen.ping_timeout=1
  else
    echo "Starting Elasticsearch $ES_VERSION as a deamon"
    $ES_BIN -d \
      -Des.network.host=localhost \
      -Des.discovery.zen.ping.multicast.enabled=false \
      -Des.discovery.zen.ping_timeout=1
  fi

  sleep 3
echo -en 'travis_fold:end:setup_es\\r\\n'

echo -en 'travis_fold:start:install_grunt\\r'
  npm install -g grunt-cli
echo -en 'travis_fold:end:install_grunt\\r'

if [ $NO_UNIT = "true" ]; then
  grunt --es_branch="=$ES_BRANCH" run:generate_yaml_tests mochacov:integration
  RESULT=$?
else
  grunt --es_branch="=$ES_BRANCH" jshint mochacov:unit run:generate_yaml_tests mochacov:integration mochacov:ship_coverage
  RESULT=$?
fi

killall java 2>/dev/null
exit $RESULT