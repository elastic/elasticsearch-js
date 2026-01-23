# SnapshotRepositoryAnalyzeReadSummaryInfo

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `count` | `integer` | The number of read operations performed in the test. |
| `max_wait` | [`Duration`](Duration.md) | The maximum time spent waiting for the first byte of any read request to be received. |
| `max_wait_nanos` | `DurationValue<UnitNanos>` | The maximum time spent waiting for the first byte of any read request to be received, in nanoseconds. |
| `total_elapsed` | [`Duration`](Duration.md) | The total elapsed time spent on reading blobs in the test. |
| `total_elapsed_nanos` | `DurationValue<UnitNanos>` | The total elapsed time spent on reading blobs in the test, in nanoseconds. |
| `total_size` | [`ByteSize`](ByteSize.md) | The total size of all the blobs or partial blobs read in the test. |
| `total_size_bytes` | `long` | The total size of all the blobs or partial blobs read in the test, in bytes. |
| `total_throttled` | [`Duration`](Duration.md) | The total time spent waiting due to the `max_restore_bytes_per_sec` or `indices.recovery.max_bytes_per_sec` throttles. |
| `total_throttled_nanos` | `DurationValue<UnitNanos>` | The total time spent waiting due to the `max_restore_bytes_per_sec` or `indices.recovery.max_bytes_per_sec` throttles, in nanoseconds. |
| `total_wait` | [`Duration`](Duration.md) | The total time spent waiting for the first byte of each read request to be received. |
| `total_wait_nanos` | `DurationValue<UnitNanos>` | The total time spent waiting for the first byte of each read request to be received, in nanoseconds. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
