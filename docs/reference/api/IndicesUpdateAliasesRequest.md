## Interface `IndicesUpdateAliasesRequest`

| Name | Type | Description |
| - | - | - |
| `actions` | [IndicesUpdateAliasesAction](./IndicesUpdateAliasesAction.md)[] | Actions to perform. |
| `body` | string | ({ [key: string]: any; } & { master_timeout?: never; timeout?: never; actions?: never; }) | All values in `body` will be added to the request body. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `querystring` | { [key: string]: any; } & { master_timeout?: never; timeout?: never; actions?: never; } | All values in `querystring` will be added to the request querystring. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
