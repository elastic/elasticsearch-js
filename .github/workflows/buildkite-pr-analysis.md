---
name: Buildkite PR analysis
description: Wait for the Buildkite integration test build for this PR, then post a comment summarising any failures
on:
  pull_request:
    types: [opened, synchronize, reopened]
permissions:
  id-token: write
engine:
  id: claude
  model: "llm-gateway/claude-sonnet-4-6"
  env:
    ANTHROPIC_BASE_URL: "https://elastic.litellm-prod.ai/"
    ANTHROPIC_API_KEY: ${{ secrets.LITELLM_API_KEY }}
steps:
  - name: Fetch Buildkite build results
    env:
      BUILDKITE_API_TOKEN: ${{ secrets.BUILDKITE_API_TOKEN }}
      COMMIT: ${{ github.event.pull_request.head.sha }}
      PR_NUMBER: ${{ github.event.pull_request.number }}
    run: |
      mkdir -p /tmp/gh-aw/agent
      echo "$PR_NUMBER" > /tmp/gh-aw/agent/pr-number.txt

      # Poll until the build for this commit is finished (max 45 minutes)
      MAX_WAIT=2700
      ELAPSED=0
      SLEEP=30

      while [ $ELAPSED -lt $MAX_WAIT ]; do
        BK_RESPONSE=$(curl -s -w "\n__HTTP_STATUS__%{http_code}" \
          "https://api.buildkite.com/v2/organizations/elastic/pipelines/elasticsearch-js-integration-tests/builds?commit=${COMMIT}&per_page=1" \
          -H "Authorization: Bearer $BUILDKITE_API_TOKEN")

        HTTP_STATUS=$(echo "$BK_RESPONSE" | tail -1 | sed 's/__HTTP_STATUS__//')
        BUILD=$(echo "$BK_RESPONSE" | sed '$d')

        if [ "$HTTP_STATUS" -ge 400 ]; then
          echo "Buildkite API error (HTTP $HTTP_STATUS): $BUILD"
          exit 1
        fi

        BUILD_COUNT=$(echo "$BUILD" | jq 'length')
        if [ "$BUILD_COUNT" -eq 0 ]; then
          echo "No build found for commit $COMMIT yet, waiting..."
          sleep $SLEEP
          ELAPSED=$((ELAPSED + SLEEP))
          continue
        fi

        STATE=$(echo "$BUILD" | jq -r '.[0].state')
        BUILD_NUMBER=$(echo "$BUILD" | jq -r '.[0].number')
        BUILD_URL=$(echo "$BUILD" | jq -r '.[0].web_url')

        echo "$STATE" > /tmp/gh-aw/agent/build-state.txt
        echo "$BUILD_URL" > /tmp/gh-aw/agent/build-url.txt

        if [ "$STATE" = "running" ] || [ "$STATE" = "scheduled" ] || [ "$STATE" = "creating" ]; then
          echo "Build is $STATE, waiting..."
          sleep $SLEEP
          ELAPSED=$((ELAPSED + SLEEP))
          continue
        fi

        # Build is in a terminal state
        if [ "$STATE" != "failed" ]; then
          echo "Build passed (state=$STATE), nothing to do."
          exit 0
        fi

        # Fetch build annotations (junit-annotate plugin writes test results here)
        curl -sf \
          "https://api.buildkite.com/v2/organizations/elastic/pipelines/elasticsearch-js-integration-tests/builds/$BUILD_NUMBER/annotations?per_page=10" \
          -H "Authorization: Bearer $BUILDKITE_API_TOKEN" \
          | jq -r '.[] | "[\(.style)] \(.context)\n\(.body_text // .body // "")\n"' \
          > /tmp/gh-aw/agent/annotations.txt || true

        # Fetch logs for each non-passed job (failed, broken, timed_out)
        echo "$BUILD" | jq -r '.[0].jobs[] | select(.state == "failed" or .state == "broken" or .state == "timed_out") | select(.type == "script") | [.id, .name] | @tsv' | \
        while IFS=$'\t' read -r JOB_ID JOB_NAME; do
          echo "=== Failed job: $JOB_NAME ===" >> /tmp/gh-aw/agent/failed-jobs.txt
          curl -sf \
            "https://api.buildkite.com/v2/organizations/elastic/pipelines/elasticsearch-js-integration-tests/builds/$BUILD_NUMBER/jobs/$JOB_ID/log.txt" \
            -H "Authorization: Bearer $BUILDKITE_API_TOKEN" \
            | sed 's/_bk;t=[0-9]*//g' \
            | sed $'s/\x1b\[[0-9;]*m//g' \
            | grep -v '^[[:space:]]*$' \
            | tail -300 >> /tmp/gh-aw/agent/failed-jobs.txt
          echo "" >> /tmp/gh-aw/agent/failed-jobs.txt
        done

        exit 0
      done

      echo "Timed out waiting for Buildkite build after ${MAX_WAIT}s"
      exit 0
safe-outputs:
  add-comment:
    target: "*"
    target-repo: "elastic/elasticsearch-js"
    max: 1
  env:
    GITHUB_TOKEN: ${{ github.token }}
network:
  allowed:
    - defaults
    - buildkite.com
    - "*.buildkite.com"
    - elastic.litellm-prod.ai
---

# Buildkite PR analysis

A pre-step has already fetched the Buildkite integration test results for this PR's head commit.

Check `/tmp/gh-aw/agent/build-state.txt`:
- If the file is missing or the state is not `failed`, call `noop` with a brief explanation (e.g. "build passed" or "timed out waiting for build") and stop.

Otherwise:

1. Read the PR number from `/tmp/gh-aw/agent/pr-number.txt`.
2. Read the build URL from `/tmp/gh-aw/agent/build-url.txt`.
3. Read `/tmp/gh-aw/agent/annotations.txt` — junit-annotate plugin output, may be empty if all tests passed.
4. Read `/tmp/gh-aw/agent/failed-jobs.txt` — last 300 lines of each failed job's log (primary source for diagnosis).

Analyse the failures. Common patterns to look for:

- **Test failures**: `not ok` lines or `JUnit failures: N` (N > 0). Group by error message.
- **Coverage threshold failure**: `tap exit: 1` with `JUnit failures: 0` alongside a coverage table showing percentages. This means all tests passed but tap's coverage check failed.
- **Build/infrastructure errors**: Docker failures, ES cluster not starting, network errors, OOM.
- **Tap "no tests found"**: `No test files found` or `No new tests to run`.

For each distinct root cause, assess: is this a **regression** from this PR's changes, or a **pre-existing issue / flake**?

Post a single PR comment using `safe-outputs.add-comment` (with `repo` set to `elastic/elasticsearch-js` and `item_number` set to the PR number) containing:

- A link to the Buildkite build.
- Root cause(s), one per bullet. For coverage failures, include the actual percentages from the coverage table.
- Whether it looks like a regression or pre-existing.
- One concrete next step per root cause.

Keep the comment under 15 lines. No log dumps.
