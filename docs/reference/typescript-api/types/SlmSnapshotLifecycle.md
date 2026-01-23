# SlmSnapshotLifecycle

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `in_progress?` | [`SlmInProgress`](SlmInProgress.md) | - |
| `last_failure?` | [`SlmInvocation`](SlmInvocation.md) | - |
| `last_success?` | [`SlmInvocation`](SlmInvocation.md) | - |
| `modified_date?` | [`DateTime`](DateTime.md) | The last time the policy was modified. |
| `modified_date_millis` | `EpochTime<UnitMillis>` | - |
| `next_execution?` | [`DateTime`](DateTime.md) | The next time the policy will run. |
| `next_execution_millis` | `EpochTime<UnitMillis>` | - |
| `policy` | [`SlmPolicy`](SlmPolicy.md) | - |
| `version` | [`VersionNumber`](VersionNumber.md) | The version of the snapshot policy.
Only the latest version is stored and incremented when the policy is updated. |
| `stats` | [`SlmStatistics`](SlmStatistics.md) | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
