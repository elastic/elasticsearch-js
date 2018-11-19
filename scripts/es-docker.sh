#!/bin/bash

exec docker run \
  --rm \
  -e "node.attr.testattr=test" \
  -e "path.repo=/tmp" \
  -e "repositories.url.allowed_urls=http://snapshot.*" \
  -p 9200:9200 \
  docker.elastic.co/elasticsearch/elasticsearch:6.5.0

#  -e "xpack.security.enabled=true" \
#  -e "ELASTIC_PASSWORD=passw0rd" \
