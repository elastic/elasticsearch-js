#!/usr/bin/env bash

source /usr/local/bin/bash_standard_lib.sh

DOCKER_IMAGES="node:17-alpine
node:16-alpine
node:14-alpine
"

for di in ${DOCKER_IMAGES}
do
(retry 2 docker pull "${di}") || echo "Error pulling ${di} Docker image, we continue"
done

