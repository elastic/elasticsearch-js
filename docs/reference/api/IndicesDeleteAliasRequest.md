# `IndicesDeleteAliasRequest` [interface-IndicesDeleteAliasRequest]

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; name?: never; master_timeout?: never; timeout?: never; }) | All values in `body` will be added to the request body. |
| `index` | [Indices](./Indices.md) | Comma-separated list of data streams or indices used to limit the request. Supports wildcards ( `*`). |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `name` | [Names](./Names.md) | Comma-separated list of aliases to remove. Supports wildcards ( `*`). To remove all aliases, use `*` or `_all`. |
| `querystring` | { [key: string]: any; } & { index?: never; name?: never; master_timeout?: never; timeout?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
