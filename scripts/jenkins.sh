#!/usr/bin/env bash

export VERBOSE="true"
export JENKINS="true"
HERE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

set +x
source $HERE/ci.sh