# IndicesRecoveryShardRecovery

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | [`long`](long.md) | - |
| `index` | [`IndicesRecoveryRecoveryIndexStatus`](IndicesRecoveryRecoveryIndexStatus.md) | - |
| `primary` | `boolean` | - |
| `source` | [`IndicesRecoveryRecoveryOrigin`](IndicesRecoveryRecoveryOrigin.md) | - |
| `stage` | `string` | - |
| `start?` | [`IndicesRecoveryRecoveryStartStatus`](IndicesRecoveryRecoveryStartStatus.md) | - |
| `start_time?` | [`DateTime`](DateTime.md) | - |
| `start_time_in_millis` | [`EpochTime`](EpochTime.md)<UnitMillis> | - |
| `stop_time?` | [`DateTime`](DateTime.md) | - |
| `stop_time_in_millis?` | [`EpochTime`](EpochTime.md)<UnitMillis> | - |
| `target` | [`IndicesRecoveryRecoveryOrigin`](IndicesRecoveryRecoveryOrigin.md) | - |
| `total_time?` | [`Duration`](Duration.md) | - |
| `total_time_in_millis` | [`DurationValue`](DurationValue.md)<UnitMillis> | - |
| `translog` | [`IndicesRecoveryTranslogStatus`](IndicesRecoveryTranslogStatus.md) | - |
| `type` | `string` | - |
| `verify_index` | [`IndicesRecoveryVerifyIndex`](IndicesRecoveryVerifyIndex.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
