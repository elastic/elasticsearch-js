#!/usr/bin/env bash
#
# Once called Elasticsearch should be up and running
#
script_path=$(dirname "$(realpath -s "$0")")
set -euo pipefail
repo=$(pwd)

export NODE_VERSION=${NODE_VERSION:-22}

echo "--- :javascript: Building Docker image"
docker build \
  --file "$script_path/Dockerfile" \
  --tag elastic/elasticsearch-js \
  --build-arg NODE_VERSION="$NODE_VERSION" \
  .

export GITHUB_TOKEN="${VAULT_GITHUB_TOKEN}"

echo "--- :javascript: Running tests"
mkdir -p "$repo/junit-output"
docker run \
  --network="${network_name}" \
  --env TEST_ES_STACK \
  --env STACK_VERSION \
  --env GITHUB_TOKEN \
  --env "TEST_ES_SERVER=${elasticsearch_url}" \
  --env "ELASTIC_PASSWORD=${elastic_password}" \
  --env "ELASTIC_USER=elastic" \
  --env "BUILDKITE=true" \
  --env BUILDKITE_JOB_ID \
  --volume "/usr/src/app/node_modules" \
  --volume "$repo:/usr/src/app" \
  --volume "$repo/junit-output:/junit-output" \
  --name elasticsearch-js \
  --rm \
  elastic/elasticsearch-js \
  bash -c "npm run test:integration-build; BUILD_EXIT=\$?; echo \"=== integration-build exit: \$BUILD_EXIT ===\"; if [ \$BUILD_EXIT -ne 0 ]; then exit \$BUILD_EXIT; fi; ./node_modules/.bin/tap run --jobs=1 --coverage-exclude='generated-tests/**' --coverage-exclude='test/**' --coverage-exclude='scripts/**' --coverage-exclude='esm/api/**' --coverage-exclude='lib/api/**' --lines=80 --branches=15 --functions=20 --statements=80 --reporter=junit --reporter-file=report-junit.xml generated-tests/; TAP_EXIT=\$?; echo \"=== tap exit: \$TAP_EXIT ===\"; if [ -f ./report-junit.xml ]; then echo \"JUnit testcases: \$(grep -c '<testcase' ./report-junit.xml || true)\"; echo \"JUnit failures: \$(grep -c '<failure' ./report-junit.xml || true)\"; mv ./report-junit.xml /junit-output/junit-$BUILDKITE_JOB_ID.xml; else echo 'No JUnit artifact found'; fi; exit \$TAP_EXIT"

if [ ! -f "$repo/junit-output/junit-$BUILDKITE_JOB_ID.xml" ]; then
  echo "No JUnit artifact produced, creating empty placeholder"
  echo '<?xml version="1.0" encoding="UTF-8"?><testsuites></testsuites>' > "$repo/junit-output/junit-$BUILDKITE_JOB_ID.xml"
fi
