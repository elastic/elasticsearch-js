# ClusterStatsSnapshotCurrentCounts

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `snapshots` | [`integer`](integer.md) | Snapshots currently in progress |
| `shard_snapshots` | [`integer`](integer.md) | Incomplete shard snapshots |
| `snapshot_deletions` | [`integer`](integer.md) | Snapshots deletions in progress |
| `concurrent_operations` | [`integer`](integer.md) | Sum of snapshots and snapshot_deletions |
| `cleanups` | [`integer`](integer.md) | Cleanups in progress, not counted in concurrent_operations as they are not concurrent |

## See Also

- [All Types](./)
- [API Methods](../index.md)
