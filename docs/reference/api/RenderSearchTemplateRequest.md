## Interface `RenderSearchTemplateRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { id?: never; file?: never; params?: never; source?: never; }) | All values in `body` will be added to the request body. |
| `file` | string | &nbsp; |
| `id` | [Id](./Id.md) | The ID of the search template to render. If no `source` is specified, this or the `id` request body parameter is required. |
| `params` | Record<string, any> | Key-value pairs used to replace Mustache variables in the template. The key is the variable name. The value is the variable value. |
| `querystring` | { [key: string]: any; } & { id?: never; file?: never; params?: never; source?: never; } | All values in `querystring` will be added to the request querystring. |
| `source` | [ScriptSource](./ScriptSource.md) | An inline search template. It supports the same parameters as the search API's request body. These parameters also support Mustache variables. If no `id` or `<templated-id>` is specified, this parameter is required. |
