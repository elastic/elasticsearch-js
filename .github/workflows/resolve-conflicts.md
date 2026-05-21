---
name: AI Backport Resolver
description: When the backport bot fails, parse the failure comment and use Claude to resolve cherry-pick conflicts and create the backport PR
on:
  issue_comment:
    types: [created]
engine:
  id: claude
  model: "llm-gateway/claude-sonnet-4-6"
  env:
    ANTHROPIC_BASE_URL: "https://elastic.litellm-prod.ai/"
    ANTHROPIC_API_KEY: ${{ secrets.LITELLM_API_KEY }}
checkout:
  fetch-depth: 0
steps:
  - name: Parse backport failure comment and attempt cherry-pick
    env:
      COMMENT_BODY: ${{ github.event.comment.body }}
      COMMENT_USER: ${{ github.event.comment.user.login }}
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    run: |
      # Only act on backport bot failure comments
      if [[ "$COMMENT_USER" != "github-actions[bot]" && "$COMMENT_USER" != "elastic-vault-github-plugin-prod[bot]" ]]; then
        echo "skip" > /tmp/gh-aw/agent/status.txt
        exit 0
      fi
      if ! echo "$COMMENT_BODY" | grep -q "To backport manually, run these commands"; then
        echo "skip" > /tmp/gh-aw/agent/status.txt
        exit 0
      fi

      # Parse target branch and commit SHA from the comment
      BASE_BRANCH=$(echo "$COMMENT_BODY" | grep -oP 'git worktree add \.worktrees/\S+ \K\S+')
      COMMIT_SHA=$(echo "$COMMENT_BODY" | grep -oP 'cherry-pick -x --mainline 1 \K[a-f0-9]+')

      if [[ -z "$BASE_BRANCH" || -z "$COMMIT_SHA" ]]; then
        echo "skip" > /tmp/gh-aw/agent/status.txt
        echo "Could not parse base branch or commit SHA from comment."
        exit 0
      fi

      PR_NUMBER="${{ github.event.issue.number }}"
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
      git fetch origin "$COMMIT_SHA" 2>/dev/null || true
      git checkout "$BASE_BRANCH"

      # Use --no-commit so staged/conflicted changes are left in the workspace
      # for the agent to resolve and safe-outputs to commit
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
