# NodesClusterStateUpdate

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `count` | `long` | The number of cluster state update attempts that did not change the cluster state since the node started. |
| `computation_time?` | [`Duration`](Duration.md) | The cumulative amount of time spent computing no-op cluster state updates since the node started. |
| `computation_time_millis?` | `DurationValue<UnitMillis>` | The cumulative amount of time, in milliseconds, spent computing no-op cluster state updates since the node started. |
| `publication_time?` | [`Duration`](Duration.md) | The cumulative amount of time spent publishing cluster state updates which ultimately succeeded, which includes everything from the start of the publication (just after the computation of the new cluster state) until the publication has finished and the master node is ready to start processing the next state update.
This includes the time measured by `context_construction_time`, `commit_time`, `completion_time` and `master_apply_time`. |
| `publication_time_millis?` | `DurationValue<UnitMillis>` | The cumulative amount of time, in milliseconds, spent publishing cluster state updates which ultimately succeeded, which includes everything from the start of the publication (just after the computation of the new cluster state) until the publication has finished and the master node is ready to start processing the next state update.
This includes the time measured by `context_construction_time`, `commit_time`, `completion_time` and `master_apply_time`. |
| `context_construction_time?` | [`Duration`](Duration.md) | The cumulative amount of time spent constructing a publication context since the node started for publications that ultimately succeeded.
This statistic includes the time spent computing the difference between the current and new cluster state preparing a serialized representation of this difference. |
| `context_construction_time_millis?` | `DurationValue<UnitMillis>` | The cumulative amount of time, in milliseconds, spent constructing a publication context since the node started for publications that ultimately succeeded.
This statistic includes the time spent computing the difference between the current and new cluster state preparing a serialized representation of this difference. |
| `commit_time?` | [`Duration`](Duration.md) | The cumulative amount of time spent waiting for a successful cluster state update to commit, which measures the time from the start of each publication until a majority of the master-eligible nodes have written the state to disk and confirmed the write to the elected master. |
| `commit_time_millis?` | `DurationValue<UnitMillis>` | The cumulative amount of time, in milliseconds, spent waiting for a successful cluster state update to commit, which measures the time from the start of each publication until a majority of the master-eligible nodes have written the state to disk and confirmed the write to the elected master. |
| `completion_time?` | [`Duration`](Duration.md) | The cumulative amount of time spent waiting for a successful cluster state update to complete, which measures the time from the start of each publication until all the other nodes have notified the elected master that they have applied the cluster state. |
| `completion_time_millis?` | `DurationValue<UnitMillis>` | The cumulative amount of time, in milliseconds,  spent waiting for a successful cluster state update to complete, which measures the time from the start of each publication until all the other nodes have notified the elected master that they have applied the cluster state. |
| `master_apply_time?` | [`Duration`](Duration.md) | The cumulative amount of time spent successfully applying cluster state updates on the elected master since the node started. |
| `master_apply_time_millis?` | `DurationValue<UnitMillis>` | The cumulative amount of time, in milliseconds, spent successfully applying cluster state updates on the elected master since the node started. |
| `notification_time?` | [`Duration`](Duration.md) | The cumulative amount of time spent notifying listeners of a no-op cluster state update since the node started. |
| `notification_time_millis?` | `DurationValue<UnitMillis>` | The cumulative amount of time, in milliseconds, spent notifying listeners of a no-op cluster state update since the node started. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
