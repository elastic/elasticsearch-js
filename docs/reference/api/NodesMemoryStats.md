## Interface `NodesMemoryStats`

| Name | Type | Description |
| - | - | - |
| `adjusted_total_in_bytes` | [long](./long.md) | If the amount of physical memory has been overridden using the `es`. `total_memory_bytes` system property then this reports the overridden value in bytes. Otherwise it reports the same value as `total_in_bytes`. |
| `free_in_bytes` | [long](./long.md) | Amount of free physical memory in bytes. |
| `resident_in_bytes` | [long](./long.md) | &nbsp; |
| `resident` | string | &nbsp; |
| `share_in_bytes` | [long](./long.md) | &nbsp; |
| `share` | string | &nbsp; |
| `total_in_bytes` | [long](./long.md) | Total amount of physical memory in bytes. |
| `total_virtual_in_bytes` | [long](./long.md) | &nbsp; |
| `total_virtual` | string | &nbsp; |
| `used_in_bytes` | [long](./long.md) | Amount of used physical memory in bytes. |
