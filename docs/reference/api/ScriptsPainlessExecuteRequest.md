# `ScriptsPainlessExecuteRequest` [interface-ScriptsPainlessExecuteRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { context?: never; context_setup?: never; script?: never; }) | All values in `body` will be added to the request body. |
| `context_setup` | [ScriptsPainlessExecutePainlessContextSetup](./ScriptsPainlessExecutePainlessContextSetup.md) | Additional parameters for the `context`. NOTE: This parameter is required for all contexts except `painless_test`, which is the default if no value is provided for `context`. |
| `context` | [ScriptsPainlessExecutePainlessContext](./ScriptsPainlessExecutePainlessContext.md) | The context that the script should run in. NOTE: Result ordering in the field contexts is not guaranteed. |
| `querystring` | { [key: string]: any; } & { context?: never; context_setup?: never; script?: never; } | All values in `querystring` will be added to the request querystring. |
| `script` | [Script](./Script.md) | [ScriptSource](./ScriptSource.md) | The Painless script to run. |
