#!/usr/bin/env bash

# ------------------------------------------------------- #
#
# Skeleton for common build entry script for all elastic
# clients. Needs to be adapted to individual client usage.
#
# Must be called: ./.ci/make.sh <target> <params>
#
# Version: 1.1.0
#
# Targets:
# ---------------------------
# assemble <VERSION> : build client artefacts with version
# bump     <VERSION> : bump client internals to version
# codegen  <VERSION> : generate endpoints
# docsgen  <VERSION> : generate documentation
# examplegen         : generate the doc examples
# clean              : clean workspace
#
# ------------------------------------------------------- #

# ------------------------------------------------------- #
# Bootstrap
# ------------------------------------------------------- #

script_path=$(dirname "$(realpath -s "$0")")
repo=$(realpath "$script_path/../")
generator=$(realpath "$script_path/../../elastic-client-generator-js")

# shellcheck disable=SC1090
CMD=$1
TASK=$1
TASK_ARGS=()
VERSION=$2
STACK_VERSION=$VERSION
NODE_JS_VERSION=16
WORKFLOW=${WORKFLOW-staging}
set -euo pipefail

product="elastic/elasticsearch-js"
output_folder=".ci/output"
OUTPUT_DIR="$repo/${output_folder}"
REPO_BINDING="${OUTPUT_DIR}:/sln/${output_folder}"
mkdir -p "$OUTPUT_DIR"

echo -e "\033[34;1mINFO:\033[0m PRODUCT ${product}\033[0m"
echo -e "\033[34;1mINFO:\033[0m VERSION ${STACK_VERSION}\033[0m"
echo -e "\033[34;1mINFO:\033[0m OUTPUT_DIR ${OUTPUT_DIR}\033[0m"

# ------------------------------------------------------- #
# Parse Command
# ------------------------------------------------------- #

case $CMD in
    clean)
        echo -e "\033[36;1mTARGET: clean workspace $output_folder\033[0m"
        rm -rf "$output_folder"
        echo -e "\033[32;1mdone.\033[0m"
        exit 0
        ;;
    assemble)
        if [ -v $VERSION ]; then
            echo -e "\033[31;1mTARGET: assemble -> missing version parameter\033[0m"
            exit 1
        fi
        echo -e "\033[36;1mTARGET: assemble artefact $VERSION\033[0m"
        TASK=release
        TASK_ARGS=("$VERSION" "$output_folder")
        ;;
    codegen)
        if [ -v $VERSION ]; then
            echo -e "\033[31;1mTARGET: codegen -> missing version parameter\033[0m"
            exit 1
        fi
        echo -e "\033[36;1mTARGET: codegen API v$VERSION\033[0m"
        TASK=codegen
        # VERSION is BRANCH here for now
        TASK_ARGS=("$VERSION")
        ;;
    docsgen)
        if [ -v $VERSION ]; then
            echo -e "\033[31;1mTARGET: docsgen -> missing version parameter\033[0m"
            exit 1
        fi
        echo -e "\033[36;1mTARGET: generate docs for $VERSION\033[0m"
        TASK=codegen
        # VERSION is BRANCH here for now
        TASK_ARGS=("$VERSION" "$codegen_folder")
        ;;
    examplesgen)
        echo -e "\033[36;1mTARGET: generate examples\033[0m"
        TASK=codegen
        # VERSION is BRANCH here for now
        TASK_ARGS=("$VERSION" "$codegen_folder")
        ;;
    bump)
        if [ -v $VERSION ]; then
            echo -e "\033[31;1mTARGET: bump -> missing version parameter\033[0m"
            exit 1
        fi
        echo -e "\033[36;1mTARGET: bump to version $VERSION\033[0m"
        TASK=bump
        # VERSION is BRANCH here for now
        TASK_ARGS=("$VERSION")
        ;;
    *)
        echo -e "\nUsage:\n\t $CMD is not supported right now\n"
        exit 1
esac


# ------------------------------------------------------- #
# Build Container
# ------------------------------------------------------- #

echo -e "\033[34;1mINFO: building $product container\033[0m"

docker build \
  --file .ci/Dockerfile \
  --tag ${product} \
  --build-arg NODE_JS_VERSION=${NODE_JS_VERSION} \
  --build-arg USER_ID="$(id -u)" \
  --build-arg GROUP_ID="$(id -g)" \
  .

# ------------------------------------------------------- #
# Run the Container
# ------------------------------------------------------- #

echo -e "\033[34;1mINFO: running $product container\033[0m"

docker run \
  --volume $repo:/usr/src/app \
  --volume $generator:/usr/src/elastic-client-generator-js \
  --volume /usr/src/app/node_modules \
  --env "WORKFLOW=${WORKFLOW}" \
  --name make-elasticsearch-js \
  --rm \
  $product \
  node .ci/make.mjs --task $TASK ${TASK_ARGS[*]}

# ------------------------------------------------------- #
# Post Command tasks & checks
# ------------------------------------------------------- #

if [[ "$CMD" == "assemble" ]]; then
	if compgen -G ".ci/output/*" > /dev/null; then
		echo -e "\033[32;1mTARGET: successfully assembled client v$VERSION\033[0m"
	else
		echo -e "\033[31;1mTARGET: assemble failed, empty workspace!\033[0m"
		exit 1
	fi
fi

if [[ "$CMD" == "bump" ]]; then
  if [ -n "$(git status --porcelain)" ]; then 
		echo -e "\033[32;1mTARGET: successfully bumped client v$VERSION\033[0m"
  else 
		echo -e "\033[31;1mTARGET: failed bumped client v$VERSION\033[0m"
    exit 1
  fi
fi

if [[ "$CMD" == "codegen" ]]; then
  if [ -n "$(git status --porcelain)" ]; then 
		echo -e "\033[32;1mTARGET: successfully generated client v$VERSION\033[0m"
  else 
		echo -e "\033[31;1mTARGET: failed generating client v$VERSION\033[0m"
    exit 1
  fi
fi

if [[ "$CMD" == "docsgen" ]]; then
    echo "TODO"
fi

if [[ "$CMD" == "examplesgen" ]]; then
    echo "TODO"
fi
