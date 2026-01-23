# NodesMemoryStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `adjusted_total_in_bytes?` | [`long`](long.md) | If the amount of physical memory has been overridden using the `es`.`total_memory_bytes` system property then this reports the overridden value in bytes.
Otherwise it reports the same value as `total_in_bytes`. |
| `resident?` | `string` | - |
| `resident_in_bytes?` | [`long`](long.md) | - |
| `share?` | `string` | - |
| `share_in_bytes?` | [`long`](long.md) | - |
| `total_virtual?` | `string` | - |
| `total_virtual_in_bytes?` | [`long`](long.md) | - |
| `total_in_bytes?` | [`long`](long.md) | Total amount of physical memory in bytes. |
| `free_in_bytes?` | [`long`](long.md) | Amount of free physical memory in bytes. |
| `used_in_bytes?` | [`long`](long.md) | Amount of used physical memory in bytes. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
