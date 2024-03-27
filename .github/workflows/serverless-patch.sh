#!/usr/bin/env bash

set -exuo pipefail

merge_commit_sha=$(jq -r '.pull_request.merge_commit_sha' "$GITHUB_EVENT_PATH")
pull_request_id=$(jq -r '.pull_request.number' "$GITHUB_EVENT_PATH")
pr_shortcode="elastic/elasticsearch-js#$pull_request_id"

# generate patch file
cd "$GITHUB_WORKSPACE/stack"
git format-patch -1 --stdout "$merge_commit_sha" > /tmp/patch.diff

# set committer info
git config --global user.email "elasticmachine@users.noreply.github.com"
git config --global user.name "Elastic Machine"

# apply patch file
cd "$GITHUB_WORKSPACE/serverless"
git am -C1 --reject /tmp/patch.diff || git am --quit

# generate PR body comment
comment="Patch applied from $pr_shortcode"

# enumerate rejected patches in PR comment
has_rejects='false'
for f in ./**/*.rej; do
  has_rejects='true'
  comment="$comment

## Rejected patch \`$f\` must be resolved:

\`\`\`diff
$(cat "$f")
\`\`\`
"
done

# delete .rej files
rm -fv ./**/*.rej

# send data to output parameters
echo "$comment" > /tmp/pr_body
echo "PR_DRAFT=$has_rejects" >> "$GITHUB_OUTPUT"
