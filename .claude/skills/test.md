---
name: test
description: Write and run elasticsearch-js unit and integration tests.
---

# Test

Framework: tap. Unit tests live in `test/unit/**/*.test.ts`. Helpers under `test/unit/helpers/`. Integration tests in `test/integration/` (YAML cases compiled to `generated-tests/`).

```bash
npm test
npm run test:unit
npm run test:esm
```

`npm test` builds, lints, then runs tap with coverage (excludes `**/api/**` and `**/test/**`). Do not lower coverage thresholds. Do not add tests that only cover generated `src/api/` code.

Use tap's `test()` / `t.test()` style already in `test/unit/`. Prefer `test/utils` (`buildServer`, `MockConnection`) over a live cluster for unit tests.

Integration needs Elasticsearch. `npm run test:integration` builds then runs generated tests with `jobs=1`. CI runs this on Buildkite, not GitHub Actions.

Tests in `src/` and `test/` must behave the same on Linux, macOS, and Windows.
