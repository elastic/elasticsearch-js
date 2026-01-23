# SnapshotStatus

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `include_global_state` | `boolean` | Indicates whether the current cluster state is included in the snapshot. |
| `indices` | `Record<string, SnapshotSnapshotIndexStats>` | - |
| `repository` | `string` | The name of the repository that includes the snapshot. |
| `shards_stats` | [`SnapshotShardsStats`](SnapshotShardsStats.md) | Statistics for the shards in the snapshot. |
| `snapshot` | `string` | The name of the snapshot. |
| `state` | `string` | The current snapshot state:

* `FAILED`: The snapshot finished with an error and failed to store any data.
* `STARTED`: The snapshot is currently running.
* `SUCCESS`: The snapshot completed. |
| `stats` | [`SnapshotSnapshotStats`](SnapshotSnapshotStats.md) | Details about the number (`file_count`) and size (`size_in_bytes`) of files included in the snapshot. |
| `uuid` | [`Uuid`](Uuid.md) | The universally unique identifier (UUID) for the snapshot. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
