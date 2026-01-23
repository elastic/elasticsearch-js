# ClusterStatsClusterFileSystem

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `path?` | `string` | - |
| `mount?` | `string` | - |
| `type?` | `string` | - |
| `available_in_bytes?` | `long` | Total number of bytes available to JVM in file stores across all selected nodes.
Depending on operating system or process-level restrictions, this number may be less than `nodes.fs.free_in_byes`.
This is the actual amount of free disk space the selected Elasticsearch nodes can use. |
| `available?` | [`ByteSize`](ByteSize.md) | Total number of bytes available to JVM in file stores across all selected nodes.
Depending on operating system or process-level restrictions, this number may be less than `nodes.fs.free_in_byes`.
This is the actual amount of free disk space the selected Elasticsearch nodes can use. |
| `free_in_bytes?` | `long` | Total number, in bytes, of unallocated bytes in file stores across all selected nodes. |
| `free?` | [`ByteSize`](ByteSize.md) | Total number of unallocated bytes in file stores across all selected nodes. |
| `total_in_bytes?` | `long` | Total size, in bytes, of all file stores across all selected nodes. |
| `total?` | [`ByteSize`](ByteSize.md) | Total size of all file stores across all selected nodes. |
| `low_watermark_free_space?` | [`ByteSize`](ByteSize.md) | - |
| `low_watermark_free_space_in_bytes?` | `long` | - |
| `high_watermark_free_space?` | [`ByteSize`](ByteSize.md) | - |
| `high_watermark_free_space_in_bytes?` | `long` | - |
| `flood_stage_free_space?` | [`ByteSize`](ByteSize.md) | - |
| `flood_stage_free_space_in_bytes?` | `long` | - |
| `frozen_flood_stage_free_space?` | [`ByteSize`](ByteSize.md) | - |
| `frozen_flood_stage_free_space_in_bytes?` | `long` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
