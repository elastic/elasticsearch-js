# ScriptsPainlessExecuteRequest

## Interface

### Extends

- [`RequestBase`](RequestBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `context?` | [`ScriptsPainlessExecutePainlessContext`](ScriptsPainlessExecutePainlessContext.md) | The context that the script should run in.
NOTE: Result ordering in the field contexts is not guaranteed. |
| `context_setup?` | [`ScriptsPainlessExecutePainlessContextSetup`](ScriptsPainlessExecutePainlessContextSetup.md) | Additional parameters for the `context`.
NOTE: This parameter is required for all contexts except `painless_test`, which is the default if no value is provided for `context`. |
| `script?` | `Script | ScriptSource` | The Painless script to run. |
| `body?` | `string | { [key: string]: any } & { context?: never, context_setup?: never, script?: never }` | All values in `body` will be added to the request body. |
| `querystring?` | `{ [key: string]: any } & { context?: never, context_setup?: never, script?: never }` | All values in `querystring` will be added to the request querystring. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
