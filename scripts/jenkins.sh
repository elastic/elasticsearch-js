#!/usr/bin/env bash

export VERBOSE="true"
export JENKINS="true"
HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

set +x

if [[ -z "$ES_V" ]]; then
  echo "you must set the ES_V environment variable to use this script"
  exit 1
fi

re_nightly='^(.*)_nightly$';
re_090='^0\.90\..*$';
re_10='^1\.0\..*$';
if [[ "$ES_V" =~ $re_nightly ]]; then
  export ES_BRANCH=${BASH_REMATCH[1]}
elif [[ "$ES_V" =~ $re_090 ]]; then
  export ES_BRANCH='0.90'
  export ES_RELEASE=$ES_V
elif [[ "$ES_V" =~ $re_10 ]]; then
  export ES_BRANCH='1.0'
  export ES_RELEASE=$ES_V
else
  echo "unable to parse ES_V $ES_V"
  exit 1
fi

source $HERE/ci.sh