# `SecurityReplicationAccess` [interface-SecurityReplicationAccess]

| Name | Type | Description |
| - | - | - |
| `allow_restricted_indices` | boolean | This needs to be set to true if the patterns in the names field should cover system indices. |
| `names` | [IndexName](./IndexName.md) | [IndexName](./IndexName.md)[] | A list of indices (or index name patterns) to which the permissions in this entry apply. |
