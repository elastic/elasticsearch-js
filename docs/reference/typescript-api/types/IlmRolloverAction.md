# IlmRolloverAction

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `max_size?` | [`ByteSize`](ByteSize.md) | The `max_size` condition has been deprecated in 9.3.0 and `max_primary_shard_size` should be used instead |
| `max_primary_shard_size?` | [`ByteSize`](ByteSize.md) | - |
| `max_age?` | [`Duration`](Duration.md) | - |
| `max_docs?` | `long` | - |
| `max_primary_shard_docs?` | `long` | - |
| `min_size?` | [`ByteSize`](ByteSize.md) | - |
| `min_primary_shard_size?` | [`ByteSize`](ByteSize.md) | - |
| `min_age?` | [`Duration`](Duration.md) | - |
| `min_docs?` | `long` | - |
| `min_primary_shard_docs?` | `long` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
