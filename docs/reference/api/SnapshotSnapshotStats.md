## Interface `SnapshotSnapshotStats`

| Name | Type | Description |
| - | - | - |
| `incremental` | [SnapshotFileCountSnapshotStats](./SnapshotFileCountSnapshotStats.md) | The number and size of files that still need to be copied as part of the incremental snapshot. For completed snapshots, this property indicates the number and size of files that were not already in the repository and were copied as part of the incremental snapshot. |
| `start_time_in_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | The time, in milliseconds, when the snapshot creation process started. |
| `time_in_millis` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | The total time, in milliseconds, that it took for the snapshot process to complete. |
| `time` | [Duration](./Duration.md) | &nbsp; |
| `total` | [SnapshotFileCountSnapshotStats](./SnapshotFileCountSnapshotStats.md) | The total number and size of files that are referenced by the snapshot. |
