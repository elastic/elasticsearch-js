#!/bin/bash

# Images are cached locally, it may be needed
# to delete an old image and download again
# the latest snapshot.

# pass `--clean` to reemove the old snapshot
if [ "$1" == "--clean" ]; then
  docker rmi $(docker images --format '{{.Repository}}:{{.Tag}}' | grep '8.0.0-SNAPSHOT')
fi

# Create the 'elastic' network if doesn't exist
exec docker network ls | grep elastic > /dev/null || docker network create elastic > /dev/null

if [ "$1" == "--detach" ]; then
  exec docker run \
    --rm \
    -e "node.attr.testattr=test" \
    -e "path.repo=/tmp" \
    -e "repositories.url.allowed_urls=http://snapshot.*" \
    -e "discovery.type=single-node" \
    -p 9200:9200 \
    --detach \
    --network=elastic \
    --name=elasticsearch \
    docker.elastic.co/elasticsearch/elasticsearch:8.0.0-SNAPSHOT
else
  exec docker run \
    --rm \
    -e "node.attr.testattr=test" \
    -e "path.repo=/tmp" \
    -e "repositories.url.allowed_urls=http://snapshot.*" \
    -e "discovery.type=single-node" \
    -p 9200:9200 \
    --network=elastic \
    --name=elasticsearch \
    docker.elastic.co/elasticsearch/elasticsearch:8.0.0-SNAPSHOT
fi
