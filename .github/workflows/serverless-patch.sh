#!/usr/bin/env bash

set -exuo pipefail

merge_commit_sha=$(jq -r '.pull_request.merge_commit_sha' "$GITHUB_EVENT_PATH")
pull_request_id=$(jq -r '.pull_request.number' "$GITHUB_EVENT_PATH")
pr_shortcode="elastic/elasticsearch-js#$pull_request_id"

# generate patch file
cd "$GITHUB_WORKSPACE/stack"
git format-patch -1 --stdout "$merge_commit_sha" > /tmp/patch.diff

# apply patch file
cd "$GITHUB_WORKSPACE/serverless"
git checkout -b "apply-patch-$pull_request_id"
git am -C1 --reject /tmp/patch.diff || git am --quit

# commit changes, ignoring rejects
git add -A
git reset -- **/*.rej
git commit -m "Apply changes from $pr_shortcode"

comment="Patch applied from $pr_shortcode"

# enumerate rejected patches in PR comment
tick='\`' # just trying to satisfy shellcheck here
has_rejects=''
for f in ./**/*.rej; do
  has_rejects='--draft'
  comment="$comment

## Rejected patch $tick$f$tick must be resolved:

$tick$tick$tick
$(cat "$f")
$tick$tick$tick
"
done

# open a PR
gh pr create \
  --repo elastic/elasticsearch-serverless-js \
  -t "Apply PR changes from $pr_shortcode" \
  --body "$comment" \
  "$has_rejects"
