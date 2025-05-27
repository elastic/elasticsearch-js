## Interface `EnrichExecutePolicyRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { name?: never; master_timeout?: never; wait_for_completion?: never; }) | All values in `body` will be added to the request body. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. |
| `name` | [Name](./Name.md) | Enrich policy to execute. |
| `querystring` | { [key: string]: any; } & { name?: never; master_timeout?: never; wait_for_completion?: never; } | All values in `querystring` will be added to the request querystring. |
| `wait_for_completion` | boolean | If `true`, the request blocks other enrich policy execution requests until complete. |
