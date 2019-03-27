#!/bin/bash

exec docker run \
  --rm \
  -e "node.attr.testattr=test" \
  -e "path.repo=/tmp" \
  -e "repositories.url.allowed_urls=http://snapshot.*" \
  -e "discovery.zen.ping.unicast.hosts=elasticsearch"  \
  -e "xpack.security.enabled=false" \
  -e "xpack.monitoring.enabled=false" \
  -e "xpack.ml.enabled=false" \
  -p 9200:9200 \
  --network=elastic \
  --name=elasticsearch \
  docker.elastic.co/elasticsearch/elasticsearch:5.6.16
