# MlPutDatafeedResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `aggregations?` | `Record<string, AggregationsAggregationContainer>` | - |
| `authorization?` | [`MlDatafeedAuthorization`](MlDatafeedAuthorization.md) | - |
| `chunking_config` | [`MlChunkingConfig`](MlChunkingConfig.md) | - |
| `delayed_data_check_config?` | [`MlDelayedDataCheckConfig`](MlDelayedDataCheckConfig.md) | - |
| `datafeed_id` | [`Id`](Id.md) | - |
| `frequency?` | [`Duration`](Duration.md) | - |
| `indices` | `string[]` | - |
| `job_id` | [`Id`](Id.md) | - |
| `indices_options?` | [`IndicesOptions`](IndicesOptions.md) | - |
| `max_empty_searches?` | `integer` | - |
| `query` | [`QueryDslQueryContainer`](QueryDslQueryContainer.md) | - |
| `query_delay` | [`Duration`](Duration.md) | - |
| `runtime_mappings?` | [`MappingRuntimeFields`](MappingRuntimeFields.md) | - |
| `script_fields?` | `Record<string, ScriptField>` | - |
| `scroll_size` | `integer` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
