# IngestDocumentSimulationKeys

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `_id` | [`Id`](Id.md) | Unique identifier for the document. This ID must be unique within the `_index`. |
| `_index` | [`IndexName`](IndexName.md) | Name of the index containing the document. |
| `_ingest` | [`IngestIngest`](IngestIngest.md) | - |
| `_routing?` | `string` | Value used to send the document to a specific primary shard. |
| `_source` | `Record<string, any>` | JSON body for the document. |
| `_version?` | [`SpecUtilsStringified`](SpecUtilsStringified.md)<VersionNumber> | - |
| `_version_type?` | [`VersionType`](VersionType.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
