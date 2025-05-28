# `IndicesRecoveryShardRecovery` [interface-IndicesRecoveryShardRecovery]

| Name | Type | Description |
| - | - | - |
| `id` | [long](./long.md) | &nbsp; |
| `index` | [IndicesRecoveryRecoveryIndexStatus](./IndicesRecoveryRecoveryIndexStatus.md) | &nbsp; |
| `primary` | boolean | &nbsp; |
| `source` | [IndicesRecoveryRecoveryOrigin](./IndicesRecoveryRecoveryOrigin.md) | &nbsp; |
| `stage` | string | &nbsp; |
| `start_time_in_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `start_time` | [DateTime](./DateTime.md) | &nbsp; |
| `start` | [IndicesRecoveryRecoveryStartStatus](./IndicesRecoveryRecoveryStartStatus.md) | &nbsp; |
| `stop_time_in_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `stop_time` | [DateTime](./DateTime.md) | &nbsp; |
| `target` | [IndicesRecoveryRecoveryOrigin](./IndicesRecoveryRecoveryOrigin.md) | &nbsp; |
| `total_time_in_millis` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `total_time` | [Duration](./Duration.md) | &nbsp; |
| `translog` | [IndicesRecoveryTranslogStatus](./IndicesRecoveryTranslogStatus.md) | &nbsp; |
| `type` | string | &nbsp; |
| `verify_index` | [IndicesRecoveryVerifyIndex](./IndicesRecoveryVerifyIndex.md) | &nbsp; |
