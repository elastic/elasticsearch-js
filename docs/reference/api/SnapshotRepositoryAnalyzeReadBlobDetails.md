## Interface `SnapshotRepositoryAnalyzeReadBlobDetails`

| Name | Type | Description |
| - | - | - |
| `before_write_complete` | boolean | Indicates whether the read operation may have started before the write operation was complete. |
| `elapsed_nanos` | [DurationValue](./DurationValue.md)<[UnitNanos](./UnitNanos.md)> | The length of time spent reading the blob, in nanoseconds. If the blob was not found, this detail is omitted. |
| `elapsed` | [Duration](./Duration.md) | The length of time spent reading the blob. If the blob was not found, this detail is omitted. |
| `first_byte_time_nanos` | [DurationValue](./DurationValue.md)<[UnitNanos](./UnitNanos.md)> | The length of time waiting for the first byte of the read operation to be received, in nanoseconds. If the blob was not found, this detail is omitted. |
| `first_byte_time` | [Duration](./Duration.md) | The length of time waiting for the first byte of the read operation to be received. If the blob was not found, this detail is omitted. |
| `found` | boolean | Indicates whether the blob was found by the read operation. If the read was started before the write completed or the write was ended before completion, it might be false. |
| `node` | [SnapshotRepositoryAnalyzeSnapshotNodeInfo](./SnapshotRepositoryAnalyzeSnapshotNodeInfo.md) | The node that performed the read operation. |
| `throttled_nanos` | [DurationValue](./DurationValue.md)<[UnitNanos](./UnitNanos.md)> | The length of time spent waiting due to the `max_restore_bytes_per_sec` or `indices.recovery.max_bytes_per_sec` throttles during the read of the blob, in nanoseconds. If the blob was not found, this detail is omitted. |
| `throttled` | [Duration](./Duration.md) | The length of time spent waiting due to the `max_restore_bytes_per_sec` or `indices.recovery.max_bytes_per_sec` throttles during the read of the blob. If the blob was not found, this detail is omitted. |
