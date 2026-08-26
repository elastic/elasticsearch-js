---
name: build-failure
description: Diagnose elasticsearch-js CI and local build failures.
---

# Build failure

Read the failing job log before changing code.

Edited `src/api/`: revert it. Fix `elastic/elasticsearch-specification` or a hand-maintained file under `src/` instead.

Lint / eslint: `npm run lint:fix`, then review the diff. Do not disable rules to go green.

License checker: only MIT, Apache-2.0, Apache1.1, ISC, BSD-3-Clause, BSD-2-Clause, 0BSD in production deps.

Missing SPDX header: `npm run license-header` names the files. Use the Elasticsearch B.V. Apache-2.0 header.

Windows-only JSON or path failures: no `echo '...'` for JSON; use `node -e` and `path.join`.

Coverage / tap thresholds: `npm test` enforces coverage excluding `**/api/**`. Do not lower thresholds.

`npm test` skipped in CI when only docs changed: that is the paths-filter, not a broken build.

Bun failures: `bun install` and `bun run lint` / `bun run test:unit-bun`. Still keep npm as the source of truth.
