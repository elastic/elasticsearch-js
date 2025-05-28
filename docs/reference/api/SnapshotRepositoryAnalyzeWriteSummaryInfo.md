# `SnapshotRepositoryAnalyzeWriteSummaryInfo` [interface-SnapshotRepositoryAnalyzeWriteSummaryInfo]

| Name | Type | Description |
| - | - | - |
| `count` | [integer](./integer.md) | The number of write operations performed in the test. |
| `total_elapsed_nanos` | [DurationValue](./DurationValue.md)<[UnitNanos](./UnitNanos.md)> | The total elapsed time spent on writing blobs in the test, in nanoseconds. |
| `total_elapsed` | [Duration](./Duration.md) | The total elapsed time spent on writing blobs in the test. |
| `total_size_bytes` | [long](./long.md) | The total size of all the blobs written in the test, in bytes. |
| `total_size` | [ByteSize](./ByteSize.md) | The total size of all the blobs written in the test. |
| `total_throttled_nanos` | [long](./long.md) | The total time spent waiting due to the `max_snapshot_bytes_per_sec` throttle, in nanoseconds. |
| `total_throttled` | [Duration](./Duration.md) | The total time spent waiting due to the `max_snapshot_bytes_per_sec` throttle. |
