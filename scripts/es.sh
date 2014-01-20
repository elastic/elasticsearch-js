#!/usr/bin/env bash

if [ -z "$2" ]; then
  echo "Usage:
From the root of the elasticsearch-js project call:

Start nightly:
  ./scripts/es.sh start master

Stop 0.90 branch:
  ./scripts/es.sh stop 0.90

Start relase version 0.90.7:
  ./scripts/es.sh start 0.90 0.90.7
"
  exit 1
fi

source scripts/_utils.sh

if [[ -z "$ES_NODE_NAME" ]]; then
  export ES_NODE_NAME="elasticsearch_js_test_runner"
fi

manage_es $*
exit $?