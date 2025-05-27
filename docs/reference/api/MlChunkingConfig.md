## Interface `MlChunkingConfig`

| Name | Type | Description |
| - | - | - |
| `mode` | [MlChunkingMode](./MlChunkingMode.md) | If the mode is `auto`, the chunk size is dynamically calculated; this is the recommended value when the datafeed does not use aggregations. If the mode is `manual`, chunking is applied according to the specified `time_span`; use this mode when the datafeed uses aggregations. If the mode is `off`, no chunking is applied. |
| `time_span` | [Duration](./Duration.md) | The time span that each search will be querying. This setting is applicable only when the `mode` is set to `manual`. |
