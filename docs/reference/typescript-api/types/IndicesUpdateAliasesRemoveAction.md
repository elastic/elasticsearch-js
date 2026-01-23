# IndicesUpdateAliasesRemoveAction

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `alias?` | [`IndexAlias`](IndexAlias.md) | Alias for the action.
Index alias names support date math. |
| `aliases?` | `IndexAlias | IndexAlias[]` | Aliases for the action.
Index alias names support date math. |
| `index?` | [`IndexName`](IndexName.md) | Data stream or index for the action.
Supports wildcards (`*`). |
| `indices?` | [`Indices`](Indices.md) | Data streams or indices for the action.
Supports wildcards (`*`). |
| `must_exist?` | `boolean` | If `true`, the alias must exist to perform the action. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
