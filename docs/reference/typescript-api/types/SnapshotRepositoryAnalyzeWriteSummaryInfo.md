# SnapshotRepositoryAnalyzeWriteSummaryInfo

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `count` | `integer` | The number of write operations performed in the test. |
| `total_elapsed` | [`Duration`](Duration.md) | The total elapsed time spent on writing blobs in the test. |
| `total_elapsed_nanos` | `DurationValue<UnitNanos>` | The total elapsed time spent on writing blobs in the test, in nanoseconds. |
| `total_size` | [`ByteSize`](ByteSize.md) | The total size of all the blobs written in the test. |
| `total_size_bytes` | `long` | The total size of all the blobs written in the test, in bytes. |
| `total_throttled` | [`Duration`](Duration.md) | The total time spent waiting due to the `max_snapshot_bytes_per_sec` throttle. |
| `total_throttled_nanos` | `long` | The total time spent waiting due to the `max_snapshot_bytes_per_sec` throttle, in nanoseconds. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
