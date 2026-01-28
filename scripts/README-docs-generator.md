# TypeScript Documentation Generator

This directory contains the script for generating TypeScript reference documentation for the Elasticsearch JavaScript client.

## Usage

To generate the documentation:

```bash
npm run docs:generate
```

This will:
1. Parse all TypeScript source files in `src/`
2. Extract API methods, types, and their JSDoc comments
3. Generate markdown documentation in `docs/reference/typescript-api/`

## Generated Documentation Structure

```
docs/reference/typescript-api/
├── README.md                 # Documentation overview
├── index.md                  # Complete API list (alphabetical)
├── client.md                 # Client constructor options
├── helpers.md                # Client.helpers functions
├── transport.md              # Transport layer classes
├── apis/                     # Individual API method pages
│   ├── search.md
│   ├── bulk.md
│   ├── cat.count.md
│   └── ...
└── types/                    # Individual type definition pages
    ├── SearchRequest.md
    ├── SearchResponse.md
    └── ...
```

## Features

- **Exhaustive**: Documents all APIs, types, properties, and parameters
- **Cross-linked**: All type references link to their documentation pages
- **JSDoc extraction**: Includes all docstrings from source code
- **Deduplication**: Handles method overloads correctly
- **Type inheritance**: Shows what each type extends

## Script Details

**File**: `scripts/generate-ts-docs-ast.js`

**Approach**: Uses TypeScript's compiler API (`ts.createProgram`) to parse source files and extract documentation directly from the AST.

**Key capabilities**:
- Parses TypeScript source files
- Extracts JSDoc comments (`@property`, `@param`, descriptions)
- Resolves type references
- Generates cross-linked markdown documentation
- Handles namespaced APIs (e.g., `cat.count`, `cluster.health`)
- Documents helper functions
- Documents transport layer classes

## Output Location

The generated documentation is written to `docs/reference/typescript-api/` but is gitignored. The generator script itself is the primary artifact committed to the repository.

## Maintenance

To update the documentation when the codebase changes:
1. Make changes to TypeScript source files
2. Run `npm run docs:generate`
3. Review generated documentation

The script is designed to be self-contained and uses only the TypeScript compiler API (which is already a project dependency).
