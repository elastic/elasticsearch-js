# IndicesRolloverRolloverConditions

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `min_age?` | [`Duration`](Duration.md) | - |
| `max_age?` | [`Duration`](Duration.md) | - |
| `max_age_millis?` | `DurationValue<UnitMillis>` | - |
| `min_docs?` | `long` | - |
| `max_docs?` | `long` | - |
| `max_size?` | [`ByteSize`](ByteSize.md) | The `max_size` condition has been deprecated in 9.3.0 and `max_primary_shard_size` should be used instead |
| `max_size_bytes?` | `long` | - |
| `min_size?` | [`ByteSize`](ByteSize.md) | - |
| `min_size_bytes?` | `long` | - |
| `max_primary_shard_size?` | [`ByteSize`](ByteSize.md) | - |
| `max_primary_shard_size_bytes?` | `long` | - |
| `min_primary_shard_size?` | [`ByteSize`](ByteSize.md) | - |
| `min_primary_shard_size_bytes?` | `long` | - |
| `max_primary_shard_docs?` | `long` | - |
| `min_primary_shard_docs?` | `long` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
