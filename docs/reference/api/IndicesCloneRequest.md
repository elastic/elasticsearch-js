# `IndicesCloneRequest` [interface-IndicesCloneRequest]

| Name | Type | Description |
| - | - | - |
| `aliases` | Record<[IndexName](./IndexName.md), [IndicesAlias](./IndicesAlias.md)> | Aliases for the resulting index. |
| `body` | string | ({ [key: string]: any; } & { index?: never; target?: never; master_timeout?: never; timeout?: never; wait_for_active_shards?: never; aliases?: never; settings?: never; }) | All values in `body` will be added to the request body. |
| `index` | [IndexName](./IndexName.md) | Name of the source index to clone. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `querystring` | { [key: string]: any; } & { index?: never; target?: never; master_timeout?: never; timeout?: never; wait_for_active_shards?: never; aliases?: never; settings?: never; } | All values in `querystring` will be added to the request querystring. |
| `settings` | Record<string, any> | Configuration options for the target index. |
| `target` | [Name](./Name.md) | Name of the target index to create. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `wait_for_active_shards` | [WaitForActiveShards](./WaitForActiveShards.md) | The number of shard copies that must be active before proceeding with the operation. Set to `all` or any positive integer up to the total number of shards in the index ( `number_of_replicas+1`). |
