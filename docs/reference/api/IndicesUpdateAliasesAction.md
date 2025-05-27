## Interface `IndicesUpdateAliasesAction`

| Name | Type | Description |
| - | - | - |
| `add` | [IndicesUpdateAliasesAddAction](./IndicesUpdateAliasesAddAction.md) | Adds a data stream or index to an alias. If the alias doesn’t exist, the `add` action creates it. |
| `remove_index` | [IndicesUpdateAliasesRemoveIndexAction](./IndicesUpdateAliasesRemoveIndexAction.md) | Deletes an index. You cannot use this action on aliases or data streams. |
| `remove` | [IndicesUpdateAliasesRemoveAction](./IndicesUpdateAliasesRemoveAction.md) | Removes a data stream or index from an alias. |
