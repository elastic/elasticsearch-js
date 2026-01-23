# XpackUsageSecurityRolesDlsBitSetCache

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `count` | [`integer`](integer.md) | Number of entries in the cache. |
| `memory?` | [`ByteSize`](ByteSize.md) | Human-readable amount of memory taken up by the cache. |
| `memory_in_bytes` | [`ulong`](ulong.md) | Memory taken up by the cache in bytes. |
| `hits` | [`long`](long.md) | Total number of cache hits. |
| `misses` | [`long`](long.md) | Total number of cache misses. |
| `evictions` | [`long`](long.md) | Total number of cache evictions. |
| `hits_time_in_millis` | [`DurationValue`](DurationValue.md)<UnitMillis> | Total combined time spent in cache for hits in milliseconds. |
| `misses_time_in_millis` | [`DurationValue`](DurationValue.md)<UnitMillis> | Total combined time spent in cache for misses in milliseconds. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
