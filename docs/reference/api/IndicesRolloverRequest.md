## Interface `IndicesRolloverRequest`

| Name | Type | Description |
| - | - | - |
| `alias` | [IndexAlias](./IndexAlias.md) | Name of the data stream or index alias to roll over. |
| `aliases` | Record<[IndexName](./IndexName.md), [IndicesAlias](./IndicesAlias.md)> | Aliases for the target index. Data streams do not support this parameter. |
| `body` | string | ({ [key: string]: any; } & { alias?: never; new_index?: never; dry_run?: never; master_timeout?: never; timeout?: never; wait_for_active_shards?: never; lazy?: never; aliases?: never; conditions?: never; mappings?: never; settings?: never; }) | All values in `body` will be added to the request body. |
| `conditions` | [IndicesRolloverRolloverConditions](./IndicesRolloverRolloverConditions.md) | Conditions for the rollover. If specified, Elasticsearch only performs the rollover if the current index satisfies these conditions. If this parameter is not specified, Elasticsearch performs the rollover unconditionally. If conditions are specified, at least one of them must be a `max_*` condition. The index will rollover if any `max_*` condition is satisfied and all `min_*` conditions are satisfied. |
| `dry_run` | boolean | If `true`, checks whether the current index satisfies the specified conditions but does not perform a rollover. |
| `lazy` | boolean | If set to true, the rollover action will only mark a data stream to signal that it needs to be rolled over at the next write. Only allowed on data streams. |
| `mappings` | [MappingTypeMapping](./MappingTypeMapping.md) | Mapping for fields in the index. If specified, this mapping can include field names, field data types, and mapping paramaters. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `new_index` | [IndexName](./IndexName.md) | Name of the index to create. Supports date math. Data streams do not support this parameter. |
| `querystring` | { [key: string]: any; } & { alias?: never; new_index?: never; dry_run?: never; master_timeout?: never; timeout?: never; wait_for_active_shards?: never; lazy?: never; aliases?: never; conditions?: never; mappings?: never; settings?: never; } | All values in `querystring` will be added to the request querystring. |
| `settings` | Record<string, any> | Configuration options for the index. Data streams do not support this parameter. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
| `wait_for_active_shards` | [WaitForActiveShards](./WaitForActiveShards.md) | The number of shard copies that must be active before proceeding with the operation. Set to all or any positive integer up to the total number of shards in the index ( `number_of_replicas+1`). |
