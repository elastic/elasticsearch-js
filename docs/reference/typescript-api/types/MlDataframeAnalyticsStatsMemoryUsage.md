# MlDataframeAnalyticsStatsMemoryUsage

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `memory_reestimate_bytes?` | `long` | This value is present when the status is hard_limit and it is a new estimate of how much memory the job needs. |
| `peak_usage_bytes` | `long` | The number of bytes used at the highest peak of memory usage. |
| `status` | `string` | The memory usage status. |
| `timestamp?` | `EpochTime<UnitMillis>` | The timestamp when memory usage was calculated. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
