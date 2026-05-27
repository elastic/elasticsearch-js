# Auto PR context — elasticsearch-js

This repo is the official Elasticsearch client for Node.js. Source code lives under `src/` and generated API bindings are under `src/api/`.

## File layout

- `src/` — main client source (TypeScript)
- `src/api/api/` — one file per API namespace (e.g. `search.ts`, `index.ts`, `bulk.ts`)
- `src/api/types.ts` — generated TypeScript types for request/response bodies
- `src/client.ts` — core client class
- `src/helpers.ts` — higher-level helpers (bulk helper, scroll helper, etc.)

## Fix conventions

- `src/api/api/` and `src/api/types.ts` are auto-generated — do **not** modify them directly
- Only modify files outside of `src/api/` unless the issue explicitly calls for a type or API binding change
- Follow existing TypeScript patterns and use the same import style as surrounding code
- Do not modify `dist/`, `esm/`, or any compiled output

## Search hints

Error messages, method names, or option names in the issue body typically map to files in `src/` (excluding `src/api/`).
