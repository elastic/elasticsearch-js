#!/bin/bash

export JAVA_HOME="/usr/lib/jvm/jdk8"
lockpath="/var/lock/setup_nodejs"

# pass a file name to aquire a lock
function get_lock {
  echo "attempting to get a lock on $lockpath"
  lockfile -5 -r 120 "$lockpath"
  if [[ $? -gt 0 ]]; then
    echo "failed to get lock file $lockpath within 10 minutes"
    exit 1;
  else
    echo "acquired lock file $lockpath"
  fi
}

# clear all aquired locks
function release_lock {
  rm -f "$lockpath"
  echo "cleared lock file $lockpath"
}

# execute a command, and exit if it fails
function crit {
  $*
  CODE=$?
  if [[ $CODE -gt 0 ]]; then
    echo "last command was critical, but it reported non-zero exit code $CODE";
    release_lock # clear any locks
    exit $CODE;
  fi
}

# install a specific version of Node and the latest version of NPM within that install
function install_node {
  local version=$1

  if [[ $(type -t nvm) != "function" ]]; then
    source /mnt/jenkins/nvm/nvm.sh
    ulimit -c unlimited
  fi

  echo "installing node $version";
  crit nvm install "$version"
}

function install_yarn {
  mkdir .bin
  curl -L https://github.com/yarnpkg/yarn/releases/download/v0.24.2/yarn-0.24.2.js > .bin/yarn
  chmod +x .bin/yarn
  PATH="$(pwd)/.bin:$PATH"
}

get_lock
install_node "$(cat ./.node-version)"
yarn
release_lock

ES_PATH_REPO="./.es-snapshot-repos/$EXECUTOR_NUMBER/" ES_PORT=$((9400 + EXECUTOR_NUMBER)) RUN=NODE_UNIT,NODE_INTEGRATION VERBOSE=true node ./scripts/ci.js
