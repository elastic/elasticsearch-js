#!/usr/bin/env bash
# parameters are available to this script

# STACK_VERSION -- version e.g Major.Minor.Patch(-Prelease)
# TEST_SUITE -- which test suite to run: free or platinum
# ELASTICSEARCH_URL -- The url at which elasticsearch is reachable, a default is composed based on STACK_VERSION and TEST_SUITE
# NODE_JS_VERSION -- node js version (defined in test-matrix.yml, a default is hardcoded here)
script_path=$(dirname $(realpath -s $0))
source $script_path/functions/imports.sh
set -euo pipefail

NODE_JS_VERSION=${NODE_JS_VERSION-12}
ELASTICSEARCH_URL=${ELASTICSEARCH_URL-"$elasticsearch_url"}
elasticsearch_container=${elasticsearch_container-}

echo -e "\033[34;1mINFO:\033[0m VERSION ${STACK_VERSION}\033[0m"
echo -e "\033[34;1mINFO:\033[0m TEST_SUITE ${TEST_SUITE}\033[0m"
echo -e "\033[34;1mINFO:\033[0m URL ${ELASTICSEARCH_URL}\033[0m"
echo -e "\033[34;1mINFO:\033[0m CONTAINER ${elasticsearch_container}\033[0m"
echo -e "\033[34;1mINFO:\033[0m NODE_JS_VERSION ${NODE_JS_VERSION}\033[0m"

echo -e "\033[1m>>>>> Build docker container >>>>>>>>>>>>>>>>>>>>>>>>>>>>>\033[0m"

docker build \
  --file .ci/Dockerfile \
  --tag elastic/elasticsearch-js \
  --build-arg NODE_JS_VERSION=${NODE_JS_VERSION} \
  .

echo -e "\033[1m>>>>> NPM run test:integration >>>>>>>>>>>>>>>>>>>>>>>>>>>>>\033[0m"

repo=$(realpath $(dirname $(realpath -s $0))/../)
run_script_args=""
if [[ "$NODE_JS_VERSION" == "8" ]]; then
  run_script_args="--harmony-async-iteration"
fi

docker run \
  --network=${network_name} \
  --env "TEST_ES_SERVER=${ELASTICSEARCH_URL}" \
  --volume $repo:/usr/src/app \
  --volume /usr/src/app/node_modules \
  --name elasticsearch-js \
  --rm \
  elastic/elasticsearch-js \
  node ${run_script_args} test/integration/index.js
