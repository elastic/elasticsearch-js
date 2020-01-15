#!/usr/bin/env bash
#
# Launch one or more Elasticsearch nodes via the Docker image,
# to form a cluster suitable for running the REST API tests.
#
# Export the ELASTICSEARCH_VERSION variable, eg. 'elasticsearch:8.0.0-SNAPSHOT'.

# Version 1.0
# - Initial version of the run-elasticsearch.sh script


if [[ -z "$ELASTICSEARCH_VERSION" ]]; then
  echo -e "\033[31;1mERROR:\033[0m Required environment variable [ELASTICSEARCH_VERSION] not set\033[0m"
  exit 1
fi

set -euxo pipefail

SCRIPT_PATH=$(dirname $(realpath -s $0))

moniker=$(echo "$ELASTICSEARCH_VERSION" | tr -C "[:alnum:]" '-')
suffix=rest-test

NODE_NAME=${NODE_NAME-${moniker}node1}
MASTER_NODE_NAME=${MASTER_NODE_NAME-${NODE_NAME}}
CLUSTER_NAME=${CLUSTER_NAME-${moniker}${suffix}}
HTTP_PORT=${HTTP_PORT-9200}

ELASTIC_PASSWORD=${ELASTIC_PASSWORD-changeme}
SSL_CERT=${SSL_CERT-"${SCRIPT_PATH}/certs/testnode.crt"}
SSL_KEY=${SSL_KEY-"${SCRIPT_PATH}/certs/testnode.key"}
SSL_CA=${SSL_CA-"${SCRIPT_PATH}/certs/ca.crt"}
SSL_CA_PEM=${SSL_CA-"${SCRIPT_PATH}/certs/ca.pem"}

DETACH=${DETACH-false}
CLEANUP=${CLEANUP-false}

volume_name=${NODE_NAME}-${suffix}-data
network_default=${moniker}${suffix}
NETWORK_NAME=${NETWORK_NAME-"$network_default"}

set +x

function cleanup_volume {
  if [[ "$(docker volume ls -q -f name=$1)" ]]; then
    echo -e "\033[34;1mINFO:\033[0m Removing volume $1\033[0m"
    (docker volume rm "$1") || true
  fi
}
function container_running {
  if [[ "$(docker ps -q -f name=$1)" ]]; then 
    return 0;
    else return 1;
  fi
}
function cleanup_node {
  if container_running "$1"; then
    echo -e "\033[34;1mINFO:\033[0m Removing container $1\033[0m"
    (docker container rm --force --volumes "$1") || true
    cleanup_volume "$1-${suffix}-data"
  fi
}
function cleanup_network {
  if [[ "$(docker network ls -q -f name=$1)" ]]; then
    echo -e "\033[34;1mINFO:\033[0m Removing network $1\033[0m"
    (docker network rm "$1") || true
  fi
}

function cleanup {
  if [[ "$DETACH" != "true" ]] || [[ "$1" == "1" ]]; then
    echo -e "\033[34;1mINFO:\033[0m clean the node and volume on startup (1) OR on exit if not detached\033[0m"
    cleanup_node "$NODE_NAME"
  fi
  if [[ "$DETACH" != "true" ]]; then
    echo -e "\033[34;1mINFO:\033[0m clean the network if not detached (start and exit)\033[0m"
    cleanup_network "$NETWORK_NAME"
  fi
};
trap "cleanup 0" EXIT

if [[ "$CLEANUP" == "true" ]]; then
  trap - EXIT
  if [[ -z "$(docker network ls -q -f name=${NETWORK_NAME})" ]]; then
    echo -e "\033[34;1mINFO:\033[0m $NETWORK_NAME is already deleted\033[0m"
    exit 0
  fi
  containers=$(docker network inspect -f '{{ range $key, $value := .Containers }}{{ printf "%s\n" .Name}}{{ end }}' ${NETWORK_NAME})
  while read -r container; do
    cleanup_node "$container"
  done <<< "$containers"
  cleanup_network "$NETWORK_NAME"
  echo -e "\033[32;1mSUCCESS:\033[0m Cleaned up and exiting\033[0m"
  exit 0
fi

echo -e "\033[34;1mINFO:\033[0m Making sure previous run leftover infrastructure is removed \033[0m"
cleanup 1

echo -e "\033[34;1mINFO:\033[0m Creating network $NETWORK_NAME if it does not exist already \033[0m"
docker network inspect "$NETWORK_NAME" > /dev/null 2>&1 || docker network create "$NETWORK_NAME"

environment=($(cat <<-END
  --env node.name=$NODE_NAME
  --env cluster.name=$CLUSTER_NAME
  --env cluster.initial_master_nodes=$MASTER_NODE_NAME
  --env discovery.seed_hosts=$MASTER_NODE_NAME
  --env cluster.routing.allocation.disk.threshold_enabled=false
  --env bootstrap.memory_lock=true
  --env node.attr.testattr=test
  --env path.repo=/tmp
  --env repositories.url.allowed_urls=http://snapshot.test*
END
))

volumes=($(cat <<-END
  --volume $volume_name:/usr/share/elasticsearch/data
END
))

if [[ "$ELASTICSEARCH_VERSION" != *oss* ]]; then
  environment+=($(cat <<-END
    --env ELASTIC_PASSWORD=$ELASTIC_PASSWORD
    --env xpack.license.self_generated.type=trial
    --env xpack.security.enabled=true
    --env xpack.security.http.ssl.enabled=true
    --env xpack.security.http.ssl.verification_mode=certificate
    --env xpack.security.http.ssl.key=certs/testnode.key
    --env xpack.security.http.ssl.certificate=certs/testnode.crt
    --env xpack.security.http.ssl.certificate_authorities=certs/ca.crt
    --env xpack.security.transport.ssl.enabled=true
    --env xpack.security.transport.ssl.key=certs/testnode.key
    --env xpack.security.transport.ssl.certificate=certs/testnode.crt
    --env xpack.security.transport.ssl.certificate_authorities=certs/ca.crt
END
))
  volumes+=($(cat <<-END
    --volume $SSL_CERT:/usr/share/elasticsearch/config/certs/testnode.crt
    --volume $SSL_KEY:/usr/share/elasticsearch/config/certs/testnode.key
    --volume $SSL_CA:/usr/share/elasticsearch/config/certs/ca.crt
    --volume $SSL_CA_PEM:/usr/share/elasticsearch/config/certs/ca.pem
END
))
fi

url="http://$NODE_NAME"
if [[ "$ELASTICSEARCH_VERSION" != *oss* ]]; then
  url="https://elastic:$ELASTIC_PASSWORD@$NODE_NAME"
fi

cert_validation_flags="--insecure"
if [[ "$NODE_NAME" == "instance" ]]; then
  cert_validation_flags="--cacert /usr/share/elasticsearch/config/certs/ca.pem --resolve ${NODE_NAME}:443:127.0.0.1"
fi

echo -e "\033[34;1mINFO:\033[0m Starting container $NODE_NAME \033[0m"
set -x
docker run \
  --name "$NODE_NAME" \
  --network "$NETWORK_NAME" \
  --env ES_JAVA_OPTS=-"Xms1g -Xmx1g" \
  "${environment[@]}" \
  "${volumes[@]}" \
  --publish "$HTTP_PORT":9200 \
  --ulimit nofile=65536:65536 \
  --ulimit memlock=-1:-1 \
  --detach="$DETACH" \
  --health-cmd="curl $cert_validation_flags --fail $url:9200/_cluster/health || exit 1" \
  --health-interval=2s \
  --health-retries=20 \
  --health-timeout=2s \
  --rm \
  docker.elastic.co/elasticsearch/"$ELASTICSEARCH_VERSION";
set +x

if [[ "$DETACH" == "true" ]]; then
  until ! container_running "$NODE_NAME" || (container_running "$NODE_NAME" && [[ "$(docker inspect -f "{{.State.Health.Status}}" ${NODE_NAME})" != "starting" ]]); do
    echo ""
    docker inspect -f "{{range .State.Health.Log}}{{.Output}}{{end}}" ${NODE_NAME}
    echo -e "\033[34;1mINFO:\033[0m waiting for node $NODE_NAME to be up\033[0m"
    sleep 2;
  done;

  # Always show logs if the container is running, this is very useful both on CI as well as while developing
  if container_running $NODE_NAME; then
    docker logs $NODE_NAME
  fi

  if ! container_running $NODE_NAME || [[ "$(docker inspect -f "{{.State.Health.Status}}" ${NODE_NAME})" != "healthy" ]]; then
    cleanup 1
    echo
    echo -e "\033[31;1mERROR:\033[0m Failed to start ${ELASTICSEARCH_VERSION} in detached mode beyond health checks\033[0m"
    echo -e "\033[31;1mERROR:\033[0m dumped the docker log before shutting the node down\033[0m"
    exit 1
  else
    echo
    echo -e "\033[32;1mSUCCESS:\033[0m Detached and healthy: ${NODE_NAME} on docker network: ${NETWORK_NAME}\033[0m"
    echo -e "\033[32;1mSUCCESS:\033[0m Running on: ${url/$NODE_NAME/localhost}:${HTTP_PORT}\033[0m"
    exit 0
  fi
fi
