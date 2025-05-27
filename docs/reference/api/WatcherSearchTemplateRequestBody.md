## Interface `WatcherSearchTemplateRequestBody`

| Name | Type | Description |
| - | - | - |
| `explain` | boolean | &nbsp; |
| `id` | [Id](./Id.md) | ID of the search template to use. If no source is specified, this parameter is required. |
| `params` | Record<string, any> | &nbsp; |
| `profile` | boolean | &nbsp; |
| `source` | string | An inline search template. Supports the same parameters as the search API's request body. Also supports Mustache variables. If no id is specified, this parameter is required. |
