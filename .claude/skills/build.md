---
name: build
description: Install, compile, and verify a clean elasticsearch-js checkout.
---

# Build

Node.js 22+. Always `npm`, never yarn or pnpm.

```bash
npm install
npm run build
npm test
```

`npm test` already runs `npm run build` then lint and unit tests. Outputs CJS to `lib/` and ESM to `esm/`.

```bash
npm run lint
npm run license-checker
npm run license-header
```

Do not edit `src/api/`. Change hand-maintained files under `src/` (except `src/api/`) and tests under `test/`. Code must work on Linux, macOS, and Windows.
