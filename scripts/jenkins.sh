#!/bin/bash

# let the dust settle and ensure that es is ready for us.
sleep 15s

# generate the latest version of the yaml-tests
node scripts/generate/ --no-api 2>&1 > /dev/null

export VERBOSE="true"

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