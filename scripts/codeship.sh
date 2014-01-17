#!/usr/bin/env bash

HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source $HERE/_utils.sh
source $HOME/.nvm/nvm.sh

case $1 in
  setup)
    group "start: installing nvm 0.10"
      nvm install 0.10
    group "end: installing nvm 0.10"

    group "start: installing nvm 0.8"
      nvm install 0.8
    group "end: installing nvm 0.8"

    manage_es install master
    manage_es install 0.90

    npm install
  ;;
  run)
    # test in node 0.8
    group "start: test node 0.8"
      nvm use 0.8
      echo "rebuilding npm deps"
      npm rebuild &> /dev/null
      call ES_BRANCH=master ./scripts/ci.sh
      call ES_BRANCH=0.90 ./scripts/ci.sh
    group "end: test node 0.8"

    # test in node 0.10
    group "start: test node 0.10"
      nvm use 0.10
      echo "rebuilding npm deps"
      npm rebuild &> /dev/null
      call ES_BRANCH=master COVERAGE=1 ./scripts/ci.sh
      call ES_BRANCH=0.90 ./scripts/ci.sh
    group "end: test node 0.10"

    # browser tests (node version irrelevant)
    group "start: test browsers"
      call NODE_UNIT=0 NODE_INTEGRATION=0 BROWSER_UNIT=1 ./scripts/ci.sh
    group "end: test browsers"
  ;;
esac