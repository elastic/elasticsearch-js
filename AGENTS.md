# AGENTS.md

## Setup commands

Always use `npm` commands, not `yarn`, `pnpm` or any other third-party packaging tool.

- Install dependencies: `npm install`
- Run all tests: `npm test`
- Run just unit tests: `npm run test:unit`
- Run just the linter: `npm run lint`
- Fix linter issues: `npm run lint:fix`
- Build TypeScript (outputs both ESM and CommonJS): `npm run build`

## Testing

**The entire test suite (`npm test`) must pass and exit cleanly before you commit code.**

## Project Structure

- **src/** - TypeScript source files
- **lib/** - Compiled CommonJS output
- **esm/** - Compiled ES Module output
- **test/unit/** - Unit tests

## Development Workflow

1. Make changes to `src/**/*.ts` files
2. Run `npm test` (which will also rebuild all code changes first) to verify all tests pass

## OS Compatibility

All code in `src/` and `test/`, and any scripts run by `npm` that are defined in package.json, must be runnable with equivalent results on Linux, MacOS and Windows. For example, running the following scripts using `npm run`:

```bash
# BAD - Creates invalid JSON on Windows with single quotes
echo '{"type":"module"}' > file.json

# GOOD - Use Node.js for cross-platform JSON file creation
node -e "require('fs').writeFileSync('file.json', JSON.stringify({type:'module'}, null, 2))"
```

## Adding new agent instructions

All markdown instructions authored for other agents must be as concise as possible.

If a specific action you learned to do better will be useful to other agents doing the same task in the future, but may not be needed for ALL agent-related tasks, create or update skills in `.github/skills/`.

If you learned something that will be useful to any contributor to this project, update `AGENTS.md`.
