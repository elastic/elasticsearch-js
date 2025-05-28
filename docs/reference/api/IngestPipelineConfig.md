# `IngestPipelineConfig` [interface-IngestPipelineConfig]

| Name | Type | Description |
| - | - | - |
| `description` | string | Description of the ingest pipeline. |
| `processors` | [IngestProcessorContainer](./IngestProcessorContainer.md)[] | Processors used to perform transformations on documents before indexing. Processors run sequentially in the order specified. |
| `version` | [VersionNumber](./VersionNumber.md) | Version number used by external systems to track ingest pipelines. |
