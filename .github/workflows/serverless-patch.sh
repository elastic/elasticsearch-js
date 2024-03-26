#!/usr/bin/env bash

set -exuo pipefail

merge_commit_sha=$(jq -r '.pull_request.merge_commit_sha' "$GITHUB_EVENT_PATH")
pull_request_id=$(jq -r '.pull_request.number' "$GITHUB_EVENT_PATH")

# generate patch file
cd "$GITHUB_WORKSPACE/elasticsearch-js"
git format-patch -1 --stdout "$merge_commit_sha" > /tmp/patch.diff

# apply patch file
cd "$GITHUB_WORKSPACE/elasticsearch-serverless-js"
git checkout -b "apply-patch-$pull_request_id"
git apply -C1 --recount --reject /tmp/patch.diff || exit 0

comment="Patch applied from elastic/elasticsearch-js#$pull_request_id"

# check for rejected patches
tick='\`' # just trying to satisfy shellcheck here
has_rejects=''
for f in ./**/*.rej; do
  has_rejects=' --draft'
  comment="$comment

## Rejected patch $tick$f$tick must be resolved:

$tick$tick$tick
$(cat "$f")
$tick$tick$tick
"
done

# open a PR
gh pr create \
  -t "Apply PR changes from elastic/elasticsearch-js#$pull_request_id" \
  --body "$comment" \
  "$has_rejects"
