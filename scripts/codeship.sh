#!/usr/bin/env bash

source $HOME/.nvm/nvm.sh

HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source $HERE/_utils.sh

case $1 in
  setup)
    group "installing nvm 0.10"
      nvm install 0.10

    group "installing nvm 0.8"
      nvm install 0.8

    manage_es install master
    manage_es install 0.90

    npm install
  ;;
  run)
    group "test node 0.8"
      nvm use 0.8
      echo "rebuilding npm deps"
      npm --silent rebuild
      call ES_BRANCH=master ./scripts/ci.sh
      call ES_BRANCH=0.90 ./scripts/ci.sh

    group "test node 0.10"
      nvm use 0.10
      echo "rebuilding npm deps"
      npm --silent rebuild
      call ES_BRANCH=master COVERAGE=1 ./scripts/ci.sh
      call ES_BRANCH=0.90 ./scripts/ci.sh

    group "test browsers"
      call NODE_UNIT=0 NODE_INTEGRATION=0 BROWSER_UNIT=1 ./scripts/ci.sh
  ;;
esac