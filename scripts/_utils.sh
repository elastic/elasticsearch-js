#!/usr/bin/env bash

#####
# Start or stop a group for travis
#####
function group {
  re='start:'

  if [[ $1 =~ $re ]]; then
    echo -e "\n\033[4m\033[1m$1\033[0m\033[0m"
  else
    echo -e "-- $1 --\n"
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

function ensure_grunt {
  if [[ ! -x "`which grunt`" ]]; then
    group "start:install_grunt"
      echo "installing grunt-cli"
      call npm install -g grunt-cli
    group "end:install_grunt"
  fi
}

#####
# call grunt, but make sure it's installed first
#####
function _grunt {
  ensure_grunt
  call grunt $*
}

#####
# Download a version of ES and get it running
# @arg ES_BRANCH - The branch to run off of
# @arg ES_RELEASE - The specific release to run, overrides ES_BRANCH
#####
function manage_es {
  local DO=$1
  local ES_BRANCH=$2
  local ES_RELEASE=$3

  local ROOT="$PWD"
  local ES_SUBMODULE="$ROOT/src/elasticsearch"
  local SNAPSHOTS="$ROOT/.snapshots"
  local PIDS="$ROOT/.snapshots/pids"

  group "start:$DO es"

    if [ ! -d "$PIDS" ]; then
      call mkdir -p $PIDS
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
    fi

    local ES_BIN="$ES_DIR/bin/elasticsearch"
    local PIDFILE="$ROOT/.snapshots/pids/$ES_VERSION"


    case "$DO" in
      install)
        if [ ! -x "$ES_BIN" ]; then
          echo "Downloading Elasticsearch $ES_VERSION"
          call rm -rf ${SNAPSHOTS}/${ES_VERSION}*
          call curl --silent -O $ES_URL
          unzip -q elasticsearch-*.zip
          rm elasticsearch-*.zip
          mv elasticsearch-*/ $ES_DIR
          if [ -z "$ES_RELEASE" ]; then
            ln -sf $ES_DIR "${SNAPSHOTS}/${ES_VERSION}"
          fi
        else
          echo "$ES_VERSION installed"
        fi
      ;;
      start)
        # ensure that only one version is running at a time so that we can precisely kill them
        if [ -f $PIDFILE ]; then
          local PID=`cat $PIDFILE`
          kill -0 $PID
          local RUNNING=$?

          if [ $RUNNING -eq 0 ]; then
            echo "Already running $ES_VERSION"
            return 1
          else
            echo "PID file was left behind by ES"
            call rm $PIDFILE
          fi
        fi

        ./scripts/es.sh install $ES_BRANCH $ES_RELEASE

        if [ ! -x "$ES_BIN" ]; then
          echo "Unable to find elasticsearch executable"
          return 1
        fi

        local ES_OPTS="-p $PIDFILE -Des.http.port=9400 -Des.network.host=localhost -Des.discovery.zen.ping.multicast.enabled=false -Des.discovery.zen.ping_timeout=1"

        if [ -n "$ES_NODE_NAME" ]; then
          ES_OPTS="$ES_OPTS -Des.node.name=$ES_NODE_NAME"
        fi

        if [ "$ES_BRANCH" = "0.90" ]; then
          echo "Starting Elasticsearch $ES_VERSION"
          call $ES_BIN $ES_OPTS
        else
          echo "Starting Elasticsearch $ES_VERSION as a deamon"
          call $ES_BIN -d $ES_OPTS
        fi
      ;;
      stop)
        if [ -e $PIDFILE ]; then
          local PID=`cat $PIDFILE`
          kill -0 $PID
          local RUNNING=$?

          if [ $RUNNING -eq 0 ]; then
            kill $PID
            echo "Elasticsearch $ES_VERSION stopped"
            return 0
          fi

          rm $PIDFILE
        fi
        echo "Elasticsearch $ES_VERSION is not running."
        return 1
      ;;
    esac
  group "end:$DO es"
}