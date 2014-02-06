#!/usr/bin/env bash

source $HOME/.nvm/nvm.sh

HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source $HERE/_utils.sh

case $1 in
  setup)
    group "installing node 0.10"
      nvm install 0.10

    npm --quiet install
  ;;
  run)
    group "test node 0.10"
      nvm use 0.10
      echo "rebuilding npm deps"
      npm rebuild &> /dev/null
      call ES_BRANCH=master COVERAGE=1 ./scripts/ci.sh
      call ES_BRANCH=1.0 NODE_UNIT=0 ./scripts/ci.sh
      call ES_BRANCH=0.90 NODE_UNIT=0 ./scripts/ci.sh

    group "test browsers"
      call NODE_UNIT=0 NODE_INTEGRATION=0 BROWSER_UNIT=1 ./scripts/ci.sh
  ;;
esac