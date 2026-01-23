# MlUpdateDatafeedResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `authorization?` | [`MlDatafeedAuthorization`](MlDatafeedAuthorization.md) | - |
| `aggregations?` | `Record<string, AggregationsAggregationContainer>` | - |
| `chunking_config` | [`MlChunkingConfig`](MlChunkingConfig.md) | - |
| `delayed_data_check_config?` | [`MlDelayedDataCheckConfig`](MlDelayedDataCheckConfig.md) | - |
| `datafeed_id` | [`Id`](Id.md) | - |
| `frequency?` | [`Duration`](Duration.md) | The interval at which scheduled queries are made while the datafeed runs in real time. The default value is either the bucket span for short bucket spans, or, for longer bucket spans, a sensible fraction of the bucket span. For example: `150s`. When `frequency` is shorter than the bucket span, interim results for the last (partial) bucket are written then eventually overwritten by the full bucket results. If the datafeed uses aggregations, this value must be divisible by the interval of the date histogram aggregation. |
| `indices` | `string[]` | - |
| `indices_options?` | [`IndicesOptions`](IndicesOptions.md) | - |
| `job_id` | [`Id`](Id.md) | - |
| `max_empty_searches?` | [`integer`](integer.md) | - |
| `query` | [`QueryDslQueryContainer`](QueryDslQueryContainer.md) | - |
| `query_delay` | [`Duration`](Duration.md) | - |
| `runtime_mappings?` | [`MappingRuntimeFields`](MappingRuntimeFields.md) | - |
| `script_fields?` | `Record<string, ScriptField>` | - |
| `scroll_size` | [`integer`](integer.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
