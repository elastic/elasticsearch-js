## Interface `SnapshotCleanupRepositoryCleanupRepositoryResults`

| Name | Type | Description |
| - | - | - |
| `deleted_blobs` | [long](./long.md) | The number of binary large objects (blobs) removed from the snapshot repository during cleanup operations. A non-zero value indicates that unreferenced blobs were found and subsequently cleaned up. |
| `deleted_bytes` | [long](./long.md) | The number of bytes freed by cleanup operations. |
