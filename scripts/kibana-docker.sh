#!/bin/bash

exec docker run \
  --rm \
  --link elastic:elastic-url \
  -e ELASTICSEARCH_URL="http://elastic-url:9200" \
  -p 5601:5601 \
  docker.elastic.co/kibana/kibana:6.5.0

#  -e "xpack.security.enabled=true" \
#  -e "ELASTIC_PASSWORD=passw0rd" \
