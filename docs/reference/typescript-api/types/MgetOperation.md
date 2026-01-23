# MgetOperation

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `_id` | [`Id`](Id.md) | The unique document ID. |
| `_index?` | [`IndexName`](IndexName.md) | The index that contains the document. |
| `routing?` | [`Routing`](Routing.md) | The key for the primary shard the document resides on. Required if routing is used during indexing. |
| `_source?` | [`SearchSourceConfig`](SearchSourceConfig.md) | If `false`, excludes all _source fields. |
| `stored_fields?` | [`Fields`](Fields.md) | The stored fields you want to retrieve. |
| `version?` | [`VersionNumber`](VersionNumber.md) | - |
| `version_type?` | [`VersionType`](VersionType.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
