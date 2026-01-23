# IngestPipelineConfig

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `description?` | `string` | Description of the ingest pipeline. |
| `version?` | [`VersionNumber`](VersionNumber.md) | Version number used by external systems to track ingest pipelines. |
| `processors` | [`IngestProcessorContainer`](IngestProcessorContainer.md)[] | Processors used to perform transformations on documents before indexing.
Processors run sequentially in the order specified. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
