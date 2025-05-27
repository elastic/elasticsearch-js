## Interface `ShutdownGetNodeRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { node_id?: never; master_timeout?: never; }) | All values in `body` will be added to the request body. |
| `master_timeout` | [TimeUnit](./TimeUnit.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `node_id` | [NodeIds](./NodeIds.md) | Which node for which to retrieve the shutdown status |
| `querystring` | { [key: string]: any; } & { node_id?: never; master_timeout?: never; } | All values in `querystring` will be added to the request querystring. |
