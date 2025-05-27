## Interface `IndicesPutAliasRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { index?: never; name?: never; master_timeout?: never; timeout?: never; filter?: never; index_routing?: never; is_write_index?: never; routing?: never; search_routing?: never; }) | All values in `body` will be added to the request body. |
| `filter` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Query used to limit documents the alias can access. |
| `index_routing` | [Routing](./Routing.md) | Value used to route indexing operations to a specific shard. If specified, this overwrites the `routing` value for indexing operations. Data stream aliases don’t support this parameter. |
| `index` | [Indices](./Indices.md) | Comma-separated list of data streams or indices to add. Supports wildcards ( `*`). Wildcard patterns that match both data streams and indices return an error. |
| `is_write_index` | boolean | If `true`, sets the write index or data stream for the alias. If an alias points to multiple indices or data streams and `is_write_index` isn’t set, the alias rejects write requests. If an index alias points to one index and `is_write_index` isn’t set, the index automatically acts as the write index. Data stream aliases don’t automatically set a write data stream, even if the alias points to one data stream. |
| `master_timeout` | [Duration](./Duration.md) | Period to wait for a connection to the master node. If no response is received before the timeout expires, the request fails and returns an error. |
| `name` | [Name](./Name.md) | Alias to update. If the alias doesn’t exist, the request creates it. Index alias names support date math. |
| `querystring` | { [key: string]: any; } & { index?: never; name?: never; master_timeout?: never; timeout?: never; filter?: never; index_routing?: never; is_write_index?: never; routing?: never; search_routing?: never; } | All values in `querystring` will be added to the request querystring. |
| `routing` | [Routing](./Routing.md) | Value used to route indexing and search operations to a specific shard. Data stream aliases don’t support this parameter. |
| `search_routing` | [Routing](./Routing.md) | Value used to route search operations to a specific shard. If specified, this overwrites the `routing` value for search operations. Data stream aliases don’t support this parameter. |
| `timeout` | [Duration](./Duration.md) | Period to wait for a response. If no response is received before the timeout expires, the request fails and returns an error. |
