#!/usr/bin/env bash

source /usr/local/bin/bash_standard_lib.sh

DOCKER_IMAGES="node:12-alpine
node:10-alpine
node:8-alpine
"

for di in ${DOCKER_IMAGES}
do
(retry 2 docker pull "${di}") || echo "Error pulling ${di} Docker image, we continue"
done

