#!/bin/bash

exec docker run \
  --rm \
  -e "node.attr.testattr=test" \
  -e "path.repo=/tmp" \
  -e "repositories.url.allowed_urls=http://snapshot.*" \
  -e "discovery.type=single-node" \
  -p 9200:9200 \
  docker.elastic.co/elasticsearch/elasticsearch:7.0.0-alpha2
  # docker.elastic.co/elasticsearch/elasticsearch:6.5.4

#  -e "xpack.security.enabled=true" \
#  -e "ELASTIC_PASSWORD=passw0rd" \
