# `IndicesAliasDefinition` [interface-IndicesAliasDefinition]

| Name | Type | Description |
| - | - | - |
| `filter` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | Query used to limit documents the alias can access. |
| `index_routing` | string | Value used to route indexing operations to a specific shard. If specified, this overwrites the `routing` value for indexing operations. |
| `is_hidden` | boolean | If `true`, the alias is hidden. All indices for the alias must have the same `is_hidden` value. |
| `is_write_index` | boolean | If `true`, the index is the write index for the alias. |
| `routing` | string | Value used to route indexing and search operations to a specific shard. |
| `search_routing` | string | Value used to route search operations to a specific shard. If specified, this overwrites the `routing` value for search operations. |
