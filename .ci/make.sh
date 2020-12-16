#!/usr/bin/env bash
# parameters are available to this script

# common build entry script for all elasticsearch clients

# ./.ci/make.sh assemble VERSION

script_path=$(dirname "$(realpath -s "$0")")
repo=$(realpath "$script_path/../")

# shellcheck disable=SC1090
CMD=$1
TASK=$1
VERSION=$2
STACK_VERSION=$VERSION
set -euo pipefail

output_folder=".ci/output"
OUTPUT_DIR="$repo/${output_folder}"
mkdir -p "$OUTPUT_DIR"

NODE_JS_VERSION=${NODE_JS_VERSION-12}

echo -e "\033[34;1mINFO:\033[0m VERSION ${STACK_VERSION}\033[0m"
echo -e "\033[34;1mINFO:\033[0m OUTPUT_DIR ${OUTPUT_DIR}\033[0m"
echo -e "\033[34;1mINFO:\033[0m NODE_JS_VERSION ${NODE_JS_VERSION}\033[0m"

echo -e "\033[1m>>>>> Build [elastic/elasticsearch-js container] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>\033[0m"

docker build \
  --file .ci/Dockerfile \
  --tag elastic/elasticsearch-js \
  --build-arg NODE_JS_VERSION=${NODE_JS_VERSION} \
  .

echo -e "\033[1m>>>>> Run [elastic/elasticsearch-js container] >>>>>>>>>>>>>>>>>>>>>>>>>>>>>\033[0m"

case $CMD in
    assemble)
        TASK=release
        ;;
    *)
        echo -e "\nUsage:\n\t $CMD is not supported right now\n"
        exit 1
esac

docker run \
  --volume $repo:/usr/src/app \
  --volume "${OUTPUT_DIR}:/usr/src/app/${output_folder}" \
  --volume /usr/src/app/node_modules \
  --name elasticsearch-js \
  --rm \
  elastic/elasticsearch-js \
  echo 'something calling automation here using $TASK and $VERSION producing output in $OUTPUT_DIR'

