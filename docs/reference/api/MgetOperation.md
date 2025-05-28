# `MgetOperation` [interface-MgetOperation]

| Name | Type | Description |
| - | - | - |
| `_id` | [Id](./Id.md) | The unique document ID. |
| `_index` | [IndexName](./IndexName.md) | The index that contains the document. |
| `_source` | [SearchSourceConfig](./SearchSourceConfig.md) | If `false`, excludes all _source fields. |
| `routing` | [Routing](./Routing.md) | The key for the primary shard the document resides on. Required if routing is used during indexing. |
| `stored_fields` | [Fields](./Fields.md) | The stored fields you want to retrieve. |
| `version_type` | [VersionType](./VersionType.md) | &nbsp; |
| `version` | [VersionNumber](./VersionNumber.md) | &nbsp; |
