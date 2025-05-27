## Interface `MlGetMemoryStatsMemStats`

| Name | Type | Description |
| - | - | - |
| `adjusted_total_in_bytes` | [integer](./integer.md) | If the amount of physical memory has been overridden using the `es.total_memory_bytes` system property then this reports the overridden value in bytes. Otherwise it reports the same value as `total_in_bytes`. |
| `adjusted_total` | [ByteSize](./ByteSize.md) | If the amount of physical memory has been overridden using the es.total_memory_bytes system property then this reports the overridden value. Otherwise it reports the same value as total. |
| `ml` | [MlGetMemoryStatsMemMlStats](./MlGetMemoryStatsMemMlStats.md) | Contains statistics about machine learning use of native memory on the node. |
| `total_in_bytes` | [integer](./integer.md) | Total amount of physical memory in bytes. |
| `total` | [ByteSize](./ByteSize.md) | Total amount of physical memory. |
