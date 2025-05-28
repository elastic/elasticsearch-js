# `CatSnapshotsSnapshotsRecord` [interface-CatSnapshotsSnapshotsRecord]

| Name | Type | Description |
| - | - | - |
| `dur` | [Duration](./Duration.md) | The time it took the snapshot process to complete, in time units. duration |
| `duration` | [Duration](./Duration.md) | The time it took the snapshot process to complete, in time units. |
| `end_epoch` | [SpecUtilsStringified](./SpecUtilsStringified.md)<[EpochTime](./EpochTime.md)<[UnitSeconds](./UnitSeconds.md)>> | The Unix epoch time (seconds since 1970-01-01 00:00:00) at which the snapshot process ended. |
| `end_time` | [TimeOfDay](./TimeOfDay.md) | The time (HH:MM:SS) at which the snapshot process ended. |
| `endEpoch` | [SpecUtilsStringified](./SpecUtilsStringified.md)<[EpochTime](./EpochTime.md)<[UnitSeconds](./UnitSeconds.md)>> | The Unix epoch time (seconds since 1970-01-01 00:00:00) at which the snapshot process ended. end_epoch |
| `endTime` | [TimeOfDay](./TimeOfDay.md) | The time (HH:MM:SS) at which the snapshot process ended. end_time |
| `ete` | [SpecUtilsStringified](./SpecUtilsStringified.md)<[EpochTime](./EpochTime.md)<[UnitSeconds](./UnitSeconds.md)>> | The Unix epoch time (seconds since 1970-01-01 00:00:00) at which the snapshot process ended. end_epoch |
| `eti` | [TimeOfDay](./TimeOfDay.md) | The time (HH:MM:SS) at which the snapshot process ended. end_time |
| `failed_shards` | string | The number of failed shards in the snapshot. |
| `fs` | string | The number of failed shards in the snapshot. failed_shards |
| `i` | string | The number of indices in the snapshot. indices |
| `id` | string | The unique identifier for the snapshot. |
| `indices` | string | The number of indices in the snapshot. |
| `r` | string | The reason for any snapshot failures. reason |
| `re` | string | The repository name. repository |
| `reason` | string | The reason for any snapshot failures. |
| `repo` | string | The repository name. repository |
| `repository` | string | The repository name. |
| `s` | string | The state of the snapshot process. Returned values include: `FAILED`: The snapshot process failed. `INCOMPATIBLE`: The snapshot process is incompatible with the current cluster version. `IN_PROGRESS`: The snapshot process started but has not completed. `PARTIAL`: The snapshot process completed with a partial success. `SUCCESS`: The snapshot process completed with a full success. status |
| `snapshot` | string | The unique identifier for the snapshot. id |
| `ss` | string | The number of successful shards in the snapshot. successful_shards |
| `start_epoch` | [SpecUtilsStringified](./SpecUtilsStringified.md)<[EpochTime](./EpochTime.md)<[UnitSeconds](./UnitSeconds.md)>> | The Unix epoch time (seconds since 1970-01-01 00:00:00) at which the snapshot process started. |
| `start_time` | [WatcherScheduleTimeOfDay](./WatcherScheduleTimeOfDay.md) | The time (HH:MM:SS) at which the snapshot process started. |
| `startEpoch` | [SpecUtilsStringified](./SpecUtilsStringified.md)<[EpochTime](./EpochTime.md)<[UnitSeconds](./UnitSeconds.md)>> | The Unix epoch time (seconds since 1970-01-01 00:00:00) at which the snapshot process started. start_epoch |
| `startTime` | [WatcherScheduleTimeOfDay](./WatcherScheduleTimeOfDay.md) | The time (HH:MM:SS) at which the snapshot process started. start_time |
| `status` | string | The state of the snapshot process. Returned values include: `FAILED`: The snapshot process failed. `INCOMPATIBLE`: The snapshot process is incompatible with the current cluster version. `IN_PROGRESS`: The snapshot process started but has not completed. `PARTIAL`: The snapshot process completed with a partial success. `SUCCESS`: The snapshot process completed with a full success. |
| `ste` | [SpecUtilsStringified](./SpecUtilsStringified.md)<[EpochTime](./EpochTime.md)<[UnitSeconds](./UnitSeconds.md)>> | The Unix epoch time (seconds since 1970-01-01 00:00:00) at which the snapshot process started. start_epoch |
| `sti` | [WatcherScheduleTimeOfDay](./WatcherScheduleTimeOfDay.md) | The time (HH:MM:SS) at which the snapshot process started. start_time |
| `successful_shards` | string | The number of successful shards in the snapshot. |
| `total_shards` | string | The total number of shards in the snapshot. |
| `ts` | string | The total number of shards in the snapshot. total_shards |
