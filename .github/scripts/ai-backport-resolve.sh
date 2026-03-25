#!/bin/bash
set -euo pipefail

# AI-powered backport conflict resolver.
# Resolves cherry-pick merge conflicts using Claude and creates a backport PR.
#
# Usage:
#   ai-backport-resolve.sh <pr_number> <commit_sha> <target_branch>
#
# Environment variables:
#   ANTHROPIC_API_KEY  - required, Claude API key
#   GH_TOKEN           - required, GitHub token with repo access (also used by gh CLI)
#   REPO_REMOTE        - optional, git remote name (default: "origin")
#
# Requirements: git, gh, curl, jq

if [ $# -ne 3 ]; then
  echo "usage: $(basename "$0") <pr_number> <commit_sha> <target_branch>"
  exit 1
fi

if [ -z "${ANTHROPIC_API_KEY:-}" ]; then
  echo "error: ANTHROPIC_API_KEY environment variable is not set"
  exit 1
fi

if [ -z "${GH_TOKEN:-}" ]; then
  echo "error: GH_TOKEN environment variable is not set"
  exit 1
fi

PR_NUMBER="$1"
COMMIT_SHA="$2"
TARGET_BRANCH="$3"
REMOTE="${REPO_REMOTE:-origin}"
HEAD_BRANCH="backport-${PR_NUMBER}-to-${TARGET_BRANCH}"

REPO_SLUG=$(gh repo view --json nameWithOwner -q '.nameWithOwner')

echo "=== AI Backport Resolver ==="
echo "PR:            #${PR_NUMBER}"
echo "Commit:        ${COMMIT_SHA}"
echo "Target branch: ${TARGET_BRANCH}"
echo "Head branch:   ${HEAD_BRANCH}"
echo "Repository:    ${REPO_SLUG}"
echo ""

comment_on_pr() {
  local body="$1"
  gh pr comment "${PR_NUMBER}" --body "$body"
}

cleanup_on_failure() {
  local msg="$1"
  echo "error: ${msg}"
  comment_on_pr "$(cat <<EOF
**AI Backport Resolver** attempted to resolve conflicts for the backport to \`${TARGET_BRANCH}\` but failed:

\`\`\`
${msg}
\`\`\`

Manual resolution is still required. See the original failure comment above for instructions.
EOF
)"
  exit 1
}

# Fetch and set up the backport branch
echo "--- Setting up backport branch ---"
git fetch "${REMOTE}"
git checkout "${TARGET_BRANCH}"
git pull "${REMOTE}" "${TARGET_BRANCH}"
git switch --create "${HEAD_BRANCH}"

# Attempt cherry-pick -- we expect this to fail with conflicts
echo ""
echo "--- Attempting cherry-pick ---"
set +e
cherry_pick_exit=0
git cherry-pick -x --mainline 1 "${COMMIT_SHA}" || cherry_pick_exit=$?
set -e

if [ ${cherry_pick_exit} -eq 0 ]; then
  echo "Cherry-pick succeeded without conflicts. Pushing directly."
  git push --set-upstream "${REMOTE}" "${HEAD_BRANCH}"

  PR_TITLE=$(git log -1 --pretty=format:"%s")
  PR_TITLE="[${TARGET_BRANCH}] ${PR_TITLE}"
  PR_BODY="Backport #${PR_NUMBER} to branch ${TARGET_BRANCH}"

  PR_URL=$(gh pr create \
    --base "${TARGET_BRANCH}" \
    --title "${PR_TITLE}" \
    --body "${PR_BODY}")

  echo "Backport PR created: ${PR_URL}"
  comment_on_pr "**AI Backport Resolver** created a backport PR (no conflicts): ${PR_URL}"
  exit 0
fi

# Cherry-pick failed -- check for conflicts
CONFLICTED_FILES=$(git diff --name-only --diff-filter=U)
if [ -z "${CONFLICTED_FILES}" ]; then
  cleanup_on_failure "Cherry-pick failed but no conflicted files were found. This may be a non-conflict error."
fi

echo ""
echo "--- Conflicted files ---"
echo "${CONFLICTED_FILES}"
echo ""

# Fetch the original PR diff for context
echo "--- Fetching original PR diff ---"
PR_DIFF=$(curl -sL \
  -H "Authorization: Bearer ${GH_TOKEN}" \
  -H "Accept: application/vnd.github.v3.diff" \
  "https://api.github.com/repos/${REPO_SLUG}/pulls/${PR_NUMBER}")

if [ -z "${PR_DIFF}" ]; then
  cleanup_on_failure "Could not fetch PR diff from GitHub API."
fi

RESOLVED_FILES=()
FAILED_FILES=()

resolve_file_with_ai() {
  local filepath="$1"
  local conflicted_content
  conflicted_content=$(cat "$filepath")

  # Extract just the diff for this file from the full PR diff.
  local file_diff
  file_diff=$(echo "${PR_DIFF}" | awk '
    /^diff --git/ {
      if (printing) exit
      if (index($0, "b/'"${filepath}"'") > 0) printing = 1
    }
    printing { print }
  ' 2>/dev/null || echo "")

  if [ -z "${file_diff}" ]; then
    file_diff="(full file diff not available for this file)"
  fi

  # Build the prompt for Claude
  local prompt
  prompt=$(cat <<PROMPT_EOF
You are resolving a git merge conflict that occurred during a cherry-pick backport.

CONTEXT:
- Pull request #${PR_NUMBER} was merged to the main branch.
- We are backporting (cherry-picking) commit ${COMMIT_SHA} to the \`${TARGET_BRANCH}\` branch.
- The cherry-pick produced merge conflicts in this file.

ORIGINAL PR DIFF FOR THIS FILE:
\`\`\`diff
${file_diff}
\`\`\`

FILE WITH CONFLICT MARKERS:
\`\`\`
${conflicted_content}
\`\`\`

INSTRUCTIONS:
1. Resolve the conflict by applying the intent of the original PR change to the target branch code.
2. The code between <<<<<<< HEAD and ======= is from the TARGET branch (${TARGET_BRANCH}).
3. The code between ======= and >>>>>>> is from the CHERRY-PICKED commit.
4. Produce the final resolved file that correctly incorporates the PR's changes into the target branch.
5. Output ONLY the complete resolved file content. No explanations, no markdown fences, no commentary.
PROMPT_EOF
)

  local json_payload
  json_payload=$(jq -n \
    --arg prompt "$prompt" \
    '{
      model: "claude-sonnet-4-20250514",
      max_tokens: 16384,
      messages: [
        {
          role: "user",
          content: $prompt
        }
      ]
    }')

  echo "  Calling Claude API for: ${filepath}"
  local response
  response=$(curl -s \
    -H "x-api-key: ${ANTHROPIC_API_KEY}" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d "$json_payload" \
    "https://api.anthropic.com/v1/messages")

  # Check for API errors
  local api_error
  api_error=$(echo "${response}" | jq -r '.error.message // empty' 2>/dev/null || echo "")
  if [ -n "${api_error}" ]; then
    echo "  ERROR: Claude API error for ${filepath}: ${api_error}"
    return 1
  fi

  local stop_reason
  stop_reason=$(echo "${response}" | jq -r '.stop_reason // empty' 2>/dev/null || echo "")
  if [ "${stop_reason}" != "end_turn" ]; then
    echo "  WARNING: Unexpected stop_reason '${stop_reason}' for ${filepath}"
  fi

  local resolved_content
  resolved_content=$(echo "${response}" | jq -r '.content[0].text // empty' 2>/dev/null || echo "")

  if [ -z "${resolved_content}" ]; then
    echo "  ERROR: Empty response from Claude for ${filepath}"
    return 1
  fi

  # Verify no conflict markers remain
  if echo "${resolved_content}" | grep -qE '^(<<<<<<<|=======|>>>>>>>)'; then
    echo "  ERROR: Claude's resolution still contains conflict markers for ${filepath}"
    return 1
  fi

  echo "${resolved_content}" > "$filepath"
  git add "$filepath"
  echo "  Resolved: ${filepath}"
  return 0
}

# Resolve each conflicted file
echo "--- Resolving conflicts with AI ---"
while IFS= read -r filepath; do
  if resolve_file_with_ai "$filepath"; then
    RESOLVED_FILES+=("$filepath")
  else
    FAILED_FILES+=("$filepath")
  fi
done <<< "${CONFLICTED_FILES}"

echo ""
echo "--- Resolution summary ---"
echo "Resolved: ${#RESOLVED_FILES[@]} file(s)"
echo "Failed:   ${#FAILED_FILES[@]} file(s)"

if [ ${#FAILED_FILES[@]} -gt 0 ]; then
  failed_list=$(printf '  - `%s`\n' "${FAILED_FILES[@]}")
  cleanup_on_failure "Could not resolve conflicts in the following files:\n${failed_list}"
fi

if [ ${#RESOLVED_FILES[@]} -eq 0 ]; then
  cleanup_on_failure "No files were resolved."
fi

# Complete the cherry-pick
echo ""
echo "--- Completing cherry-pick ---"
GIT_EDITOR=true git cherry-pick --continue

# Push and create PR
echo ""
echo "--- Creating backport PR ---"
git push --set-upstream "${REMOTE}" "${HEAD_BRANCH}"

PR_TITLE=$(git log -1 --pretty=format:"%s")
PR_TITLE="[${TARGET_BRANCH}] ${PR_TITLE}"

resolved_list=$(printf '- `%s`\n' "${RESOLVED_FILES[@]}")

PR_BODY=$(cat <<EOF
Backport #${PR_NUMBER} to branch \`${TARGET_BRANCH}\`.

### AI-resolved conflicts

This backport had merge conflicts that were automatically resolved using AI (Claude). The following files had conflicts that were resolved:

${resolved_list}

> **Please review the conflict resolutions carefully before merging.**
EOF
)

PR_URL=$(gh pr create \
  --base "${TARGET_BRANCH}" \
  --title "${PR_TITLE}" \
  --body "${PR_BODY}" \
  --label "ai-resolved-backport")

echo "Backport PR created: ${PR_URL}"

comment_on_pr "**AI Backport Resolver** resolved the conflicts and created a backport PR: ${PR_URL}

Files with AI-resolved conflicts:
${resolved_list}"

echo ""
echo "=== Done ==="
