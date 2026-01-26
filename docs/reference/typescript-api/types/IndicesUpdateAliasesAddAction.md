# IndicesUpdateAliasesAddAction

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `alias?` | [`IndexAlias`](IndexAlias.md) | Alias for the action.
Index alias names support date math. |
| `aliases?` | `IndexAlias | IndexAlias`[] | Aliases for the action.
Index alias names support date math. |
| `filter?` | [`QueryDslQueryContainer`](QueryDslQueryContainer.md) | Query used to limit documents the alias can access. |
| `index?` | [`IndexName`](IndexName.md) | Data stream or index for the action.
Supports wildcards (`*`). |
| `indices?` | [`Indices`](Indices.md) | Data streams or indices for the action.
Supports wildcards (`*`). |
| `index_routing?` | [`Routing`](Routing.md) | Value used to route indexing operations to a specific shard.
If specified, this overwrites the `routing` value for indexing operations.
Data stream aliases don’t support this parameter. |
| `is_hidden?` | `boolean` | If `true`, the alias is hidden. |
| `is_write_index?` | `boolean` | If `true`, sets the write index or data stream for the alias. |
| `routing?` | [`Routing`](Routing.md) | Value used to route indexing and search operations to a specific shard.
Data stream aliases don’t support this parameter. |
| `search_routing?` | [`Routing`](Routing.md) | Value used to route search operations to a specific shard.
If specified, this overwrites the `routing` value for search operations.
Data stream aliases don’t support this parameter. |
| `must_exist?` | `boolean` | If `true`, the alias must exist to perform the action. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
