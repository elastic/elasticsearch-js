## Interface `MsearchTemplateTemplateConfig`

| Name | Type | Description |
| - | - | - |
| `explain` | boolean | If `true`, returns detailed information about score calculation as part of each hit. |
| `id` | [Id](./Id.md) | The ID of the search template to use. If no `source` is specified, this parameter is required. |
| `params` | Record<string, any> | Key-value pairs used to replace Mustache variables in the template. The key is the variable name. The value is the variable value. |
| `profile` | boolean | If `true`, the query execution is profiled. |
| `source` | [ScriptSource](./ScriptSource.md) | An inline search template. Supports the same parameters as the search API's request body. It also supports Mustache variables. If no `id` is specified, this parameter is required. |
