#!/usr/bin/env bash
# parameters are available to this script

# ELASTICSEARCH_VERSION -- version e.g Major.Minor.Patch(-Prelease)
# ELASTICSEARCH_CONTAINER -- the docker moniker as a reference to know which docker image distribution is used
# ELASTICSEARCH_URL -- The url at which elasticsearch is reachable
# NETWORK_NAME -- The docker network name
# NODE_NAME -- The docker container name also used as Elasticsearch node name
# NODE_JS_VERSION -- node js version (defined in test-matrix.yml, a default is hardcoded here)

NODE_JS_VERSION=${NODE_JS_VERSION-12}

echo -e "\033[34;1mINFO:\033[0m URL ${ELASTICSEARCH_URL}\033[0m"
echo -e "\033[34;1mINFO:\033[0m VERSION ${ELASTICSEARCH_VERSION}\033[0m"
echo -e "\033[34;1mINFO:\033[0m CONTAINER ${ELASTICSEARCH_CONTAINER}\033[0m"
echo -e "\033[34;1mINFO:\033[0m TEST_SUITE ${TEST_SUITE}\033[0m"
echo -e "\033[34;1mINFO:\033[0m NODE_JS_VERSION ${NODE_JS_VERSION}\033[0m"

echo -e "\033[1m>>>>> Build docker container >>>>>>>>>>>>>>>>>>>>>>>>>>>>>\033[0m"

set -eo pipefail

docker build \
  --file .ci/Dockerfile \
  --tag elastic/elasticsearch-js \
  --build-arg NODE_JS_VERSION=${NODE_JS_VERSION} \
  .

echo -e "\033[1m>>>>> NPM run test:integration >>>>>>>>>>>>>>>>>>>>>>>>>>>>>\033[0m"

repo=$(realpath $(dirname $(realpath -s $0))/../)
run_script_args=""
if [[ "$NODE_JS_VERSION" == "8" ]]; then
  run_script_args="-- --node-arg=--harmony-async-iteration"
fi

docker run \
  --network=${NETWORK_NAME} \
  --env "TEST_ES_SERVER=${ELASTICSEARCH_URL}" \
  --volume $repo:/usr/src/app \
  --volume /usr/src/app/node_modules \
  --name elasticsearch-js \
  --rm \
  elastic/elasticsearch-js \
  npm run test:integration ${run_script_args}
