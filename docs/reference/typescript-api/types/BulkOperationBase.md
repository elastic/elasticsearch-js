# BulkOperationBase

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `_id?` | [`Id`](Id.md) | The document ID. |
| `_index?` | [`IndexName`](IndexName.md) | The name of the index or index alias to perform the action on. |
| `routing?` | [`Routing`](Routing.md) | A custom value used to route operations to a specific shard. |
| `if_primary_term?` | `long` | - |
| `if_seq_no?` | [`SequenceNumber`](SequenceNumber.md) | - |
| `version?` | [`VersionNumber`](VersionNumber.md) | - |
| `version_type?` | [`VersionType`](VersionType.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
