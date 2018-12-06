#!/bin/bash

exec docker run \
  --rm \
  -e "node.attr.testattr=test" \
  -e "path.repo=/tmp" \
  -e "repositories.url.allowed_urls=http://snapshot.*" \
  -e "ELASTIC_PASSWORD=secret" \
  -e "xpack.security.enabled=true" \
  -e "xpack.watcher.enabled=false" \
  -e "xpack.monitoring.enabled=false" \
  -e "xpack.ml.enabled=false" \
  -e "xpack.license.self_generated.type=trial" \
  -p 9200:9200 \
  docker.elastic.co/elasticsearch/elasticsearch:6.5.0
