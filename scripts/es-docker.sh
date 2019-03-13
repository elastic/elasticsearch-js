#!/bin/bash

exec docker run \
  --rm \
  -e "node.attr.testattr=test" \
  -e "path.repo=/tmp" \
  -e "repositories.url.allowed_urls=http://snapshot.*" \
  -e "discovery.type=single-node" \
  -p 9200:9200 \
  --network=elastic \
  --name=elasticsearch \
  docker.elastic.co/elasticsearch/elasticsearch:5.6.15
