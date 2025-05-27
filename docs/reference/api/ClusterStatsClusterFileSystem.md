## Interface `ClusterStatsClusterFileSystem`

| Name | Type | Description |
| - | - | - |
| `available_in_bytes` | [long](./long.md) | Total number of bytes available to JVM in file stores across all selected nodes. Depending on operating system or process-level restrictions, this number may be less than `nodes.fs.free_in_byes`. This is the actual amount of free disk space the selected Elasticsearch nodes can use. |
| `free_in_bytes` | [long](./long.md) | Total number of unallocated bytes in file stores across all selected nodes. |
| `total_in_bytes` | [long](./long.md) | Total size, in bytes, of all file stores across all selected nodes. |
