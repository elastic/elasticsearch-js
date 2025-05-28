# `SnapshotRepositoryAnalyzeBlobDetails` [interface-SnapshotRepositoryAnalyzeBlobDetails]

| Name | Type | Description |
| - | - | - |
| `name` | string | The name of the blob. |
| `overwritten` | boolean | Indicates whether the blob was overwritten while the read operations were ongoing. /** |
| `read_early` | boolean | &nbsp; |
| `read_end` | [long](./long.md) | The position, in bytes, at which read operations completed. |
| `read_start` | [long](./long.md) | The position, in bytes, at which read operations started. |
| `reads` | [SnapshotRepositoryAnalyzeReadBlobDetails](./SnapshotRepositoryAnalyzeReadBlobDetails.md) | A description of every read operation performed on the blob. |
| `size_bytes` | [long](./long.md) | The size of the blob in bytes. |
| `size` | [ByteSize](./ByteSize.md) | The size of the blob. |
