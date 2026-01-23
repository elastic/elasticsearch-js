# SnapshotRepositoryAnalyzeDetailsInfo

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `blob` | [`SnapshotRepositoryAnalyzeBlobDetails`](SnapshotRepositoryAnalyzeBlobDetails.md) | A description of the blob that was written and read. |
| `overwrite_elapsed?` | [`Duration`](Duration.md) | The elapsed time spent overwriting the blob.
If the blob was not overwritten, this information is omitted. |
| `overwrite_elapsed_nanos?` | `DurationValue<UnitNanos>` | The elapsed time spent overwriting the blob, in nanoseconds.
If the blob was not overwritten, this information is omitted. |
| `write_elapsed` | [`Duration`](Duration.md) | The elapsed time spent writing the blob. |
| `write_elapsed_nanos` | `DurationValue<UnitNanos>` | The elapsed time spent writing the blob, in nanoseconds. |
| `write_throttled` | [`Duration`](Duration.md) | The length of time spent waiting for the `max_snapshot_bytes_per_sec` (or `indices.recovery.max_bytes_per_sec` if the recovery settings for managed services are set) throttle while writing the blob. |
| `write_throttled_nanos` | `DurationValue<UnitNanos>` | The length of time spent waiting for the `max_snapshot_bytes_per_sec` (or `indices.recovery.max_bytes_per_sec` if the recovery settings for managed services are set) throttle while writing the blob, in nanoseconds. |
| `writer_node` | [`SnapshotRepositoryAnalyzeSnapshotNodeInfo`](SnapshotRepositoryAnalyzeSnapshotNodeInfo.md) | The node which wrote the blob and coordinated the read operations. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
