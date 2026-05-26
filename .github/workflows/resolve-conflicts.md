---
name: AI Backport Resolver
description: Given a PR number and backport failure details, use Claude to resolve cherry-pick conflicts and create the backport PR
on:
  workflow_dispatch:
    inputs:
      pr_number:
        description: "PR number that failed to backport"
        required: true
      base_branch:
        description: "Target branch to backport to (e.g. 9.4)"
        required: true
      commit_sha:
        description: "Commit SHA to cherry-pick"
        required: true
engine:
  id: claude
  model: "llm-gateway/claude-sonnet-4-6"
  env:
    ANTHROPIC_BASE_URL: "https://elastic.litellm-prod.ai/"
    ANTHROPIC_API_KEY: ${{ secrets.LITELLM_API_KEY }}
checkout:
  fetch-depth: 0
steps:
  - name: Cherry-pick and detect conflicts
    env:
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      PR_NUMBER: ${{ github.event.inputs.pr_number }}
      BASE_BRANCH: ${{ github.event.inputs.base_branch }}
      COMMIT_SHA: ${{ github.event.inputs.commit_sha }}
    run: |
      PR_TITLE=$(gh pr view "$PR_NUMBER" --json title -q .title)
      BACKPORT_BRANCH="backport-${PR_NUMBER}-to-${BASE_BRANCH}"

      echo "$PR_NUMBER" > /tmp/gh-aw/agent/pr-number.txt
      echo "$BASE_BRANCH" > /tmp/gh-aw/agent/base-branch.txt
      echo "$COMMIT_SHA" > /tmp/gh-aw/agent/commit-sha.txt
      echo "$BACKPORT_BRANCH" > /tmp/gh-aw/agent/backport-branch.txt
      echo "$PR_TITLE" > /tmp/gh-aw/agent/pr-title.txt

      git config user.email "github-actions[bot]@users.noreply.github.com"
      git config user.name "github-actions[bot]"

      git fetch origin "$BASE_BRANCH"
      git checkout "$BASE_BRANCH"

      set +e
      git cherry-pick -x --mainline 1 --no-commit "$COMMIT_SHA" 2>&1
      CHERRY_EXIT=$?
      set -e

      if [ $CHERRY_EXIT -eq 0 ]; then
        echo "clean" > /tmp/gh-aw/agent/status.txt
      else
        echo "conflicted" > /tmp/gh-aw/agent/status.txt
        git diff --name-only --diff-filter=U > /tmp/gh-aw/agent/conflicted-files.txt
        echo "Conflicted files:"
        cat /tmp/gh-aw/agent/conflicted-files.txt
      fi
safe-outputs:
  create-pull-request:
    title-prefix: ""
    labels: [backport]
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
network:
  allowed:
    - defaults
    - elastic.litellm-prod.ai
---

# AI Backport Resolver

A backport bot failure comment was detected. A pre-step has already parsed the comment and attempted the cherry-pick with `--no-commit`, leaving the changes in the workspace.

First, read `/tmp/gh-aw/agent/status.txt`:
- If `skip` — this comment is not a backport failure. Call `noop` immediately.
- If `clean` — cherry-pick applied without conflicts. Proceed to **Create the PR** below.
- If `conflicted` — proceed to **Resolve conflicts** below.

## Resolve conflicts

Read `/tmp/gh-aw/agent/conflicted-files.txt` for the list of conflicted files.

For each conflicted file:
1. Read the file — it contains `<<<<<<< HEAD`, `=======`, `>>>>>>>` conflict markers.
2. The `HEAD` side is the target backport branch. The other side is the cherry-picked change.
3. Resolve by applying the intent of the cherry-picked change onto the target branch code.
4. Write the resolved file back with no conflict markers remaining.
5. Run `git add <file>`.

## Create the PR

Read the context files:
- `/tmp/gh-aw/agent/pr-number.txt` — original PR number
- `/tmp/gh-aw/agent/pr-title.txt` — original PR title
- `/tmp/gh-aw/agent/base-branch.txt` — target backport branch (e.g. `9.4`)
- `/tmp/gh-aw/agent/backport-branch.txt` — branch name to create (e.g. `backport-123-to-9.4`)

Use `safe-outputs.create-pull-request` to open the backport PR:
- **title**: `[<base-branch>] <original PR title>`
- **body**: `Backport of #<pr-number> to <base-branch>.` — if there were AI-resolved conflicts, list which files were resolved and ask the author to review them carefully before merging.
- **base**: the value from `/tmp/gh-aw/agent/base-branch.txt`

After creating the PR, comment on the original PR `#<pr-number>` to say the backport PR was created and mention any AI-resolved conflicts.
