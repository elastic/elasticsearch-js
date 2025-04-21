#!/usr/bin/env bash
#
# Once called Elasticsearch should be up and running
#
script_path=$(dirname "$(realpath -s "$0")")
set -euo pipefail
repo=$(pwd)

export NODE_VERSION=${NODE_VERSION:-18}

echo "--- :javascript: Building Docker image"
docker build \
  --file "$script_path/Dockerfile" \
  --tag elastic/elasticsearch-js \
  --build-arg NODE_VERSION="$NODE_VERSION" \
  .

GITHUB_TOKEN=$(vault read -field=token "$GITHUB_TOKEN_PATH")
export GITHUB_TOKEN

echo "--- :javascript: Running tests"
mkdir -p "$repo/junit-output"
docker run \
  --network="${network_name}" \
  --env "TEST_ES_SERVER=${elasticsearch_url}" \
  --env "ELASTIC_PASSWORD=${elastic_password}" \
  --env "STACK_VERSION=$STACK_VERSION" \
  --env "GITHUB_TOKEN=$GITHUB_TOKEN" \
  --env "ELASTIC_USER=elastic" \
  --env "BUILDKITE=true" \
  --volume "/usr/src/app/node_modules" \
  --volume "$repo:/usr/src/app" \
  --volume "$repo/junit-output:/junit-output" \
  --name elasticsearch-js \
  --rm \
  elastic/elasticsearch-js \
  bash -c "pwd; ls -la; npm run test:integration; [ -f ./report-junit.xml ] && mv ./report-junit.xml /junit-output/junit-$BUILDKITE_JOB_ID.xml || echo 'No JUnit artifact found'"
