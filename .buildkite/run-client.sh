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

echo "--- :javascript: Running $TEST_SUITE tests"
mkdir -p "$repo/junit-output"
docker run \
       --network="${network_name}" \
       --env "TEST_ES_SERVER=${elasticsearch_url}" \
       --env "ELASTIC_PASSWORD=${elastic_password}" \
       --env "TEST_SUITE=${TEST_SUITE}" \
       --env "ELASTIC_USER=elastic" \
       --env "BUILDKITE=true" \
       --volume "$repo/junit-output:/junit-output" \
       --name elasticsearch-js \
       --rm \
       elastic/elasticsearch-js \
       bash -c "npm run test:integration; [ -f ./$TEST_SUITE-report-junit.xml ] && mv ./$TEST_SUITE-report-junit.xml /junit-output/junit-$BUILDKITE_JOB_ID.xml || echo 'No JUnit artifact found'"
