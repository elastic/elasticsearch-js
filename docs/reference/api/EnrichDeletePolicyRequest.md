## Interface `EnrichDeletePolicyRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. |
| `name` | [Name](./Name.md) | Enrich policy to delete. |
| `querystring` | { [key: string]: any; } & { name?: never; master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
