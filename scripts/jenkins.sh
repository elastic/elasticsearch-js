#!/bin/sh

echo "generate the latest version of the yaml-tests"
node scripts/generate/ --no-api 2>&1 > /dev/null

echo "\n--- unit ---"
./node_modules/.bin/mocha test/unit/test_*.js \
  --require should \
  --reporter ../../../test/utils/jenkins-reporter.js \
  2> test-output-node-unit.xml

echo "\n--- integration ---"
# run the integration tests
./node_modules/.bin/mocha test/integration/yaml_suite/index.js \
  --require should \
  --host localhost \
  --port $es_port \
  --reporter ../../../test/utils/jenkins-reporter.js \
  2> test-output-node-integration.xml