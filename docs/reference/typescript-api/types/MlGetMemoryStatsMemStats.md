# MlGetMemoryStatsMemStats

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `adjusted_total?` | [`ByteSize`](ByteSize.md) | If the amount of physical memory has been overridden using the es.total_memory_bytes system property
then this reports the overridden value. Otherwise it reports the same value as total. |
| `adjusted_total_in_bytes` | `integer` | If the amount of physical memory has been overridden using the `es.total_memory_bytes` system property
then this reports the overridden value in bytes. Otherwise it reports the same value as `total_in_bytes`. |
| `total?` | [`ByteSize`](ByteSize.md) | Total amount of physical memory. |
| `total_in_bytes` | `integer` | Total amount of physical memory in bytes. |
| `ml` | [`MlGetMemoryStatsMemMlStats`](MlGetMemoryStatsMemMlStats.md) | Contains statistics about machine learning use of native memory on the node. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
