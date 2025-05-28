# `MlDataframeAnalyticsStatsMemoryUsage` [interface-MlDataframeAnalyticsStatsMemoryUsage]

| Name | Type | Description |
| - | - | - |
| `memory_reestimate_bytes` | [long](./long.md) | This value is present when the status is hard_limit and it is a new estimate of how much memory the job needs. |
| `peak_usage_bytes` | [long](./long.md) | The number of bytes used at the highest peak of memory usage. |
| `status` | string | The memory usage status. |
| `timestamp` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | The timestamp when memory usage was calculated. |
