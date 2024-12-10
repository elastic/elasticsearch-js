#!/usr/bin/env bash
# ------------------------------------------------------- #
#
# Build entry script for elasticsearch-js
#
# Must be called: ./.github/make.sh <target> <params>
#
# Version: 1.1.0
#
# Targets:
# ---------------------------
# assemble   <VERSION> : build client artifacts with version
# bump       <VERSION> : bump client internals to version
# bumpmatrix <VERSION> : bump stack version in test matrix to version
# codegen    <VERSION> : generate endpoints
# docsgen    <VERSION> : generate documentation
# examplegen           : generate the doc examples
# clean                : clean workspace
#
# ------------------------------------------------------- #

# ------------------------------------------------------- #
# Bootstrap
# ------------------------------------------------------- #
script_path=$(dirname "$(realpath -s "$0")")
repo=$(realpath "$script_path/../")

# shellcheck disable=SC1090
CMD=$1
TASK=$1
TASK_ARGS=()
VERSION=$2
STACK_VERSION=$VERSION
set -euo pipefail

product="elastic/elasticsearch-js"
output_folder=".buildkite/output"
codegen_folder=".buildkite/output"
OUTPUT_DIR="$repo/${output_folder}"
NODE_JS_VERSION=18
WORKFLOW=${WORKFLOW-staging}
mkdir -p "$OUTPUT_DIR"

echo -e "\033[34;1mINFO:\033[0m PRODUCT ${product}\033[0m"
echo -e "\033[34;1mINFO:\033[0m VERSION ${STACK_VERSION}\033[0m"
echo -e "\033[34;1mINFO:\033[0m OUTPUT_DIR ${OUTPUT_DIR}\033[0m"

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
        echo -e "\033[36;1mTARGET: assemble artifact $VERSION\033[0m"
        TASK=release
        TASK_ARGS=("$VERSION" "$output_folder")
        ;;
    codegen)
        if [ -v "$VERSION" ] || [[ -z "$VERSION" ]]; then
            # fall back to branch name or `main` if no VERSION is set
            branch_name=$(git rev-parse --abbrev-ref HEAD)
            if [[ "$branch_name" =~ ^[0-9]+\.[0-9]+ ]]; then
              echo -e "\033[36;1mTARGET: codegen -> No VERSION argument found, using branch name: \`$branch_name\`\033[0m"
              VERSION="$branch_name"
            else
              echo -e "\033[36;1mTARGET: codegen -> No VERSION argument found, using \`main\`\033[0m"
              VERSION="main"
            fi
        fi
        if [ "$VERSION" = 'main' ]; then
          echo -e "\033[36;1mTARGET: codegen API $VERSION\033[0m"
        else
          echo -e "\033[36;1mTARGET: codegen API v$VERSION\033[0m"
        fi

        TASK=codegen
        TASK_ARGS=("$VERSION")
        ;;
    docsgen)
        if [ -v $VERSION ]; then
            echo -e "\033[31;1mTARGET: docsgen -> missing version parameter\033[0m"
            exit 1
        fi
        echo -e "\033[36;1mTARGET: generate docs for $VERSION\033[0m"
        TASK=codegen
        TASK_ARGS=("$VERSION" "$codegen_folder")
        ;;
    examplesgen)
        echo -e "\033[36;1mTARGET: generate examples\033[0m"
        TASK=codegen
        TASK_ARGS=("$VERSION" "$codegen_folder")
        ;;
    bump)
        if [ -v $VERSION ]; then
            echo -e "\033[31;1mTARGET: bump -> missing version parameter\033[0m"
            exit 1
        fi
        echo -e "\033[36;1mTARGET: bump to version $VERSION\033[0m"
        TASK=bump
        TASK_ARGS=("$VERSION")
        ;;
    bumpmatrix)
      if [ -v $VERSION ]; then
        echo -e "\033[31;1mTARGET: bumpmatrix -> missing version parameter\033[0m"
        exit 1
      fi
      echo -e "\033[36;1mTARGET: bump stack in test matrix to version $VERSION\033[0m"
      TASK=bumpmatrix
      TASK_ARGS=("$VERSION")
      ;;
    *)
        echo -e "\n'$CMD' is not supported right now\n"
        echo -e "\nUsage:"
        echo -e "\t $0 release \$VERSION\n"
        echo -e "\t $0 bump \$VERSION"
        echo -e "\t $0 codegen \$VERSION"
        exit 1
esac


# ------------------------------------------------------- #
# Build Container
# ------------------------------------------------------- #

echo -e "\033[34;1mINFO: building $product container\033[0m"

docker build \
  --file .buildkite/Dockerfile-make \
  --tag "$product" \
  --build-arg NODE_JS_VERSION="$NODE_JS_VERSION" \
  --build-arg "BUILDER_UID=$(id -u)" \
  --build-arg "BUILDER_GID=$(id -g)" \
  .

# ------------------------------------------------------- #
# Run the Container
# ------------------------------------------------------- #

echo -e "\033[34;1mINFO: running $product container\033[0m"

if [[ -z "${BUILDKITE+x}" ]] && [[ -z "${CI+x}" ]] && [[ -z "${GITHUB_ACTIONS+x}" ]]; then
  echo -e "\033[34;1mINFO: Running in local mode"
  docker run \
    -u "$(id -u):$(id -g)" \
    --volume "$repo:/usr/src/elasticsearch-js" \
    --volume /usr/src/elasticsearch-js/node_modules \
    --volume "$(realpath "$repo/../elastic-client-generator-js"):/usr/src/elastic-client-generator-js" \
    --env "WORKFLOW=$WORKFLOW" \
    --name make-elasticsearch-js \
    --rm \
    $product \
    /bin/bash -c "mkdir -p /usr/src/elastic-client-generator-js/output && \
      node .buildkite/make.mjs --task $TASK ${TASK_ARGS[*]}"
else
  echo -e "\033[34;1mINFO: Running in CI mode"

  # determine branch to clone
  GENERATOR_BRANCH="main"
  if [[ "$VERSION" == 8.* ]]; then
    GENERATOR_BRANCH="8.x"
  fi
  echo -e "\033[34;1mINFO: Generator branch: $GENERATOR_BRANCH"

  docker run \
    --volume "$repo:/usr/src/elasticsearch-js" \
    --volume /usr/src/elasticsearch-js/node_modules \
    -u "$(id -u):$(id -g)" \
    --env "WORKFLOW=$WORKFLOW" \
    --name make-elasticsearch-js \
    --rm \
    $product \
    /bin/bash -c "cd /usr/src && \
      git clone --branch $GENERATOR_BRANCH https://$CLIENTS_GITHUB_TOKEN@github.com/elastic/elastic-client-generator-js.git && \
      mkdir -p /usr/src/elastic-client-generator-js/output && \
      cd /usr/src/elasticsearch-js && \
      node .buildkite/make.mjs --task $TASK ${TASK_ARGS[*]}"
fi

# ------------------------------------------------------- #
# Post Command tasks & checks
# ------------------------------------------------------- #

if [[ "$CMD" == "assemble" ]]; then
	if compgen -G ".buildkite/output/*" > /dev/null; then
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
