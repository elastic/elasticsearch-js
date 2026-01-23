# SnapshotShardsStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `done` | `long` | The number of shards that initialized, started, and finalized successfully. |
| `failed` | `long` | The number of shards that failed to be included in the snapshot. |
| `finalizing` | `long` | The number of shards that are finalizing but are not done. |
| `initializing` | `long` | The number of shards that are still initializing. |
| `started` | `long` | The number of shards that have started but are not finalized. |
| `total` | `long` | The total number of shards included in the snapshot. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
