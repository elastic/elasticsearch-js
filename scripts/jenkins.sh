#!/usr/bin/env bash

export VERBOSE="true"

if [ -x $ES_V ]; then
  echo "missing ES_V environment var"
  exit 1
fi

# generate the latest version of the yaml-tests
node scripts/generate --es_branch="=$ES_V" --no-api

# unit tests
./node_modules/.bin/mocha test/unit/test_*.js \
  --require should \
  --reporter ../../../test/utils/jenkins-reporter.js \
  2> test/junit-node-unit.xml

# run the integration tests
./node_modules/.bin/mocha test/integration/yaml_suite/index.js \
  --require should \
  --host localhost \
  --port $es_port \
  --reporter ../../../test/utils/jenkins-reporter.js \
  2> test/junit-node-integration.xml