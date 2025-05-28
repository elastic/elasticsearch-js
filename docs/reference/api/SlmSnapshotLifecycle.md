# `SlmSnapshotLifecycle` [interface-SlmSnapshotLifecycle]

| Name | Type | Description |
| - | - | - |
| `in_progress` | [SlmInProgress](./SlmInProgress.md) | &nbsp; |
| `last_failure` | [SlmInvocation](./SlmInvocation.md) | &nbsp; |
| `last_success` | [SlmInvocation](./SlmInvocation.md) | &nbsp; |
| `modified_date_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `modified_date` | [DateTime](./DateTime.md) | The last time the policy was modified. |
| `next_execution_millis` | [EpochTime](./EpochTime.md)<[UnitMillis](./UnitMillis.md)> | &nbsp; |
| `next_execution` | [DateTime](./DateTime.md) | The next time the policy will run. |
| `policy` | [SlmPolicy](./SlmPolicy.md) | &nbsp; |
| `stats` | [SlmStatistics](./SlmStatistics.md) | &nbsp; |
| `version` | [VersionNumber](./VersionNumber.md) | The version of the snapshot policy. Only the latest version is stored and incremented when the policy is updated. |
