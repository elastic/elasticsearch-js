## Interface `SnapshotRepositoryAnalyzeReadSummaryInfo`

| Name | Type | Description |
| - | - | - |
| `count` | [integer](./integer.md) | The number of read operations performed in the test. |
| `max_wait_nanos` | [DurationValue](./DurationValue.md)<[UnitNanos](./UnitNanos.md)> | The maximum time spent waiting for the first byte of any read request to be received, in nanoseconds. |
| `max_wait` | [Duration](./Duration.md) | The maximum time spent waiting for the first byte of any read request to be received. |
| `total_elapsed_nanos` | [DurationValue](./DurationValue.md)<[UnitNanos](./UnitNanos.md)> | The total elapsed time spent on reading blobs in the test, in nanoseconds. |
| `total_elapsed` | [Duration](./Duration.md) | The total elapsed time spent on reading blobs in the test. |
| `total_size_bytes` | [long](./long.md) | The total size of all the blobs or partial blobs read in the test, in bytes. |
| `total_size` | [ByteSize](./ByteSize.md) | The total size of all the blobs or partial blobs read in the test. |
| `total_throttled_nanos` | [DurationValue](./DurationValue.md)<[UnitNanos](./UnitNanos.md)> | The total time spent waiting due to the `max_restore_bytes_per_sec` or `indices.recovery.max_bytes_per_sec` throttles, in nanoseconds. |
| `total_throttled` | [Duration](./Duration.md) | The total time spent waiting due to the `max_restore_bytes_per_sec` or `indices.recovery.max_bytes_per_sec` throttles. |
| `total_wait_nanos` | [DurationValue](./DurationValue.md)<[UnitNanos](./UnitNanos.md)> | The total time spent waiting for the first byte of each read request to be received, in nanoseconds. |
| `total_wait` | [Duration](./Duration.md) | The total time spent waiting for the first byte of each read request to be received. |
