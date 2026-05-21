---
name: Resolve merge conflicts
description: Checkout a PR branch, merge the base branch, and resolve any conflicts using Claude
on:
  workflow_dispatch:
    inputs:
      pr_number:
        description: "PR number to resolve conflicts for"
        required: true
      base_branch:
        description: "Base branch to merge from (default: main)"
        required: false
        default: "main"
engine:
  id: claude
  model: "llm-gateway/claude-sonnet-4-6"
  env:
    ANTHROPIC_BASE_URL: "https://elastic.litellm-prod.ai/"
    ANTHROPIC_API_KEY: ${{ secrets.LITELLM_API_KEY }}
checkout:
  fetch-depth: 0
steps:
  - name: Checkout PR branch and attempt merge
    env:
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      PR_NUMBER: ${{ github.event.inputs.pr_number }}
      BASE_BRANCH: ${{ github.event.inputs.base_branch || 'main' }}
    run: |
      git config user.email "github-actions[bot]@users.noreply.github.com"
      git config user.name "github-actions[bot]"

      gh pr checkout "$PR_NUMBER"

      PR_HEAD_BRANCH=$(gh pr view "$PR_NUMBER" --json headRefName -q .headRefName)
      echo "$PR_HEAD_BRANCH" > /tmp/gh-aw/agent/pr-head-branch.txt
      echo "$PR_NUMBER" > /tmp/gh-aw/agent/pr-number.txt
      echo "$BASE_BRANCH" > /tmp/gh-aw/agent/base-branch.txt

      git fetch origin "$BASE_BRANCH"
      set +e
      git merge "origin/$BASE_BRANCH" --no-edit 2>&1
      MERGE_EXIT=$?
      set -e

      if [ $MERGE_EXIT -eq 0 ]; then
        echo "clean" > /tmp/gh-aw/agent/merge-status.txt
        echo "No conflicts — merge completed cleanly."
        exit 0
      fi

      echo "conflicted" > /tmp/gh-aw/agent/merge-status.txt
      git diff --name-only --diff-filter=U > /tmp/gh-aw/agent/conflicted-files.txt
      echo "Conflicted files:"
      cat /tmp/gh-aw/agent/conflicted-files.txt
safe-outputs:
  create-pull-request:
    title-prefix: "[conflict-resolution] "
    labels: [conflict-resolution]
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
network:
  allowed:
    - defaults
    - elastic.litellm-prod.ai
---

# Resolve merge conflicts

A pre-step has already checked out the PR branch and attempted to merge the base branch into it.

First, read `/tmp/gh-aw/agent/merge-status.txt`:
- If `clean` — the merge succeeded without conflicts. Call `noop` with a note that no conflicts were found.
- If `conflicted` — proceed with the steps below.

## Resolving conflicts

Read the following context files:
- `/tmp/gh-aw/agent/conflicted-files.txt` — list of files with conflict markers
- `/tmp/gh-aw/agent/pr-number.txt` — original PR number
- `/tmp/gh-aw/agent/pr-head-branch.txt` — the original PR's head branch (use this as the `base` when creating the resolution PR)
- `/tmp/gh-aw/agent/base-branch.txt` — the base branch that was merged in

For each conflicted file:
1. Read the file — it contains `<<<<<<< HEAD`, `=======`, `>>>>>>>` conflict markers.
2. Understand both sides:
   - `HEAD` = the PR branch's existing changes
   - The other side = incoming changes from the base branch
3. Resolve by combining both sides correctly. Preserve the PR's intended changes while integrating base branch updates. Do not silently drop code from either side.
4. Write the resolved content back to the file with no conflict markers remaining.

Once all files are resolved, use `safe-outputs.create-pull-request` to open a resolution PR:
- **title**: `Resolve conflicts for PR #<pr_number>: <original PR title>`
- **body**: Summary of which files had conflicts, how each was resolved, and a note asking the author to review the AI resolutions carefully before merging.
- **base**: the original PR's head branch (from `/tmp/gh-aw/agent/pr-head-branch.txt`) — this means merging the resolution PR will update the original PR branch so it can be merged cleanly.

If you cannot confidently resolve a conflict in any file, still create the PR with everything you did resolve, and note the unresolved files clearly in the body.
