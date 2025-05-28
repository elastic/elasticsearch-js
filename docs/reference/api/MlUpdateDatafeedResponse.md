# `MlUpdateDatafeedResponse` [interface-MlUpdateDatafeedResponse]

| Name | Type | Description |
| - | - | - |
| `aggregations` | Record<string, [AggregationsAggregationContainer](./AggregationsAggregationContainer.md)> | &nbsp; |
| `authorization` | [MlDatafeedAuthorization](./MlDatafeedAuthorization.md) | &nbsp; |
| `chunking_config` | [MlChunkingConfig](./MlChunkingConfig.md) | &nbsp; |
| `datafeed_id` | [Id](./Id.md) | &nbsp; |
| `delayed_data_check_config` | [MlDelayedDataCheckConfig](./MlDelayedDataCheckConfig.md) | &nbsp; |
| `frequency` | [Duration](./Duration.md) | &nbsp; |
| `indices_options` | [IndicesOptions](./IndicesOptions.md) | &nbsp; |
| `indices` | string[] | &nbsp; |
| `job_id` | [Id](./Id.md) | &nbsp; |
| `max_empty_searches` | [integer](./integer.md) | &nbsp; |
| `query_delay` | [Duration](./Duration.md) | &nbsp; |
| `query` | [QueryDslQueryContainer](./QueryDslQueryContainer.md) | &nbsp; |
| `runtime_mappings` | [MappingRuntimeFields](./MappingRuntimeFields.md) | &nbsp; |
| `script_fields` | Record<string, [ScriptField](./ScriptField.md)> | &nbsp; |
| `scroll_size` | [integer](./integer.md) | &nbsp; |
