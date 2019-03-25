#!/bin/bash

# Images are cached locally, it may be needed
# to delete an old image and download again
# the latest snapshot.

repo=$(pwd)
testnodecrt="/.ci/certs/testnode.crt"
testnodekey="/.ci/certs/testnode.key"
cacrt="/.ci/certs/ca.crt"

exec docker run \
  --rm \
  -e "node.attr.testattr=test" \
  -e "path.repo=/tmp" \
  -e "repositories.url.allowed_urls=http://snapshot.*" \
  -e "discovery.type=single-node" \
  -e "ES_JAVA_OPTS=-Xms1g -Xmx1g" \
  -e "ELASTIC_PASSWORD=changeme" \
  -e "xpack.security.enabled=true" \
  -e "xpack.license.self_generated.type=trial" \
  -e "xpack.security.http.ssl.enabled=true" \
  -e "xpack.security.http.ssl.verification_mode=certificate" \
  -e "xpack.security.http.ssl.key=certs/testnode.key" \
  -e "xpack.security.http.ssl.certificate=certs/testnode.crt" \
  -e "xpack.security.http.ssl.certificate_authorities=certs/ca.crt" \
  -e "xpack.security.transport.ssl.enabled=true" \
  -e "xpack.security.transport.ssl.key=certs/testnode.key" \
  -e "xpack.security.transport.ssl.certificate=certs/testnode.crt" \
  -e "xpack.security.transport.ssl.certificate_authorities=certs/ca.crt" \
  -v "$repo$testnodecrt:/usr/share/elasticsearch/config/certs/testnode.crt" \
  -v "$repo$testnodekey:/usr/share/elasticsearch/config/certs/testnode.key" \
  -v "$repo$cacrt:/usr/share/elasticsearch/config/certs/ca.crt" \
  -p 9200:9200 \
  docker.elastic.co/elasticsearch/elasticsearch:8.0.0-SNAPSHOT
