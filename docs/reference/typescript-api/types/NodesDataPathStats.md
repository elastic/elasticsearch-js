# NodesDataPathStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `available?` | `string` | Total amount of disk space available to this Java virtual machine on this file store. |
| `available_in_bytes?` | [`long`](long.md) | Total number of bytes available to this Java virtual machine on this file store. |
| `disk_queue?` | `string` | - |
| `disk_reads?` | [`long`](long.md) | - |
| `disk_read_size?` | `string` | - |
| `disk_read_size_in_bytes?` | [`long`](long.md) | - |
| `disk_writes?` | [`long`](long.md) | - |
| `disk_write_size?` | `string` | - |
| `disk_write_size_in_bytes?` | [`long`](long.md) | - |
| `free?` | `string` | Total amount of unallocated disk space in the file store. |
| `free_in_bytes?` | [`long`](long.md) | Total number of unallocated bytes in the file store. |
| `mount?` | `string` | Mount point of the file store (for example: `/dev/sda2`). |
| `path?` | `string` | Path to the file store. |
| `total?` | `string` | Total size of the file store. |
| `total_in_bytes?` | [`long`](long.md) | Total size of the file store in bytes. |
| `type?` | `string` | Type of the file store (ex: ext4). |

## See Also

- [All Types](./)
- [API Methods](../index.md)
