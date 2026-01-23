# CatSnapshotsSnapshotsRecord

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `id?` | `string` | The unique identifier for the snapshot. |
| `snapshot?` | `string` | The unique identifier for the snapshot. |
| `repository?` | `string` | The repository name. |
| `re?` | `string` | The repository name. |
| `repo?` | `string` | The repository name. |
| `status?` | `string` | The state of the snapshot process.
Returned values include:
`FAILED`: The snapshot process failed.
`INCOMPATIBLE`: The snapshot process is incompatible with the current cluster version.
`IN_PROGRESS`: The snapshot process started but has not completed.
`PARTIAL`: The snapshot process completed with a partial success.
`SUCCESS`: The snapshot process completed with a full success. |
| `s?` | `string` | The state of the snapshot process.
Returned values include:
`FAILED`: The snapshot process failed.
`INCOMPATIBLE`: The snapshot process is incompatible with the current cluster version.
`IN_PROGRESS`: The snapshot process started but has not completed.
`PARTIAL`: The snapshot process completed with a partial success.
`SUCCESS`: The snapshot process completed with a full success. |
| `start_epoch?` | `SpecUtilsStringified<EpochTime<UnitSeconds>>` | The Unix epoch time (seconds since 1970-01-01 00:00:00) at which the snapshot process started. |
| `ste?` | `SpecUtilsStringified<EpochTime<UnitSeconds>>` | The Unix epoch time (seconds since 1970-01-01 00:00:00) at which the snapshot process started. |
| `startEpoch?` | `SpecUtilsStringified<EpochTime<UnitSeconds>>` | The Unix epoch time (seconds since 1970-01-01 00:00:00) at which the snapshot process started. |
| `start_time?` | [`WatcherScheduleTimeOfDay`](WatcherScheduleTimeOfDay.md) | The time (HH:MM:SS) at which the snapshot process started. |
| `sti?` | [`WatcherScheduleTimeOfDay`](WatcherScheduleTimeOfDay.md) | The time (HH:MM:SS) at which the snapshot process started. |
| `startTime?` | [`WatcherScheduleTimeOfDay`](WatcherScheduleTimeOfDay.md) | The time (HH:MM:SS) at which the snapshot process started. |
| `end_epoch?` | `SpecUtilsStringified<EpochTime<UnitSeconds>>` | The Unix epoch time (seconds since 1970-01-01 00:00:00) at which the snapshot process ended. |
| `ete?` | `SpecUtilsStringified<EpochTime<UnitSeconds>>` | The Unix epoch time (seconds since 1970-01-01 00:00:00) at which the snapshot process ended. |
| `endEpoch?` | `SpecUtilsStringified<EpochTime<UnitSeconds>>` | The Unix epoch time (seconds since 1970-01-01 00:00:00) at which the snapshot process ended. |
| `end_time?` | [`TimeOfDay`](TimeOfDay.md) | The time (HH:MM:SS) at which the snapshot process ended. |
| `eti?` | [`TimeOfDay`](TimeOfDay.md) | The time (HH:MM:SS) at which the snapshot process ended. |
| `endTime?` | [`TimeOfDay`](TimeOfDay.md) | The time (HH:MM:SS) at which the snapshot process ended. |
| `duration?` | [`Duration`](Duration.md) | The time it took the snapshot process to complete, in time units. |
| `dur?` | [`Duration`](Duration.md) | The time it took the snapshot process to complete, in time units. |
| `indices?` | `string` | The number of indices in the snapshot. |
| `i?` | `string` | The number of indices in the snapshot. |
| `successful_shards?` | `string` | The number of successful shards in the snapshot. |
| `ss?` | `string` | The number of successful shards in the snapshot. |
| `failed_shards?` | `string` | The number of failed shards in the snapshot. |
| `fs?` | `string` | The number of failed shards in the snapshot. |
| `total_shards?` | `string` | The total number of shards in the snapshot. |
| `ts?` | `string` | The total number of shards in the snapshot. |
| `reason?` | `string` | The reason for any snapshot failures. |
| `r?` | `string` | The reason for any snapshot failures. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
