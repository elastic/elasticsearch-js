#!/usr/bin/env bash

#####
# Start a group of log output
#####
function group {
  re='start:'

  if [[ $CI_NAME = "codeship" ]]; then
    style='..'
    reset='..'
  else
    style='\x1b[1m\x1b[37m\x1b[4m'
    reset='\x1b[24m\x1b[39m\x1b[22m'
  fi

  echo -en "\n\n${style}${1}${reset}\n"
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
    group "installing grunt"
      call npm install --silent -g grunt-cli
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
  local SNAPSHOTS="$ROOT/.snapshots"
  local PIDS="$ROOT/.snapshots/pids"

  group "${DO}ing es"

    if [ ! -d "$PIDS" ]; then
      call mkdir -p $PIDS
    fi

    if [ -n "$ES_RELEASE" ]; then
      local ES_VERSION="v${ES_RELEASE}"
      local ES_URL="https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-${ES_RELEASE}.zip"
      local ES_DIR="${SNAPSHOTS}/${ES_VERSION}"
    else
      # TODO: TRASH THIS
      if [[ $ES_BRANCH == "master" ]]; then local JDK='JDK7'
      elif [[ $ES_BRANCH == "1.x" ]]; then local JDK='JDK7'
      elif [[ $ES_BRANCH == "1.2" ]]; then local JDK='JDK7'
      elif [[ $ES_BRANCH == "1.3" ]]; then local JDK='JDK7'
      elif [[ $ES_BRANCH == "1.4" ]]; then local JDK='JDK7'
      else local JDK='JDK6'
      fi

      local ES_VERSION="${ES_BRANCH}_nightly"
      local ES_URL="http://s3-us-west-2.amazonaws.com/build.elasticsearch.org/origin/$ES_BRANCH/nightly/$JDK/elasticsearch-latest-SNAPSHOT.zip"
      local DATE=`date +%Y_%m_%d`
      local ES_DIR="${SNAPSHOTS}/${ES_VERSION}_${DATE}"
    fi

    local ES_BIN="$ES_DIR/bin/elasticsearch"
    local PIDFILE="$ROOT/.snapshots/pids/$ES_VERSION"


    case "$DO" in
      reinstall)
        if [ -x "$ES_BIN" ]; then
          echo "removing $ES_VERSION"
          rm -rf ${SNAPSHOTS}/${ES_VERSION}*
        fi
        manage_es install $ES_BRANCH $ES_RELEASE
      ;;
      install)
        if [ ! -x "$ES_BIN" ]; then
          echo "Downloading Elasticsearch $ES_VERSION"
          rm -rf ${SNAPSHOTS}/${ES_VERSION}*
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
            rm $PIDFILE
          fi
        fi

        manage_es install $ES_BRANCH $ES_RELEASE

        if [ ! -x "$ES_BIN" ]; then
          echo "Unable to find elasticsearch executable"
          return 1
        fi

        local ES_OPTS="-p $PIDFILE -D es.http.port=9400 -D es.network.host=localhost -D es.cluster.name=elasticsearch_js_test_runners -D es.node.name=elasticsearch_js_test_runner -D es.gateway.type=none -D es.index.store.type=memory -D es.discovery.zen.ping.multicast.enabled=false -D es.discovery.zen.ping_timeout=1 -D es.logger.level=ERROR"

        if [ -n "$ES_NODE_NAME" ]; then
          ES_OPTS="$ES_OPTS -Des.node.name=$ES_NODE_NAME"
        fi

        if [[ $ES_BRANCH != "0.90" ]]; then
          # explicitly run as deamon
          ES_OPTS="-d $ES_OPTS"
        fi

        if [[ $ES_BRANCH != "1.0" && $ES_BRANCH != "1.1" ]]; then
          # enable scripting and benchmarks
          ES_OPTS="$ES_OPTS -D es.node.bench=true -D es.script.disable_dynamic=false"
        fi

        call $ES_BIN $ES_OPTS
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
}