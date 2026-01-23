# ClusterStatsSnapshotCurrentCounts

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `snapshots` | `integer` | Snapshots currently in progress |
| `shard_snapshots` | `integer` | Incomplete shard snapshots |
| `snapshot_deletions` | `integer` | Snapshots deletions in progress |
| `concurrent_operations` | `integer` | Sum of snapshots and snapshot_deletions |
| `cleanups` | `integer` | Cleanups in progress, not counted in concurrent_operations as they are not concurrent |

## See Also

- [All Types](./)
- [API Methods](../index.md)
