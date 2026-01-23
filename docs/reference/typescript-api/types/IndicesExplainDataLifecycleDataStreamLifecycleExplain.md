# IndicesExplainDataLifecycleDataStreamLifecycleExplain

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `index` | [`IndexName`](IndexName.md) | - |
| `managed_by_lifecycle` | `boolean` | - |
| `index_creation_date_millis?` | `EpochTime<UnitMillis>` | - |
| `time_since_index_creation?` | [`Duration`](Duration.md) | - |
| `rollover_date_millis?` | `EpochTime<UnitMillis>` | - |
| `time_since_rollover?` | [`Duration`](Duration.md) | - |
| `lifecycle?` | [`IndicesDataStreamLifecycleWithRollover`](IndicesDataStreamLifecycleWithRollover.md) | - |
| `generation_time?` | [`Duration`](Duration.md) | - |
| `error?` | `string` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
