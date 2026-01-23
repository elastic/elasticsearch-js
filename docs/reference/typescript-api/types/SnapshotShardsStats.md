# SnapshotShardsStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `done` | [`long`](long.md) | The number of shards that initialized, started, and finalized successfully. |
| `failed` | [`long`](long.md) | The number of shards that failed to be included in the snapshot. |
| `finalizing` | [`long`](long.md) | The number of shards that are finalizing but are not done. |
| `initializing` | [`long`](long.md) | The number of shards that are still initializing. |
| `started` | [`long`](long.md) | The number of shards that have started but are not finalized. |
| `total` | [`long`](long.md) | The total number of shards included in the snapshot. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
