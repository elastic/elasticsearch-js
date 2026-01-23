# SnapshotCreateResponse

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `accepted?` | `boolean` | Equals `true` if the snapshot was accepted. Present when the request had `wait_for_completion` set to `false` |
| `snapshot?` | [`SnapshotSnapshotInfo`](SnapshotSnapshotInfo.md) | Snapshot information. Present when the request had `wait_for_completion` set to `true` |

## See Also

- [All Types](./)
- [API Methods](../index.md)
