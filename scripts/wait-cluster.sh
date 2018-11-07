#!/bin/bash

TEST_ES_SERVER=${TEST_ES_SERVER:-"http://localhost:9200"}

attempt_counter=0
max_attempts=5
url="${TEST_ES_SERVER}/_cluster/health?wait_for_status=green&timeout=50s"

echo "Waiting for Elasticsearch..."
while [[ "$(curl -s -o /dev/null -w ''%{http_code}'' --max-time 55 "$url")" != "200" ]]; do
  if [ ${attempt_counter} -eq ${max_attempts} ];then
    echo "\nCouldn't connect to Elasticsearch"
    exit 1
  fi

  printf '.'
  attempt_counter=$(($attempt_counter+1))
  sleep 5
done

echo "\nReady"
